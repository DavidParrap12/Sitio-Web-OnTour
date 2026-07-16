import { MetadataRoute } from "next";
import { destinos } from "@/data/destinos";
import { circuitos } from "@/data/circuitos";

const BASE = "https://www.agenciaontour.com";

// Localized path maps matching routing.ts
const localePasadiasPath: Record<string, string> = {
  es: "pasadias",
  en: "day-trips",
  de: "tagesausfluege",
  fr: "excursions",
};

const localeCircuitosPath: Record<string, string> = {
  es: "circuitos",
  en: "circuits",
  de: "rundreisen",
  fr: "circuits",
};

const localeNosotrosPath: Record<string, string> = {
  es: "nosotros",
  en: "about",
  de: "ueber-uns",
  fr: "a-propos",
};

const localeContactoPath: Record<string, string> = {
  es: "contacto",
  en: "contact",
  de: "kontakt",
  fr: "contact",
};

const localeServiciosPath: Record<string, string> = {
  es: "servicios",
  en: "services",
  de: "dienstleistungen",
  fr: "services",
};

const localeGaleriaPath: Record<string, string> = {
  es: "galeria",
  en: "gallery",
  de: "galerie",
  fr: "galerie",
};

const locales = ["es", "en", "de", "fr"] as const;

function localePrefix(locale: string) {
  return locale === "es" ? "" : `/${locale}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    // Homepage — all locales
    ...locales.map((locale) => ({
      url: `${BASE}${localePrefix(locale)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    })),
    // Nosotros / About
    ...locales.map((locale) => ({
      url: `${BASE}${localePrefix(locale)}/${localeNosotrosPath[locale]}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Pasadias listing
    ...locales.map((locale) => ({
      url: `${BASE}${localePrefix(locale)}/${localePasadiasPath[locale]}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    // Circuitos listing
    ...locales.map((locale) => ({
      url: `${BASE}${localePrefix(locale)}/${localeCircuitosPath[locale]}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    // Servicios
    ...locales.map((locale) => ({
      url: `${BASE}${localePrefix(locale)}/${localeServiciosPath[locale]}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Galería
    ...locales.map((locale) => ({
      url: `${BASE}${localePrefix(locale)}/${localeGaleriaPath[locale]}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    // Contacto
    ...locales.map((locale) => ({
      url: `${BASE}${localePrefix(locale)}/${localeContactoPath[locale]}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Legal (only es + en for SEO)
    { url: `${BASE}/legal/terminos`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE}/legal/privacidad`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE}/en/legal/terms`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE}/en/legal/privacy`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE}/legal/registro-turismo`, changeFrequency: "yearly" as const, priority: 0.4 },
    { url: `${BASE}/legal/faq`, changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  // Pasadía detail pages — all locales
  const pasadiaPages: MetadataRoute.Sitemap = destinos.flatMap((d) =>
    locales.map((locale) => ({
      url: `${BASE}${localePrefix(locale)}/${localePasadiasPath[locale]}/${d.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }))
  );

  // Circuito detail pages — all locales
  const circuitoPages: MetadataRoute.Sitemap = circuitos.flatMap((c) =>
    locales.map((locale) => ({
      url: `${BASE}${localePrefix(locale)}/${localeCircuitosPath[locale]}/${c.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }))
  );

  return [...staticPages, ...pasadiaPages, ...circuitoPages];
}
