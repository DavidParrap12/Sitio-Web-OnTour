"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Link } from "@/i18n/navigation";

export interface CtaStrings {
  title: string;
  subtitle: string;
  button: string;
  secondaryButton: string;
}

export function WellnessFinalCTA({ strings: s }: { strings: CtaStrings }) {
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
          className="font-heading text-white mb-5"
          style={{ fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.75rem)", lineHeight: 1.2, letterSpacing: "-0.02em" }}
        >
          {s.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/55 text-lg mb-10"
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
          <Link
            href="/contacto"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-wellness-glow-gold)]"
            style={{ background: "linear-gradient(135deg, #C9A961, #b5944e)", color: "#0A2540" }}
          >
            {s.button}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          {false && (
          <button className="group inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/20 text-white/75 hover:text-white hover:border-white/40 text-sm font-medium transition-all duration-300">
            <Download className="w-4 h-4" />
            {s.secondaryButton}
          </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
