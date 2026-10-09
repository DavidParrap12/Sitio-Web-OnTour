"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { RequestQuoteModal } from "@/components/RequestQuoteModal";

interface TravelTradeB2BProps {
  locale: string;
}

const B2B_CONTENT = {
  es: {
    badge: "PARA PROFESIONALES DEL TURISMO",
    title: "Su socio receptivo en el terreno en Colombia.",
    tagline: "Tarifarios netos · Marca blanca · Operación local",
    description: "Colaboramos con agencias de viajes internacionales, tour operadores y diseñadores de viajes para brindar logística privada impecable, tarifas protegidas y soporte continuo 24/7.",
    ctaModal: "ACCEDER A TARIFAS B2B",
    ctaServices: "Ver Servicios para Profesionales",
  },
  en: {
    badge: "FOR TRAVEL PROFESSIONALS",
    title: "Your Colombia partner on the ground.",
    tagline: "Net rates · White-label · Local operations",
    description: "We partner with international travel agencies, tour operators, and luxury travel designers to deliver confidential ground logistics, protected net rates, and 24/7 in-destination support.",
    ctaModal: "ACCESS B2B RATES",
    ctaServices: "Explore Travel Trade Services",
  },
  de: {
    badge: "FÜR REISEEXPERTEN & AGENTUREN",
    title: "Ihr verlässlicher Partner vor Ort in Kolumbien.",
    tagline: "Nettotarife · White-Label · Vor-Ort-Betreuung",
    description: "Wir unterstützen internationale Reiseveranstalter mit erstklassiger, diskreter Logistik vor Ort, geschützten B2B-Konditionen und persönlicher Betreuung.",
    ctaModal: "B2B-TARIFE ANFORDERN",
    ctaServices: "DMC-Services Entdecken",
  },
  fr: {
    badge: "POUR LES PROFESSIONNELS DU VOYAGE",
    title: "Votre partenaire réceptif de référence en Colombie.",
    tagline: "Tarifs nets · Marque blanche · Opérations locales",
    description: "Nous collaborons avec les agences de voyages et tour-opérateurs pour offrir une logistique terrain irréprochable, des tarifs protégés et une conciergerie 24/7.",
    ctaModal: "ACCÉDER AUX TARIFS B2B",
    ctaServices: "Découvrir les Services DMC",
  },
};

export function TravelTradeB2B({ locale }: TravelTradeB2BProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const content = B2B_CONTENT[(locale as keyof typeof B2B_CONTENT)] || B2B_CONTENT.es;

  return (
    <>
      <section className="py-20 md:py-24 bg-[#16352D] text-white relative overflow-hidden border-t border-white/10">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(180,154,104,0.1),transparent_70%)] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl text-center">
          <SectionReveal>
            {/* Badge */}
            <span className="text-xs uppercase tracking-widest text-amber-300/90 font-bold block mb-4">
              {content.badge}
            </span>

            {/* Headline */}
            <h2 className="display-2 font-heading font-medium text-white tracking-tight mb-4">
              {content.title}
            </h2>

            {/* Subline / Pillars */}
            <p className="font-heading text-lg sm:text-xl text-amber-200/90 tracking-wide mb-6">
              {content.tagline}
            </p>

            {/* Brief Context */}
            <p className="body text-white/75 max-w-2xl mx-auto leading-relaxed mb-10">
              {content.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#B49A68] hover:bg-[#c9ae78] text-[#16352D] font-bold px-9 py-4 rounded-full text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-xl cursor-pointer"
              >
                <span>{content.ctaModal}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href={"/servicios" as any}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-medium px-8 py-4 rounded-full text-xs sm:text-sm border border-white/20 transition-all duration-300"
              >
                <span>{content.ctaServices}</span>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Quote Modal with B2B preselected */}
      <RequestQuoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedExperience="b2b"
      />
    </>
  );
}
