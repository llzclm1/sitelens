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
  if (window.gtag) {
    window.gtag("event", eventName, params ?? {});
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(["event", eventName, params ?? {}]);
}
