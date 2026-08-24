import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ReconocimientosGallery } from "@/components/ReconocimientosGallery";
import { NosotrosEditorial } from "./NosotrosEditorial";

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
    />
  );
}