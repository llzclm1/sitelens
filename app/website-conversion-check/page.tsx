import type { Metadata } from "next";
import { SeoIntentPage } from "@/components/SeoIntentPage";

export const metadata: Metadata = {
  title: "Website Conversion Check",
  description: "A website conversion check for finding the first clarity, trust, or CTA problem worth fixing.",
  alternates: { canonical: "/website-conversion-check" },
};

export default function WebsiteConversionCheckPage() {
  return <SeoIntentPage config={{
    slug: "website-conversion-check",
    eyebrow: "WEBSITE CONVERSION CHECK / FIRST MOVE",
    title: "A website conversion check before you buy",
    emphasis: "more traffic.",
    description: "A website conversion check for finding the first clarity, trust, or CTA problem worth fixing.",
    intro: "Before adding more traffic, check whether the page gives a new visitor a clear reason to stay, trust the offer, and take the next step.",
    checks: [
      { label: "01 / CLARITY", title: "Does the visitor know what to do?", copy: "The check looks at the first screen, headings, product description, and CTA language for avoidable ambiguity." },
      { label: "02 / FRICTION", title: "Where does the decision slow down?", copy: "The review follows the visible path and points to late, competing, or unsupported decisions that may make action harder." },
      { label: "03 / ACTION", title: "What is the smallest useful fix?", copy: "The output prioritizes one change that can make the page easier to understand before you spend more on acquisition." },
    ],
    faq: [
      { question: "Is this a guaranteed conversion audit?", answer: "No. It is a qualitative page review and does not promise a conversion lift. Use private analytics and controlled tests to measure outcomes." },
      { question: "What types of websites can I check?", answer: "The first version is most useful for SaaS, tools, services, and small business websites with a public homepage and a clear action they want visitors to take." },
      { question: "What do I receive for free?", answer: "The free review returns a score and three page-specific findings. The Deep Growth Report adds rewrite directions and a prioritized action plan for $29 one time." },
    ],
  }} />;
}
