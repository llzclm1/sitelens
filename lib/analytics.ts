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
  const eventParams = params ?? {};
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? ((...args: unknown[]) => {
    window.dataLayer?.push(args);
  });
  window.gtag("event", eventName, eventParams);
}
