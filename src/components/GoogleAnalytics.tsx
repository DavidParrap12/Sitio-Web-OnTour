"use client";

import { Suspense, useEffect } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

const GA_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-NHTMFECR3B";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== "function") return;

    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

/**
 * Direct GA4 integration (gtag.js).
 *
 * The measurement ID is hard-coded as the default so analytics works without
 * touching hosting configuration, and NEXT_PUBLIC_GA_MEASUREMENT_ID can still
 * override it per environment.
 *
 * `send_page_view: false` disables GA4's own automatic page_view so this
 * component can send exactly one per navigation, including client-side route
 * changes (App Router navigations never reload the page).
 *
 * Do NOT also create a GA4 tag inside the GTM container: that would send every
 * hit twice.
 */
export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          // `window.gtag ||` matters: both scripts are afterInteractive, and
          // if gtag.js loads first it installs the real implementation. A bare
          // `function gtag(){dataLayer.push(arguments)}` would overwrite it and
          // every later event would sit in dataLayer, never reaching GA4.
          __html: `window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};window.gtag('js',new Date());window.gtag('config','${GA_ID}',{send_page_view:false});`,
        }}
      />
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}
