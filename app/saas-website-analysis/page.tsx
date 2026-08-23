import type { Metadata } from "next";
import { SeoIntentPage } from "@/components/SeoIntentPage";

export const metadata: Metadata = {
  title: "SaaS Website Analysis",
  description: "A SaaS website analysis for clearer positioning, product understanding, proof, and conversion paths.",
  alternates: { canonical: "/saas-website-analysis" },
};

export default function SaasWebsiteAnalysisPage() {
  return <SeoIntentPage config={{
    slug: "saas-website-analysis",
    eyebrow: "SAAS WEBSITE ANALYSIS / PRODUCT CLARITY",
    title: "SaaS website analysis for a clearer",
    emphasis: "first impression.",
    description: "A SaaS website analysis for clearer positioning, product understanding, proof, and conversion paths.",
    intro: "SaaS visitors need to understand the category, the problem, and the outcome before they are ready to start a trial. SiteLens checks those decisions in sequence.",
    checks: [
      { label: "01 / CATEGORY", title: "What kind of product is this?", copy: "The review tests whether a visitor can place the product quickly instead of relying on a broad claim or an internal product phrase." },
      { label: "02 / OUTCOME", title: "What changes after using it?", copy: "The analysis looks for a concrete result, workflow, or before-and-after moment that makes the product easier to evaluate." },
      { label: "03 / PROOF", title: "What supports the claim?", copy: "The report identifies visible customer evidence, numbers, examples, and trust elements that support the SaaS promise." },
    ],
    faq: [
      { question: "Does this require access to my product analytics?", answer: "No. SiteLens reads the public website. It cannot see private analytics, trial activation, retention, or experiment results." },
      { question: "Can it compare my SaaS site with competitors?", answer: "The current free review focuses on your submitted page. A future competitive report can add a separate comparison workflow when enough evidence is available." },
      { question: "What should I send with the URL?", answer: "Send the public homepage URL, one sentence describing what the SaaS product does, and the audience you want the page to reach." },
    ],
  }} />;
}
