import type { Metadata } from "next";
import { SeoIntentPage } from "@/components/SeoIntentPage";

export const metadata: Metadata = {
  title: "AI Website Audit",
  description: "An AI-assisted website audit that connects page evidence to a practical first change.",
  alternates: { canonical: "/ai-website-audit" },
};

export default function AiWebsiteAuditPage() {
  return <SeoIntentPage config={{
    slug: "ai-website-audit",
    eyebrow: "AI WEBSITE AUDIT / PAGE EVIDENCE",
    title: "An AI website audit tied to page",
    emphasis: "evidence.",
    description: "An AI-assisted website audit that connects page evidence to a practical first change.",
    intro: "Use an AI-assisted review to see whether a first-time visitor can understand the offer, trust the page, and find a useful next step.",
    checks: [
      { label: "01 / POSITIONING", title: "What does the page promise?", copy: "The audit identifies what the product appears to do, who it seems to serve, and where the value proposition remains too broad." },
      { label: "02 / PAGE EVIDENCE", title: "What can a visitor verify?", copy: "The review looks for concrete proof, customer context, outcomes, and other details that reduce uncertainty." },
      { label: "03 / FIRST CHANGE", title: "What should you fix first?", copy: "The output connects the observed problem to a practical rewrite or page-structure change instead of a generic checklist." },
    ],
    faq: [
      { question: "What does the AI website audit read?", answer: "It reads the public homepage HTML, metadata, page structure, copy, calls to action, and available page signals. A screenshot can add visual context when the production capture is available." },
      { question: "Does it predict my conversion rate?", answer: "No. SiteLens provides a qualitative review based on public page evidence. Private analytics and experiments are still needed to measure conversion." },
      { question: "Who is this for?", answer: "It is designed for founders, indie hackers, small teams, designers, and marketers who need a fast second opinion before changing a homepage." },
    ],
  }} />;
}
