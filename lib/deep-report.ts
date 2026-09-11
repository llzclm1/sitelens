import crypto from "node:crypto";
import type { DeepReport, FullReport } from "@/lib/types";

export function buildDeepReport(report: FullReport, paymentIntentId: string): DeepReport {
  const primary = report.issues[0];
  const headlineBefore = report.snapshot.h1[0] || report.snapshot.title || "No clear homepage promise found";
  const headlineAfter = primary?.rewrite?.after || `${report.product} helps ${report.audience} reach a clear result faster.`;
  const ctaBefore = report.snapshot.ctaExamples[0] || "No primary signup action found";
  const ctaAfter = "Start free. See your first result today.";
  const proofEvidence = report.snapshot.proofSignals.length > 0
    ? `Detected proof language: ${report.snapshot.proofSignals.slice(0, 3).join(", ")}.`
    : "No customer, case study, testimonial, review, security, or trust language was detected.";
  const ctaEvidence = report.snapshot.ctaExamples.length > 0
    ? `Detected CTA language: ${report.snapshot.ctaExamples.slice(0, 3).map((cta) => `“${cta}”`).join(", ")}.`
    : "No signup, trial, demo, contact, or purchase CTA text was detected.";

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
    homepageBlueprint: [
      {
        order: 1,
        section: "Hero",
        purpose: "Make the right visitor understand the offer immediately.",
        guidance: `Lead with the outcome ${report.audience} can get from ${report.product}, followed by one primary CTA.`,
        evidence: `Current first read: “${headlineBefore.slice(0, 220)}”.`,
      },
      {
        order: 2,
        section: "Problem",
        purpose: "Show that the page understands the visitor's costly job.",
        guidance: `Name the specific problem ${report.audience} is trying to solve before explaining the feature set.`,
        evidence: `Analysis context identifies the target audience as ${report.audience.slice(0, 220)}.`,
      },
      {
        order: 3,
        section: "Solution",
        purpose: "Make the path from problem to outcome easy to picture.",
        guidance: "Explain the product in three concrete steps: input, important action, and useful result.",
        evidence: `The page contains ${report.snapshot.textLength} characters of visible text and ${report.snapshot.headings.length} H1–H3 headings.`,
      },
      {
        order: 4,
        section: "Proof",
        purpose: "Reduce the risk of believing an unfamiliar promise.",
        guidance: "Place the strongest specific customer, result, security, or review proof directly below the first explanation.",
        evidence: proofEvidence,
      },
      {
        order: 5,
        section: "CTA",
        purpose: "Give the visitor one obvious next decision.",
        guidance: "Repeat one action-led CTA after the proof and state what happens immediately after the click.",
        evidence: ctaEvidence,
      },
    ],
    actionPlan: report.issues.slice(0, 3).map((issue, index) => ({
      week: index + 1,
      focus: issue.category,
      action: issue.firstFix.slice(0, 500),
      evidence: issue.evidence.slice(0, 500),
    })),
  };
}
