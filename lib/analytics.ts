type AnalyticsEventParams = Record<string, string | number | boolean>;

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export function trackEvent(eventName: string, params?: AnalyticsEventParams) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  if (typeof window.gtag !== "function") window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };

  const eventParams = {
    ...params,
    page_path: window.location.pathname,
  } satisfies AnalyticsEventParams;
  window.gtag("event", eventName, eventParams);
}
