type AnalyticsEventParams = Record<string, string | number | boolean>;

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

function safeCampaignValue(value: string | null) {
  if (!value || value.length > 60 || !/^[a-z0-9][a-z0-9_-]*$/i.test(value)) return undefined;
  return value;
}

function readSessionValue(key: string) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSessionValue(key: string, value: string) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable in privacy-restricted browsers.
  }
}

function searchEngineForReferrer(referrer: string) {
  if (!referrer) return undefined;
  try {
    const hostname = new URL(referrer).hostname.toLowerCase();
    if (hostname.includes("google.")) return "google";
    if (hostname === "bing.com" || hostname.endsWith(".bing.com")) return "bing";
    if (hostname === "perplexity.ai" || hostname.endsWith(".perplexity.ai")) return "perplexity";
    if (hostname === "chatgpt.com" || hostname.endsWith(".chatgpt.com")) return "chatgpt";
    if (hostname === "claude.ai" || hostname.endsWith(".claude.ai")) return "claude";
    return undefined;
  } catch {
    return undefined;
  }
}

function analyticsContext(): AnalyticsEventParams {
  const currentUrl = new URL(window.location.href);
  const storedLandingPage = readSessionValue("sitelens:landing-page");
  const context: AnalyticsEventParams = {
    landing_page: storedLandingPage ?? window.location.pathname,
  };

  if (!storedLandingPage) writeSessionValue("sitelens:landing-page", window.location.pathname);

  for (const key of UTM_KEYS) {
    const value = safeCampaignValue(currentUrl.searchParams.get(key));
    if (value) context[key] = value;
  }

  const searchEngine = searchEngineForReferrer(document.referrer);
  if (searchEngine) context.search_engine = searchEngine;
  context.acquisition_channel = currentUrl.searchParams.get("utm_medium") === "organic"
    ? "organic"
    : searchEngine
      ? "organic"
      : document.referrer
        ? "referral"
        : "direct";

  return context;
}

export function trackEvent(eventName: string, params?: AnalyticsEventParams) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  if (typeof window.gtag !== "function") window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };

  const eventParams: AnalyticsEventParams = {
    ...analyticsContext(),
    ...params,
    page_path: window.location.pathname,
  };
  if (new URL(window.location.href).searchParams.get("debug_mode") === "1") eventParams.debug_mode = true;
  window.gtag("event", eventName, eventParams);
}
