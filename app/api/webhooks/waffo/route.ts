import { NextResponse } from "next/server";
import { createDeepReportForPayment, getPaymentIntent, markPaymentIntentPaid, recordAnalyticsEvent } from "@/lib/store";
import { readTextBody } from "@/lib/request";
import { signWaffoResponse, verifyWaffoWebhook, waffoEnvironment, type WaffoWebhookEvent } from "@/lib/waffo";

export const runtime = "nodejs";

function signedResponse(message: "success" | "failed") {
  const body = JSON.stringify({ message });
  return new NextResponse(body, {
    status: 200,
    headers: { "content-type": "application/json", "x-signature": signWaffoResponse(body) },
  });
}

export async function POST(request: Request) {
  try {
    const body = await readTextBody(request, 64_000);
    const signature = request.headers.get("x-signature") ?? request.headers.get("x-waffo-signature");
    const event = verifyWaffoWebhook<WaffoWebhookEvent["data"]>(body, signature);
    const intentId = event.data.orderMerchantExternalId || event.data.orderMetadata?.paymentIntentId;
    const paymentSucceeded = event.eventType === "order.completed" || (event.eventType === "PAYMENT_NOTIFICATION" && (event.data.paymentStatus === "succeeded" || event.data.orderStatus === "completed"));

    if (paymentSucceeded && intentId && event.mode === waffoEnvironment()) {
      const intent = await getPaymentIntent(intentId);
      const expectedProduct = process.env.WAFFO_DEEP_GROWTH_REPORT_PRODUCT_ID?.trim();
      const expectedSubtotal = Number(event.data.subtotal ?? event.data.amount);
      const metadataMatches = event.data.orderMetadata?.reportId === intent?.reportId && event.data.orderMetadata?.product === "deep-growth-report" && event.data.orderMetadata?.productId === expectedProduct;
      const orderMatches = Boolean(
        intent &&
          metadataMatches &&
          event.data.currency === "USD" &&
          Number.isFinite(expectedSubtotal) &&
          expectedSubtotal === 29 &&
          (!event.data.buyerEmail || event.data.buyerEmail.trim().toLowerCase() === intent.email) &&
          Boolean(expectedProduct) && event.data.orderMetadata?.productId === expectedProduct,
      );

      if (!orderMatches) return signedResponse("failed");
      const wasAlreadyPaid = intent?.status === "paid";
      await markPaymentIntentPaid({ intentId, eventId: event.eventId || event.id, orderId: event.data.orderId || event.eventId });
      if (!wasAlreadyPaid) await recordAnalyticsEvent({ eventName: "payment_confirmed", value: 29, currency: "USD" });
      await createDeepReportForPayment(intentId);
    }

    return signedResponse("success");
  } catch {
    try {
      return signedResponse("failed");
    } catch {
      return NextResponse.json({ error: "Waffo webhook is not configured." }, { status: 503 });
    }
  }
}
