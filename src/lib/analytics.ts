// Google Tag Manager & Google Analytics 4 Custom Conversion Events

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Pushes a custom conversion event to GTM dataLayer and, when gtag.js is
 * loaded directly, forwards it to GA4 as well. Without the gtag forward the
 * events would only reach GA4 through a GTM tag, and the GTM container ships
 * empty — conversions would silently never arrive.
 */
export function trackEvent(
  eventName: string,
  params: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
    timestamp: new Date().toISOString(),
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  if (process.env.NODE_ENV !== "production") {
    console.log(`[GTM Event: ${eventName}]`, params);
  }
}

/**
 * 1. Event: Click on "REQUEST A QUOTE"
 */
export function trackRequestQuoteClick(location: string) {
  trackEvent("click_request_quote", {
    click_location: location,
  });
}

/**
 * 2. Event: Successful Quote Form Submission
 */
export function trackQuoteFormSubmit(data: {
  experience: string;
  item: string;
  method: "email" | "whatsapp";
  travelers?: string;
  dates?: string;
}) {
  trackEvent("quote_form_submit", {
    experience_category: data.experience,
    selected_item: data.item,
    submission_method: data.method,
    travelers_count: data.travelers || "2",
    travel_dates: data.dates || "Unspecified",
  });
}

/**
 * 3. Event: Outbound click to WhatsApp
 *
 * Only non-personal context is forwarded (never the pre-filled message, which
 * can contain names, phone numbers, emails or trip notes).
 */
export function trackWhatsAppClick(source: string, tourName?: string) {
  trackEvent("click_whatsapp", {
    cta_source: source,
    ...(tourName ? { tour_name: tourName.slice(0, 80) } : {}),
  });
}

/**
 * 4. Event: Sticky Bottom Bar Interactions
 */
export function trackStickyBarInteraction(
  action: "impression" | "quote_click" | "whatsapp_click",
  tourName: string
) {
  trackEvent("sticky_bar_interaction", {
    interaction_type: action,
    tour_name: tourName,
  });
}
