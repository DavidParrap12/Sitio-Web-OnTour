import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";
import { destinos } from "@/data/destinos";
import { circuitos } from "@/data/circuitos";

type AppHref = Parameters<typeof getPathname>[0]["href"];

const STATIC_ROUTES: Array<{
  href: AppHref;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { href: "/", changeFrequency: "weekly", priority: 1 },
  { href: "/nosotros", changeFrequency: "monthly", priority: 0.8 },
  { href: "/pasadias", changeFrequency: "weekly", priority: 0.9 },
  { href: "/circuitos", changeFrequency: "weekly", priority: 0.9 },
  { href: "/servicios", changeFrequency: "monthly", priority: 0.8 },
  { href: "/galeria", changeFrequency: "weekly", priority: 0.7 },
  { href: "/contacto", changeFrequency: "monthly", priority: 0.7 },
  { href: "/bienestar", changeFrequency: "monthly", priority: 0.8 },
  { href: "/legal/terminos", changeFrequency: "yearly", priority: 0.3 },
  { href: "/legal/privacidad", changeFrequency: "yearly", priority: 0.3 },
  { href: "/legal/registro-turismo", changeFrequency: "yearly", priority: 0.4 },
  { href: "/legal/faq", changeFrequency: "monthly", priority: 0.5 },
];

function languagesFor(href: AppHref): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = `${SITE_URL}${getPathname({ locale, href })}`;
  }

  languages["x-default"] = `${SITE_URL}${getPathname({
    locale: routing.defaultLocale,
    href,
  })}`;

  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = STATIC_ROUTES.flatMap(
    ({ href, changeFrequency, priority }) =>
      routing.locales.map((locale) => ({
        url: `${SITE_URL}${getPathname({ locale, href })}`,
        lastModified,
        changeFrequency,
        priority,
        alternates: { languages: languagesFor(href) },
      }))
  );

  const pasadiaPages: MetadataRoute.Sitemap = destinos.flatMap((destino) => {
    const href = {
      pathname: "/pasadias/[id]",
      params: { id: destino.id },
    } as const;

    return routing.locales.map((locale) => ({
      url: `${SITE_URL}${getPathname({ locale, href })}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      alternates: { languages: languagesFor(href) },
    }));
  });

  const circuitoPages: MetadataRoute.Sitemap = circuitos.flatMap((circuito) => {
    const href = {
      pathname: "/circuitos/[id]",
      params: { id: circuito.id },
    } as const;

    return routing.locales.map((locale) => ({
      url: `${SITE_URL}${getPathname({ locale, href })}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      alternates: { languages: languagesFor(href) },
    }));
  });

  return [...staticPages, ...pasadiaPages, ...circuitoPages];
}
