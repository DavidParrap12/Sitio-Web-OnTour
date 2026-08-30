"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { MagneticButton } from "@/components/editorial/MagneticButton";

interface HeroStrings {
  title: string;
  titleHighlight: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export function WellnessHero({ strings: s }: { strings: HeroStrings }) {
  return (
    <section className="relative min-h-[90vh] md:min-h-[92vh] flex items-center justify-start overflow-hidden bg-[#0A2540]">
      {/* ── Background Split / Images ──────────────────────────────── */}
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 pointer-events-none select-none">
        {/* Left: Patient photo */}
        <div className="relative overflow-hidden min-h-[400px]">
          <Image
            src="/image/bienestar/mujer_sonriendo.jpeg"
            alt={s.title || "Paciente de bienestar"}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0A2540]/30 to-[#0A2540]/80" />
        </div>

        {/* Right: Tolima landscape / Andes background */}
        <div className="relative overflow-hidden hidden lg:block">
          <Image
            src="/image/bienestar/paisaje_tolima.jpeg"
            alt="Paisaje del Tolima"
            fill
            sizes="50vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0A2540]/30 to-[#0A2540]/80" />
        </div>
      </div>

      {/* ── Cinematic Overlay ───────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(10,37,64,0.3) 0%,
            rgba(10,37,64,0.6) 50%,
            rgba(10,37,64,0.85) 85%,
            rgba(10,37,64,0.95) 100%
          )`,
        }}
      />
      <div className="absolute inset-0 editorial-overlay-vignette pointer-events-none" />

      {/* ── Content (Home Editorial Style) ─────────────────────────── */}
      <div className="relative z-10 w-full px-6 sm:px-8 md:px-16 lg:px-24 text-left max-w-full md:max-w-[62%] pt-36 md:pt-44 pb-20 md:pb-28">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="display-1 text-white mb-6"
        >
          {s.title}
          <br />
          <span className="text-[#C9A961] drop-shadow-md">
            {s.titleHighlight}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="body-lg text-white/90 mb-10 max-w-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] leading-relaxed"
        >
          {s.subtitle}
        </motion.p>

        {/* Actions / Buttons (Home Style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-start justify-start gap-4"
        >
          <MagneticButton className="w-full sm:w-auto">
            <Link
              href="/contacto"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-lg editorial-hover-rich shadow-lg bg-editorial-accent text-white hover:bg-editorial-accent-hover transition-all"
            >
              {s.ctaPrimary}
            </Link>
          </MagneticButton>

          {s.ctaSecondary && (
            <MagneticButton className="w-full sm:w-auto">
              <Link
                href={"#proceso" as any}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-lg editorial-hover-rich shadow-lg editorial-hover-shift-accent bg-white/95 text-editorial-dark hover:bg-white transition-all"
              >
                {s.ctaSecondary}
              </Link>
            </MagneticButton>
          )}
        </motion.div>
      </div>

      {/* ── Wave transition (matching Home) ─────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block">
          <path
            d="M0,60 C360,0 1080,80 1440,20 L1440,80 L0,80 Z"
            fill="#faf8f4"
          />
        </svg>
      </div>
    </section>
  );
}
