import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { SectionTitle } from "@/components/SectionTitle";
import { CircuitCarousel } from "@/components/CircuitCarousel";
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

  // Build slides data for the carousel
  const slides = circuitos.map((c) => ({
    id: c.id,
    image: c.image,
    days: c.days,
    nights: c.nights,
    name: tData(`${c.id}.name`),
    description: tData(`${c.id}.description`),
  }));

  return (
    <div className="pt-32 pb-16 min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title={t("title")}
          subtitle={t("subtitle")}
        />

        {/* Circuit Carousel */}
        <div className="mt-10">
          <CircuitCarousel slides={slides} />
        </div>
      </div>
    </div>
  );
}
