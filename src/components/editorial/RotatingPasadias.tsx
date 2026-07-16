"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { CaptionLabel } from "./CaptionLabel";
import { IMAGE_SIZES } from "@/lib/design-config";

interface PasadiaItem {
  id: string;
  image: string;
  name: string;
  description: string;
  duration: string;
}

interface RotatingPasadiasProps {
  items: PasadiaItem[];
  /** Auto-rotation interval in ms (default 5000) */
  interval?: number;
}

export function RotatingPasadias({ items, interval = 5000 }: RotatingPasadiasProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  // Auto-rotate
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, interval, isPaused]);

  const current = items[activeIndex];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main featured card */}
      <div className="relative h-[420px] md:h-[520px] rounded-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Link
              href={`/pasadias/${current.id}` as any}
              className="block relative w-full h-full group"
            >
              <Image
                src={current.image}
                alt={current.name}
                fill
                sizes={IMAGE_SIZES.hero}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={activeIndex === 0}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <CaptionLabel icon="duration" className="text-white/70 mb-3">
                  {current.duration}
                </CaptionLabel>
                <h3 className="heading-1 text-white mb-2 md:text-4xl">{current.name}</h3>
                <p className="body text-white/70 max-w-lg line-clamp-2">{current.description}</p>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation thumbnails */}
      <div className="flex items-center justify-center gap-3 mt-6">
        {items.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setActiveIndex(i)}
            aria-label={`Ver ${item.name}`}
            className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
              i === activeIndex
                ? "w-16 h-16 md:w-20 md:h-20 ring-2 ring-editorial-accent ring-offset-2 ring-offset-editorial-warm scale-105"
                : "w-12 h-12 md:w-14 md:h-14 opacity-50 hover:opacity-80 grayscale hover:grayscale-0"
            }`}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="flex gap-1.5 mt-4 justify-center">
        {items.map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full overflow-hidden bg-editorial-dark/10"
            style={{ width: i === activeIndex ? 32 : 16 }}
          >
            {i === activeIndex && !isPaused && (
              <motion.div
                className="h-full bg-editorial-accent rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: interval / 1000, ease: "linear" }}
                key={`progress-${activeIndex}`}
              />
            )}
            {i === activeIndex && isPaused && (
              <div className="h-full bg-editorial-accent rounded-full w-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
