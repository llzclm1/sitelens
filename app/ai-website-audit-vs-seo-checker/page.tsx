import type { Metadata } from "next";
import { SeoIntentPage } from "@/components/SeoIntentPage";

export const metadata: Metadata = {
  title: "AI Website Audit vs SEO Checker: What Each One Finds",
  description: "Compare an AI website audit with an SEO checker and see when you need technical checks, visitor clarity, or both.",
  alternates: { canonical: "/ai-website-audit-vs-seo-checker" },
};

export default function AiWebsiteAuditVsSeoCheckerPage() {
  return <SeoIntentPage config={{
    slug: "ai-website-audit-vs-seo-checker",
    eyebrow: "AI WEBSITE AUDIT / SEO CHECKER",
    title: "AI website audit vs SEO checker: two different",
    emphasis: "questions.",
    description: "Compare an AI website audit with an SEO checker and see when you need technical checks, visitor clarity, or both.",
    intro: "An SEO checker asks whether search engines can crawl and interpret a page. A growth-oriented website audit asks whether a person can understand the offer, trust it, and take the next step.",
    checks: [
      { label: "01 / SEO CHECKER", title: "Find technical and search signals.", copy: "Title tags, descriptions, headings, links, schema, indexability, and performance are useful checks. They can explain discoverability problems, but not every conversion problem." },
      { label: "02 / AI AUDIT", title: "Find decision friction in the page.", copy: "An AI-assisted review reads the offer, audience, proof, CTA, and page sequence. It should point to the visible wording or structure behind each recommendation." },
      { label: "03 / COMBINATION", title: "Use both when traffic is not enough.", copy: "If a page is hard to find, fix technical discovery. If visitors arrive but do not understand or act, fix the decision path. The signals answer different questions." },
    ],
    faq: [
      { question: "Is an AI website audit a replacement for an SEO checker?", answer: "No. They overlap on page content but serve different purposes. A technical SEO check helps search visibility; a growth review examines visitor understanding, trust, and action." },
      { question: "Can an SEO checker tell me why visitors do not buy?", answer: "Usually not by itself. It can identify missing metadata or technical issues, but purchase friction often lives in positioning, proof, offer clarity, and the CTA path." },
      { question: "Does SiteLens check SEO basics?", answer: "Yes. The analysis can read metadata, headings, links, schema signals, and page structure, then connect those observations to the wider visitor decision." },
      { question: "Which audit should I run first?", answer: "Run the audit closest to the problem you can observe. Use Search Console and an SEO checker for discovery; use a page review when the page receives attention but the next action is unclear." },
    ],
    relatedLinks: [
      { label: "METHOD / AI AUDIT", title: "See the page-evidence method", copy: "SiteLens keeps the AI in the analysis layer and shows the evidence behind the business recommendation.", href: "/ai-website-audit", linkLabel: "Read the AI audit guide" },
      { label: "PUBLIC CASE / WEBFLOW", title: "See SEO and conversion meet", copy: "The Webflow teardown shows how a homepage can speak to publishing, traffic, AI visibility, and conversion without making those jobs identical.", href: "/teardowns/webflow", linkLabel: "Read the Webflow teardown" },
      { label: "NEXT STEP / FREE REVIEW", title: "Check the page visitors see", copy: "Get a qualitative review of the public homepage before buying more traffic.", href: "/#analyze", linkLabel: "Review a site" },
    ],
  }} />;
}
