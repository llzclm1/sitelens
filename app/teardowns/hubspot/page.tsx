import type { Metadata } from "next";
import { TeardownReview } from "@/components/TeardownReview";
import { teardownReviews } from "@/lib/teardown-reviews";

const review = teardownReviews.hubspot;

export const metadata: Metadata = {
  title: "HubSpot Homepage Teardown",
  description: review.description,
  alternates: { canonical: "/teardowns/hubspot" },
};

export default function HubSpotTeardownPage() {
  return <TeardownReview review={review} />;
}
