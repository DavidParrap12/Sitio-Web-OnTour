import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { circuitos } from "@/data/circuitos";
import { routing } from "@/i18n/routing";
import { CheckCircle2, Clock, MapPin, Map } from "lucide-react";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    circuitos.map((c) => ({ locale, id: c.id }))
  );
}

export default async function CircuitoPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("circuitDetail");
  const circuito = circuitos.find((c) => c.id === id);

  if (!circuito) return notFound();

  const whatsappMessage = t("whatsappMessage", { name: circuito.name });
  const whatsappUrl = `https://wa.me/573000000000?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="pt-20 bg-secondary/50 min-h-screen pb-20">
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src={circuito.image}
          alt={circuito.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-6 text-white text-center">
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium tracking-wide mb-4">
              {t("badge")}
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 drop-shadow-md">
              {circuito.name}
            </h1>
            <div className="flex items-center justify-center gap-6 text-white/90 font-medium">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" /> {t("colombia")}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {t("daysNights", { days: circuito.days, nights: circuito.nights })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky top bar (desktop) */}
      <div className="container mx-auto px-4 md:px-6 -mt-16 relative z-10 hidden md:block">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between border border-gray-100">
          <div>
            <p className="text-sm text-foreground/60 font-medium">{t("investmentFrom")}</p>
            <p className="text-2xl font-bold text-primary">{t("toQuote")}</p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent hover:brightness-90 text-white px-8 py-3 rounded-full font-bold transition-all shadow-md hover:-translate-y-1"
          >
            {t("bookNow")}
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-12 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-heading font-bold mb-6 text-primary border-b pb-4">
                {t("tripDescription")}
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                {circuito.description}
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-heading font-bold mb-6 text-primary border-b pb-4">
                {t("youWillEnjoy")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {circuito.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                    <span className="text-foreground/80 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-heading font-bold mb-6 text-primary border-b pb-4">
                {t("itinerary")}
              </h2>
              <div className="space-y-6">
                {circuito.itinerary.map((day, idx) => {
                  const [dayLabel, ...desc] = day.split(":");
                  return (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                          {idx + 1}
                        </div>
                        {idx !== circuito.itinerary.length - 1 && (
                          <div className="flex-grow w-px bg-primary/20 my-2" />
                        )}
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-grow mb-4">
                        <h3 className="text-xl font-bold font-heading mb-2">{dayLabel}</h3>
                        <p className="text-foreground/70 leading-relaxed">{desc.join(":") || day}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-heading font-bold mb-6 text-primary">{t("tripSummary")}</h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">{t("duration")}</p>
                    <p className="font-semibold">
                      {t("daysNights", { days: circuito.days, nights: circuito.nights })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary text-primary flex items-center justify-center">
                    <Map className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">{t("location")}</p>
                    <p className="font-semibold">{t("nationalDest")}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 mb-8 text-center">
                <p className="text-sm text-foreground/60 mb-2">{t("pricePerPerson")}</p>
                <div className="text-4xl font-black text-primary mb-2">{t("priceLabel")}</div>
                <p className="text-xs text-foreground/50">{t("priceNote")}</p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex justify-center items-center gap-2 bg-accent hover:brightness-90 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-md"
              >
                {t("requestQuote")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
