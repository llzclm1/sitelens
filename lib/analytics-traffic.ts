import type { AnalyticsTrafficClass } from "@/lib/store";

const botUserAgent = /bot|crawler|spider|slurp|bingpreview|headless|curl|wget|python-requests|go-http-client/i;

export function classifyAnalyticsRequest(request: Request): AnalyticsTrafficClass {
  const requestUrl = new URL(request.url);
  const testFlag = request.headers.get("x-sitelens-test") === "1"
    || requestUrl.searchParams.get("sitelens_test") === "1"
    || requestUrl.searchParams.get("debug_mode") === "1"
    || process.env.SITELENS_QA === "1";

  if (testFlag) return "test";

  const userAgent = request.headers.get("user-agent") ?? "";
  if (botUserAgent.test(userAgent)) return "bot";

  return "human_candidate";
}
