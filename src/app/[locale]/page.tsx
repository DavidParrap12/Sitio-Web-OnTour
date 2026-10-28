import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { circuitos } from "@/data/circuitos";

import { HomeEditorial } from "./HomeEditorial";
import { JsonLd } from "@/components/JsonLd";
import { buildOrgSchema } from "@/lib/schema";
import { buildAlternates, buildOpenGraph, buildTwitter, canonicalFor } from "@/lib/seo";
import { siteMetadataFor } from "@/lib/siteMeta";

// Locale → canonical home URL (es has no prefix)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = siteMetadataFor(locale);
  const url = canonicalFor(locale, "/");

  return {
    alternates: buildAlternates(locale, "/"),
    openGraph: buildOpenGraph({
      locale,
      title: meta.ogTitle,
      description: meta.ogDesc,
      url,
    }),
    twitter: buildTwitter({
      title: meta.twTitle,
      description: meta.twDesc,
    }),
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tHero = await getTranslations("hero");
  const tCircuitos = await getTranslations("circuitosData");

  // All items for editorial carousel/rotation
  const allCircuitos = circuitos;

  const translations: Record<string, string> = {
    _locale: locale,
    "hero.tagline": tHero("tagline"),
    "hero.title1": tHero("title1"),
    "hero.title2": tHero("title2"),
    "hero.subtitle": tHero("subtitle"),
    "hero.ctaCircuits": tHero("ctaCircuits"),
    "hero.ctaContact": tHero("ctaContact"),
    memorableCircuits: t("memorableCircuits"),
    memorableCircuitsSubtitle: t("memorableCircuitsSubtitle"),
    viewAllCircuits: t("viewAllCircuits"),

    multiDayRoutes: t("multiDayRoutes"),

    ctaTitle: t("ctaTitle"),
    ctaSubtitle: t("ctaSubtitle"),
    ctaButton: t("ctaButton"),
  };

  const orgSchema = buildOrgSchema(locale);
  return (
    <>
      <JsonLd data={orgSchema} />
      <HomeEditorial
        circuitos={allCircuitos.map((c) => ({
          id: c.id,
          image: c.image,
          days: c.days,
          nights: c.nights,
          name: tCircuitos(`${c.id}.name`),
          description: tCircuitos(`${c.id}.description`),
          colorTheme: c.colorTheme,
        }))}
        t={translations}
      />
    </>
  );
}