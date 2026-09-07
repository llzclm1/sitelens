import type { Metadata } from "next";
import { TeardownReview } from "@/components/TeardownReview";
import { teardownReviews } from "@/lib/teardown-reviews";

const review = teardownReviews.linear;

export const metadata: Metadata = {
  title: "Linear Homepage Teardown",
  description: review.description,
  alternates: { canonical: "/teardowns/linear" },
};

export default function LinearTeardownPage() {
  return <TeardownReview review={review} />;
}
