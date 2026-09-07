import type { Metadata } from "next";
import { TeardownReview } from "@/components/TeardownReview";
import { teardownReviews } from "@/lib/teardown-reviews";

const review = teardownReviews.notion;

export const metadata: Metadata = {
  title: "Notion Homepage Teardown",
  description: review.description,
  alternates: { canonical: "/teardowns/notion" },
};

export default function NotionTeardownPage() {
  return <TeardownReview review={review} />;
}
