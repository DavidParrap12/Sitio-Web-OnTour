"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, MapPin, Send } from "lucide-react";
import { SectionReveal } from "@/components/editorial/SectionReveal";
import { PasadiaGallery } from "@/components/PasadiaGallery";
import { BrochureDownloadDynamic as BrochureDownload } from "@/components/BrochureDownloadDynamic";
import { Link } from "@/i18n/navigation";
import { ActivityStrips } from "@/components/ActivityStrips";

interface Activity {
  nombre: string;
  destino: string;
  precio_desde: number | string | null;
  incluye: string[];
  reserva?: string;
  opera?: string;
  tipo?: string;
  operador?: string;
  duracion?: string;
  outfit?: string;
  salida?: string;
}

interface PasadiaDetailEditorialProps {
  name: string;
  description: string;
  duration: string;
  highlights: string[];
  activities?: Activity[];
  image: string;
  gallery: string[];
  locale: string;
  id: string;
  t: Record<string, string>;
}

export function PasadiaDetailEditorial({
  name, description, duration, highlights, activities = [], image, gallery, locale, id, t,
}: PasadiaDetailEditorialProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* -- Hero ------------------------------------------------ */}
      <div className="relative h-[65vh] md:h-[70vh] flex items-end overflow-hidden">
        <Image src={image} alt={name} fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-editorial-dark/90 via-editorial-dark/40 to-transparent" />
        <div className="absolute inset-0 editorial-overlay-vignette" />

        <div className="relative z-10 container mx-auto px-4 md:px-6 pb-14 md:pb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="label inline-block py-2 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 mb-5"
          >
            {t.badge}
          </motion.span>
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
            <span className="flex items-center gap-2"><Clock className="w-5 h-5" /> {duration}</span>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 max-w-7xl">

        {/* Description */}
        <SectionReveal>
          <section className="mb-16 md:mb-20 max-w-4xl">
            <h2 className="display-2 text-editorial-dark mb-6">{t.activityDesc}</h2>
            <p className="body-lg text-editorial-muted">{description}</p>
          </section>
        </SectionReveal>

        {/* Highlights */}
        <SectionReveal>
          <section className="mb-16 md:mb-20">
            <h2 className="display-2 text-editorial-dark mb-8">{t.youWillFind}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-3 bg-editorial-warm p-5 rounded-xl border border-editorial-border"
                >
                  <CheckCircle2 className="w-6 h-6 text-editorial-accent shrink-0 mt-0.5" />
                  <span className="body text-editorial-dark font-medium">{h}</span>
                </motion.div>
              ))}
            </div>
          </section>
        </SectionReveal>

        {/* Activities (if any) */}
        {activities.length > 0 && (
          <SectionReveal>
            <section className="mb-16 md:mb-20">
              <h2 className="display-2 text-editorial-dark mb-8">{t.activitiesAndPlans || "Actividades y Planes"}</h2>
              <ActivityStrips activities={activities} coverImage={image} t={t} />
            </section>
          </SectionReveal>
        )}

        <SectionReveal>
          <section className="mb-16 md:mb-20">
            <BrochureDownload
              images={gallery} title={name} slug={id}
              labels={{
                downloadPdf: t.downloadPdf, downloadWord: t.downloadWord,
                downloadBrochure: t.downloadBrochure, generating: t.generating, downloaded: t.downloaded,
              }}
            />
          </section>
        </SectionReveal>

        {/* CTA */}
        <SectionReveal>
          <section className="text-center">
            <div className="bg-editorial-warm rounded-3xl border border-editorial-border p-10 md:p-14 max-w-xl mx-auto">
              <h3 className="heading-1 text-editorial-dark mb-3">{t.ctaTitle}</h3>
              <p className="body text-editorial-muted mb-8">{t.ctaSubtitle}</p>
              <Link
                href={"/contacto" as any}
                className="inline-flex items-center gap-2 bg-editorial-accent hover:bg-editorial-accent-hover text-white px-8 py-4 rounded-full font-bold text-lg shadow-editorial-lg hover:shadow-editorial-xl hover:-translate-y-1 transition-all duration-300"
              >
                <Send className="w-5 h-5" />
                {t.ctaButton}
              </Link>
            </div>
          </section>
        </SectionReveal>
      </div>
    </div>
  );
}
