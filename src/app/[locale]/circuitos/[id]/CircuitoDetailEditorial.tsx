"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, MapPin, Map, Calendar } from "lucide-react";
import { SectionReveal } from "@/components/editorial/SectionReveal";
import { HeroEditorial } from "@/components/editorial/HeroEditorial";
import { MagneticButton } from "@/components/editorial/MagneticButton";
import { BookingForm } from "@/components/BookingForm";
import { CircuitProgramDownloadDynamic } from "@/components/CircuitProgramDownloadDynamic";
import { type ExtensionItem } from "@/components/CircuitExtensions";
import { type DestinationTheme } from "@/lib/design-config";
import { useDestinationTheme } from "@/lib/hooks/useDestinationTheme";

// Below-the-fold: code-split
const ItineraryTimeline = dynamic(() => import("@/components/ItineraryTimeline"));
const CircuitExtensions = dynamic(
  () => import("@/components/CircuitExtensions").then((m) => ({ default: m.CircuitExtensions }))
);
const CircuitRouteMap = dynamic(
  () => import("@/components/CircuitRouteMap").then((m) => ({ default: m.default }))
);

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
  colorTheme?: DestinationTheme;
  mapEmbedUrl?: string;
  t: Record<string, string>;
}

export function CircuitoDetailEditorial({
  name, description, highlights, itinerary, image,
  days, nights, price, id, locale, dayImages,
  brochureUrl, brochurePdfUrl, departureDates, whatsappUrl,
  extensions = [], colorTheme, mapEmbedUrl,
  t,
}: CircuitoDetailEditorialProps) {
  const theme = useDestinationTheme(colorTheme);

  return (
    <div className="min-h-screen bg-white">
      {/* -- Hero ------------------------------------------------ */}
      <HeroEditorial
        variant="static"
        slides={[{ src: image, alt: name }]}
        gradeClass={theme.gradeClass}
        overlay="bottom"
        minHeight="65vh"
        align="end"
      >
        <div className="container mx-auto px-4 md:px-6 pb-14 md:pb-20">
          {colorTheme && (
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <motion.span
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="label inline-block py-2 px-4 rounded-full text-white font-semibold backdrop-blur-md shadow-sm"
                style={theme.badgeStyle}
              >
                {theme.label}
              </motion.span>
            </div>
          )}
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
      </HeroEditorial>

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
            <CircuitRouteMap mapEmbedUrl={mapEmbedUrl} circuitName={name} />

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

              <MagneticButton className="w-full block">
                <a
                  href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="w-full flex justify-center items-center gap-2 bg-editorial-accent text-white px-6 py-4 rounded-xl font-bold text-center shadow-editorial-md editorial-hover-rich editorial-hover-shift-dark"
                >
                  {t.requestQuote}
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
