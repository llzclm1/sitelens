import type { FullReport, PublicReport } from "@/lib/types";

type UpgradeRequest = { reportId: string; email: string; createdAt: string };
type SiteLensStore = { reports: Map<string, FullReport>; upgrades: UpgradeRequest[] };

const globalStore = globalThis as typeof globalThis & { __sitelensStore?: SiteLensStore };
const store: SiteLensStore = globalStore.__sitelensStore ?? { reports: new Map(), upgrades: [] };
globalStore.__sitelensStore = store;

export function saveReport(report: FullReport) {
  store.reports.set(report.id, report);
}

export function getReport(id: string) {
  return store.reports.get(id);
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
    issues: report.issues.map(({ id, category, title, severity, evidence, confidence }) => ({ id, category, title, severity, evidence, confidence })),
  };
}

export function getPublicReport(id: string) {
  const report = getReport(id);
  return report ? toPublicReport(report) : undefined;
}

export function saveUpgrade(request: UpgradeRequest) {
  store.upgrades.push(request);
}
