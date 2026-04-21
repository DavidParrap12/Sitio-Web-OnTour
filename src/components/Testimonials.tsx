"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { testimonials } from "@/data/testimonials";

const AUTOPLAY_MS = 6000;
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/On+Tour+Agencia+de+Viajes+y+Turismo/@4.4453522,-75.2412314,19z/";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-white">
      {initials}
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations("testimonials");
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setCurrent(((next % testimonials.length) + testimonials.length) % testimonials.length);
    },
    []
  );

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [next]);

  const review = testimonials[current];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Google badge */}
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm mb-6 hover:shadow-md transition-shadow"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-semibold text-foreground/80">
                {t("googleBadge")}
              </span>
              <div className="flex items-center gap-0.5 ml-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </a>

            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>

        {/* Testimonial card with flanking arrows */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Arrow LEFT — desktop only, positioned outside card */}
            <button
              onClick={prev}
              className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border-2 border-gray-200 items-center justify-center text-foreground/50 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all z-20"
              aria-label={t("prevReview")}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Arrow RIGHT — desktop only, positioned outside card */}
            <button
              onClick={next}
              className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border-2 border-gray-200 items-center justify-center text-foreground/50 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all z-20"
              aria-label={t("nextReview")}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Animated card */}
            <div className="relative min-h-[220px] md:min-h-[200px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-lg shadow-gray-100/50 relative">
                    {/* Quote icon */}
                    <Quote className="absolute top-6 right-8 w-10 h-10 text-primary/8" />

                    {/* Stars + verified */}
                    <div className="flex items-center justify-between mb-5">
                      <StarRating rating={review.rating} />
                      <span className="text-xs text-foreground/40 font-medium">
                        {t("verifiedReview")}
                      </span>
                    </div>

                    {/* Review text */}
                    <p className="text-foreground/80 text-lg md:text-xl leading-relaxed mb-6 italic">
                      &ldquo;{t(`reviews.${review.reviewKey}.text`)}&rdquo;
                    </p>

                    {/* Reviewer info */}
                    <div className="flex items-center gap-4">
                      <Initials name={review.name} />
                      <div className="flex-1">
                        <p className="font-bold text-foreground">{review.name}</p>
                        <p className="text-sm text-foreground/50">
                          <svg className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" viewBox="0 0 24 24" fill="none">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                          {t("googleUser")}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dots + mobile arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Mobile arrow left */}
            <button
              onClick={prev}
              className="md:hidden w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-foreground/50 hover:border-primary hover:text-primary transition-colors"
              aria-label={t("prevReview")}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? "bg-primary w-8 h-2.5"
                      : "bg-gray-200 hover:bg-gray-300 w-2.5 h-2.5"
                  }`}
                  aria-label={`${t("goToReview")} ${i + 1}`}
                />
              ))}
            </div>

            {/* Mobile arrow right */}
            <button
              onClick={next}
              className="md:hidden w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-foreground/50 hover:border-primary hover:text-primary transition-colors"
              aria-label={t("nextReview")}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* CTA to Google */}
          <div className="text-center mt-6">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors group"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {t("seeAllOnGoogle")}
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

