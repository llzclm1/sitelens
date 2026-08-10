export type Severity = "high" | "medium" | "low";
export type Confidence = "high" | "medium" | "low";

export type WebsiteSnapshot = {
  title: string;
  description: string;
  h1: string[];
  headings: string[];
  ctaCount: number;
  ctaExamples: string[];
  proofSignals: string[];
  imageCount: number;
  missingAltCount: number;
  internalLinkCount: number;
  textLength: number;
};

export type ReportIssue = {
  id: string;
  category: string;
  title: string;
  severity: Severity;
  evidence: string;
  whyItMatters: string;
  firstFix: string;
  rewrite?: { before: string; after: string };
  confidence: Confidence;
};

export type FullReport = {
  id: string;
  url: string;
  host: string;
  createdAt: string;
  score: number;
  mode: "heuristic" | "ai";
  summary: string;
  product: string;
  audience: string;
  snapshot: WebsiteSnapshot;
  issues: ReportIssue[];
};

export type PublicReport = Omit<FullReport, "product" | "audience" | "issues"> & {
  issues: Array<Pick<ReportIssue, "id" | "category" | "title" | "severity" | "evidence" | "confidence">>;
};
