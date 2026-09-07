import type { Metadata } from "next";
import { SeoIntentPage } from "@/components/SeoIntentPage";

export const metadata: Metadata = {
  title: "Homepage Value Proposition Examples That Explain the Outcome",
  description: "See what a useful homepage value proposition must explain, with examples for SaaS, services, and product teams.",
  alternates: { canonical: "/homepage-value-proposition-examples" },
};

export default function HomepageValuePropositionExamplesPage() {
  return <SeoIntentPage config={{
    slug: "homepage-value-proposition-examples",
    eyebrow: "HOMEPAGE COPY / VALUE PROPOSITION",
    title: "Homepage value propositions that make the",
    emphasis: "outcome visible.",
    description: "See what a useful homepage value proposition must explain, with examples for SaaS, services, and product teams.",
    intro: "A value proposition is not a slogan. It is the shortest explanation of who the product helps, what problem it solves, and what changes for the customer.",
    checks: [
      { label: "01 / WHO", title: "Name the customer before the feature.", copy: "“For growing teams” is broad. “For support teams managing high-volume requests” gives the visitor a reason to keep reading and lets the rest of the page become more specific." },
      { label: "02 / OUTCOME", title: "Show the change, not the category alone.", copy: "“Intelligent workflow software” describes a category. “Route every invoice to the right approver without spreadsheet follow-up” describes a result a buyer can picture." },
      { label: "03 / PROOF", title: "Let the next section verify the claim.", copy: "A strong headline creates a question. The next block should answer it with a workflow, customer example, number, or product view rather than another abstract benefit." },
    ],
    faq: [
      { question: "What makes a homepage value proposition clear?", answer: "It makes the target customer, problem, outcome, and product category recognizable without requiring a visitor to read the full page. Clarity is specific, not merely short." },
      { question: "Can a value proposition be one sentence?", answer: "Yes, but a single sentence does not have to carry every detail. The headline can state the promise, while the subhead and first proof block add context and credibility." },
      { question: "What is a weak value proposition example?", answer: "A phrase such as “Build smarter workflows” is weak when it does not identify the workflow, customer, or result. It can become useful after those missing details are made explicit." },
      { question: "Will SiteLens rewrite my value proposition?", answer: "The free review identifies the first clarity problem. The one-time Deep Growth Report adds hero and CTA rewrite direction based on the submitted page." },
    ],
    relatedLinks: [
      { label: "METHOD / COPY REVIEW", title: "Audit your page language", copy: "Review the hero, headings, product explanation, and CTA as a connected decision path.", href: "/website-messaging-audit", linkLabel: "Read the messaging audit" },
      { label: "PUBLIC CASE / STRIPE", title: "See a broad promise with proof", copy: "The Stripe teardown shows how a category-level promise is supported by product paths and visible evidence.", href: "/teardowns/stripe", linkLabel: "Read the Stripe teardown" },
      { label: "NEXT STEP / FREE REVIEW", title: "Test your first sentence", copy: "Get a page-specific read of what a first-time visitor can understand from your homepage.", href: "/#analyze", linkLabel: "Review your homepage" },
    ],
  }} />;
}
