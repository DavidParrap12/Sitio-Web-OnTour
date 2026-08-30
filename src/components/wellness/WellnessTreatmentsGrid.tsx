"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";

export interface SpecialtyTreatmentItem {
  name: string;
  desc: string;
  procedures: string[];
}

export interface TreatmentsStrings {
  title: string;
  subtitle: string;
  learnMore: string;
  cirugiaPlastica: SpecialtyTreatmentItem;
  chequeosPreventivos: SpecialtyTreatmentItem;
  cardiologia: SpecialtyTreatmentItem;
  urologia: SpecialtyTreatmentItem;
  nutricion: SpecialtyTreatmentItem;
  psicologia: SpecialtyTreatmentItem;
}

const SPECIALTY_KEYS = [
  "cirugiaPlastica",
  "chequeosPreventivos",
  "cardiologia",
  "urologia",
  "nutricion",
  "psicologia",
] as const;

const SPECIALTY_IMAGES: Record<string, string> = {
  cirugiaPlastica: "/image/bienestar/tratamientos/cirugia-plastica.jpg",
  chequeosPreventivos: "/image/bienestar/tratamientos/chequeos-preventivos.jpg",
  cardiologia: "/image/bienestar/tratamientos/cardiologia.jpg",
  urologia: "/image/bienestar/tratamientos/urologia.jpg",
  nutricion: "/image/bienestar/tratamientos/nutricion.jpg",
  psicologia: "/image/bienestar/tratamientos/psicologia.jpg",
};

export function WellnessTreatmentsGrid({
  strings: s,
}: {
  strings: TreatmentsStrings;
}) {
  return (
    <section className="py-16 md:py-24 bg-white editorial-section">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="display-2 text-[var(--color-wellness-primary)] mb-4">
            {s.title}
          </h2>
          <p className="body-lg text-[#171717]/55 max-w-2xl mx-auto leading-relaxed">
            {s.subtitle}
          </p>
        </motion.div>

        {/* 6 Specialty Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SPECIALTY_KEYS.map((key, i) => {
            const item = s[key];
            if (!item) return null;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex flex-col rounded-3xl border border-[var(--color-wellness-border)] bg-white overflow-hidden hover:border-[var(--color-wellness-gold)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-wellness-lg)] transition-all duration-400"
              >
                {/* Photo Header */}
                <div className="relative w-full h-48 sm:h-52 bg-slate-100 overflow-hidden">
                  <Image
                    src={SPECIALTY_IMAGES[key]}
                    alt={item.name}
                    fill
                    quality={90}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />

                  {/* Badge over image */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-[var(--color-wellness-primary)] shadow-sm backdrop-blur-sm">
                      <Sparkles className="w-3 h-3 text-[var(--color-wellness-gold)]" />
                      {item.name}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 sm:p-7 gap-4">
                  {/* Description */}
                  <p className="body text-sm text-[#171717]/70 leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Procedure Pills */}
                  {item.procedures && item.procedures.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1 my-auto">
                      {item.procedures.map((proc, pi) => (
                        <span
                          key={pi}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--color-wellness-bg)] text-[var(--color-wellness-primary)] border border-[var(--color-wellness-border)] group-hover:border-[var(--color-wellness-gold)]/40 transition-colors"
                        >
                          {proc}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer Link */}
                  <div className="flex items-center justify-between pt-4 mt-2 border-t border-[var(--color-wellness-border)]">
                    <Link
                      href="/contacto"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-wellness-primary)] hover:text-[var(--color-wellness-gold)] transition-colors duration-300 relative group/link"
                    >
                      {s.learnMore}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--color-wellness-gold)] group-hover/link:w-full transition-all duration-300" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
