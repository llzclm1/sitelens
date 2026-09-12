import type { Metadata } from "next";
import { SeoIntentPage } from "@/components/SeoIntentPage";

export const metadata: Metadata = {
  title: "Why Websites Don't Convert: 3 Page Gaps to Fix First",
  description: "Learn why websites lose visitors and how to find the first clarity, trust, or conversion problem worth fixing.",
  alternates: { canonical: "/why-websites-dont-convert" },
};

export default function WhyWebsitesDontConvertPage() {
  return <SeoIntentPage config={{
    slug: "why-websites-dont-convert",
    eyebrow: "WEBSITE CONVERSION / FIRST DIAGNOSIS",
    title: "Why websites lose visitors before they",
    emphasis: "take action.",
    description: "Learn why websites lose visitors and how to find the first clarity, trust, or conversion problem worth fixing.",
    intro: "A website can have useful pages, a polished design, and steady requests while still leaving a new visitor unsure. The first review should find the missing decision, not add more traffic by default.",
    checks: [
      { label: "01 / POSITIONING GAP", title: "The visitor cannot place the offer.", copy: "A homepage needs to make the product, customer, and outcome recognizable. Broad claims and internal language force the visitor to do the positioning work." },
      { label: "02 / TRUST GAP", title: "The promise has nothing concrete behind it.", copy: "A visitor may understand the category and still hesitate when the page gives no customer context, workflow, example, or specific evidence near the decision." },
      { label: "03 / ACTION GAP", title: "The next step asks for too much or means too little.", copy: "A vague CTA, competing buttons, or an early demo request can make action feel larger than the certainty the page has earned." },
    ],
    evidenceExample: {
      label: "PUBLIC EXAMPLE / STRIPE",
      title: "A broad promise still needs a clear next choice.",
      copy: "Stripe's public homepage leads with \"Financial infrastructure to grow your revenue.\" The SiteLens teardown notes that the promise establishes the category, but smaller teams may still need help deciding where to start. A practical next move is to offer a business-model choice after the hero and keep proof close to that choice.",
      source: "stripe.com, reviewed 2026-08-10",
      href: "/teardowns/stripe",
      linkLabel: "Read the full Stripe teardown",
    },
    faq: [
      { question: "What is the first thing to check when a website does not convert?", answer: "Check whether a first-time visitor can say what the product does, who it is for, and what changes after using it. If those answers are unclear, more traffic usually increases the number of confused visitors." },
      { question: "How do I know whether the problem is the website or demand?", answer: "Separate page understanding from market demand. A public review can identify clarity and trust friction, while analytics, interviews, and experiments are needed to test demand and conversion impact." },
      { question: "Should I add more features or sections?", answer: "Not as a first move. More sections can increase decision load. Start by making the customer, problem, outcome, proof, and next action easier to recognize." },
      { question: "Can SiteLens review my website?", answer: "Yes. Submit a public homepage URL, a short description of the product, and the audience you want to reach. The free review returns three findings tied to visible page evidence." },
    ],
    relatedLinks: [
      { label: "METHOD / WEBSITE REVIEW", title: "Use a repeatable review", copy: "See the five questions SiteLens uses to connect page evidence to a practical next move.", href: "/website-review", linkLabel: "Read the website review" },
      { label: "COPY / VALUE PROPOSITION", title: "Make the first sentence clearer", copy: "Use customer, problem, outcome, and proof to turn an abstract claim into something a visitor can place.", href: "/homepage-value-proposition-examples", linkLabel: "See value proposition examples" },
      { label: "NEXT STEP / FREE REVIEW", title: "Find your first page gap", copy: "Submit your public page and receive three page-specific findings before changing the whole site.", href: "/#analyze", linkLabel: "Review your homepage" },
    ],
  }} />;
}
