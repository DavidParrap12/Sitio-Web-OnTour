"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bus,
  Hotel,
  Users,
  ShieldCheck,
  Utensils,
  CalendarCheck,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Globe,
  Award,
} from "lucide-react";
import { useLocale } from "next-intl";
import { RequestQuoteModal } from "@/components/RequestQuoteModal";
import { trackRequestQuoteClick } from "@/lib/analytics";

const ICON_MAP: Record<string, any> = {
  transport: Bus,
  accommodation: Hotel,
  guides: Users,
  insurance: ShieldCheck,
  food: Utensils,
  events: CalendarCheck,
};

interface ServiceItem {
  key: string;
  image: string;
  title: string;
  description: string;
  features: string[];
  extendedInfo: {
    highlight: string;
    specialties: string[];
    certification: string;
  };
}

interface ServiciosInteractiveGridProps {
  services: ServiceItem[];
  ctaLabel?: string;
}

const UI_TEXT: Record<string, {
  hoverPrompt: string;
  touchPrompt: string;
  activeDetail: string;
  quoteService: string;
  includedPill: string;
  certLabel: string;
}> = {
  es: {
    hoverPrompt: "Pasa el mouse para ver detalles completos",
    touchPrompt: "Toca para ver detalles",
    activeDetail: "Detalle Activo",
    quoteService: "Cotizar este servicio",
    includedPill: "Especialidades destacadas",
    certLabel: "Garantía & Estándar",
  },
  en: {
    hoverPrompt: "Hover to reveal in-depth details",
    touchPrompt: "Tap to view details",
    activeDetail: "Active Details",
    quoteService: "Request this service",
    includedPill: "Key Specialties",
    certLabel: "Guarantee & Standards",
  },
  fr: {
    hoverPrompt: "Survolez pour afficher les détails complets",
    touchPrompt: "Touchez pour voir les détails",
    activeDetail: "Détails Actifs",
    quoteService: "Demander ce service",
    includedPill: "Spécialités Clés",
    certLabel: "Garantie & Normes",
  },
  de: {
    hoverPrompt: "Mit der Maus überfahren für Details",
    touchPrompt: "Tippen für Details",
    activeDetail: "Details Aktiv",
    quoteService: "Diesen Service anfragen",
    includedPill: "Wichtigste Schwerpunkte",
    certLabel: "Garantie & Standards",
  },
};

export function ServiciosInteractiveGrid({ services }: ServiciosInteractiveGridProps) {
  const locale = useLocale();
  const lang = (["es", "en", "fr", "de"].includes(locale) ? locale : "es") as "es" | "en" | "fr" | "de";
  const ui = UI_TEXT[lang] || UI_TEXT.es;

  // Active expanded card for both hover and touch devices
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const handleOpenQuote = (serviceTitle: string) => {
    trackRequestQuoteClick("services_interactive_card");
    setSelectedServiceForQuote(serviceTitle);
    setIsQuoteOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {services.map((item) => {
          const Icon = ICON_MAP[item.key] || Users;
          const isExpanded = hoveredKey === item.key;

          return (
            <div
              key={item.key}
              onMouseEnter={() => setHoveredKey(item.key)}
              onMouseLeave={() => setHoveredKey((prev) => (prev === item.key ? null : prev))}
              onClick={() => setHoveredKey((prev) => (prev === item.key ? null : item.key))}
              className={`relative bg-white rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col cursor-pointer ${
                isExpanded
                  ? "border-[#B49A68] shadow-2xl ring-2 ring-[#B49A68]/30 -translate-y-1.5 z-20"
                  : "border-stone-200/90 shadow-sm hover:border-stone-300 hover:shadow-md"
              }`}
            >
              {/* Image Area with Zoom Effect */}
              <div className="relative h-56 w-full overflow-hidden bg-stone-100 shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={`object-cover transition-transform duration-700 ease-out ${
                    isExpanded ? "scale-110" : "scale-100"
                  }`}
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isExpanded
                      ? "bg-gradient-to-t from-[#16352D]/90 via-[#16352D]/40 to-transparent"
                      : "bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                  }`}
                />

                {/* Badge Icon */}
                <div
                  className={`absolute top-4 left-4 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md ${
                    isExpanded
                      ? "bg-[#B49A68] text-[#16352D] scale-110"
                      : "bg-white/95 text-[#16352D] backdrop-blur-md"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                {/* Interactive Status Indicator Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide transition-all backdrop-blur-md ${
                      isExpanded
                        ? "bg-white text-[#16352D] shadow-sm"
                        : "bg-black/50 text-white/90"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isExpanded ? "bg-[#B49A68]" : "bg-white/70"}`} />
                    <span>{isExpanded ? ui.activeDetail : ui.touchPrompt}</span>
                  </span>
                </div>

                {/* Title overlay in image header */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h3 className="font-serif text-2xl font-medium tracking-tight leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between bg-white space-y-4">
                {/* Description */}
                <p className="text-stone-600 text-sm leading-relaxed font-light">
                  {item.description}
                </p>

                {/* Core Features List */}
                <ul className="space-y-2 pt-1 border-t border-stone-100">
                  {item.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-[#B49A68] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* ── EXPANDED INFORMATION SECTION (Appears on Hover / Tap) ── */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden pt-4 border-t border-[#B49A68]/30 space-y-3"
                    >
                      {/* Highlight Box */}
                      <div className="p-3.5 rounded-2xl bg-[#F7F5EF] border border-[#B49A68]/20 text-xs text-stone-800">
                        <div className="flex items-center gap-1.5 font-bold text-[#16352D] mb-1">
                          <Award className="w-3.5 h-3.5 text-[#B49A68]" />
                          <span>{ui.certLabel}</span>
                        </div>
                        <p className="font-light leading-relaxed">{item.extendedInfo.certification}</p>
                      </div>

                      {/* Specialties Pills */}
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-2">
                          {ui.includedPill}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.extendedInfo.specialties.map((spec, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[11px] px-2.5 py-1 rounded-full bg-[#16352D]/5 text-[#16352D] font-medium border border-[#16352D]/10"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenQuote(item.title);
                        }}
                        className="group/btn w-full mt-2 py-3 px-5 rounded-full bg-[#16352D] hover:bg-[#B49A68] hover:text-[#16352D] text-white text-xs sm:text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-all duration-300 shadow-sm min-h-[44px] cursor-pointer"
                      >
                        <span>{ui.quoteService}</span>
                        <ArrowRight className="w-4 h-4 ml-0.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quote Modal with Selected Service */}
      <RequestQuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        preselectedExperience="circuits"
        preselectedItem={selectedServiceForQuote || undefined}
      />
    </>
  );
}
