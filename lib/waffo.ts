import { createPrivateKey, createSign } from "node:crypto";
import { WaffoPancake, type WebhookEvent, verifyWebhook } from "@waffo/pancake-ts";

export class WaffoError extends Error {
  status: number;

  constructor(message: string, status = 502) {
    super(message);
    this.name = "WaffoError";
    this.status = status;
  }
}

function required(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new WaffoError(`Waffo is not configured: ${name}`, 503);
  return value;
}

function environment() {
  return process.env.WAFFO_ENVIRONMENT === "prod" ? "prod" : "test";
}

function publicBaseUrl() {
  return process.env.WAFFO_RETURN_BASE_URL?.trim() || process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
}

export function normalizeWaffoPrivateKey(raw: string) {
  let value = raw.trim();

  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    try {
      value = JSON.parse(value) as string;
    } catch {
      value = value.slice(1, -1);
    }
  }

  value = value.replace(/\\r\\n/g, "\n").replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\r\n/g, "\n").trim();

  if (value.startsWith("{")) {
    try {
      const parsed = JSON.parse(value) as { kty?: string };
      if (parsed.kty === "RSA") {
        return createPrivateKey({ key: parsed, format: "jwk" }).export({ type: "pkcs8", format: "pem" }).toString();
      }
    } catch {
      // Let the SDK produce the actionable key-format error.
    }
  }

  return value;
}

function client() {
  return new WaffoPancake({
    merchantId: required("WAFFO_MERCHANT_ID"),
    privateKey: normalizeWaffoPrivateKey(required("WAFFO_PRIVATE_KEY")),
    webhookPublicKey: process.env.WAFFO_WEBHOOK_PUBLIC_KEY?.trim() || undefined,
  });
}

export function waffoIsConfigured() {
  return Boolean(
    process.env.WAFFO_MERCHANT_ID?.trim() &&
      process.env.WAFFO_PRIVATE_KEY?.trim() &&
      process.env.WAFFO_DEEP_GROWTH_REPORT_PRODUCT_ID?.trim(),
  );
}

export async function createWaffoCheckout(input: { reportId: string; intentId: string; buyerEmail: string }) {
  try {
    return await client().checkout.createSession({
      productId: required("WAFFO_DEEP_GROWTH_REPORT_PRODUCT_ID"),
      currency: "USD",
      buyerEmail: input.buyerEmail,
      successUrl: `${publicBaseUrl()}/report/${encodeURIComponent(input.reportId)}?payment=success&intent=${encodeURIComponent(input.intentId)}`,
      orderMerchantExternalId: input.intentId,
      metadata: { paymentIntentId: input.intentId, reportId: input.reportId, product: "deep-growth-report" },
      language: "en",
      darkMode: false,
    });
  } catch (error) {
    if (error instanceof WaffoError) throw error;
    throw new WaffoError(error instanceof Error ? error.message : "Unable to create Waffo checkout");
  }
}

export function verifyWaffoWebhook<T = Record<string, unknown>>(body: string, signature: string | null) {
  if (!signature) throw new WaffoError("Missing Waffo webhook signature", 400);
  try {
    return verifyWebhook<T>(body, signature, { environment: environment() });
  } catch (error) {
    throw new WaffoError(error instanceof Error ? error.message : "Invalid Waffo webhook", 400);
  }
}

export function signWaffoResponse(body: string) {
  const signer = createSign("RSA-SHA256");
  signer.update(body);
  signer.end();
  return signer.sign(normalizeWaffoPrivateKey(required("WAFFO_PRIVATE_KEY")), "base64");
}

export type WaffoWebhookEvent = WebhookEvent<{
  orderId?: string;
  orderStatus?: string;
  orderMerchantExternalId?: string;
  orderMetadata?: Record<string, string>;
  paymentStatus?: string;
}>;
