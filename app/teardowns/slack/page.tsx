import type { Metadata } from "next";
import { TeardownReview } from "@/components/TeardownReview";
import { teardownReviews } from "@/lib/teardown-reviews";

const review = teardownReviews.slack;

export const metadata: Metadata = {
  title: "Slack Homepage Teardown",
  description: review.description,
  alternates: { canonical: "/teardowns/slack" },
};

export default function SlackTeardownPage() {
  return <TeardownReview review={review} />;
}
