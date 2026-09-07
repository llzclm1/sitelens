import type { Metadata } from "next";
import { SeoIntentPage } from "@/components/SeoIntentPage";

export const metadata: Metadata = {
  title: "Landing Page Conversion Review: Find the First Friction",
  description: "Review a landing page for message clarity, CTA friction, trust evidence, and the first conversion improvement to test.",
  alternates: { canonical: "/landing-page-conversion-review" },
};

export default function LandingPageConversionReviewPage() {
  return <SeoIntentPage config={{
    slug: "landing-page-conversion-review",
    eyebrow: "LANDING PAGE / CONVERSION REVIEW",
    title: "A landing page conversion review for one",
    emphasis: "better decision.",
    description: "Review a landing page for message clarity, CTA friction, trust evidence, and the first conversion improvement to test.",
    intro: "Conversion review is not a hunt for a magic button color. It is a check that the page answers the visitor's questions in the order they need before taking action.",
    checks: [
      { label: "01 / MESSAGE MATCH", title: "Does the page continue the promise?", copy: "A campaign or search click creates an expectation. The review checks whether the landing page repeats the relevant problem and outcome instead of making the visitor re-orient." },
      { label: "02 / DECISION LOAD", title: "How many choices compete?", copy: "Multiple products, audiences, and CTAs can make a page feel complete while making the next action uncertain. The review identifies the choice the page should prioritize." },
      { label: "03 / TESTABLE CHANGE", title: "What can you change and measure?", copy: "The recommendation turns a qualitative finding into a clear edit, such as a headline, proof block, CTA label, or section order that can later be tested with analytics." },
    ],
    faq: [
      { question: "What is a landing page conversion review?", answer: "It is a structured read of whether a landing page carries the visitor from the incoming promise to a clear, credible next action. It identifies friction before suggesting a change." },
      { question: "Does a conversion review prove that a change will work?", answer: "No. A review helps prioritize a plausible improvement. Measurement requires analytics, a defined conversion event, and a controlled test or comparison period." },
      { question: "Can I review a page for a paid campaign?", answer: "Yes. The public URL and the campaign promise are useful context. The analysis can then check message match, proof, and CTA fit on the destination page." },
      { question: "What is the fastest landing page improvement?", answer: "It depends on the page. Common high-leverage candidates are making the customer explicit, replacing an abstract headline with an outcome, and placing proof next to the CTA." },
    ],
    relatedLinks: [
      { label: "METHOD / LANDING PAGE", title: "Review the first-screen sequence", copy: "Start with the promise, follow the next decision, then check whether proof arrives before commitment.", href: "/landing-page-review", linkLabel: "Read the landing page guide" },
      { label: "PUBLIC CASE / FIGMA", title: "See a suite clarify the first choice", copy: "The Figma teardown looks at how one canvas can route designers, developers, and teams toward different product paths.", href: "/teardowns/figma", linkLabel: "Read the Figma teardown" },
      { label: "NEXT STEP / FREE REVIEW", title: "Review your destination page", copy: "Submit the public URL and get a focused read of the first conversion friction.", href: "/#analyze", linkLabel: "Start a free review" },
    ],
  }} />;
}
