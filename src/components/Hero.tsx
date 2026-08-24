"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Compass, Calendar } from "lucide-react";
import Image from "next/image";

const slides = [
  { src: "/image/makalu-colombia-3631740.jpg", alt: "Paisaje montañoso de Colombia", kenBurns: "kb-zoom-right" },
  { src: "/image/cuidad-amurallada.jpg", alt: "Ciudad Amurallada de Cartagena", kenBurns: "kb-zoom-left" },
  { src: "/image/desierto-tatacoa.jpg", alt: "Desierto de la Tatacoa", kenBurns: "kb-zoom-up" },
  { src: "/image/guatape.jpg", alt: "Guatapé", kenBurns: "kb-zoom-down" },
];

const INTERVAL = 5000;

export function Hero() {
  const t = useTranslations("hero");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">

      {/* Background slider with Ken Burns zoom/pan effect */}
      {slides.map((slide, i) => (
        <motion.div
          key={slide.src}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
          aria-hidden={i !== current}
        >
          <div
            className="absolute inset-0"
            style={{
              animation: i === current ? `${slide.kenBurns} ${INTERVAL / 1000}s ease-out forwards` : "none",
              willChange: i === current ? "transform" : "auto",
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
              quality={75}
              preload={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        </motion.div>
      ))}

      {/* Overlay — vignette lateral, imagen respira por la derecha */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

      {/* Content — tercio izquierdo, alineación editorial */}
      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 text-left max-w-[52%] pt-20">
        <motion.span
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 py-2.5 px-6 rounded-full bg-gradient-to-r from-accent/30 to-sky-500/20 backdrop-blur-xl border border-accent/40 text-white font-semibold text-sm md:text-base tracking-widest uppercase mb-8 shadow-[0_0_30px_rgba(28,126,214,0.3)]"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
          </span>
          {t("tagline")}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-white mb-6 leading-tight"
        >
          {t("title1")}<br />
          <span className="text-white">
            {t("title2")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-2xl text-white/90 mb-10 font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-start justify-start gap-4"
        >
          <Link
            href={"/pasadias" as any}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:brightness-90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <Compass className="w-5 h-5" />
            {t("ctaDayTrips")}
          </Link>
          <Link
            href={"/circuitos" as any}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-primary px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <Calendar className="w-5 h-5" />
            {t("ctaCircuits")}
          </Link>
        </motion.div>

        {/* Slide indicators */}
        <div className="flex items-center justify-start gap-2 mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={t("goToImage", { n: i + 1 })}
              className={`transition-all duration-300 rounded-full ${i === current
                  ? "bg-white w-8 h-2"
                  : "bg-white/40 hover:bg-white/70 w-2 h-2"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom gradient — imagen a sangre, sin color de fondo */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}
