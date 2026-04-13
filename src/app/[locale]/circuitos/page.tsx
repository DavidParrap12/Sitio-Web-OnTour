import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { SectionTitle } from "@/components/SectionTitle";
import { CircuitCarousel } from "@/components/CircuitCarousel";
import { BookingForm } from "@/components/BookingForm";
import { circuitos } from "@/data/circuitos";
import { fetchDepartureDates } from "@/lib/googleSheets";

export default async function Circuitos({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("circuits");
  const tData = await getTranslations("circuitosData");

  // Fetch departure dates from Google Sheets (or fallback)
  const departureDates = await fetchDepartureDates();

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
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title={t("title")}
          subtitle={t("subtitle")}
        />

        {/* Booking Form */}
        <div className="mt-10 mb-12">
          <BookingForm locale={locale} departureDates={departureDates} />
        </div>

        {/* Circuit Carousel */}
        <div className="mt-0">
          <CircuitCarousel slides={slides} />
        </div>
      </div>
    </div>
  );
}
