"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Any route other than the landing uses normal document scroll. */
function isScrollableRoute(pathname: string): boolean {
  return pathname !== "/";
}

/**
 * Ensures html/body use normal scrolling on layout subpages so the landing
 * scroll lock (overflow: hidden) doesn't persist after client-side navigation.
 */
export function ScrollUnlock() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isScrollableRoute(pathname)) return;

    const html = document.documentElement;
    const body = document.body;

    html.style.setProperty("overflow", "auto", "important");
    html.style.setProperty("height", "auto", "important");
    body.style.setProperty("overflow", "auto", "important");
    body.style.setProperty("height", "auto", "important");

    window.scrollTo(0, 0);

    return () => {
      html.style.removeProperty("overflow");
      html.style.removeProperty("height");
      body.style.removeProperty("overflow");
      body.style.removeProperty("height");
    };
  }, [pathname]);

  return null;
}
