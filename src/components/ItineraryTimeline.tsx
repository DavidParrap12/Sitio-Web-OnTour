"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { X, ChevronLeft, ChevronRight, Maximize2, ChevronDown, ChevronsUpDown, Calendar } from "lucide-react";

interface DayImage {
  image: string;
  location: string;
}

interface ItineraryTimelineProps {
  itinerary: string[];
  dayImages: DayImage[];
  t: {
    close: string;
    photoOf: string;
    clickToEnlarge: string;
  };
}

const UI_TEXT: Record<string, {
  expandAll: string;
  collapseAll: string;
  daysTotal: (n: number) => string;
  dayLabel: string;
}> = {
  es: {
    expandAll: "Expandir todos",
    collapseAll: "Colapsar todos",
    daysTotal: (n) => `${n} Días de Itinerario`,
    dayLabel: "Día",
  },
  en: {
    expandAll: "Expand all",
    collapseAll: "Collapse all",
    daysTotal: (n) => `${n} Days Itinerary`,
    dayLabel: "Day",
  },
  fr: {
    expandAll: "Tout déplier",
    collapseAll: "Tout replier",
    daysTotal: (n) => `${n} Jours d'itinéraire`,
    dayLabel: "Jour",
  },
  de: {
    expandAll: "Alle ausklappen",
    collapseAll: "Alle einklappen",
    daysTotal: (n) => `${n} Tage Reiseplan`,
    dayLabel: "Tag",
  },
};

export default function ItineraryTimeline({
  itinerary,
  dayImages,
  t,
}: ItineraryTimelineProps) {
  const locale = useLocale();
  const ui = UI_TEXT[locale] || UI_TEXT.es;

  // By default, expand day 0 (first day) to give an immediate preview without infinite scrolling
  const [expandedDays, setExpandedDays] = useState<Set<number>>(() => new Set([0]));
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const toggleDay = (idx: number) => {
    setExpandedDays((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedDays(new Set(itinerary.map((_, i) => i)));
  };

  const collapseAll = () => {
    setExpandedDays(new Set());
  };

  const allExpanded = expandedDays.size === itinerary.length;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % dayImages.length);
  }, [lightboxIndex, dayImages.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + dayImages.length) % dayImages.length
    );
  }, [lightboxIndex, dayImages.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, goNext, goPrev]);

  return (
    <>
      <div className="space-y-4">
        {/* Accordion Controls Bar */}
        <div className="flex items-center justify-between bg-stone-100/80 rounded-xl px-4 py-3 border border-stone-200/80 mb-6">
          <div className="flex items-center gap-2 text-deep-forest text-xs sm:text-sm font-semibold">
            <Calendar className="w-4 h-4 text-muted-gold" />
            <span>{ui.daysTotal(itinerary.length)}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={allExpanded ? collapseAll : expandAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-700 hover:text-deep-forest bg-white hover:bg-stone-50 border border-stone-200 transition-colors shadow-xs min-h-[36px]"
            >
              <ChevronsUpDown className="w-3.5 h-3.5 text-muted-gold" />
              <span>{allExpanded ? ui.collapseAll : ui.expandAll}</span>
            </button>
          </div>
        </div>

        {/* Day-by-Day Accordion Rows */}
        <div className="space-y-3">
          {itinerary.map((day, idx) => {
            const [dayLabel, ...descParts] = day.split(":");
            const description = descParts.join(":").trim() || day;
            const dayImage = dayImages[idx];
            const isExpanded = expandedDays.has(idx);

            return (
              <div
                key={idx}
                id={`itinerary-day-${idx}`}
                className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:border-muted-gold/40 transition-colors"
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggleDay(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/60 transition-colors min-h-[56px]"
                  aria-expanded={isExpanded}
                  aria-controls={`day-content-${idx}`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    {/* Day Number Pill */}
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-colors ${
                      isExpanded
                        ? "bg-deep-forest text-warm-ivory"
                        : "bg-stone-100 text-stone-700"
                    }`}>
                      {idx + 1}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif text-base sm:text-lg font-semibold text-charcoal truncate">
                          {dayLabel}
                        </h3>
                        {dayImage?.location && (
                          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-deep-forest/5 text-deep-forest tracking-wider uppercase">
                            {dayImage.location}
                          </span>
                        )}
                      </div>
                      {!isExpanded && (
                        <p className="text-xs text-stone-400 line-clamp-1 mt-0.5 max-w-xl">
                          {description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {dayImage?.location && (
                      <span className="sm:hidden px-2 py-0.5 rounded-md text-[10px] font-semibold bg-stone-100 text-stone-600 tracking-wider uppercase">
                        {dayImage.location}
                      </span>
                    )}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-stone-500 bg-stone-100 transition-transform duration-300 ${
                      isExpanded ? "rotate-180 bg-muted-gold/20 text-deep-forest" : ""
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={`day-content-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-stone-100">
                        {/* Desktop Grid Layout */}
                        <div className="hidden md:grid md:grid-cols-[300px_1fr] lg:grid-cols-[360px_1fr] gap-6 items-start">
                          {/* Image Column */}
                          {dayImage && (
                            <button
                              type="button"
                              onClick={() => openLightbox(idx)}
                              className="group relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer block"
                              aria-label={t.clickToEnlarge}
                            >
                              <Image
                                src={dayImage.image}
                                alt={dayImage.location}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="360px"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                              <span className="absolute bottom-3 left-3 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-[0.15em] rounded-md">
                                {dayImage.location}
                              </span>
                              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Maximize2 className="w-4 h-4 text-white" />
                              </div>
                            </button>
                          )}

                          {/* Text Column */}
                          <div className="space-y-3 py-1">
                            <h4 className="font-serif text-lg font-semibold text-deep-forest">
                              {dayLabel}
                            </h4>
                            <p className="text-stone-600 leading-relaxed text-sm md:text-base font-light">
                              {description}
                            </p>
                          </div>
                        </div>

                        {/* Mobile Stack Layout */}
                        <div className="md:hidden space-y-3">
                          {dayImage && (
                            <button
                              type="button"
                              onClick={() => openLightbox(idx)}
                              className="group relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-sm cursor-pointer block"
                              aria-label={t.clickToEnlarge}
                            >
                              <Image
                                src={dayImage.image}
                                alt={dayImage.location}
                                fill
                                className="object-cover"
                                sizes="90vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                              <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-[0.15em] rounded-md">
                                {dayImage.location}
                              </span>
                              <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                <Maximize2 className="w-3.5 h-3.5 text-white" />
                              </div>
                            </button>
                          )}

                          <p className="text-stone-600 leading-relaxed text-sm font-light pt-1">
                            {description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* ======== LIGHTBOX MODAL ======== */}
      <AnimatePresence>
        {lightboxIndex !== null && dayImages[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            {/* Content */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -40) {
                  goNext();
                } else if (info.offset.x > 40) {
                  goPrev();
                }
              }}
              className="relative z-10 w-[92vw] h-[80vh] max-w-6xl cursor-grab active:cursor-grabbing touch-pan-y"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={dayImages[lightboxIndex].image}
                alt={dayImages[lightboxIndex].location}
                fill
                draggable={false}
                className="object-contain rounded-lg pointer-events-none select-none"
                sizes="92vw"
                priority
              />

              {/* Location label */}
              <div className="absolute bottom-6 left-6 px-5 py-2 bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl pointer-events-none select-none">
                <span className="text-white font-bold tracking-[0.15em] text-sm">
                  {dayImages[lightboxIndex].location}
                </span>
              </div>

              {/* Photo counter */}
              <div className="absolute bottom-6 right-6 px-4 py-2 bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl pointer-events-none select-none">
                <span className="text-white/90 text-sm font-medium">
                  {t.photoOf
                    .replace("__n__", String(lightboxIndex + 1))
                    .replace("__total__", String(dayImages.length))}
                </span>
              </div>
            </motion.div>

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors cursor-pointer min-h-[44px]"
              aria-label={t.close}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors cursor-pointer min-h-[44px]"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors cursor-pointer min-h-[44px]"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
