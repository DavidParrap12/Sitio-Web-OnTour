import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { NosotrosEditorial } from "./NosotrosEditorial";
import { buildAlternates, buildOpenGraph, buildTwitter, canonicalFor } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const title = `${t("title")} | OnTour DMC Colombia`;
  const description = t("subtitle");

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/nosotros"),
    openGraph: buildOpenGraph({
      locale,
      title,
      description,
      url: canonicalFor(locale, "/nosotros"),
    }),
    twitter: buildTwitter({ title, description }),
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