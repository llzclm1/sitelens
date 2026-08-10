import type { FullReport, ReportIssue } from "@/lib/types";

type QwenContent = string | Array<{
  type: "text" | "image_url";
  text?: string;
  image_url?: { url: string; max_pixels?: number };
}>;

type QwenResponse = {
  choices?: Array<{ message?: { content?: unknown } }>;
};

function parseJson(content: unknown) {
  if (typeof content !== "string") return undefined;
  try {
    return JSON.parse(content.replace(/^```json\s*|\s*```$/g, "")) as { issues?: unknown };
  } catch {
    return undefined;
  }
}

function refineIssues(report: FullReport, candidate: unknown) {
  if (!Array.isArray(candidate) || candidate.length !== 3) return report;

  const refinedIssues = report.issues.map((issue, index) => {
    const item = candidate[index];
    if (!item || typeof item !== "object") return issue;
    const value = item as Partial<ReportIssue> & { rewrite?: { before?: unknown; after?: unknown } };
    if (typeof value.title !== "string" || typeof value.whyItMatters !== "string" || typeof value.firstFix !== "string") return issue;

    const rewrite = value.rewrite;
    return {
      ...issue,
      title: value.title.slice(0, 180),
      whyItMatters: value.whyItMatters.slice(0, 500),
      firstFix: value.firstFix.slice(0, 500),
      rewrite: rewrite && typeof rewrite.before === "string" && typeof rewrite.after === "string"
        ? { before: rewrite.before.slice(0, 200), after: rewrite.after.slice(0, 300) }
        : issue.rewrite,
    };
  });

  return { ...report, mode: "ai" as const, issues: refinedIssues };
}

export async function refineWithQwen(report: FullReport, screenshot?: string) {
  const apiKey = process.env.QWEN_API_KEY?.trim();
  if (!apiKey) return report;

  const baseUrl = (process.env.QWEN_BASE_URL || "https://dashscope.aliyuncs.com/compatible-mode/v1").replace(/\/$/, "");
  const model = process.env.QWEN_MODEL || "qwen3.6-flash";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);
  const evidence = JSON.stringify({
    product: report.product,
    audience: report.audience,
    snapshot: report.snapshot,
    currentIssues: report.issues.map(({ id, category, title, evidence: issueEvidence }) => ({ id, category, title, evidence: issueEvidence })),
  });
  const text = `You are a conversion consultant reviewing a public website homepage. Return JSON only with an issues array of exactly three objects. Preserve the issue order and IDs conceptually. Use only visible evidence from the supplied screenshot and HTML snapshot. Do not invent analytics, customer results, or conversion lifts. For each issue, provide title, whyItMatters, firstFix, and an optional rewrite object with before and after.\n\nWebsite evidence:\n${evidence}`;
  const content: QwenContent = screenshot
    ? [
        { type: "image_url", image_url: { url: screenshot, max_pixels: 8_388_608 } },
        { type: "text", text },
      ]
    : text;

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      signal: controller.signal,
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        max_tokens: 1_800,
        response_format: { type: "json_object" },
        enable_thinking: false,
        messages: [
          { role: "system", content: "You are a careful website growth consultant. Return valid JSON only." },
          { role: "user", content },
        ],
      }),
    });
    if (!response.ok) return report;

    const body = await response.json() as QwenResponse;
    const parsed = parseJson(body.choices?.[0]?.message?.content);
    return refineIssues(report, parsed?.issues);
  } catch {
    return report;
  } finally {
    clearTimeout(timeout);
  }
}
