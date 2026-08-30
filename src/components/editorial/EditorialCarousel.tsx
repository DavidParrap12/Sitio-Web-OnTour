"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type DestinationTheme } from "@/lib/design-config";
import { resolveDestinationTheme } from "@/lib/hooks/useDestinationTheme";

const BLUR_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";

// -- Public API -------------------------------------------------------------

export interface CarouselConfig {
  /** Image aspect ratio */
  aspectRatio: "4:5" | "16:9" | "1:1";
  /** Overlay content position (full-bleed variants) */
  contentPosition: "bottom" | "center" | "split";
  /** Bottom progress bar (requires autoplay for animation) */
  showProgress: boolean;
  /** Auto-advance slides */
  autoplay: boolean;
  /** Visual/behavioural preset */
  variant: "pasadia" | "circuito" | "editorial";
}

export interface CarouselItem {
  id: string;
  href: string;
  image: string;
  title: string;
  description?: string;
  /** Badge lines, e.g. duration or location */
  meta?: string[];
  colorTheme?: DestinationTheme;
}

interface EditorialCarouselProps {
  items: CarouselItem[];
  config: CarouselConfig;
  /** Custom slide body — overrides the built-in variant renderer */
  renderSlide?: (item: CarouselItem, index: number) => ReactNode;
  /** Autoplay interval in ms (default 5000) */
  intervalMs?: number;
  ariaLabel?: string;
  className?: string;
}

const ASPECT_CLASS: Record<CarouselConfig["aspectRatio"], string> = {
  "4:5": "aspect-[4/5]",
  "16:9": "aspect-video",
  "1:1": "aspect-square",
};

/** Full-bleed variants show one slide at a time with overlay content */
function isFullBleed(variant: CarouselConfig["variant"]) {
  return variant === "pasadia" || variant === "circuito";
}

/**
 * Unified editorial carousel — replaces PasadiaCarousel, CircuitCarousel
 * and CircuitosCarousel. Embla-powered (loop + drag + optional autoplay).
 * Respects prefers-reduced-motion by disabling autoplay.
 */
export function EditorialCarousel({
  items,
  config,
  renderSlide,
  intervalMs = 5000,
  ariaLabel = "Carrusel de destinos",
  className = "",
}: EditorialCarouselProps) {
  const fullBleed = isFullBleed(config.variant);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      dragFree: false,
      containScroll: "trimSnaps",
      watchDrag: true,
    },
    config.autoplay
      ? [Autoplay({ delay: intervalMs, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true })]
      : []
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  // Keyboard navigation scoped to the carousel region
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") scrollPrev();
    if (e.key === "ArrowRight") scrollNext();
  }

  const slideClass = fullBleed
    ? "flex-[0_0_100%] min-w-0 select-none"
    : "flex-[0_0_85%] min-w-0 sm:flex-[0_0_45%] lg:flex-[0_0_32%] select-none";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`relative group/carousel outline-none ${className}`}
    >
      {/* Viewport */}
      <div
        ref={emblaRef}
        className={`overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing ${
          fullBleed ? "rounded-2xl md:rounded-3xl shadow-2xl" : "rounded-2xl"
        }`}
      >
        <div className={`flex ${fullBleed ? "" : "gap-5"}`}>
          {items.map((item, i) => (
            <div key={item.id} className={slideClass} role="group" aria-roledescription="slide" aria-label={`${i + 1} / ${items.length}`}>
              {renderSlide ? (
                renderSlide(item, i)
              ) : fullBleed ? (
                <FullBleedSlide item={item} config={config} priority={i === 0} emblaApi={emblaApi} />
              ) : (
                <CardSlide item={item} aspectRatio={config.aspectRatio} emblaApi={emblaApi} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={scrollPrev}
        disabled={!emblaApi}
        aria-label="Anterior"
        className={
          fullBleed
            ? "absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-30"
            : "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-5 z-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-editorial-border flex items-center justify-center text-editorial-dark hover:bg-editorial-accent hover:text-white hover:border-editorial-accent transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        }
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        disabled={!emblaApi}
        aria-label="Siguiente"
        className={
          fullBleed
            ? "absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-30"
            : "absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-5 z-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-editorial-border flex items-center justify-center text-editorial-dark hover:bg-editorial-accent hover:text-white hover:border-editorial-accent transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        }
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div
        className={`flex items-center ${
          fullBleed
            ? "absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 gap-1.5 md:gap-2"
            : "justify-center gap-2 mt-6"
        }`}
      >
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Ir a slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === selectedIndex
                ? fullBleed
                  ? "w-6 h-2 bg-white"
                  : "w-8 h-2.5 bg-editorial-accent"
                : fullBleed
                  ? "w-2 h-2 bg-white/40 hover:bg-white/70"
                  : "w-2.5 h-2.5 bg-editorial-dark/20 hover:bg-editorial-dark/40"
            }`}
          />
        ))}
      </div>

      {/* Progress bar (full-bleed only) */}
      {config.showProgress && fullBleed && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-white/10 z-10 rounded-b-2xl overflow-hidden">
          {config.autoplay && (
            <motion.div
              key={`progress-${selectedIndex}`}
              className="h-full bg-editorial-accent-light"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: intervalMs / 1000, ease: "linear" }}
            />
          )}
        </div>
      )}
    </div>
  );
}

// -- Built-in slide renderers -------------------------------------------------

function FullBleedSlide({
  item,
  config,
  priority,
  emblaApi,
}: {
  item: CarouselItem;
  config: CarouselConfig;
  priority: boolean;
  emblaApi?: any;
}) {
  const theme = resolveDestinationTheme(item.colorTheme);
  const position =
    config.contentPosition === "center"
      ? "justify-center items-center text-center"
      : "justify-end";

  return (
    <Link
      href={item.href as never}
      onClickCapture={(e) => {
        if (emblaApi && !emblaApi.clickAllowed()) {
          e.preventDefault();
        }
      }}
      className="group relative block w-full aspect-[16/7] max-h-[80vh] min-h-[320px] overflow-hidden select-none"
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="100vw"
        draggable={false}
        className={`object-cover editorial-scale-target transition-transform duration-700 group-hover:scale-[1.04] pointer-events-none select-none ${theme.gradeClass}`}
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
        priority={priority}
      />
      <div className="absolute inset-0 editorial-overlay-gradient opacity-90 pointer-events-none" />

      <div className={`absolute inset-0 flex flex-col p-6 sm:p-8 md:p-12 ${position}`}>
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl pointer-events-none"
        >
          {(item.meta?.length || item.colorTheme) && (
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {item.meta?.map((m) => (
                <span
                  key={m}
                  className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-white/90 text-xs md:text-sm font-medium"
                >
                  {m}
                </span>
              ))}
              {item.colorTheme && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm" style={theme.badgeStyle}>
                  {theme.label}
                </span>
              )}
            </div>
          )}
          <h3 className="heading-1 text-white mb-2 drop-shadow-lg">{item.title}</h3>
          {item.description && (
            <p className="hidden sm:block body text-white/80 line-clamp-2 md:line-clamp-3 mb-5 max-w-xl">
              {item.description}
            </p>
          )}
          <span className="inline-flex items-center gap-2 bg-white text-editorial-dark px-5 py-2.5 md:px-6 md:py-3 rounded-full font-semibold text-xs md:text-sm editorial-hover-rich w-fit">
            Ver más
            <span aria-hidden>→</span>
          </span>
        </motion.div>
      </div>
    </Link>
  );
}

function CardSlide({
  item,
  aspectRatio,
  emblaApi,
}: {
  item: CarouselItem;
  aspectRatio: CarouselConfig["aspectRatio"];
  emblaApi?: any;
}) {
  const theme = resolveDestinationTheme(item.colorTheme);

  return (
    <Link
      href={item.href as never}
      onClickCapture={(e) => {
        if (emblaApi && !emblaApi.clickAllowed()) {
          e.preventDefault();
        }
      }}
      className="group block bg-editorial-warm rounded-2xl overflow-hidden border border-editorial-border editorial-hover-lift select-none"
      style={theme.style}
    >
      {/* Theme accent hairline */}
      <div
        className="h-1 w-full opacity-80 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: theme.color }}
      />
      <div className={`relative overflow-hidden editorial-hover-scale ${ASPECT_CLASS[aspectRatio]}`}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          draggable={false}
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 32vw"
          className={`object-cover editorial-scale-target transition-transform duration-700 pointer-events-none select-none ${theme.gradeClass}`}
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
        {item.meta?.[0] && (
          <div className="absolute top-4 left-4 bg-editorial-dark/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold">
            {item.meta[0]}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="heading-2 text-editorial-dark mb-2 group-hover:text-[var(--theme-accent)] transition-colors">
          {item.title}
        </h3>
        {item.description && (
          <p className="caption text-editorial-muted line-clamp-2">{item.description}</p>
        )}
      </div>
    </Link>
  );
}
