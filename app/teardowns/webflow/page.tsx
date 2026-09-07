import type { Metadata } from "next";
import { TeardownReview } from "@/components/TeardownReview";
import { teardownReviews } from "@/lib/teardown-reviews";

const review = teardownReviews.webflow;

export const metadata: Metadata = {
  title: "Webflow Homepage Teardown",
  description: review.description,
  alternates: { canonical: "/teardowns/webflow" },
};

export default function WebflowTeardownPage() {
  return <TeardownReview review={review} />;
}
