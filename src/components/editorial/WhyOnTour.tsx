"use client";

import { ShieldCheck, UserCheck, Sliders, Clock, Award, Star, Compass, Sparkles } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

interface WhyOnTourProps {
  locale: string;
}

const PILLARS_CONTENT = {
  es: {
    badge: "POR QUÉ ONTOUR DMC",
    title: "La diferencia de un operador local directo",
    subtitle: "Diseñamos y operamos cada experiencia desde el corazón de Colombia, sin intermediarios internacionales y con un compromiso absoluto de calidad.",
    pillars: [
      {
        icon: Compass,
        title: "Operación Directa en Destino",
        highlight: "RNT 62212 · Presencia local",
        desc: "Operamos su viaje directamente en el terreno, sin capas innecesarias entre usted y nuestro equipo local.",
      },
      {
        icon: UserCheck,
        title: "Guías Privados & Expertos",
        highlight: "Bilingües · Certificados",
        desc: "Historiadores, naturalistas y anfitriones locales que conocen las historias y accesos que no aparecen en las guías turísticas masivas.",
      },
      {
        icon: Sliders,
        title: "Itinerarios 100% a Medida",
        highlight: "A tu propio ritmo",
        desc: "Cada viajero es único. Personalizamos tiempos, hoteles boutique, gastronomía de autor y actividades según tus gustos personales.",
      },
      {
        icon: ShieldCheck,
        title: "Seguridad & Asistencia 24/7",
        highlight: "Póliza Assist Card incluida",
        desc: "Vehículos privados modernos con conductores profesionales, seguimiento satelital y línea de concierge en destino siempre a tu disposición.",
      },
    ],
    metrics: [
      { value: "12+", label: "Años de experiencia", icon: Award },
      { value: "100%", label: "Viajes privados y a medida", icon: Sparkles },
      { value: "5.0 ★", label: "Calificación Google Reviews", icon: Star },
      { value: "< 24h", label: "Garantía de cotización", icon: Clock },
    ],
  },
  en: {
    badge: "WHY ONTOUR DMC",
    title: "The Local Direct Operator Difference",
    subtitle: "We design and operate every journey from the Andean heartland — without unnecessary layers, just licensed local excellence.",
    pillars: [
      {
        icon: Compass,
        title: "Direct Local Operation",
        highlight: "RNT 62212 · Ground presence",
        desc: "We operate your journey directly on the ground, without unnecessary layers between you and our local team.",
      },
      {
        icon: UserCheck,
        title: "Licensed Private Guides",
        highlight: "FONTUR-registered · Bilingual",
        desc: "Licensed guides (FONTUR-registered), historians, naturalists, and local hosts who unlock authentic encounters beyond traditional tourist trails.",
      },
      {
        icon: Sliders,
        title: "100% Tailor-Made Pacing",
        highlight: "Designed Around You",
        desc: "No rigid group itineraries. We curate boutique heritage stays, culinary highlights, and personal pacing matched to your travel style.",
      },
      {
        icon: ShieldCheck,
        title: "Safety & 24/7 Concierge",
        highlight: "Assist Card Coverage Included",
        desc: "Modern private vehicle fleet, professional certified drivers, and an attentive on-the-ground team available day and night.",
      },
    ],
    metrics: [
      { value: "12+", label: "Years Operating in Colombia", icon: Award },
      { value: "100%", label: "Private & Tailor-Made", icon: Sparkles },
      { value: "5.0 ★", label: "Google Reviews Rating", icon: Star },
      { value: "< 24h", label: "Quote Response SLA", icon: Clock },
    ],
  },
  de: {
    badge: "WARUM ONTOUR DMC",
    title: "Der Unterschied eines lokalen Direktanbieters",
    subtitle: "Wir planen und führen jede Reise direkt aus dem Andenherzland durch — ohne Zwischenhändler und mit höchster Betreuungsqualität.",
    pillars: [
      {
        icon: Compass,
        title: "Direkte lokale Durchführung",
        highlight: "RNT 62212 · Vor Ort präsent",
        desc: "Wir führen Ihre Reise direkt vor Ort durch — ohne unnötige Zwischenschichten zwischen Ihnen und unserem Team in Kolumbien.",
      },
      {
        icon: UserCheck,
        title: "Zertifizierte Privatguides",
        highlight: "Mehrsprachig · Lokale Experten",
        desc: "Historiker und Naturkenner, die Ihnen authentische Einblicke abseits der Massenrouten ermöglichen.",
      },
      {
        icon: Sliders,
        title: "100% Maßgeschneidert",
        highlight: "In Ihrem individuellen Tempo",
        desc: "Individuelle Reiserouten mit ausgewählten Boutique-Hotels, lokaler Gourmetküche und flexibler Tagesplanung.",
      },
      {
        icon: ShieldCheck,
        title: "Sicherheit & 24/7 Concierge",
        highlight: "Inklusive Assist Card Versicherung",
        desc: "Moderne Privatfahrzeuge mit geprüften Fahrern und ein verlässlicher Ansprechpartner während der gesamten Reise.",
      },
    ],
    metrics: [
      { value: "12+", label: "Jahre Reiseerfahrung", icon: Award },
      { value: "100%", label: "Private Individualreisen", icon: Sparkles },
      { value: "5.0 ★", label: "Google Bewertung", icon: Star },
      { value: "< 24h", label: "Angebotsgarantie", icon: Clock },
    ],
  },
  fr: {
    badge: "POURQUOI ONTOUR DMC",
    title: "La différence d'un réceptif local direct",
    subtitle: "Nous concevons et opérons chaque itinéraire depuis le cœur des Andes colombiennes, sans intermédiaire et avec une attention sur mesure.",
    pillars: [
      {
        icon: Compass,
        title: "Opération locale directe",
        highlight: "RNT 62212 · Présence terrain",
        desc: "Nous opérons votre voyage directement sur le terrain, sans couches inutiles entre vous et notre équipe locale.",
      },
      {
        icon: UserCheck,
        title: "Guides Privés Certifiés",
        highlight: "Bilingues · Experts du terroir",
        desc: "Historiens et naturalistes passionnés qui vous ouvrent les portes d'une Colombie confidentielle et authentique.",
      },
      {
        icon: Sliders,
        title: "Itinéraires 100% Sur Mesure",
        highlight: "À votre propre rythme",
        desc: "Hôtels de charme, étapes gastronomiques et activités personnalisées adaptées à vos envies de voyage.",
      },
      {
        icon: ShieldCheck,
        title: "Sécurité & Conciergerie 24/7",
        highlight: "Assurance Assist Card incluse",
        desc: "Flotte privée récente avec chauffeurs certifiés et assistance continue sur place tout au long de votre séjour.",
      },
    ],
    metrics: [
      { value: "12+", label: "Ans d'expertise en Colombie", icon: Award },
      { value: "100%", label: "Voyages privés sur mesure", icon: Sparkles },
      { value: "5.0 ★", label: "Note Google Reviews", icon: Star },
      { value: "< 24h", label: "Garantie de réponse devis", icon: Clock },
    ],
  },
};

export function WhyOnTour({ locale }: WhyOnTourProps) {
  const content = PILLARS_CONTENT[(locale as keyof typeof PILLARS_CONTENT)] || PILLARS_CONTENT.es;

  return (
    <section className="py-20 md:py-28 bg-[#faf8f4] border-t border-stone-200/60 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <SectionReveal>
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <span className="label text-editorial-accent mb-3 block tracking-widest font-bold">
              {content.badge}
            </span>
            <h2 className="display-2 text-editorial-dark font-heading font-medium tracking-tight mb-4">
              {content.title}
            </h2>
            <p className="body-lg text-editorial-muted leading-relaxed">
              {content.subtitle}
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
            {content.pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-editorial-accent/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#16352D]/5 text-[#16352D] group-hover:bg-[#16352D] group-hover:text-white flex items-center justify-center mb-5 transition-all duration-300">
                      <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-editorial-accent block mb-1">
                      {pillar.highlight}
                    </span>
                    <h3 className="heading-3 text-editorial-dark mb-3 group-hover:text-[#16352D] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="caption text-editorial-muted leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Metrics Ribbon */}
          <div className="bg-[#16352D] text-white rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
              {content.metrics.map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <div key={idx} className="flex flex-col items-center justify-center p-2">
                    <Icon className="w-5 h-5 text-amber-400 mb-2 opacity-90" aria-hidden="true" />
                    <span className="display-3 font-heading font-bold text-white mb-1">
                      {metric.value}
                    </span>
                    <span className="text-xs md:text-sm text-white/80 font-medium">
                      {metric.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
