import type { Metadata } from "next";
import { SeoIntentPage } from "@/components/SeoIntentPage";

export const metadata: Metadata = {
  title: "Landing Page Review",
  description: "A landing page review that explains the first visitor question, the next step, and the page evidence behind each recommendation.",
  alternates: { canonical: "/landing-page-review" },
};

export default function LandingPageReviewPage() {
  return <SeoIntentPage config={{
    slug: "landing-page-review",
    eyebrow: "LANDING PAGE REVIEW / NEXT DECISION",
    title: "A landing page review for the next visitor",
    emphasis: "decision.",
    description: "A landing page review that explains the first visitor question, the next step, and the page evidence behind each recommendation.",
    intro: "A landing page can look polished and still leave the buying decision unclear. SiteLens reviews the page in the order a new visitor experiences it.",
    checks: [
      { label: "01 / FIRST SCREEN", title: "Can visitors name the offer?", copy: "The review checks whether the headline and opening copy explain the product, audience, and expected outcome without decoding a slogan." },
      { label: "02 / CONVERSION PATH", title: "Is the next step visible?", copy: "The audit follows the page from the hero to the primary CTA and identifies where the action becomes late, vague, or split across too many choices." },
      { label: "03 / TRUST", title: "Why should they continue?", copy: "The output points to the proof, specificity, and context that a skeptical visitor can actually see on the page." },
    ],
    faq: [
      { question: "What makes this different from a design critique?", answer: "The review focuses on what the page helps a visitor understand and decide. Visual polish matters, but each recommendation starts with a page detail and a business reason." },
      { question: "Can I review a page before launch?", answer: "Yes, if the page is publicly accessible. SiteLens needs a public URL and a short description of the product and target audience." },
      { question: "Will the review rewrite the whole page?", answer: "The free review identifies the first issues. The one-time Deep Growth Report adds hero and CTA rewrite directions and a prioritized action plan." },
    ],
  }} />;
}
