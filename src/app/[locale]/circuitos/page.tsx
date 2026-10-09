import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { CircuitosEditorial } from "./CircuitosEditorial";
import { circuitos } from "@/data/circuitos";

// Localized path for the journeys listing (mirrors routing.ts)
const JOURNEYS_PATH: Record<string, string> = {
  es: "circuitos",
  en: "journeys",
  de: "rundreisen",
  fr: "circuits",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "circuits" });
  const ogImageUrl = "https://www.ontourdmc.com/image/portadas/Statues_at_San_Agust%C3%ADn_park_202608141341.jpeg";

  const path = JOURNEYS_PATH[locale] ?? "circuitos";
  const baseUrl = locale === "es"
    ? `https://www.ontourdmc.com/${path}`
    : `https://www.ontourdmc.com/${locale}/${path}`;

  return {
    title: `${t("title")} | OnTour DMC Colombia`,
    description: t("subtitle"),
    alternates: { canonical: baseUrl },
    openGraph: {
      title: `${t("title")} | OnTour DMC Colombia`,
      description: t("subtitle"),
      url: baseUrl,
      siteName: "Ontour DMC Colombia",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("title")} | OnTour DMC Colombia`,
      description: t("subtitle"),
      images: [ogImageUrl],
    },
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
