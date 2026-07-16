"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IMAGE_SIZES } from "@/lib/design-config";

interface CircuitoItem {
  id: string;
  image: string;
  days: number;
  nights: number;
  name: string;
  description: string;
}

interface CircuitosCarouselProps {
  items: CircuitoItem[];
}

export function CircuitosCarousel({ items }: CircuitosCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: false,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      {/* Carousel viewport */}
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex gap-5">
          {items.map((c, i) => (
            <div
              key={c.id}
              className="flex-[0_0_85%] min-w-0 sm:flex-[0_0_45%] lg:flex-[0_0_32%]"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  href={`/circuitos/${c.id}` as any}
                  className="group block bg-editorial-warm rounded-2xl overflow-hidden border border-editorial-border editorial-hover-lift"
                >
                  <div className="relative h-56 overflow-hidden editorial-hover-scale">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      sizes={IMAGE_SIZES.gallery}
                      className="object-cover editorial-scale-target transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-editorial-dark/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                      {c.days}D / {c.nights}N
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="heading-2 text-editorial-dark mb-2 group-hover:text-editorial-accent transition-colors">
                      {c.name}
                    </h3>
                    <p className="caption text-editorial-muted line-clamp-2">
                      {c.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label="Anterior"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-5 z-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-editorial-border flex items-center justify-center text-editorial-dark hover:bg-editorial-accent hover:text-white hover:border-editorial-accent transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="Siguiente"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-5 z-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-editorial-border flex items-center justify-center text-editorial-dark hover:bg-editorial-accent hover:text-white hover:border-editorial-accent transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Ir a circuito ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === selectedIndex
                ? "w-8 h-2.5 bg-editorial-accent"
                : "w-2.5 h-2.5 bg-editorial-dark/20 hover:bg-editorial-dark/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
