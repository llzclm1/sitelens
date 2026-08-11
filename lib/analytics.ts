type AnalyticsEventParams = Record<string, string | number | boolean>;

type Gtag = (command: "event", eventName: string, params?: AnalyticsEventParams) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

export function trackEvent(eventName: string, params?: AnalyticsEventParams) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", eventName, params);
}
