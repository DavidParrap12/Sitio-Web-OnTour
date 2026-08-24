import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PasadiasEditorial } from "./PasadiasEditorial";
import { destinos } from "@/data/destinos";

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
