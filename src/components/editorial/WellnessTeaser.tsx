"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { HeartPulse, ShieldCheck, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

interface WellnessTeaserProps {
  locale: string;
}

const WELLNESS_CONTENT = {
  es: {
    badge: "SALUD & BIENESTAR",
    title: "Cuidado médico certificado. Recuperación sin fricción.",
    subtitle: "Tarifas internacionales competitivas con coordinación médica integral en Colombia. Conectamos pacientes internacionales con cirujanos certificados RETHUS e infraestructuras acreditadas, complementadas con descanso sereno en haciendas andinas.",
    highlights: [
      "Especialistas médicos certificados con registro oficial RETHUS",
      "Clínicas y centros quirúrgicos acreditados de alta complejidad",
      "Tarifas internacionales competitivas con atención transparente",
      "Concierge médico bilingüe, traslados privados y recuperación en clima templado",
    ],
    cta: "Conocer Programa Médico & Bienestar",
  },
  en: {
    badge: "MEDICAL & WELLNESS",
    title: "Certified medical care. Seamless recovery.",
    subtitle: "Competitive international pricing with comprehensive medical coordination. We connect international travelers with board-certified RETHUS specialists and accredited surgical clinics, combined with private recovery retreats in the Andean mountains.",
    highlights: [
      "Board-certified surgeons and specialists with verified RETHUS credentials",
      "Joint Commission-level accredited clinical infrastructure",
      "Competitive international pricing with full care coordination",
      "Dedicated bilingual medical concierge & serene private recovery retreats",
    ],
    cta: "Explore Medical & Wellness",
  },
  de: {
    badge: "MEDIZIN & WELLNESS",
    title: "Zertifizierte Medizin. Nahtlose Erholung.",
    subtitle: "Wettbewerbsfähige internationale Preise mit ganzheitlicher Betreuung in Kolumbien. Zertifizierte Fachärzte und akkreditierte Kliniken, kombiniert mit diskreten Erholungsaufenthalten in den Anden.",
    highlights: [
      "Anerkannte Fachärzte mit offizieller RETHUS-Zertifizierung",
      "Moderne, akkreditierte Kliniken höchster Qualitätsstandards",
      "Wettbewerbsfähige Konditionen bei erstklassiger medizinischer Versorgung",
      "Mehrsprachige persönliche Betreuung und ruhige Erholungs-Haciendas",
    ],
    cta: "Medizin- & Wellnessprogramm Entdecken",
  },
  fr: {
    badge: "SANTÉ & BIEN-ÊTRE",
    title: "Soins médicaux certifiés. Rétablissement serein.",
    subtitle: "Tarifs internationaux compétitifs avec coordination médicale complète en Colombie. Chirurgiens certifiés RETHUS, cliniques de pointe et séjours de convalescence dans la douceur des Andes.",
    highlights: [
      "Chirurgiens et praticiens inscrits au registre officiel RETHUS",
      "Infrastructures hospitalières modernes et accréditées",
      "Tarification internationale compétitive sans compromis de qualité",
      "Conciergerie médicale bilingue et convalescence en haciendas de charme",
    ],
    cta: "Découvrir le Programme Médical & Bien-être",
  },
};

export function WellnessTeaser({ locale }: WellnessTeaserProps) {
  const content = WELLNESS_CONTENT[(locale as keyof typeof WELLNESS_CONTENT)] || WELLNESS_CONTENT.es;

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F4] border-t border-stone-200/60 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <SectionReveal>
          <div className="bg-white rounded-3xl border border-stone-200/80 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Content (7 cols) */}
            <div className="p-8 sm:p-12 lg:p-14 lg:col-span-7 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold tracking-widest uppercase mb-4 border border-emerald-200">
                  <HeartPulse className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{content.badge}</span>
                </div>
                <h2 className="display-3 font-heading font-medium text-editorial-dark tracking-tight mb-4">
                  {content.title}
                </h2>
                <p className="body text-editorial-muted leading-relaxed mb-6">
                  {content.subtitle}
                </p>

                <div className="space-y-3 mb-8">
                  {content.highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-stone-700 font-medium leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Link
                  href={"/bienestar" as any}
                  className="inline-flex items-center gap-2 bg-[#16352D] hover:bg-[#B49A68] hover:text-[#16352D] text-white px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 shadow-md min-h-[44px]"
                >
                  <span>{content.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Image (5 cols) */}
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[340px] overflow-hidden">
              <Image
                src="/image/Tolima-fotos/ibague_vista-aerea-guayacanes-en-flor.jpeg"
                alt="Tolima Andean landscape — tranquil wellness recovery"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-6 left-6 right-6 text-white lg:hidden">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 block mb-1">
                  Tolima · Andes Colombianos
                </span>
                <p className="text-sm font-medium text-white/90">
                  Clima templado todo el año y haciendas boutique rodeadas de naturaleza.
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
