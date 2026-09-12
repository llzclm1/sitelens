"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

function readSessionMarker(key: string) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSessionMarker(key: string) {
  try {
    window.sessionStorage.setItem(key, "1");
  } catch {
    // Storage can be unavailable in privacy-restricted browsers.
  }
}

function destinationFor(action: HTMLElement) {
  if (action.matches(".upgrade-card button")) return "checkout";
  if (action.matches(".audit-form .input-row button")) return "#analyze";
  const href = action.getAttribute("href") ?? "/";
  return href.split("?")[0] || "/";
}

export default function SiteAnalytics() {
  useEffect(() => {
    let interactionCount = 0;
    let firstInteractionAt: number | null = null;
    let qualifiedSessionSent = Boolean(readSessionMarker("sitelens:qualified-session"));
    let analysisFormStarted = false;

    function markInteraction() {
      interactionCount = Math.min(interactionCount + 1, 20);
      firstInteractionAt ??= Date.now();
    }

    function handleFocus(event: FocusEvent) {
      if (!(event.target instanceof HTMLInputElement)) return;
      if (!event.target.closest(".audit-form")) return;
      markInteraction();
      if (analysisFormStarted) return;
      analysisFormStarted = true;
      trackEvent("analysis_form_started", { field_name: event.target.name || "unknown" });
    }

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") markInteraction();
    }

    function maybeTrackQualifiedSession() {
      if (qualifiedSessionSent || !firstInteractionAt || document.visibilityState !== "visible") return;
      if (Date.now() - firstInteractionAt < 15000) return;
      qualifiedSessionSent = true;
      writeSessionMarker("sitelens:qualified-session");
      trackEvent("qualified_session", {
        engagement_seconds: 15,
        interaction_count: interactionCount,
      });
    }

    const qualificationTimer = window.setInterval(maybeTrackQualifiedSession, 1000);

    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      markInteraction();
      const action = event.target.closest<HTMLElement>("a.nav-cta, a.text-link, .upgrade-card button, .audit-form .input-row button");
      if (!action || (action instanceof HTMLButtonElement && action.disabled)) return;

      trackEvent("cta_clicked", {
        cta_type: action.matches(".upgrade-card button") ? "payment" : action.classList.contains("nav-cta") ? "primary" : "secondary",
        destination: destinationFor(action),
        page_path: window.location.pathname,
      });
    }

    const currentUrl = new URL(window.location.href);
    const searchEngine = currentUrl.searchParams.get("utm_medium") === "organic"
      ? "utm"
      : document.referrer.includes("google.")
        ? "google"
        : document.referrer.includes("bing.")
          ? "bing"
          : document.referrer.includes("perplexity.ai")
            ? "perplexity"
            : document.referrer.includes("chatgpt.com")
              ? "chatgpt"
              : undefined;
    if (searchEngine && !readSessionMarker("sitelens:organic-landing")) {
      writeSessionMarker("sitelens:organic-landing");
      trackEvent("organic_landing_view", { search_engine: searchEngine });
    }

    document.addEventListener("focusin", handleFocus);
    document.addEventListener("pointerdown", markInteraction, { passive: true });
    document.addEventListener("keydown", markInteraction, { passive: true });
    document.addEventListener("scroll", markInteraction, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("click", handleClick);
    return () => {
      window.clearInterval(qualificationTimer);
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("pointerdown", markInteraction);
      document.removeEventListener("keydown", markInteraction);
      document.removeEventListener("scroll", markInteraction);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
