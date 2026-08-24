"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { SectionReveal } from "@/components/editorial/SectionReveal";
import { ParallaxFloat } from "@/components/editorial/ParallaxFloat";

// Below-the-fold: code-split
const ContactForm = dynamic(
  () => import("@/components/ContactForm").then((m) => ({ default: m.ContactForm }))
);

const BLUR_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";

interface ContactoEditorialProps {
  title: string;
  subtitle: string;
  infoTitle: string;
  infoSubtitle: string;
  schedule: string;
  support: string;
  mainOffice: string;
  mapTitle: string;
}

export function ContactoEditorial({
  title,
  subtitle,
  infoTitle,
  infoSubtitle,
  schedule,
  support,
  mainOffice,
  mapTitle,
}: ContactoEditorialProps) {
  return (
    <div className="min-h-screen bg-editorial-warm">
      {/* -- Hero ----------------------------------------------- */}
      <section className="relative h-[45vh] md:h-[50vh] flex items-end overflow-hidden">
        <ParallaxFloat speed={0.1} className="absolute inset-0">
          <Image
            src="/image/servicios/ibagué.jpeg"
            alt="ibague"
            fill
            sizes="100vw"
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
        </ParallaxFloat>
        <div className="absolute inset-0 bg-gradient-to-t from-editorial-dark/90 via-editorial-dark/50 to-editorial-dark/20" />
        <div className="absolute inset-0 editorial-overlay-vignette" />

        <div className="relative z-10 container mx-auto px-4 md:px-6 pb-12 md:pb-16">
  
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="display-2 text-white mb-3"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="body-lg text-white/90 max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
          >
            {subtitle}
          </motion.p>
        </div>
      </section>

      {/* -- Contact Split -------------------------------------- */}
      <section
        className="py-16 md:py-24 bg-editorial-warm editorial-section--bleed editorial-gradient-bleed relative"
        style={{ "--bleed-color": "#0a1628" } as React.CSSProperties}
      >
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <SectionReveal className="editorial-stagger-variance">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
              {/* Info Panel */}
              <div className="lg:col-span-2 bg-editorial-dark text-white p-10 md:p-14 rounded-3xl flex flex-col justify-between">
                <div>
                  <h3 className="heading-1 text-white mb-4">{infoTitle}</h3>
                  <p className="body text-white/60 mb-10">{infoSubtitle}</p>

                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-editorial-accent/15 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-editorial-accent" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">+57 314 341 5177</p>
                        <p className="text-white font-semibold">+57 316 538 6892</p>
                        <p className="caption text-white/40 mt-1">{schedule}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-editorial-accent/15 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-editorial-accent" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">gerencia@agenciaontour.com</p>
                        <p className="caption text-white/40 mt-1">{support}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-editorial-accent/15 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-editorial-accent" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">Ibagué, Colombia</p>
                        <p className="caption text-white/40 mt-1">{mainOffice}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-editorial-accent/15 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-editorial-accent" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{schedule}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Panel */}
              <div className="lg:col-span-3 bg-white p-10 md:p-14 rounded-3xl border border-editorial-border">
                <ContactForm />
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* -- Map ------------------------------------------------ */}
      <section className="pb-16 md:pb-24 editorial-section--bleed relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <SectionReveal>
            <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden border border-editorial-border bg-white">
              <div className="px-8 pt-8 pb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-editorial-accent/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-editorial-accent" />
                </div>
                <div>
                  <h3 className="heading-2 text-editorial-dark">{mapTitle}</h3>
                  <p className="caption">Ibagué, Tolima, Colombia</p>
                </div>
              </div>
              <div className="w-full h-80 md:h-[28rem]">
                <iframe
                  title="Ubicación On Tour Agencia de Viajes y Turismo"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d498.28!2d-75.2412314!3d4.4453522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38c5dc9b21e75d%3A0xdfe89bd87d6ae4a2!2sOn%20Tour%20Agencia%20de%20Viajes%20y%20Turismo!5e0!3m2!1ses!2sco!4v1742604175123!5m2!1ses!2sco"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
