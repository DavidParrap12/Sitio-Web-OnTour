"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock, MapPin, Map, Calendar, MessageCircle, Send, ArrowRight } from "lucide-react";
import { SectionReveal } from "@/components/editorial/SectionReveal";
import { HeroEditorial } from "@/components/editorial/HeroEditorial";
import { MagneticButton } from "@/components/editorial/MagneticButton";
import { BookingForm } from "@/components/BookingForm";
import { CircuitProgramDownloadDynamic } from "@/components/CircuitProgramDownloadDynamic";
import { RequestQuoteModal } from "@/components/RequestQuoteModal";
import { type ExtensionItem } from "@/components/CircuitExtensions";
import { type DestinationTheme } from "@/lib/design-config";
import { useDestinationTheme } from "@/lib/hooks/useDestinationTheme";
import { trackStickyBarInteraction, trackRequestQuoteClick, trackWhatsAppClick } from "@/lib/analytics";

// Below-the-fold: code-split
const ItineraryTabs = dynamic(
  () => import("@/components/editorial/ItineraryTabs").then((m) => ({ default: m.ItineraryTabs }))
);
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

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    let trackedImpression = false;
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyBar(true);
        if (!trackedImpression) {
          trackedImpression = true;
          trackStickyBarInteraction("impression", name);
        }
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [name]);

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
                <h2 className="display-2 text-editorial-dark mb-8 pb-4 border-b border-editorial-border">{t.itinerary}</h2>
                <ItineraryTabs
                  itinerary={itinerary}
                  highlights={highlights}
                  dayImages={dayImages || []}
                  t={{
                    tabItinerary: t.itinerary,
                    tabHighlights: t.youWillEnjoy,
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
            <CircuitRouteMap
              mapEmbedUrl={mapEmbedUrl}
              circuitName={name}
              title={t.routeMapTitle}
              subtitle={t.routeMapSubtitle}
            />

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

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    trackRequestQuoteClick("circuit_detail_sidebar");
                    setIsQuoteModalOpen(true);
                  }}
                  className="group/btn w-full flex justify-center items-center gap-2 bg-deep-forest text-warm-ivory hover:bg-muted-gold hover:text-charcoal px-6 py-4 rounded-xl font-medium tracking-wide text-center shadow-md transition-all cursor-pointer min-h-[48px]"
                >
                  <span>{t.requestQuote}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("circuit_detail_sidebar", name)}
                  className="w-full flex justify-center items-center gap-2 border border-stone-300 text-stone-700 hover:bg-stone-50 px-6 py-3.5 rounded-xl font-semibold text-center text-sm transition-colors min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp (SLA 24h)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -- Sticky Bottom Quote Bar ---------------------------- */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.aside
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Barra de cotización rápida"
            className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-2xl py-3 px-4 sm:px-6"
          >
            <div className="container mx-auto max-w-6xl flex items-center justify-between gap-4">
              {/* Tour thumbnail & title */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden shrink-0 hidden sm:block border border-stone-200">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif text-sm sm:text-base font-semibold text-charcoal truncate">
                    {name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="font-medium text-deep-forest">{days}D / {nights}N</span>
                    <span>•</span>
                    <span className="font-semibold text-stone-900">{price}</span>
                  </div>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackStickyBarInteraction("whatsapp_click", name);
                    trackWhatsAppClick("circuit_detail_sticky", name);
                  }}
                  className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-stone-300 text-charcoal text-xs font-semibold hover:bg-stone-50 transition-colors min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp (24h)</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    trackStickyBarInteraction("quote_click", name);
                    trackRequestQuoteClick("circuit_detail_sticky");
                    setIsQuoteModalOpen(true);
                  }}
                  className="group/btn inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-deep-forest text-warm-ivory text-xs sm:text-sm font-medium tracking-wide hover:bg-muted-gold hover:text-charcoal transition-all shadow-md min-h-[44px] cursor-pointer"
                >
                  <span>{t.requestQuote || "Solicitar Cotización"}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Preloaded 3-Click Request Quote Modal */}
      <RequestQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        preselectedExperience="circuits"
        preselectedItem={name}
      />
    </div>
  );
}
