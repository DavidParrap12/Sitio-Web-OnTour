"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { RequestQuoteModal } from "@/components/RequestQuoteModal";
import { trackRequestQuoteClick, trackWhatsAppClick } from "@/lib/analytics";

export interface CtaStrings {
  title: string;
  subtitle: string;
  button: string;
  secondaryButton: string;
}

export function WellnessFinalCTA({ strings: s }: { strings: CtaStrings }) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-[var(--color-wellness-primary)] editorial-section overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[var(--color-wellness-accent)]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[var(--color-wellness-gold)]/8 blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center max-w-3xl">
        {/* Accent bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-12 h-1 rounded-full bg-[var(--color-wellness-gold)] mx-auto mb-8"
        />

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white mb-5 tracking-tight"
        >
          {s.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/80 text-base sm:text-lg mb-10 font-light leading-relaxed"
        >
          {s.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={() => {
              trackRequestQuoteClick("wellness_final_cta");
              setIsQuoteOpen(true);
            }}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 shadow-lg min-h-[48px] cursor-pointer"
            style={{ background: "linear-gradient(135deg, #C9A961, #b5944e)", color: "#0A2540" }}
          >
            <span>{s.button}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="https://wa.me/573143415177?text=Hola%20OnTour%20Health%2C%20quisiera%20solicitar%20asesor%C3%ADa%20para%20turismo%20m%C3%A9dico."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("wellness_final_cta", "Hola OnTour Health, quisiera solicitar asesoría para turismo médico.")}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white/90 hover:text-white hover:border-white/40 text-sm font-medium transition-all duration-200 min-h-[48px]"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp Directo (SLA 24h)</span>
          </a>
        </motion.div>
      </div>

      <RequestQuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        preselectedExperience="wellness"
      />
    </section>
  );
}
