import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ReconocimientosGallery } from "@/components/ReconocimientosGallery";
import { NosotrosEditorial } from "./NosotrosEditorial";

const ABOUT_PATH: Record<string, string> = {
  es: "nosotros", en: "about", de: "ueber-uns", fr: "a-propos",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const path = ABOUT_PATH[locale] ?? "nosotros";
  const url = locale === "es"
    ? `https://www.ontourdmc.com/${path}`
    : `https://www.ontourdmc.com/${locale}/${path}`;
  return {
    title: `${t("title")} | OnTour DMC Colombia`,
    description: t("subtitle"),
    alternates: { canonical: url },
    openGraph: { url },
  };
}

export default async function Nosotros({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");

  return (
    <NosotrosEditorial
      title={t("title")}
      subtitle={t("subtitle")}
      missionTitle={t("missionTitle")}
      missionText={t("missionText")}
      visionTitle={t("visionTitle")}
      visionText={t("visionText")}
      recognitionsTitle={t("recognitionsTitle")}
      recognitionsSubtitle={t("recognitionsSubtitle")}
      recognitionsClose={t("recognitionsClose")}
      locale={locale}
    />
  );
}