"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

function destinationFor(action: HTMLElement) {
  if (action.matches(".upgrade-card button")) return "checkout";
  if (action.matches(".audit-form .input-row button")) return "#analyze";
  const href = action.getAttribute("href") ?? "/";
  return href.split("?")[0] || "/";
}

export default function SiteAnalytics() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const action = event.target.closest<HTMLElement>("a.nav-cta, a.text-link, .upgrade-card button, .audit-form .input-row button");
      if (!action || (action instanceof HTMLButtonElement && action.disabled)) return;

      trackEvent("cta_clicked", {
        cta_type: action.matches(".upgrade-card button") ? "payment" : action.classList.contains("nav-cta") ? "primary" : "secondary",
        destination: destinationFor(action),
        page_path: window.location.pathname,
      });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
