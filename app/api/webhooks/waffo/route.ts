import { NextResponse } from "next/server";
import { markPaymentIntentPaid } from "@/lib/store";
import { signWaffoResponse, verifyWaffoWebhook, type WaffoWebhookEvent } from "@/lib/waffo";

export const runtime = "nodejs";

function signedResponse(message: "success" | "failed") {
  const body = JSON.stringify({ message });
  return new NextResponse(body, {
    status: 200,
    headers: { "content-type": "application/json", "x-signature": signWaffoResponse(body) },
  });
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-signature") ?? request.headers.get("x-waffo-signature");

  try {
    const event = verifyWaffoWebhook<WaffoWebhookEvent["data"]>(body, signature);
    const intentId = event.data.orderMerchantExternalId || event.data.orderMetadata?.paymentIntentId;
    const paymentSucceeded = event.eventType === "order.completed" || (event.eventType === "PAYMENT_NOTIFICATION" && (event.data.paymentStatus === "succeeded" || event.data.orderStatus === "completed"));

    if (paymentSucceeded && intentId) {
      await markPaymentIntentPaid({ intentId, eventId: event.eventId || event.id, orderId: event.data.orderId || event.eventId });
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
