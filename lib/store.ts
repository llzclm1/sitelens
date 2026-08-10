import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { FullReport, PublicReport } from "@/lib/types";

type UpgradeRequest = { reportId: string; email: string; createdAt: string };
export type PaymentIntent = {
  id: string;
  reportId: string;
  email: string;
  status: "pending" | "paid" | "failed";
  createdAt: string;
  providerSessionId?: string;
  providerOrderId?: string;
  providerEventId?: string;
  paidAt?: string;
  failureReason?: string;
};

type MemoryStore = {
  reports: Map<string, FullReport>;
  upgrades: UpgradeRequest[];
  paymentIntents: Map<string, PaymentIntent>;
};

type ReportRow = { payload: string };
type PaymentIntentRow = {
  id: string;
  report_id: string;
  email: string;
  status: PaymentIntent["status"];
  created_at: string;
  provider_session_id: string | null;
  provider_order_id: string | null;
  provider_event_id: string | null;
  paid_at: string | null;
  failure_reason: string | null;
};

const globalStore = globalThis as typeof globalThis & { __sitelensStore?: MemoryStore };
const memoryStore: MemoryStore = globalStore.__sitelensStore ?? { reports: new Map(), upgrades: [], paymentIntents: new Map() };
globalStore.__sitelensStore = memoryStore;

async function getDatabase(): Promise<D1Database | undefined> {
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

function fromPaymentIntentRow(row: PaymentIntentRow): PaymentIntent {
  return {
    id: row.id,
    reportId: row.report_id,
    email: row.email,
    status: row.status,
    createdAt: row.created_at,
    ...(row.provider_session_id ? { providerSessionId: row.provider_session_id } : {}),
    ...(row.provider_order_id ? { providerOrderId: row.provider_order_id } : {}),
    ...(row.provider_event_id ? { providerEventId: row.provider_event_id } : {}),
    ...(row.paid_at ? { paidAt: row.paid_at } : {}),
    ...(row.failure_reason ? { failureReason: row.failure_reason } : {}),
  };
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

export async function saveUpgrade(request: UpgradeRequest) {
  const database = await getDatabase();
  if (database) {
    await database
      .prepare("INSERT INTO upgrades (report_id, email, created_at) VALUES (?, ?, ?)")
      .bind(request.reportId, request.email, request.createdAt)
      .run();
    return;
  }

  memoryStore.upgrades.push(request);
}

export async function savePaymentIntent(intent: PaymentIntent) {
  const database = await getDatabase();
  if (database) {
    await database
      .prepare(
        "INSERT OR REPLACE INTO payment_intents (id, report_id, email, status, created_at, provider_session_id, provider_order_id, provider_event_id, paid_at, failure_reason) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      )
      .bind(intent.id, intent.reportId, intent.email, intent.status, intent.createdAt, intent.providerSessionId ?? null, intent.providerOrderId ?? null, intent.providerEventId ?? null, intent.paidAt ?? null, intent.failureReason ?? null)
      .run();
    return;
  }

  memoryStore.paymentIntents.set(intent.id, intent);
}

export async function updatePaymentIntentSession(id: string, providerSessionId: string) {
  const database = await getDatabase();
  if (database) {
    await database.prepare("UPDATE payment_intents SET provider_session_id = ? WHERE id = ?").bind(providerSessionId, id).run();
    return;
  }

  const intent = memoryStore.paymentIntents.get(id);
  if (intent) memoryStore.paymentIntents.set(id, { ...intent, providerSessionId });
}

export async function markPaymentIntentFailed(id: string, failureReason: string) {
  const database = await getDatabase();
  if (database) {
    await database.prepare("UPDATE payment_intents SET status = 'failed', failure_reason = ? WHERE id = ?").bind(failureReason, id).run();
    return;
  }

  const intent = memoryStore.paymentIntents.get(id);
  if (intent) memoryStore.paymentIntents.set(id, { ...intent, status: "failed", failureReason });
}

export async function markPaymentIntentPaid(input: { intentId: string; eventId: string; orderId: string }) {
  const existing = await getPaymentIntent(input.intentId);
  if (!existing) return undefined;

  const paidAt = new Date().toISOString();
  const paid = { ...existing, status: "paid" as const, providerEventId: input.eventId, providerOrderId: input.orderId, paidAt };
  const database = await getDatabase();
  if (database) {
    await database
      .prepare("UPDATE payment_intents SET status = 'paid', provider_event_id = ?, provider_order_id = ?, paid_at = ? WHERE id = ?")
      .bind(input.eventId, input.orderId, paidAt, input.intentId)
      .run();
    return paid;
  }

  memoryStore.paymentIntents.set(input.intentId, paid);
  return paid;
}

export async function getPaymentIntent(id: string) {
  const database = await getDatabase();
  if (database) {
    const row = await database.prepare("SELECT * FROM payment_intents WHERE id = ?").bind(id).first<PaymentIntentRow>();
    return row ? fromPaymentIntentRow(row) : undefined;
  }

  return memoryStore.paymentIntents.get(id);
}
