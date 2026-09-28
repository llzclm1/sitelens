import type { Metadata } from "next";
import { SeoIntentPage } from "@/components/SeoIntentPage";

export const metadata: Metadata = {
  title: "AI Website Audit Alternative: Find Your First Conversion Fix",
  description: "Looking for an AI website audit? SiteLens is a free, rule-based alternative that connects homepage evidence to one practical conversion fix.",
  alternates: { canonical: "/ai-website-audit" },
};

export default function AiWebsiteAuditPage() {
  return <SeoIntentPage config={{
    slug: "ai-website-audit",
    dateModified: "2026-09-28",
    eyebrow: "AI AUDIT ALTERNATIVE / PAGE EVIDENCE",
    title: "An evidence-based alternative to an AI website audit",
    emphasis: "homepage fix.",
    description: "Looking for an AI website audit? SiteLens is a free, rule-based alternative that connects homepage evidence to one practical conversion fix.",
    intro: "If you are comparing AI website audit tools, SiteLens offers a transparent rule-based alternative. It reads your public homepage as a first-time visitor would, points to the visible evidence behind each finding, and gives you one practical change to make next.",
    answer: "An AI website audit can summarize a page, but a useful review should show why a visible problem may slow a visitor down. SiteLens uses consistent HTML, metadata, copy, CTA, trust, and security rules, so each finding can be checked against the page. It complements technical SEO checks and does not replace analytics or experiments.",
    checks: [
      { label: "01 / POSITIONING", title: "What does the page promise?", copy: "The audit identifies what the product appears to do, who it seems to serve, and where the value proposition remains too broad." },
      { label: "02 / PAGE EVIDENCE", title: "What can a visitor verify?", copy: "The review looks for concrete proof, customer context, outcomes, and other details that reduce uncertainty." },
      { label: "03 / FIRST CHANGE", title: "What should you fix first?", copy: "The output connects the observed problem to a practical rewrite or page-structure change instead of a generic checklist." },
    ],
    faq: [
      { question: "Is SiteLens an AI website audit tool?", answer: "No. SiteLens is a free, rule-based alternative for founders who want transparent page evidence and a practical first fix without treating generated text as measured conversion data." },
      { question: "What does the website audit read?", answer: "It reads the public homepage HTML, metadata, page structure, copy, calls to action, and available page signals. The same observable rules are applied consistently and the evidence is shown in the report." },
      { question: "Does it predict my conversion rate?", answer: "No. SiteLens provides a qualitative review based on public page evidence. Private analytics and experiments are still needed to measure conversion." },
      { question: "How is this different from an SEO checker?", answer: "An SEO checker focuses on technical and search signals. SiteLens also asks whether a visitor understands the offer, trusts the page, and knows what to do next." },
      { question: "Who is this for?", answer: "It is designed for founders, indie hackers, small teams, designers, and marketers who need a fast second opinion before changing a homepage." },
    ],
    relatedLinks: [
      { label: "METHOD / WEBSITE REVIEW", title: "See how the rules work", copy: "Read the five questions behind each finding and the limits of a public-page review.", href: "/website-review", linkLabel: "Read the website review" },
      { label: "PUBLIC CASE / STRIPE", title: "Read a complete example", copy: "See how a visible headline, proof point, and CTA become a specific recommendation in a public teardown.", href: "/teardowns/stripe", linkLabel: "Read the Stripe teardown" },
      { label: "ACCESS / PUBLIC BETA", title: "See what every review includes", copy: "The score, evidence, priority, and first fixes are available without an account or payment.", href: "/pricing", linkLabel: "See free access" },
    ],
  }} />;
}
