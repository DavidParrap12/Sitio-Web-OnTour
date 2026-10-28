import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export const SITE_URL = "https://www.ontourdmc.com";
export const SITE_NAME = "Ontour DMC Colombia";
export const DEFAULT_OG_IMAGE = "/image/og/ontour-dmc-colombia.jpg";

export const OG_LOCALES: Record<string, string> = {
  es: "es_CO",
  en: "en_US",
  de: "de_DE",
  fr: "fr_FR",
};

type AppHref = Parameters<typeof getPathname>[0]["href"];

export function absoluteUrl(value: string): string {
  return value.startsWith("http") ? value : `${SITE_URL}${value}`;
}

/**
 * Builds a self-referencing canonical plus a complete hreflang map for every
 * supported locale. `href` is the internal pathname key from `routing.ts`
 * (e.g. `/nosotros` or `{pathname: '/circuitos/[id]', params: {id}}`).
 */
export function buildAlternates(
  locale: string,
  href: AppHref
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};

  for (const supportedLocale of routing.locales) {
    languages[supportedLocale] = absoluteUrl(
      getPathname({ locale: supportedLocale, href })
    );
  }

  languages["x-default"] = absoluteUrl(
    getPathname({ locale: routing.defaultLocale, href })
  );

  return {
    canonical: absoluteUrl(getPathname({ locale, href })),
    languages,
  };
}

export function canonicalFor(locale: string, href: AppHref): string {
  return absoluteUrl(getPathname({ locale, href }));
}

type OpenGraphInput = {
  locale: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
};

/**
 * Builds a complete Open Graph object. Page-level `openGraph` replaces the
 * parent object in Next.js, so every page must include the shared fields.
 */
export function buildOpenGraph({
  locale,
  title,
  description,
  url,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = "website",
}: OpenGraphInput): NonNullable<Metadata["openGraph"]> {
  return {
    title,
    description,
    url,
    siteName: SITE_NAME,
    locale: OG_LOCALES[locale] ?? OG_LOCALES.es,
    type,
    images: [
      {
        url: absoluteUrl(image),
        width: 1200,
        height: 630,
        alt: imageAlt ?? title,
      },
    ],
  };
}

type TwitterInput = {
  title: string;
  description: string;
  image?: string;
};

export function buildTwitter({
  title,
  description,
  image = DEFAULT_OG_IMAGE,
}: TwitterInput): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [absoluteUrl(image)],
  };
}
