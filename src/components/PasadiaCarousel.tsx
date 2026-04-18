"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  ArrowRight,
  ChevronDown,
  MessageCircle,
  Mail,
  Eye,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface PasadiaSlide {
  id: string;
  image: string;
  name: string;
  description: string;
  duration: string;
  brochureUrl?: string;
}

interface PasadiaCarouselProps {
  slides: PasadiaSlide[];
}

export function PasadiaCarousel({ slides }: PasadiaCarouselProps) {
  const t = useTranslations("card");
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const [showOptions, setShowOptions] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const total = slides.length;

  const goTo = useCallback(
    (index: number, dir?: number) => {
      setDirection(dir ?? (index > current ? 1 : -1));
      setCurrent((index + total) % total);
      setShowOptions(false);
    },
    [current, total]
  );

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowOptions(false);
      }
    }
    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOptions]);

  // Touch/swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    setIsPaused(false);
  };

  const slide = slides[current];

  const whatsappMessage = t("whatsappDayTrip", { title: slide.name });
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=573002322335&text=${encodeURIComponent(whatsappMessage)}`;

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (d: number) => ({
      x: d > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div
      className="pasadia-carousel relative w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => { setIsPaused(false); setShowOptions(false); }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.name}
            fill
            className="object-cover"
            priority={current === 0}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, 100vw"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 md:from-black/80 md:via-black/30 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent hidden md:block" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 pb-14 sm:p-6 sm:pb-16 md:p-10 md:pb-14 lg:p-16 lg:pb-16">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="max-w-2xl"
            >
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <span className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-md border border-white/20 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-white/90 text-xs md:text-sm font-medium">
                  <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  {t("colombia")}
                </span>
                <span className="inline-flex items-center gap-1 bg-accent/80 backdrop-blur-md px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-white text-xs md:text-sm font-medium">
                  <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  {slide.duration}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-2 md:mb-3 leading-tight drop-shadow-lg">
                {slide.name}
              </h3>

              {/* Description */}
              <p className="hidden sm:block text-white/80 text-xs sm:text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-4 md:mb-6 max-w-xl leading-relaxed">
                {slide.description}
              </p>

              {/* CTA */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Reservar — dropdown with WhatsApp / Email */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowOptions(!showOptions)}
                    className="inline-flex items-center gap-2 bg-white text-primary px-5 py-2.5 md:px-6 md:py-3 rounded-full font-semibold text-xs md:text-sm hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                  >
                    {t("book")}
                    <ChevronDown
                      className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-200 ${showOptions ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {showOptions && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full left-0 mb-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                      >
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors text-sm font-medium text-foreground/80 group/opt"
                          onClick={() => setShowOptions(false)}
                        >
                          <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center group-hover/opt:bg-green-200 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block font-semibold text-foreground">{t("bookWhatsapp")}</span>
                            <span className="block text-xs text-foreground/50">{t("bookWhatsappHint")}</span>
                          </div>
                        </a>
                        <div className="border-t border-gray-100" />
                        <Link
                          href="/contacto"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-sm font-medium text-foreground/80 group/opt"
                          onClick={() => setShowOptions(false)}
                        >
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover/opt:bg-blue-200 transition-colors">
                            <Mail className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block font-semibold text-foreground">{t("bookEmail")}</span>
                            <span className="block text-xs text-foreground/50">{t("bookEmailHint")}</span>
                          </div>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Ver Folleto → now links to detail page */}
                <Link
                  href={`/pasadias/${slide.id}`}
                  className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full font-semibold text-xs md:text-sm hover:bg-white/25 transition-all duration-300"
                >
                  <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  {t("brochure")}
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-2 sm:left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="Previous pasadía"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 sm:right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="Next pasadía"
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 md:gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-6 h-2 md:w-8 md:h-2.5 bg-white"
                : "w-2 h-2 md:w-2.5 md:h-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to pasadía ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-white/10 z-10">
        <motion.div
          className="h-full bg-accent/80"
          initial={{ width: "0%" }}
          animate={{ width: isPaused ? undefined : "100%" }}
          transition={{
            duration: 5,
            ease: "linear",
            repeat: 0,
          }}
          key={`progress-${current}-${isPaused}`}
        />
      </div>
    </div>
  );
}

