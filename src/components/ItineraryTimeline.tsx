"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

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

export default function ItineraryTimeline({
  itinerary,
  dayImages,
  t,
}: ItineraryTimelineProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
      <div className="space-y-0">
        {itinerary.map((day, idx) => {
          const [dayLabel, ...descParts] = day.split(":");
          const description = descParts.join(":").trim() || day;
          const dayImage = dayImages[idx];

          return (
            <div key={idx} className="itinerary-day-row">
              {/* === DESKTOP LAYOUT (lg+) === */}
              <div className="hidden lg:grid lg:grid-cols-[1fr_48px_1fr] lg:gap-0 lg:items-stretch min-h-[280px]">
                {/* Image Column */}
                <div className="relative pr-4 py-4">
                  {dayImage && (
                    <button
                      onClick={() => openLightbox(idx)}
                      className="group relative w-full h-full min-h-[240px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer block"
                      aria-label={t.clickToEnlarge}
                    >
                      <Image
                        src={dayImage.image}
                        alt={dayImage.location}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 45vw, 100vw"
                      />
                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                      {/* Location label */}
                      <span className="absolute bottom-4 left-4 px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-bold tracking-[0.15em] rounded-lg">
                        {dayImage.location}
                      </span>

                      {/* Enlarge icon on hover */}
                      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Maximize2 className="w-4 h-4 text-white" />
                      </div>
                    </button>
                  )}
                </div>

                {/* Timeline Connector */}
                <div className="flex flex-col items-center relative">
                  {/* Top line */}
                  {idx !== 0 && (
                    <div className="w-[2px] bg-gradient-to-b from-primary/20 to-primary/40 flex-grow" />
                  )}
                  {idx === 0 && <div className="flex-grow" />}

                  {/* Circle */}
                  <div className="relative z-10 w-11 h-11 rounded-full border-[3px] border-primary bg-white flex items-center justify-center shadow-sm shrink-0">
                    <span className="text-xs font-bold text-primary">
                      {idx + 1}
                    </span>
                  </div>

                  {/* Bottom line */}
                  {idx !== itinerary.length - 1 && (
                    <div className="w-[2px] bg-gradient-to-b from-primary/40 to-primary/20 flex-grow" />
                  )}
                  {idx === itinerary.length - 1 && <div className="flex-grow" />}
                </div>

                {/* Text Column */}
                <div className="flex items-center pl-4 py-4">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-accent mb-3 leading-snug">
                      {dayLabel}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed text-[15px]">
                      {description}
                    </p>
                  </div>
                </div>
              </div>

              {/* === MOBILE / TABLET LAYOUT (<lg) === */}
              <div className="lg:hidden">
                <div className="flex gap-3">
                  {/* Timeline connector (left) */}
                  <div className="flex flex-col items-center shrink-0">
                    {idx !== 0 && (
                      <div className="w-[2px] bg-primary/20 h-4" />
                    )}
                    {idx === 0 && <div className="h-4" />}

                    <div className="w-9 h-9 rounded-full border-[3px] border-primary bg-white flex items-center justify-center shadow-sm shrink-0 z-10">
                      <span className="text-[11px] font-bold text-primary">
                        {idx + 1}
                      </span>
                    </div>

                    {idx !== itinerary.length - 1 && (
                      <div className="w-[2px] bg-primary/20 flex-grow min-h-[16px]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-grow pb-6 pt-1">
                    <h3 className="text-lg font-bold font-heading text-accent mb-3">
                      {dayLabel}
                    </h3>

                    {/* Image */}
                    {dayImage && (
                      <button
                        onClick={() => openLightbox(idx)}
                        className="group relative w-full h-48 sm:h-56 rounded-xl overflow-hidden shadow-md mb-3 cursor-pointer block"
                        aria-label={t.clickToEnlarge}
                      >
                        <Image
                          src={dayImage.image}
                          alt={dayImage.location}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 1023px) 90vw, 45vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-3 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-[0.15em] rounded-md">
                          {dayImage.location}
                        </span>
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Maximize2 className="w-3.5 h-3.5 text-white" />
                        </div>
                      </button>
                    )}

                    <p className="text-foreground/70 leading-relaxed text-sm">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-[92vw] h-[80vh] max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={dayImages[lightboxIndex].image}
                alt={dayImages[lightboxIndex].location}
                fill
                className="object-contain rounded-lg"
                sizes="92vw"
                priority
              />

              {/* Location label */}
              <div className="absolute bottom-6 left-6 px-5 py-2 bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl">
                <span className="text-white font-bold tracking-[0.15em] text-sm">
                  {dayImages[lightboxIndex].location}
                </span>
              </div>

              {/* Photo counter */}
              <div className="absolute bottom-6 right-6 px-4 py-2 bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl">
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
              className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors cursor-pointer"
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
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
