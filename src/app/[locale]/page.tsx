import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { CardDestino } from "@/components/CardDestino";
import { destinos } from "@/data/destinos";
import { circuitos } from "@/data/circuitos";

import dynamic from "next/dynamic";
import { Link } from "@/i18n/navigation";
import { HomeEditorial } from "./HomeEditorial";
import { JsonLd } from "@/components/JsonLd";
import { buildOrgSchema } from "@/lib/schema";

const Testimonials = dynamic(
  () => import("@/components/Testimonials").then((mod) => mod.Testimonials),
  { loading: () => <div className="py-16 md:py-24 bg-white" /> }
);

// Locale → canonical home URL (es has no prefix)
const HOME_URL: Record<string, string> = {
  es: "https://www.ontourdmc.com",
  en: "https://www.ontourdmc.com/en",
  de: "https://www.ontourdmc.com/de",
  fr: "https://www.ontourdmc.com/fr",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const url = HOME_URL[locale] ?? HOME_URL.es;
  return {
    alternates: { canonical: url },
    openGraph: { url },
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
  const tDestinos = await getTranslations("destinosData");
  const tCircuitos = await getTranslations("circuitosData");

  const topPasadias = destinos.slice(0, 3);
  const topCircuitos = circuitos.slice(0, 3);

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