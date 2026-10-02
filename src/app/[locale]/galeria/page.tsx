import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { GaleriaEditorial } from "./GaleriaEditorial";
import { getGalleryImages, getGalleryCategories } from "@/data/gallery";

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
