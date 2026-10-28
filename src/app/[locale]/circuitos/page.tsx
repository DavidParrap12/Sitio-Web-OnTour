import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { CircuitosEditorial } from "./CircuitosEditorial";
import { circuitos } from "@/data/circuitos";
import { buildAlternates, buildOpenGraph, buildTwitter, canonicalFor } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "circuits" });
  const title = `${t("title")} | OnTour DMC Colombia`;
  const description = t("subtitle");

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/circuitos"),
    openGraph: buildOpenGraph({
      locale,
      title,
      description,
      url: canonicalFor(locale, "/circuitos"),
    }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function Circuitos({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("circuits");
  const tData = await getTranslations("circuitosData");

  const slides = circuitos.map((c) => {
    let highlights: string[] = [];
    try {
      highlights = (tData.raw(`${c.id}.highlights`) as string[]) || [];
    } catch {
      highlights = [];
    }

    const regionMap: Record<string, string> = {
      "epoca-precolombina-sur-colombia": "sur",
      "tour-colombia-corazon-andes": "cafetero",
      "tour-colombia-boyaca-colonial": "boyaca",
      "tour-colombia-tres-ciudades": "caribe",
      "tour-colombia-capitales-cafeteras": "cafetero",
      "tour-camino-real": "tolima",
      "tour-colombia-eje-cafetero": "cafetero",
      "tour-tras-leyenda-dorado": "tolima",
      "tour-santander-expedicion-aventurera": "santander",
    };

    return {
      id: c.id,
      image: c.image,
      days: c.days,
      nights: c.nights,
      name: tData(`${c.id}.name`),
      description: tData(`${c.id}.description`),
      price: tData(`${c.id}.price`),
      colorTheme: c.colorTheme,
      highlights,
      region: regionMap[c.id] || "andes",
    };
  });

  return (
    <CircuitosEditorial
      slides={slides}
      title={t("title")}
      subtitle={t("subtitle")}
    />
  );
}
