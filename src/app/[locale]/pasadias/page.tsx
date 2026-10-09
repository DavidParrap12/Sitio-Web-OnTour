import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PasadiasEditorial } from "./PasadiasEditorial";
import { destinos } from "@/data/destinos";

const DAY_TRIPS_PATH: Record<string, string> = {
  es: "pasadias",
  en: "day-trips",
  de: "tagesausfluege",
  fr: "excursions",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dayTrips" });
  const path = DAY_TRIPS_PATH[locale] ?? "pasadias";
  const baseUrl = locale === "es"
    ? `https://www.ontourdmc.com/${path}`
    : `https://www.ontourdmc.com/${locale}/${path}`;
  return {
    title: `${t("title")} | OnTour DMC Colombia`,
    description: t("subtitle"),
    alternates: { canonical: baseUrl },
    openGraph: { url: baseUrl },
  };
}

export default async function Pasadias({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("dayTrips");
  const tData = await getTranslations("destinosData");

  const slides = destinos.map((d) => ({
    id: d.id,
    image: d.image,
    name: tData(`${d.id}.name`),
    description: tData(`${d.id}.description`),
    duration: tData(`${d.id}.duration`),
    brochureUrl: d.brochureUrl,
    colorTheme: d.colorTheme,
  }));

  return (
    <PasadiasEditorial
      slides={slides}
      title={t("title")}
      subtitle={t("subtitle")}
    />
  );
}
