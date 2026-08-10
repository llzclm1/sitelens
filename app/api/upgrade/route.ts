import { NextResponse } from "next/server";
import { getReport, saveUpgrade } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const reportId = typeof body.reportId === "string" ? body.reportId : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!getReport(reportId)) {
      return NextResponse.json({ error: "This report is no longer available." }, { status: 404 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    saveUpgrade({ reportId, email, createdAt: new Date().toISOString() });
    const checkoutUrl = process.env.PAYMENT_CHECKOUT_URL;

    return NextResponse.json({
      ok: true,
      checkoutUrl: checkoutUrl || null,
      message: checkoutUrl
        ? "Your report is ready for checkout."
        : "Request saved. We will send the human-reviewed report within 24 hours.",
    });
  } catch {
    return NextResponse.json({ error: "The request could not be saved." }, { status: 400 });
  }
}
