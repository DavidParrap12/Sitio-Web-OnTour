"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { EditorialSection } from "@/components/editorial/EditorialSection";
import { ParallaxFloat } from "@/components/editorial/ParallaxFloat";
import { HeroCircuitPreview } from "@/components/editorial/HeroCircuitPreview";
import { IMAGE_SIZES, type DestinationTheme } from "@/lib/design-config";
import { resolveDestinationTheme } from "@/lib/hooks/useDestinationTheme";
import { Calendar, ArrowRight, Filter, X, MapPin, Compass } from "lucide-react";

const BLUR_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";

export interface CircuitSlide {
  id: string;
  image: string;
  days: number;
  nights: number;
  name: string;
  description: string;
  price: string;
  colorTheme?: DestinationTheme;
  highlights?: string[];
  region?: string;
}

interface CircuitosEditorialProps {
  slides: CircuitSlide[];
  title: string;
  subtitle: string;
  heroImage?: string;
}

const UI_TEXT: Record<string, {
  filterBy: string;
  all: string;
  duration: string;
  durations: { id: string; label: string }[];
  region: string;
  regions: { id: string; label: string }[];
  style: string;
  styles: { id: string; label: string }[];
  viewJourney: string;
  fromUsd: string;
  resultsCount: (count: number) => string;
  clearFilters: string;
  noResultsTitle: string;
  noResultsSub: string;
}> = {
  es: {
    filterBy: "Filtrar por",
    all: "Todos",
    duration: "Duración",
    durations: [
      { id: "all", label: "Cualquier duración" },
      { id: "short", label: "5 - 8 días" },
      { id: "medium", label: "9 - 12 días" },
      { id: "long", label: "13+ días" },
    ],
    region: "Región",
    regions: [
      { id: "all", label: "Todas las regiones" },
      { id: "cafetero", label: "Eje Cafetero" },
      { id: "tolima", label: "Tolima & Andes" },
      { id: "boyaca", label: "Boyacá Colonial" },
      { id: "sur", label: "Sur Ancestral (Huila/San Agustín)" },
      { id: "caribe", label: "Caribe & Ciudades" },
      { id: "santander", label: "Santander Aventura" },
    ],
    style: "Estilo",
    styles: [
      { id: "all", label: "Todos los estilos" },
      { id: "cultura", label: "Cultura & Historia" },
      { id: "naturaleza", label: "Naturaleza & Paisajes" },
      { id: "aventura", label: "Aventura & Senderos" },
      { id: "urbano", label: "Urbano & Patrimonial" },
    ],
    viewJourney: "Ver Circuito",
    fromUsd: "Desde USD",
    resultsCount: (c) => `${c} ${c === 1 ? "circuito disponible" : "circuitos curados disponibles"}`,
    clearFilters: "Restablecer filtros",
    noResultsTitle: "No se encontraron circuitos con estos filtros",
    noResultsSub: "Prueba seleccionando otra combinación o restablece los filtros.",
  },
  en: {
    filterBy: "Filter by",
    all: "All",
    duration: "Duration",
    durations: [
      { id: "all", label: "Any duration" },
      { id: "short", label: "5 - 8 days" },
      { id: "medium", label: "9 - 12 days" },
      { id: "long", label: "13+ days" },
    ],
    region: "Region",
    regions: [
      { id: "all", label: "All regions" },
      { id: "cafetero", label: "Coffee Region" },
      { id: "tolima", label: "Tolima & Andes" },
      { id: "boyaca", label: "Colonial Boyacá" },
      { id: "sur", label: "Ancestral South (San Agustín)" },
      { id: "caribe", label: "Caribbean & Cities" },
      { id: "santander", label: "Santander Adventure" },
    ],
    style: "Travel Style",
    styles: [
      { id: "all", label: "All styles" },
      { id: "cultura", label: "Culture & Heritage" },
      { id: "naturaleza", label: "Nature & Wilderness" },
      { id: "aventura", label: "Adventure & Trails" },
      { id: "urbano", label: "Urban & Colonial" },
    ],
    viewJourney: "View Journey",
    fromUsd: "From USD",
    resultsCount: (c) => `${c} ${c === 1 ? "journey available" : "curated journeys available"}`,
    clearFilters: "Reset filters",
    noResultsTitle: "No journeys match your criteria",
    noResultsSub: "Try adjusting your filters or resetting them to view all journeys.",
  },
  fr: {
    filterBy: "Filtrer par",
    all: "Tous",
    duration: "Durée",
    durations: [
      { id: "all", label: "Toute durée" },
      { id: "short", label: "5 - 8 jours" },
      { id: "medium", label: "9 - 12 jours" },
      { id: "long", label: "13+ jours" },
    ],
    region: "Région",
    regions: [
      { id: "all", label: "Toutes les régions" },
      { id: "cafetero", label: "Région du Café" },
      { id: "tolima", label: "Tolima & Andes" },
      { id: "boyaca", label: "Boyacá Colonial" },
      { id: "sur", label: "Sud Ancestral" },
      { id: "caribe", label: "Caraïbes & Villes" },
      { id: "santander", label: "Santander Aventure" },
    ],
    style: "Style de voyage",
    styles: [
      { id: "all", label: "Tous les styles" },
      { id: "cultura", label: "Culture & Histoire" },
      { id: "naturaleza", label: "Nature & Sauvage" },
      { id: "aventura", label: "Aventure & Randonnée" },
      { id: "urbano", label: "Urbain & Colonial" },
    ],
    viewJourney: "Voir le Circuit",
    fromUsd: "À partir de USD",
    resultsCount: (c) => `${c} ${c === 1 ? "circuit disponible" : "circuits disponibles"}`,
    clearFilters: "Réinitialiser",
    noResultsTitle: "Aucun circuit trouvé",
    noResultsSub: "Essayez de modifier vos filtres ou de les réinitialiser.",
  },
  de: {
    filterBy: "Filtern nach",
    all: "Alle",
    duration: "Dauer",
    durations: [
      { id: "all", label: "Beliebige Dauer" },
      { id: "short", label: "5 - 8 Tage" },
      { id: "medium", label: "9 - 12 Tage" },
      { id: "long", label: "13+ Tage" },
    ],
    region: "Region",
    regions: [
      { id: "all", label: "Alle Regionen" },
      { id: "cafetero", label: "Kaffeeregion" },
      { id: "tolima", label: "Tolima & Anden" },
      { id: "boyaca", label: "Koloniales Boyacá" },
      { id: "sur", label: "Ahnen-Süden" },
      { id: "caribe", label: "Karibik & Städte" },
      { id: "santander", label: "Santander Abenteuer" },
    ],
    style: "Reisestil",
    styles: [
      { id: "all", label: "Alle Stile" },
      { id: "cultura", label: "Kultur & Geschichte" },
      { id: "naturaleza", label: "Natur & Landschaften" },
      { id: "aventura", label: "Abenteuer & Pfade" },
      { id: "urbano", label: "Städtisch & Kolonial" },
    ],
    viewJourney: "Reise ansehen",
    fromUsd: "Ab USD",
    resultsCount: (c) => `${c} ${c === 1 ? "Reise verfügbar" : "Reisen verfügbar"}`,
    clearFilters: "Filter zurücksetzen",
    noResultsTitle: "Keine Rundreisen gefunden",
    noResultsSub: "Passen Sie die Filter an oder setzen Sie diese zurück.",
  },
};

export function CircuitosEditorial({ slides, title, subtitle, heroImage }: CircuitosEditorialProps) {
  const locale = useLocale();
  const t = UI_TEXT[locale] || UI_TEXT.es;

  const [durationFilter, setDurationFilter] = useState<string>("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [styleFilter, setStyleFilter] = useState<string>("all");

  const isFiltered = durationFilter !== "all" || regionFilter !== "all" || styleFilter !== "all";

  const filteredSlides = useMemo(() => {
    return slides.filter((slide) => {
      // Duration filter
      if (durationFilter === "short" && (slide.days < 5 || slide.days > 8)) return false;
      if (durationFilter === "medium" && (slide.days < 9 || slide.days > 12)) return false;
      if (durationFilter === "long" && slide.days < 13) return false;

      // Region filter
      if (regionFilter !== "all" && slide.region !== regionFilter) return false;

      // Style filter
      if (styleFilter !== "all" && slide.colorTheme !== styleFilter) return false;

      return true;
    });
  }, [slides, durationFilter, regionFilter, styleFilter]);

  const resetFilters = () => {
    setDurationFilter("all");
    setRegionFilter("all");
    setStyleFilter("all");
  };

  // Helper for price formatting
  const formatPriceDisplay = (rawPrice: string) => {
    if (!rawPrice) return "";
    const cleanNumber = rawPrice.replace(/[^\d]/g, "").trim();
    if (cleanNumber) {
      const num = parseInt(cleanNumber, 10);
      if (!isNaN(num)) {
        return `$${num.toLocaleString("en-US")}`;
      }
      return `$${cleanNumber}`;
    }
    return rawPrice;
  };

  // Truncate summary to max 140 chars
  const formatShortSummary = (text: string) => {
    if (!text) return "";
    if (text.length <= 140) return text;
    return text.slice(0, 137).trim() + "...";
  };

  return (
    <div className="min-h-screen bg-warm-ivory">
      {/* -- Hero ------------------------------------------------ */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden">
        <ParallaxFloat speed={0.1} className="absolute inset-0">
          <Image
            src={heroImage || "/image/portadas/Statues_at_San_Agustín_park_202608141341.jpeg"}
            alt="Circuitos Colombia"
            fill
            sizes="100vw"
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
        </ParallaxFloat>
        <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/95 via-deep-forest/50 to-transparent" />
        <div className="absolute inset-0 editorial-overlay-vignette" />

        <div className="relative z-10 container mx-auto px-4 md:px-6 pt-36 md:pt-44 lg:pt-48 pb-20 md:pb-28">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight mb-4"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl font-light leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
          >
            {subtitle}
          </motion.p>

          {/* Timeline preview — horizontal scroll of circuits */}
          <div className="mt-12 md:mt-16">
            <HeroCircuitPreview items={slides} />
          </div>
        </div>

        {/* Wave transition */}
        <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-px">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full block" style={{ display: "block", marginBottom: -1 }}>
            <path d="M0,70 C360,10 1080,100 1440,30 L1440,100 L0,100 Z" fill="#F7F5EF" />
          </svg>
        </div>
      </section>

      {/* -- Agile Filters & Tour Cards ------------------------- */}
      <EditorialSection bg="#F7F5EF" reveal="fade">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Quick Filters Bar */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-stone-200 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-deep-forest/10 flex items-center justify-center text-deep-forest">
                  <Filter className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-charcoal">
                    {t.filterBy}
                  </h2>
                  <p className="text-xs text-stone-500">
                    {t.resultsCount(filteredSlides.length)}
                  </p>
                </div>
              </div>

              {isFiltered && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors min-h-[44px]"
                >
                  <X className="w-3.5 h-3.5" />
                  {t.clearFilters}
                </button>
              )}
            </div>

            {/* Filter Selectors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {/* Duration Filter */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                  <Calendar className="w-3.5 h-3.5 text-muted-gold" />
                  {t.duration}
                </label>
                <div className="relative">
                  <select
                    value={durationFilter}
                    onChange={(e) => setDurationFilter(e.target.value)}
                    className="w-full appearance-none bg-stone-50 hover:bg-stone-100/80 border border-stone-200 text-charcoal text-sm rounded-xl px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-deep-forest/20 transition-colors min-h-[44px]"
                  >
                    {t.durations.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs">▼</span>
                </div>
              </div>

              {/* Region Filter */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-muted-gold" />
                  {t.region}
                </label>
                <div className="relative">
                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    className="w-full appearance-none bg-stone-50 hover:bg-stone-100/80 border border-stone-200 text-charcoal text-sm rounded-xl px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-deep-forest/20 transition-colors min-h-[44px]"
                  >
                    {t.regions.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs">▼</span>
                </div>
              </div>

              {/* Style Filter */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                  <Compass className="w-3.5 h-3.5 text-muted-gold" />
                  {t.style}
                </label>
                <div className="relative">
                  <select
                    value={styleFilter}
                    onChange={(e) => setStyleFilter(e.target.value)}
                    className="w-full appearance-none bg-stone-50 hover:bg-stone-100/80 border border-stone-200 text-charcoal text-sm rounded-xl px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-deep-forest/20 transition-colors min-h-[44px]"
                  >
                    {t.styles.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs">▼</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tour Cards Grid / List */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredSlides.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl p-12 text-center border border-stone-200 max-w-lg mx-auto"
                >
                  <Compass className="w-10 h-10 text-muted-gold mx-auto mb-3 stroke-[1.25]" />
                  <h3 className="font-serif text-xl text-charcoal font-medium mb-2">
                    {t.noResultsTitle}
                  </h3>
                  <p className="text-sm text-stone-500 mb-6">
                    {t.noResultsSub}
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-deep-forest text-warm-ivory text-sm font-medium hover:bg-deep-forest/90 transition-colors min-h-[44px]"
                  >
                    {t.clearFilters}
                  </button>
                </motion.div>
              ) : (
                filteredSlides.map((slide, i) => {
                  const theme = resolveDestinationTheme(slide.colorTheme, locale);
                  return (
                    <motion.div
                      key={slide.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                    >
                      <article className="group relative flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-muted-gold/50 hover:shadow-lg transition-all duration-300">
                        {/* 4:3 Image Container */}
                        <div className="relative w-full md:w-2/5 lg:w-[360px] aspect-[4/3] md:aspect-auto md:min-h-[260px] overflow-hidden flex-shrink-0">
                          <Image
                            src={slide.image}
                            alt={slide.name}
                            fill
                            sizes={IMAGE_SIZES.cardHalf}
                            className={`object-cover transition-transform duration-700 group-hover:scale-105 ${theme.gradeClass}`}
                            placeholder="blur"
                            blurDataURL={BLUR_PLACEHOLDER}
                          />

                          {/* Duration Badge */}
                          <div className="absolute top-3 left-3 bg-deep-forest/85 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                            <Calendar className="w-3.5 h-3.5 text-muted-gold" />
                            <span>{slide.days}D / {slide.nights}N</span>
                          </div>

                          {/* Category Badge */}
                          {slide.colorTheme && (
                            <div
                              className="absolute top-3 right-3 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm"
                              style={theme.badgeStyle}
                            >
                              {theme.label}
                            </div>
                          )}
                        </div>

                        {/* Structured Content (Only: Title, Summary <= 140, Highlights, Price, View Journey) */}
                        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                          <div className="space-y-3">
                            <h3 className="font-serif text-2xl md:text-3xl text-charcoal font-medium leading-snug group-hover:text-deep-forest transition-colors">
                              <Link href={`/circuitos/${slide.id}` as any} className="hover:underline">
                                {slide.name}
                              </Link>
                            </h3>

                            {/* Max 140 chars summary */}
                            <p className="text-sm md:text-base text-stone-600 leading-relaxed">
                              {formatShortSummary(slide.description)}
                            </p>

                            {/* Highlights Tags */}
                            {slide.highlights && slide.highlights.length > 0 && (
                              <div className="flex flex-wrap items-center gap-2 pt-1">
                                {slide.highlights.slice(0, 3).map((hl, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center text-xs font-medium bg-stone-100 text-stone-700 px-3 py-1 rounded-full border border-stone-200/60"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-muted-gold mr-1.5" />
                                    {hl}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Footer with Price and View Journey Button */}
                          <div className="flex flex-wrap items-center justify-between gap-4 pt-5 mt-4 border-t border-stone-100">
                            <div>
                              <span className="block text-xs uppercase tracking-wider text-stone-400 font-medium">
                                {slide.price ? t.fromUsd : ""}
                              </span>
                              <span className="text-lg md:text-xl font-serif font-bold text-deep-forest">
                                {slide.price ? formatPriceDisplay(slide.price) : ""}
                              </span>
                            </div>

                            <Link
                              href={`/circuitos/${slide.id}` as any}
                              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-deep-forest text-warm-ivory text-sm font-medium hover:bg-muted-gold hover:text-charcoal transition-all duration-200 shadow-sm min-h-[44px]"
                            >
                              <span>{t.viewJourney}</span>
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>
      </EditorialSection>
    </div>
  );
}
