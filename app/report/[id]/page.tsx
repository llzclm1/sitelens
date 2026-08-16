import { notFound } from "next/navigation";
import ReportClient from "@/components/ReportClient";
import { getPublicReport, recordAnalyticsEvent } from "@/lib/store";

export const dynamic = "force-dynamic";

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
