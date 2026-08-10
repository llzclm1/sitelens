import { NextResponse } from "next/server";
import { getPaymentIntent } from "@/lib/store";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const intent = await getPaymentIntent(id);
  if (!intent) return NextResponse.json({ error: "Payment intent not found." }, { status: 404 });
  return NextResponse.json({ id: intent.id, reportId: intent.reportId, status: intent.status, paidAt: intent.paidAt ?? null });
}
