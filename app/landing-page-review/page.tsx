import type { Metadata } from "next";
import { SeoIntentPage } from "@/components/SeoIntentPage";

export const metadata: Metadata = {
  title: "Why Landing Pages Don't Convert: A Practical Review",
  description: "Learn why landing pages don't convert: review message match, CTA clarity, trust evidence, and the first page change worth testing.",
  alternates: { canonical: "/landing-page-review" },
};

export default function LandingPageReviewPage() {
  return <SeoIntentPage config={{
    slug: "landing-page-review",
    dateModified: "2026-09-28",
    eyebrow: "LANDING PAGE / CONVERSION REVIEW",
    title: "Why landing pages lose visitors before the",
    emphasis: "next decision.",
    description: "Learn why landing pages don't convert: review message match, CTA clarity, trust evidence, and the first page change worth testing.",
    intro: "A landing page can look polished and still fail to convert when its promise, proof, and next step do not line up. SiteLens reviews the page in the order a new visitor experiences it.",
    answer: "Why don't landing pages convert? A public-page review can first check whether the incoming promise matches the first screen, whether the offer is specific to a customer, whether proof arrives before commitment, and whether the CTA makes the next decision clear. Those findings suggest a change; analytics and a controlled comparison are still needed to measure the result.",
    checks: [
      { label: "01 / FIRST SCREEN", title: "Can visitors name the offer?", copy: "The review checks whether the headline and opening copy explain the product, audience, and expected outcome without decoding a slogan." },
      { label: "02 / CONVERSION PATH", title: "Is the next step visible?", copy: "The audit follows the page from the hero to the primary CTA and identifies where the action becomes late, vague, or split across too many choices." },
      { label: "03 / TRUST", title: "Why should they continue?", copy: "The output points to the proof, specificity, and context that a skeptical visitor can actually see on the page." },
    ],
    faq: [
      { question: "Why don't landing pages convert?", answer: "A landing page may leave the offer, audience, proof, or next action unclear. SiteLens checks those visible decision points in sequence and ties each finding to a page detail instead of claiming a measured conversion cause." },
      { question: "What makes this different from a design critique?", answer: "The review focuses on what the page helps a visitor understand and decide. Visual polish matters, but each recommendation starts with a page detail and a business reason." },
      { question: "Can I review a page before launch?", answer: "Yes, if the page is publicly accessible. SiteLens needs a public URL and a short description of the product and target audience." },
      { question: "Will the review rewrite the whole page?", answer: "No. It identifies the first issues and includes a focused rewrite direction so you can make the next edit yourself." },
    ],
  }} />;
}
