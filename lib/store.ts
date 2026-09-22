import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { FullReport, PublicReport } from "@/lib/types";

export type AnalyticsEventName =
  | "analyze_started"
  | "analyze_completed"
  | "analyze_failed"
  | "report_viewed";
type AnalyticsEvent = {
  eventName: AnalyticsEventName;
  statusCode?: number;
  analysisMode?: FullReport["mode"];
  value?: number;
  currency?: string;
  createdAt: string;
};
type MemoryStore = {
  reports: Map<string, FullReport>;
  analyticsEvents: AnalyticsEvent[];
};

type ReportRow = { payload: string };

const globalStore = globalThis as typeof globalThis & {
  __sitelensStore?: MemoryStore;
};
const memoryStore: MemoryStore = globalStore.__sitelensStore ?? { reports: new Map(), analyticsEvents: [] };
globalStore.__sitelensStore = memoryStore;

export async function getDatabase(): Promise<D1Database | undefined> {
  if (process.env.SITELENS_QA === "1") return undefined;

  try {
    const database = (await getCloudflareContext({ async: true })).env.DB;
    if (database) return database;
  } catch {
    // Local Next.js development does not have a Cloudflare binding unless run through Wrangler.
  }

  if (process.env.NODE_ENV !== "development") {
    throw new Error("Cloudflare D1 binding DB is unavailable.");
  }

  return undefined;
}

export async function saveReport(report: FullReport) {
  const database = await getDatabase();
  if (database) {
    await database
      .prepare("INSERT OR REPLACE INTO reports (id, payload, created_at) VALUES (?, ?, ?)")
      .bind(report.id, JSON.stringify(report), report.createdAt)
      .run();
    return;
  }

  memoryStore.reports.set(report.id, report);
}

export async function getReport(id: string) {
  const database = await getDatabase();
  if (database) {
    const row = await database.prepare("SELECT payload FROM reports WHERE id = ?").bind(id).first<ReportRow>();
    if (!row) return undefined;

    try {
      return JSON.parse(row.payload) as FullReport;
    } catch {
      return undefined;
    }
  }

  return memoryStore.reports.get(id);
}

export function toPublicReport(report: FullReport): PublicReport {
  return {
    id: report.id,
    url: report.url,
    host: report.host,
    createdAt: report.createdAt,
    score: report.score,
    mode: report.mode,
    summary: report.summary,
    snapshot: report.snapshot,
    issues: report.issues.map(({ id, category, title, severity, evidence, whyItMatters, firstFix, rewrite, confidence }) => ({ id, category, title, severity, evidence, whyItMatters, firstFix, rewrite, confidence })),
  };
}

export async function getPublicReport(id: string) {
  const report = await getReport(id);
  return report ? toPublicReport(report) : undefined;
}

export async function recordAnalyticsEvent(input: Omit<AnalyticsEvent, "createdAt"> & { createdAt?: string }) {
  const event = { ...input, createdAt: input.createdAt ?? new Date().toISOString() };

  try {
    const database = await getDatabase();
    if (database) {
      await database
        .prepare("INSERT INTO analytics_events (event_name, status_code, analysis_mode, value, currency, created_at) VALUES (?, ?, ?, ?, ?, ?)")
        .bind(event.eventName, event.statusCode ?? null, event.analysisMode ?? null, event.value ?? null, event.currency ?? null, event.createdAt)
        .run();
      return;
    }

    memoryStore.analyticsEvents.push(event);
  } catch {
    // Analytics must never make a report request fail.
  }
}
