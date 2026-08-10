import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { createWaffoCheckout, WaffoError } from "@/lib/waffo";
import { getReport, markPaymentIntentFailed, savePaymentIntent, saveUpgrade, updatePaymentIntentSession } from "@/lib/store";

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

    const intentId = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    saveUpgrade({ reportId, email, createdAt });
    savePaymentIntent({ id: intentId, reportId, email, status: "pending", createdAt });

    try {
      const checkout = await createWaffoCheckout({ reportId, intentId, buyerEmail: email });
      updatePaymentIntentSession(intentId, checkout.sessionId);

      return NextResponse.json({ ok: true, checkoutUrl: checkout.checkoutUrl, intentId });
    } catch (error) {
      markPaymentIntentFailed(intentId, error instanceof Error ? error.message : "Unable to create Waffo checkout");
      return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create Waffo checkout" }, { status: error instanceof WaffoError ? error.status : 502 });
    }
  } catch {
    return NextResponse.json({ error: "The request could not be saved." }, { status: 400 });
  }
}
