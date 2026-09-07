import type { Metadata } from "next";
import { TeardownReview } from "@/components/TeardownReview";
import { teardownReviews } from "@/lib/teardown-reviews";

const review = teardownReviews.figma;

export const metadata: Metadata = {
  title: "Figma Homepage Teardown",
  description: review.description,
  alternates: { canonical: "/teardowns/figma" },
};

export default function FigmaTeardownPage() {
  return <TeardownReview review={review} />;
}
