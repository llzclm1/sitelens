import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReportClient from "@/components/ReportClient";
import { getPublicReport, recordAnalyticsEvent } from "@/lib/store";

export const dynamic = "force-dynamic";
const baseMetadata: Metadata = {
  robots: { index: false, follow: false },
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const report = await getPublicReport(id);

  if (!report) return baseMetadata;

  return {
    ...baseMetadata,
    title: `${report.host} website review`,
    description: `A SiteLens review of ${report.host}: score ${report.score}/100. See the page evidence and first conversion fix.`,
    openGraph: {
      type: "article",
      title: `${report.host} website review | SiteLens`,
      description: `Score ${report.score}/100. See the page evidence and first conversion fix.`,
      url: `/report/${report.id}`,
      siteName: "SiteLens",
    },
    twitter: {
      card: "summary",
      title: `${report.host} website review | SiteLens`,
      description: `Score ${report.score}/100. See the page evidence and first conversion fix.`,
    },
  };
}

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = await getPublicReport(id);

  if (!report) {
    notFound();
    return null;
  }

  await recordAnalyticsEvent({ eventName: "report_viewed", analysisMode: report.mode });
  return <ReportClient report={report} />;
}
