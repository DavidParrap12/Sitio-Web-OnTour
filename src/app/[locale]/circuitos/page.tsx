import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { CircuitosEditorial } from "./CircuitosEditorial";
import { circuitos } from "@/data/circuitos";

export default async function Circuitos({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("circuits");
  const tData = await getTranslations("circuitosData");

  const slides = circuitos.map((c) => ({
    id: c.id,
    image: c.image,
    days: c.days,
    nights: c.nights,
    name: tData(`${c.id}.name`),
    description: tData(`${c.id}.description`),
    price: tData(`${c.id}.price`),
    colorTheme: c.colorTheme,
  }));

  return (
    <CircuitosEditorial
      slides={slides}
      title={t("title")}
      subtitle={t("subtitle")}
    />
  );
}
