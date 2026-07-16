/**
 * schema.ts — Schema.org JSON-LD builders for OnTour DMC Colombia
 * Used with <JsonLd data={...} /> in Server Components
 */

const BASE = "https://www.agenciaontour.com";
const ORG_NAME = "OnTour DMC Colombia";
const ORG_LOGO = `${BASE}/image/logo-ON-TOUR-Nuevo.png`;

// ── Locale helpers ──────────────────────────────────────────────────────────

const localeToLang: Record<string, string> = {
  es: "es-CO",
  en: "en-US",
  de: "de-DE",
  fr: "fr-FR",
};

const tripPath: Record<string, string> = {
  es: "pasadias",
  en: "day-trips",
  de: "tagesausfluege",
  fr: "excursions",
};

const circuitPath: Record<string, string> = {
  es: "circuitos",
  en: "circuits",
  de: "rundreisen",
  fr: "circuits",
};

// ── Organization / TravelAgency (homepage) ──────────────────────────────────

export function buildOrgSchema(locale: string) {
  const lang = localeToLang[locale] ?? "es-CO";
  return [
    {
      "@context": "https://schema.org",
      "@type": ["TravelAgency", "LocalBusiness"],
      "@id": `${BASE}/#organization`,
      name: ORG_NAME,
      alternateName: "OnTour Agencia de Viaje Operadora",
      url: BASE,
      logo: { "@type": "ImageObject", url: ORG_LOGO },
      image: ORG_LOGO,
      description:
        "DMC colombiana especializada en pasadías y circuitos turísticos para viajeros internacionales. Operamos en Medellín, Bogotá, Cartagena, Santa Marta, Cali, San Andrés y el Tolima.",
      inLanguage: lang,
      areaServed: {
        "@type": "Country",
        name: "Colombia",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        availableLanguage: ["Spanish", "English", "German", "French"],
      },
      sameAs: [],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: BASE,
      name: ORG_NAME,
      publisher: { "@id": `${BASE}/#organization` },
      inLanguage: lang,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE}/${locale === "es" ? "" : locale + "/"}?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ];
}

// ── TouristTrip — Pasadía ───────────────────────────────────────────────────

export function buildPasadiaSchema({
  id,
  name,
  description,
  duration,
  image,
  locale,
}: {
  id: string;
  name: string;
  description: string;
  duration: string;
  image: string;
  locale: string;
}) {
  const lang = localeToLang[locale] ?? "es-CO";
  const slug = tripPath[locale] ?? "pasadias";
  const url = `${BASE}/${locale === "es" ? "" : locale + "/"}${slug}/${id}`;

  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": url,
    name,
    description,
    url,
    image: image.startsWith("http") ? image : `${BASE}${image}`,
    inLanguage: lang,
    duration,
    provider: { "@id": `${BASE}/#organization` },
    touristType: [
      { "@type": "Audience", audienceType: "International tourists" },
      { "@type": "Audience", audienceType: "Adventure travelers" },
    ],
    availableLanguage: [
      { "@type": "Language", name: "Spanish" },
      { "@type": "Language", name: "English" },
      { "@type": "Language", name: "German" },
      { "@type": "Language", name: "French" },
    ],
    aggregateRating: buildAggregateRating({ ratingValue: 5.0, reviewCount: 4 }),
    location: {
      "@type": "Country",
      name: "Colombia",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "COP",
      url: `${BASE}/${locale === "es" ? "" : locale + "/"}contacto`,
    },
  };
}

// ── TouristTrip — Circuito ──────────────────────────────────────────────────

export function buildCircuitoSchema({
  id,
  name,
  description,
  days,
  nights,
  image,
  locale,
}: {
  id: string;
  name: string;
  description: string;
  days: number;
  nights: number;
  image: string;
  locale: string;
}) {
  const lang = localeToLang[locale] ?? "es-CO";
  const slug = circuitPath[locale] ?? "circuitos";
  const url = `${BASE}/${locale === "es" ? "" : locale + "/"}${slug}/${id}`;

  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": url,
    name,
    description,
    url,
    image: image.startsWith("http") ? image : `${BASE}${image}`,
    inLanguage: lang,
    duration: `P${days}D`,
    provider: { "@id": `${BASE}/#organization` },
    touristType: [
      { "@type": "Audience", audienceType: "International tourists" },
      { "@type": "Audience", audienceType: "Cultural travelers" },
    ],
    availableLanguage: [
      { "@type": "Language", name: "Spanish" },
      { "@type": "Language", name: "English" },
      { "@type": "Language", name: "German" },
      { "@type": "Language", name: "French" },
    ],
    aggregateRating: buildAggregateRating({ ratingValue: 5.0, reviewCount: 4 }),
    location: {
      "@type": "Country",
      name: "Colombia",
    },
    itinerary: {
      "@type": "ItemList",
      numberOfItems: days,
      name: `${days}-day Colombia itinerary (${nights} nights)`,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "COP",
      url: `${BASE}/${locale === "es" ? "" : locale + "/"}contacto`,
    },
  };
}

// ── BreadcrumbList ──────────────────────────────────────────────────────────

export function buildBreadcrumbs(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ── FAQPage ─────────────────────────────────────────────────────────────────

export function buildFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

// ── AggregateRating — embedded inside TouristTrip schemas ───────────────────

export function buildAggregateRating({
  ratingValue,
  reviewCount,
  bestRating = 5,
}: {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
}) {
  return {
    "@type": "AggregateRating",
    ratingValue: ratingValue.toFixed(1),
    bestRating,
    worstRating: 1,
    reviewCount,
  };
}

// ── Event — upcoming departure dates for circuits ───────────────────────────

export function buildDepartureDateEvents({
  circuitId,
  circuitName,
  image,
  departureDates,
  locale,
}: {
  circuitId: string;
  circuitName: string;
  image: string;
  departureDates: Record<string, number>;
  locale: string;
}) {
  const lang = localeToLang[locale] ?? "es-CO";
  const slug = circuitPath[locale] ?? "circuitos";
  const url = `${BASE}/${locale === "es" ? "" : locale + "/"}${slug}/${circuitId}`;
  const today = new Date();

  return Object.entries(departureDates)
    .filter(([yearMonth, day]) => {
      const [y, m] = yearMonth.split("-").map(Number);
      return new Date(y, m - 1, day) >= today;
    })
    .slice(0, 6)
    .map(([yearMonth, day]) => {
      const [year, month] = yearMonth.split("-").map(Number);
      const iso = new Date(year, month - 1, day).toISOString().split("T")[0];
      return {
        "@context": "https://schema.org",
        "@type": "Event",
        name: circuitName,
        startDate: iso,
        endDate: iso,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        inLanguage: lang,
        image: image.startsWith("http") ? image : `${BASE}${image}`,
        url,
        organizer: { "@id": `${BASE}/#organization` },
        location: {
          "@type": "Place",
          name: "Colombia",
          address: { "@type": "PostalAddress", addressCountry: "CO" },
        },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "COP",
          url: `${BASE}/${locale === "es" ? "" : locale + "/"}contacto`,
        },
      };
    });
}
