import { NextResponse } from "next/server";
import { analyzeWebsite } from "@/lib/analyzer";
import { fetchWebsite, normalizeUrl } from "@/lib/fetch-website";
import { saveReport, toPublicReport } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const url = normalizeUrl(typeof body.url === "string" ? body.url : "");
    const product = typeof body.product === "string" ? body.product.trim().slice(0, 300) : "";
    const audience = typeof body.audience === "string" ? body.audience.trim().slice(0, 200) : "";

    if (!product || !audience) {
      return NextResponse.json({ error: "Tell us what the product does and who it is for." }, { status: 400 });
    }

    const page = await fetchWebsite(url);
    const report = await analyzeWebsite({ url, html: page.html, product, audience });
    saveReport(report);

    return NextResponse.json(toPublicReport(report), { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The page could not be analyzed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
