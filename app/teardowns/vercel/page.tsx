import type { Metadata } from "next";
import { TeardownReview } from "@/components/TeardownReview";
import { teardownReviews } from "@/lib/teardown-reviews";

const review = teardownReviews.vercel;

export const metadata: Metadata = {
  title: "Vercel Homepage Teardown",
  description: review.description,
  alternates: { canonical: "/teardowns/vercel" },
};

export default function VercelTeardownPage() {
  return <TeardownReview review={review} />;
}
