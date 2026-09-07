import type { Metadata } from "next";
import { SeoIntentPage } from "@/components/SeoIntentPage";

export const metadata: Metadata = {
  title: "SaaS Homepage Audit: Positioning, Proof, and CTA",
  description: "Run a focused SaaS homepage audit for product clarity, customer proof, CTA friction, and the next page change.",
  alternates: { canonical: "/saas-homepage-audit" },
};

export default function SaasHomepageAuditPage() {
  return <SeoIntentPage config={{
    slug: "saas-homepage-audit",
    eyebrow: "SAAS HOMEPAGE AUDIT / PAGE EVIDENCE",
    title: "A SaaS homepage audit for the next",
    emphasis: "credible move.",
    description: "Run a focused SaaS homepage audit for product clarity, customer proof, CTA friction, and the next page change.",
    intro: "A SaaS homepage has to sell a decision before it sells a subscription. This audit checks the order of that decision: category, customer, outcome, proof, and action.",
    checks: [
      { label: "01 / POSITIONING", title: "Can a buyer place the product?", copy: "The audit reads the hero, navigation, and first product explanation together. It looks for a clear category and audience rather than isolated feature language." },
      { label: "02 / PROOF PATH", title: "Does the page answer the buyer's risk?", copy: "The review maps customer logos, case studies, product examples, and security or process details to the doubts they are meant to reduce." },
      { label: "03 / CTA FIT", title: "Does the action match buying readiness?", copy: "The audit checks whether the primary CTA is visible, specific, and supported by enough context for a visitor to choose it without guessing what happens next." },
    ],
    faq: [
      { question: "What does a SaaS homepage audit include?", answer: "It covers category clarity, target customer, product outcome, proof, conversion path, page copy, and the next recommended change. It reviews the public page rather than private product data." },
      { question: "Is this only for B2B SaaS?", answer: "No. The framework is most useful for software with a considered decision, including B2B, prosumer, and developer products. The page still needs a public homepage and a clear action." },
      { question: "Should I audit the homepage or the pricing page first?", answer: "Start with the page carrying the first decision. For most SaaS products that is the homepage, unless paid traffic lands directly on a dedicated campaign page." },
      { question: "What can I fix after the audit?", answer: "Typical first changes include making the audience explicit, replacing an abstract hero claim, moving proof next to the decision, or reducing competing CTA choices." },
    ],
    relatedLinks: [
      { label: "METHOD / WEBSITE REVIEW", title: "Use the evidence boundary", copy: "See what a public-page review can tell you and what still requires analytics or experiments.", href: "/website-review", linkLabel: "Read the website review" },
      { label: "PUBLIC CASE / NOTION", title: "See a suite create an entry point", copy: "The Notion teardown looks at how a broad workspace promise can route visitors through concrete jobs.", href: "/teardowns/notion", linkLabel: "Read the Notion teardown" },
      { label: "NEXT STEP / FREE REVIEW", title: "Audit your SaaS homepage", copy: "Submit the URL and context for three findings connected to visible page evidence.", href: "/#analyze", linkLabel: "Start a free review" },
    ],
  }} />;
}
