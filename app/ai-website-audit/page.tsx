import type { Metadata } from "next";
import { SeoIntentPage } from "@/components/SeoIntentPage";

export const metadata: Metadata = {
  title: "AI Website Audit: Find the First Homepage Fix",
  description: "Use an AI-assisted website audit to find positioning, trust, and CTA problems on your homepage, with page-specific findings and a practical next move.",
  alternates: { canonical: "/ai-website-audit" },
};

export default function AiWebsiteAuditPage() {
  return <SeoIntentPage config={{
    slug: "ai-website-audit",
    eyebrow: "AI WEBSITE AUDIT / PAGE EVIDENCE",
    title: "An AI website audit for the first",
    emphasis: "homepage fix.",
    description: "Use an AI-assisted website audit to find positioning, trust, and CTA problems on your homepage, with page-specific findings and a practical next move.",
    intro: "Submit a public homepage and get a focused read on its positioning, proof, and next step. SiteLens shows the page evidence behind each finding.",
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
    relatedLinks: [
      { label: "METHOD / WEBSITE REVIEW", title: "See how the review works", copy: "Read the five questions behind each finding and the limits of a public-page review.", href: "/website-review", linkLabel: "Read the website review" },
      { label: "PUBLIC CASES / TEARDOWNS", title: "Read the method on real pages", copy: "See how SiteLens connects a visible page detail to a recommendation in the public case library.", href: "/teardowns", linkLabel: "Browse public teardowns" },
      { label: "PRICING / DEEP REPORT", title: "See what the paid report adds", copy: "Review the one-time Deep Growth Report before you submit a site.", href: "/pricing", linkLabel: "View pricing" },
    ],
  }} />;
}
