import type { Metadata } from "next";
import { SeoIntentPage } from "@/components/SeoIntentPage";

export const metadata: Metadata = {
  title: "Website Audit: Find Your First Conversion Fix",
  description: "Get a free, page-specific rule-based website audit for homepage positioning, trust, and CTA problems, with evidence and one practical next move.",
  alternates: { canonical: "/ai-website-audit" },
};

export default function AiWebsiteAuditPage() {
  return <SeoIntentPage config={{
    slug: "ai-website-audit",
    eyebrow: "WEBSITE AUDIT / PAGE EVIDENCE",
    title: "A rule-based website audit for the first",
    emphasis: "homepage fix.",
    description: "Get a free, page-specific rule-based website audit for homepage positioning, trust, and CTA problems, with evidence and one practical next move.",
    intro: "A rule-based website audit reads your public homepage as a first-time visitor would. SiteLens points to the visible evidence behind each finding, then gives you one practical change to make next.",
    answer: "A useful website audit connects a visible page problem to the visitor decision it may slow down. SiteLens applies the same observable HTML, metadata, copy, CTA, trust, and security rules to every page. It complements technical SEO checks and does not replace analytics or experiments.",
    checks: [
      { label: "01 / POSITIONING", title: "What does the page promise?", copy: "The audit identifies what the product appears to do, who it seems to serve, and where the value proposition remains too broad." },
      { label: "02 / PAGE EVIDENCE", title: "What can a visitor verify?", copy: "The review looks for concrete proof, customer context, outcomes, and other details that reduce uncertainty." },
      { label: "03 / FIRST CHANGE", title: "What should you fix first?", copy: "The output connects the observed problem to a practical rewrite or page-structure change instead of a generic checklist." },
    ],
    faq: [
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
