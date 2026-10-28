import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { GaleriaEditorial } from "./GaleriaEditorial";
import { getGalleryImages, getGalleryCategories } from "@/data/gallery";
import { buildAlternates, buildOpenGraph, buildTwitter, canonicalFor } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  const title = `${t("title")} | OnTour DMC Colombia`;
  const description = t("subtitle");

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/galeria"),
    openGraph: buildOpenGraph({
      locale,
      title,
      description,
      url: canonicalFor(locale, "/galeria"),
    }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function GaleriaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("gallery");

  const images = getGalleryImages(locale);
  const categories = getGalleryCategories(locale);

  return (
    <GaleriaEditorial
      images={images}
      categories={categories}
      title={t("title")}
      subtitle={t("subtitle")}
      filterAllLabel={t("all")}
    />
  );
}
