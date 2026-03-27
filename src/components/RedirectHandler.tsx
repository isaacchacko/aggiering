"use client";

import { useLayoutEffect } from "react";
import { webringData } from "@/data/webringData";
import { getWebringRedirectTarget } from "@/lib/webringNavigation";

const siteUrls = webringData.map((m) => m.website);

function markReady() {
  document.documentElement.setAttribute("data-aggiering-ready", "1");
}

export function RedirectHandler() {
  useLayoutEffect(() => {
    const run = () => {
      const target = getWebringRedirectTarget(window.location.hash, siteUrls);
      if (target) {
        window.location.replace(target);
        return;
      }
      markReady();
    };

    run();
    window.addEventListener("hashchange", run);
    return () => window.removeEventListener("hashchange", run);
  }, []);

  return null;
}
