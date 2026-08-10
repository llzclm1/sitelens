import crypto from "node:crypto";
import type { FullReport, ReportIssue, WebsiteSnapshot } from "@/lib/types";

function decodeEntities(value: string) {
  return value.replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&quot;/gi, '"').replace(/&#39;/gi, "'").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">");
}

function cleanText(value: string) {
  return decodeEntities(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function firstMatch(html: string, expression: RegExp) {
  return cleanText(html.match(expression)?.[1] ?? "").slice(0, 500);
}

function allMatches(html: string, expression: RegExp) {
  return [...html.matchAll(expression)].map((match) => cleanText(match[1] ?? "").slice(0, 500)).filter(Boolean);
}

function collectSnapshot(html: string): WebsiteSnapshot {
  const title = firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = firstMatch(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i) || firstMatch(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i);
  const h1 = allMatches(html, /<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  const headings = allMatches(html, /<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi);
  const buttonText = allMatches(html, /<button[^>]*>([\s\S]*?)<\/button>/gi);
  const linkText = allMatches(html, /<a[^>]*>([\s\S]*?)<\/a>/gi);
  const ctaExamples = [...buttonText, ...linkText].filter((text) => /get started|start free|sign up|signup|try|book|demo|buy|subscribe|contact|request|join|download|注册|开始|试用|预约|购买/i.test(text)).slice(0, 6);
  const bodyText = cleanText(html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, ""));
  const proofSignals = ["customer", "customers", "client", "trusted", "case stud", "testimonial", "review", "used by", "security", "guarantee", "客户", "案例", "评价", "信任"].filter((signal) => bodyText.toLowerCase().includes(signal));
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  const missingAltCount = images.filter((image) => !/\balt\s*=\s*["'][^"']*["']/i.test(image)).length;
  const internalLinkCount = [...html.matchAll(/<a\b[^>]+href=["']([^"']+)["'][^>]*>/gi)].filter((match) => !/^(https?:)?\/\//i.test(match[1])).length;

  return {
    title,
    description,
    h1,
    headings,
    ctaCount: ctaExamples.length,
    ctaExamples,
    proofSignals,
    imageCount: images.length,
    missingAltCount,
    internalLinkCount,
    textLength: bodyText.length,
  };
}

function buildIssues(snapshot: WebsiteSnapshot, product: string, audience: string) {
  const issues: ReportIssue[] = [];

  if (snapshot.h1.length === 0) {
    issues.push({
      id: "positioning-h1",
      category: "Positioning",
      title: "There is no clear H1 stating the homepage promise.",
      severity: "high",
      evidence: "No <h1> heading was found in the homepage HTML.",
      whyItMatters: "A first-time visitor has to assemble the product promise from smaller page fragments before deciding whether it is relevant.",
      firstFix: `Write one outcome-led H1 for ${audience}, then place it above the first signup action.`,
      rewrite: { before: snapshot.title || "Your current first impression", after: `${product} for ${audience}` },
      confidence: "high",
    });
  } else if (snapshot.h1.some((heading) => heading.split(/\s+/).length < 5 || /future|next generation|intelligent|powerful|platform|solution/i.test(heading))) {
    issues.push({
      id: "positioning-specificity",
      category: "Positioning",
      title: "The first promise is too abstract to confirm relevance quickly.",
      severity: "high",
      evidence: `The H1 reads “${snapshot.h1[0]}”. It names a category or ambition more than a concrete outcome.`,
      whyItMatters: "Visitors who cannot map the first sentence to their own job will delay the decision or leave before reading the proof.",
      firstFix: `Replace the abstract phrase with the outcome ${audience} can get from ${product}.`,
      rewrite: { before: snapshot.h1[0], after: `${product} helps ${audience} get to the useful result faster.` },
      confidence: "medium",
    });
  } else {
    issues.push({
      id: "positioning-proof",
      category: "Positioning",
      title: "The page has a stated promise, but its audience fit is not yet obvious.",
      severity: "medium",
      evidence: `The H1 is present (“${snapshot.h1[0]}”), but the page does not explicitly name ${audience} in the first read.`,
      whyItMatters: "A clear audience cue helps the right visitor self-select instead of treating the product as a generic category tool.",
      firstFix: `Add a short audience qualifier beside the H1 or supporting sentence: “Built for ${audience}.”`,
      confidence: "medium",
    });
  }

  if (snapshot.ctaCount === 0) {
    issues.push({
      id: "conversion-no-cta",
      category: "Conversion",
      title: "The homepage does not expose a clear signup action.",
      severity: "high",
      evidence: "No signup, trial, demo, contact, or purchase CTA text was found in buttons or links.",
      whyItMatters: "Even a convinced visitor has no obvious next step, so intent cannot turn into a signup.",
      firstFix: "Add one primary “Start free” or “Create your account” action in the header and directly after the hero.",
      rewrite: { before: "No primary signup action found", after: "Start free — see your first result today" },
      confidence: "high",
    });
  } else if (snapshot.ctaExamples.every((cta) => /learn more|discover|see more|click here/i.test(cta))) {
    issues.push({
      id: "conversion-vague-cta",
      category: "Conversion",
      title: "The available CTA language describes browsing, not starting.",
      severity: "high",
      evidence: `CTA examples found: ${snapshot.ctaExamples.map((cta) => `“${cta}”`).join(", ")}.`,
      whyItMatters: "Vague actions add a small decision at the exact moment the visitor should understand how to begin.",
      firstFix: "Rename the primary action around the user’s next concrete step, such as “Start free” or “Book a demo”.",
      rewrite: { before: snapshot.ctaExamples[0], after: "Start free" },
      confidence: "high",
    });
  } else {
    issues.push({
      id: "conversion-path",
      category: "Conversion",
      title: "The signup path exists; make sure it is the dominant first action.",
      severity: "medium",
      evidence: `Found ${snapshot.ctaCount} relevant CTA signal${snapshot.ctaCount === 1 ? "" : "s"}: ${snapshot.ctaExamples.map((cta) => `“${cta}”`).join(", ")}.`,
      whyItMatters: "Multiple competing actions can spread attention before a visitor understands the core offer.",
      firstFix: "Keep one primary signup CTA in the hero and demote secondary reading links until after the first proof point.",
      confidence: "medium",
    });
  }

  if (snapshot.proofSignals.length === 0) {
    issues.push({
      id: "trust-proof",
      category: "Trust",
      title: "The first page read has no detectable proof signal.",
      severity: "medium",
      evidence: "No customer, case study, testimonial, review, security, or trust language was found in visible page text.",
      whyItMatters: "A new visitor must take the product promise on faith, which is especially costly before a signup.",
      firstFix: "Place one specific proof block near the hero: customer logo, quantified result, or a short customer quote.",
      confidence: "medium",
    });
  } else {
    issues.push({
      id: "trust-placement",
      category: "Trust",
      title: "Proof language exists, but its decision proximity needs checking.",
      severity: "low",
      evidence: `Detected proof signals in page text: ${snapshot.proofSignals.join(", ")}.`,
      whyItMatters: "Proof helps most when it answers hesitation before the visitor reaches the signup decision, not only in a distant section.",
      firstFix: "Move the strongest proof directly below the hero CTA and make the outcome or customer specific.",
      confidence: "low",
    });
  }

  if (!snapshot.description || snapshot.h1.length !== 1 || snapshot.missingAltCount > 0) {
    issues.push({
      id: "seo-basics",
      category: "SEO basics",
      title: "The page has a small technical clarity gap worth cleaning up.",
      severity: "low",
      evidence: `${snapshot.description ? "Meta description found" : "No meta description found"}; ${snapshot.h1.length} H1; ${snapshot.missingAltCount} image${snapshot.missingAltCount === 1 ? "" : "s"} without a detectable alt attribute.`,
      whyItMatters: "Search engines and assistive technology get weaker context when the page structure does not reinforce the same promise.",
      firstFix: "Keep one descriptive H1, write a specific meta description, and add meaningful alt text where images convey information.",
      confidence: "high",
    });
  }

  return issues.sort((a, b) => ({ high: 0, medium: 1, low: 2 }[a.severity] - { high: 0, medium: 1, low: 2 }[b.severity])).slice(0, 3);
}

async function refineWithDeepSeek(report: FullReport) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) return report;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9_000);

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are a conversion consultant. Return JSON only with an issues array of exactly three objects. Use only the supplied evidence. Never claim a measured conversion lift." },
          { role: "user", content: JSON.stringify({ product: report.product, audience: report.audience, snapshot: report.snapshot, currentIssues: report.issues.map(({ id, category, title, evidence }) => ({ id, category, title, evidence })) }) },
        ],
      }),
    });
    if (!response.ok) return report;
    const body = await response.json() as { choices?: Array<{ message?: { content?: unknown } }> };
    const content = body.choices?.[0]?.message?.content;
    const parsed = JSON.parse(typeof content === "string" ? content.replace(/^```json\s*|\s*```$/g, "") : "{}");
    if (!Array.isArray(parsed.issues) || parsed.issues.length !== 3) return report;

    const refinedIssues = report.issues.map((issue, index) => {
      const candidate = parsed.issues[index];
      if (!candidate || typeof candidate.title !== "string" || typeof candidate.whyItMatters !== "string" || typeof candidate.firstFix !== "string") return issue;
      return { ...issue, title: candidate.title.slice(0, 180), whyItMatters: candidate.whyItMatters.slice(0, 500), firstFix: candidate.firstFix.slice(0, 500), rewrite: candidate.rewrite && typeof candidate.rewrite.before === "string" && typeof candidate.rewrite.after === "string" ? { before: candidate.rewrite.before.slice(0, 200), after: candidate.rewrite.after.slice(0, 300) } : issue.rewrite };
    });
    return { ...report, mode: "ai" as const, issues: refinedIssues };
  } catch {
    return report;
  } finally {
    clearTimeout(timeout);
  }
}

export async function analyzeWebsite({ url, html, product, audience }: { url: string; html: string; product: string; audience: string }): Promise<FullReport> {
  const snapshot = collectSnapshot(html);
  const issues = buildIssues(snapshot, product, audience);
  const score = Math.max(18, Math.min(96, 100 - issues.reduce((total, issue) => total + ({ high: 25, medium: 13, low: 6 }[issue.severity]), 0) - (snapshot.textLength < 160 ? 8 : 0)));
  const primary = issues[0];
  const report: FullReport = {
    id: crypto.randomUUID(),
    url,
    host: new URL(url).hostname.replace(/^www\./, ""),
    createdAt: new Date().toISOString(),
    score,
    mode: "heuristic",
    summary: primary ? `${primary.category}: ${primary.title} Start there before adding more sections or traffic.` : "The homepage has a clear first read. The next opportunity is to make the signup path even easier to choose.",
    product,
    audience,
    snapshot,
    issues,
  };
  return refineWithDeepSeek(report);
}
