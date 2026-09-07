import type { Metadata } from "next";
import { SeoIntentPage } from "@/components/SeoIntentPage";

export const metadata: Metadata = {
  title: "Why SaaS Websites Don't Convert: 5 Homepage Problems",
  description: "Learn why SaaS websites fail to convert visitors and how to find the first homepage problem worth fixing.",
  alternates: { canonical: "/why-saas-websites-dont-convert" },
};

export default function WhySaasWebsitesDontConvertPage() {
  return <SeoIntentPage config={{
    slug: "why-saas-websites-dont-convert",
    eyebrow: "SAAS CONVERSION / HOMEPAGE DIAGNOSIS",
    title: "Why SaaS websites lose people before they",
    emphasis: "start.",
    description: "Learn why SaaS websites fail to convert visitors and how to find the first homepage problem worth fixing.",
    intro: "Most SaaS homepages do not fail because they lack features. They lose the first decision because the visitor cannot place the product, verify the promise, or choose a useful next step.",
    checks: [
      { label: "01 / CATEGORY GAP", title: "The page describes a product, not a situation.", copy: "A visitor needs a category, a target customer, and a recognizable problem. Feature names and abstract claims make them do the positioning work themselves." },
      { label: "02 / PROOF GAP", title: "The promise arrives before the evidence.", copy: "A polished hero is not enough when the page never shows who uses the product, what changed, or why the claim is credible. Proof should appear near the decision it supports." },
      { label: "03 / ACTION GAP", title: "The CTA asks for commitment too early.", copy: "A demo, trial, or signup can feel like a large step when the page has not answered the visitor's first question. A useful next step should match their current certainty." },
    ],
    faq: [
      { question: "What is the most common reason a SaaS homepage does not convert?", answer: "The most common issue is unclear positioning: a visitor cannot quickly tell what the product does, who it is for, and what outcome it creates. The exact fix depends on the page evidence." },
      { question: "Should I add more features to improve conversion?", answer: "Usually not as a first move. More features can increase cognitive load. First make the category, customer, outcome, and next step easier to recognize." },
      { question: "How can I tell if the problem is copy or product demand?", answer: "Compare page understanding with behavioral evidence. A public review can identify clarity and trust friction, but only analytics, interviews, and experiments can test demand and conversion impact." },
      { question: "Can SiteLens diagnose my SaaS homepage?", answer: "Yes. Submit a public URL, a one-sentence product description, and the audience you want to reach. The free review returns a score and three page-specific findings." },
    ],
    relatedLinks: [
      { label: "METHOD / SAAS ANALYSIS", title: "See the SaaS review questions", copy: "Use a repeatable sequence for category, outcome, proof, and the first visitor decision.", href: "/saas-website-analysis", linkLabel: "Read the SaaS analysis" },
      { label: "PUBLIC CASE / LINEAR", title: "See a broad product made clearer", copy: "The Linear teardown shows how a large product system can still offer a more useful first workflow.", href: "/teardowns/linear", linkLabel: "Read the Linear teardown" },
      { label: "NEXT STEP / FREE REVIEW", title: "Find your first homepage gap", copy: "Send your public page and get three findings tied to visible evidence.", href: "/#analyze", linkLabel: "Review your homepage" },
    ],
  }} />;
}
