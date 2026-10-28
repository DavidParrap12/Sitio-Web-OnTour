import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ContactoEditorial } from "./ContactoEditorial";
import { buildAlternates, buildOpenGraph, buildTwitter, canonicalFor } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const title = `${t("metaTitle")} | OnTour DMC Colombia`;
  const description = t("metaDesc");

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/contacto"),
    openGraph: buildOpenGraph({
      locale,
      title,
      description,
      url: canonicalFor(locale, "/contacto"),
    }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function Contacto({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  return (
    <ContactoEditorial
      title={t("title")}
      subtitle={t("subtitle")}
      infoTitle={t("infoTitle")}
      infoSubtitle={t("infoSubtitle")}
      schedule={t("schedule")}
      support={t("support")}
      mainOffice={t("mainOffice")}
      mapTitle={t("mapTitle")}
    />
  );
}