import type { Metadata } from "next";
import { SeoIntentPage } from "@/components/SeoIntentPage";

export const metadata: Metadata = {
  title: "Website Messaging Audit: Make the Offer Easier to Understand",
  description: "Audit website messaging for audience clarity, concrete outcomes, proof, and CTA language that supports the next decision.",
  alternates: { canonical: "/website-messaging-audit" },
};

export default function WebsiteMessagingAuditPage() {
  return <SeoIntentPage config={{
    slug: "website-messaging-audit",
    eyebrow: "WEBSITE MESSAGING / CLARITY REVIEW",
    title: "A website messaging audit for a more",
    emphasis: "specific offer.",
    description: "Audit website messaging for audience clarity, concrete outcomes, proof, and CTA language that supports the next decision.",
    intro: "Messaging is the bridge between what a business knows about its product and what a new visitor can understand in a few seconds. This audit finds where that bridge breaks.",
    checks: [
      { label: "01 / AUDIENCE", title: "Does the language call in the right buyer?", copy: "The audit looks for an identifiable customer, situation, or job. A page can be accurate and still feel irrelevant when everyone is addressed at once." },
      { label: "02 / BENEFIT", title: "Can the visitor picture the result?", copy: "Concrete verbs, workflows, and outcomes make the offer easier to evaluate. Abstract claims create another explanation task for the buyer." },
      { label: "03 / CTA LANGUAGE", title: "Does the button complete the message?", copy: "A CTA should tell the visitor what happens next. “Learn more” often hides the decision, while a specific action can reduce uncertainty." },
    ],
    faq: [
      { question: "What is included in a website messaging audit?", answer: "The audit reviews the hero, subhead, headings, product description, proof language, and calls to action. It connects unclear wording to the visitor decision it may slow down." },
      { question: "Is messaging the same as copy editing?", answer: "No. Copy editing improves wording and correctness. Messaging decides what the page should make clear about the customer, problem, outcome, proof, and next step." },
      { question: "Should the homepage use industry jargon?", answer: "Use a specialized term when the target customer recognizes it and it adds precision. Explain or replace it when a first-time visitor would need insider knowledge to understand the offer." },
      { question: "Can SiteLens suggest a rewrite?", answer: "The free review points to the first messaging issue. The Deep Growth Report adds hero and CTA rewrite direction grounded in the page's existing offer." },
    ],
    relatedLinks: [
      { label: "METHOD / VALUE PROPOSITION", title: "Make the outcome visible", copy: "Use customer, problem, outcome, and proof as the minimum structure for a useful homepage message.", href: "/homepage-value-proposition-examples", linkLabel: "See value proposition examples" },
      { label: "PUBLIC CASE / HUBSPOT", title: "See a platform organize many jobs", copy: "The HubSpot teardown looks at how product hubs, team use cases, and proof create entry points for a broad platform.", href: "/teardowns/hubspot", linkLabel: "Read the HubSpot teardown" },
      { label: "NEXT STEP / FREE REVIEW", title: "Audit your homepage message", copy: "Find the first sentence or CTA that needs a more specific job.", href: "/#analyze", linkLabel: "Review your homepage" },
    ],
  }} />;
}
