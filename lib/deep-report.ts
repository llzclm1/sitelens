import crypto from "node:crypto";
import type { DeepReport, FullReport } from "@/lib/types";

export function buildDeepReport(report: FullReport, paymentIntentId: string): DeepReport {
  const primary = report.issues[0];
  const headlineBefore = report.snapshot.h1[0] || report.snapshot.title || "No clear homepage promise found";
  const headlineAfter = primary?.rewrite?.after || `${report.product} helps ${report.audience} reach a clear result faster.`;
  const ctaBefore = report.snapshot.ctaExamples[0] || "No primary signup action found";
  const ctaAfter = "Start free — see your first result today";

  return {
    id: crypto.randomUUID(),
    reportId: report.id,
    paymentIntentId,
    createdAt: new Date().toISOString(),
    executiveSummary: primary
      ? `The first change to make is ${primary.category.toLowerCase()}: ${primary.title}`
      : "The page has a clear first read. The next job is to make the preferred action easier to choose.",
    heroRewrite: { before: headlineBefore.slice(0, 300), after: headlineAfter.slice(0, 300) },
    ctaRewrite: { before: ctaBefore.slice(0, 220), after: ctaAfter },
    actionPlan: report.issues.slice(0, 3).map((issue, index) => ({
      week: index + 1,
      focus: issue.category,
      action: issue.firstFix.slice(0, 500),
      evidence: issue.evidence.slice(0, 500),
    })),
  };
}
