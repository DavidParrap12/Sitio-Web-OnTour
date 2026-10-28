import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PasadiasEditorial } from "./PasadiasEditorial";
import { destinos } from "@/data/destinos";
import { buildAlternates, buildOpenGraph, buildTwitter, canonicalFor } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dayTrips" });
  const title = `${t("title")} | OnTour DMC Colombia`;
  const description = t("subtitle");

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/pasadias"),
    openGraph: buildOpenGraph({
      locale,
      title,
      description,
      url: canonicalFor(locale, "/pasadias"),
    }),
    twitter: buildTwitter({ title, description }),
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
