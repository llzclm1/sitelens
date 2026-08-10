import type { FullReport, PublicReport } from "@/lib/types";

type UpgradeRequest = { reportId: string; email: string; createdAt: string };
type SiteLensStore = { reports: Map<string, FullReport>; upgrades: UpgradeRequest[] };
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
type ExtendedSiteLensStore = SiteLensStore & { paymentIntents: Map<string, PaymentIntent> };

const globalStore = globalThis as typeof globalThis & { __sitelensStore?: ExtendedSiteLensStore };
const store: ExtendedSiteLensStore = globalStore.__sitelensStore ?? { reports: new Map(), upgrades: [], paymentIntents: new Map() };
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

export function savePaymentIntent(intent: PaymentIntent) {
  store.paymentIntents.set(intent.id, intent);
}

export function updatePaymentIntentSession(id: string, providerSessionId: string) {
  const intent = store.paymentIntents.get(id);
  if (intent) store.paymentIntents.set(id, { ...intent, providerSessionId });
}

export function markPaymentIntentFailed(id: string, failureReason: string) {
  const intent = store.paymentIntents.get(id);
  if (intent) store.paymentIntents.set(id, { ...intent, status: "failed", failureReason });
}

export function markPaymentIntentPaid(input: { intentId: string; eventId: string; orderId: string }) {
  const intent = store.paymentIntents.get(input.intentId);
  if (!intent) return undefined;
  const paid = { ...intent, status: "paid" as const, providerEventId: input.eventId, providerOrderId: input.orderId, paidAt: new Date().toISOString() };
  store.paymentIntents.set(input.intentId, paid);
  return paid;
}

export function getPaymentIntent(id: string) {
  return store.paymentIntents.get(id);
}
