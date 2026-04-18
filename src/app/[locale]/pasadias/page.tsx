import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { SectionTitle } from "@/components/SectionTitle";
import { PasadiaCarousel } from "@/components/PasadiaCarousel";
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

  // Build slides data for the carousel
  const slides = destinos.map((d) => ({
    id: d.id,
    image: d.image,
    name: tData(`${d.id}.name`),
    description: tData(`${d.id}.description`),
    duration: tData(`${d.id}.duration`),
    brochureUrl: d.brochureUrl,
  }));

  return (
    <div className="pt-32 pb-16 min-h-screen bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title={t("title")}
          subtitle={t("subtitle")}
        />

        {/* Pasadía Carousel */}
        <div className="mt-10">
          <PasadiaCarousel slides={slides} />
        </div>
      </div>
    </div>
  );
}
