"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, MapPin, Map, Calendar } from "lucide-react";
import { SectionReveal } from "@/components/editorial/SectionReveal";
import ItineraryTimeline from "@/components/ItineraryTimeline";
import CircuitRouteMap from "@/components/CircuitRouteMap";
import { BookingForm } from "@/components/BookingForm";
import { CircuitProgramDownloadDynamic } from "@/components/CircuitProgramDownloadDynamic";
import { CircuitExtensions, type ExtensionItem } from "@/components/CircuitExtensions";

interface CircuitoDetailEditorialProps {
  name: string;
  description: string;
  highlights: string[];
  itinerary: string[];
  image: string;
  days: number;
  nights: number;
  price: string;
  id: string;
  locale: string;
  dayImages?: { image: string; location: string }[];
  brochureUrl?: string;
  brochurePdfUrl?: string;
  departureDates: Record<string, number>;
  whatsappUrl: string;
  extensions?: ExtensionItem[];
  t: Record<string, string>;
}

export function CircuitoDetailEditorial({
  name, description, highlights, itinerary, image,
  days, nights, price, id, locale, dayImages,
  brochureUrl, brochurePdfUrl, departureDates, whatsappUrl,
  extensions = [],
  t,
}: CircuitoDetailEditorialProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* -- Hero ------------------------------------------------ */}
      <div className="relative h-[65vh] md:h-[70vh] flex items-end overflow-hidden">
        <Image src={image} alt={name} fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-editorial-dark/90 via-editorial-dark/40 to-transparent" />
        <div className="absolute inset-0 editorial-overlay-vignette" />

        <div className="relative z-10 container mx-auto px-4 md:px-6 pb-14 md:pb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="label inline-block py-2 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 mb-5"
          >
            {t.badge}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="display-1 text-white mb-5"
          >
            {name}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap items-center gap-5 text-white/80"
          >
            <span className="flex items-center gap-2"><MapPin className="w-5 h-5" /> {t.colombia}</span>
            <span className="flex items-center gap-2"><Calendar className="w-5 h-5" /> {t.daysNights}</span>
          </motion.div>
        </div>
      </div>

      {/* -- Booking Form (overlapping hero) --------------------- */}
      <div className="container mx-auto px-4 md:px-6 -mt-20 relative z-10 max-w-6xl">
        <BookingForm locale={locale} departureDates={departureDates} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 mt-16 md:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-16">
            <SectionReveal>
              <section>
                <h2 className="display-2 text-editorial-dark mb-6 pb-4 border-b border-editorial-border">{t.tripDescription}</h2>
                <p className="body-lg text-editorial-muted">{description}</p>
              </section>
            </SectionReveal>

            <SectionReveal>
              <section>
                <h2 className="display-2 text-editorial-dark mb-8 pb-4 border-b border-editorial-border">{t.youWillEnjoy}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {highlights.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="flex items-start gap-3 bg-editorial-warm p-5 rounded-xl border border-editorial-border"
                    >
                      <CheckCircle2 className="w-6 h-6 text-editorial-accent shrink-0 mt-0.5" />
                      <span className="body text-editorial-dark font-medium">{h}</span>
                    </motion.div>
                  ))}
                </div>
              </section>
            </SectionReveal>

            <SectionReveal>
              <section>
                <h2 className="display-2 text-editorial-dark mb-8 pb-4 border-b border-editorial-border">{t.itinerary}</h2>
                <ItineraryTimeline
                  itinerary={itinerary}
                  dayImages={dayImages || []}
                  t={{
                    close: t.galleryClose,
                    photoOf: t.galleryPhotoOf,
                    clickToEnlarge: t.galleryClickToEnlarge,
                  }}
                />
              </section>
            </SectionReveal>

            {/* Optional extensions — only renders when linked pasadías exist */}
            {extensions.length > 0 && (
              <CircuitExtensions
                extensions={extensions}
                circuitName={name}
                whatsappNumber="573143415177"
                t={{
                  sectionLabel: t.extensionsSectionLabel,
                  sectionTitle: t.extensionsSectionTitle,
                  addToQuote: t.extensionsAddToQuote,
                  from: t.extensionsFrom,
                  perPerson: t.extensionsPerPerson,
                  whatsappTemplate: t.extensionsWhatsappTemplate,
                }}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <CircuitRouteMap dayImages={dayImages || []} circuitName={name} />

            <div className="sticky top-28 bg-editorial-warm p-8 rounded-3xl border border-editorial-border">
              <h3 className="heading-1 text-editorial-dark mb-6">{t.tripSummary}</h3>

              <div className="space-y-5 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-editorial-accent/10 text-editorial-accent flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="caption">{t.duration}</p>
                    <p className="font-semibold text-editorial-dark">{t.daysNights}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-editorial-accent/10 text-editorial-accent flex items-center justify-center">
                    <Map className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="caption">{t.location}</p>
                    <p className="font-semibold text-editorial-dark">{t.nationalDest}</p>
                  </div>
                </div>
              </div>

              <CircuitProgramDownloadDynamic
                name={name} slug={id} description={description}
                highlights={highlights} itinerary={itinerary}
                days={days} nights={nights} price={price}
                brochureUrl={brochureUrl} brochurePdfUrl={brochurePdfUrl}
                labels={{
                  downloadPdf: t.downloadPdf, downloadWord: t.downloadWord,
                  downloadProgram: t.downloadProgram, generating: t.generating, downloaded: t.downloaded,
                  tripDescription: t.tripDescription, youWillEnjoy: t.youWillEnjoy,
                  itineraryLabel: t.itinerary, duration: t.duration,
                  daysNights: t.daysNights, priceLabel: t.pricePerPerson,
                }}
              />

              <div className="border-t border-editorial-border pt-6 mb-8 text-center">
                <p className="caption mb-2">{t.pricePerPerson}</p>
                <div className="display-2 text-editorial-accent mb-2" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>{price}</div>
                <p className="text-xs text-editorial-muted-light">{t.priceNote}</p>
              </div>

              <a
                href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="w-full flex justify-center items-center gap-2 bg-editorial-accent hover:bg-editorial-accent-hover text-white px-6 py-4 rounded-xl font-bold transition-all shadow-editorial-md hover:shadow-editorial-lg"
              >
                {t.requestQuote}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
