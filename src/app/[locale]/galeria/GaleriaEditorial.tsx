"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionReveal } from "@/components/editorial/SectionReveal";
import { IMAGE_SIZES } from "@/lib/design-config";

export interface GalleryImageData {
  src: string;
  alt: string;
  category: string;
}

interface GaleriaEditorialProps {
  images: GalleryImageData[];
  categories: string[];
  title: string;
  subtitle: string;
  filterAllLabel: string;
}

export function GaleriaEditorial({
  images,
  categories,
  title,
  subtitle,
  filterAllLabel,
}: GaleriaEditorialProps) {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? images : images.filter((img) => img.category === filter)),
    [filter, images]
  );

  function openLightbox(i: number) {
    setLightbox(i);
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    setLightbox(null);
    document.body.style.overflow = "";
  }

  function navigate(dir: -1 | 1) {
    if (lightbox === null) return;
    setLightbox((lightbox + dir + filtered.length) % filtered.length);
  }

  // Handle keyboard navigation in lightbox
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigate(-1);
    if (e.key === "ArrowRight") navigate(1);
  }

  return (
    <div className="min-h-screen bg-editorial-warm">
      {/* -- Hero ------------------------------------------------ */}
      <div className="relative h-[60vh] md:h-[70vh] flex items-end overflow-hidden">
        {/* Background image — large landscape shot */}
        <Image
          src="/image/makalu-colombia-3631740.jpg"
          alt="Colombia paisaje"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-editorial-dark/90 via-editorial-dark/40 to-transparent" />
        <div className="absolute inset-0 editorial-overlay-vignette" />

        {/* Content aligned to bottom */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 pb-16 md:pb-20">
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 py-2.5 px-6 rounded-full bg-gradient-to-r from-editorial-accent/30 to-sky-500/20 backdrop-blur-xl border border-editorial-accent/40 text-white font-semibold text-sm md:text-base tracking-widest uppercase mb-8 shadow-[0_0_30px_rgba(28,126,214,0.3)]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-editorial-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-editorial-accent" />
            </span>
            Colombia en imágenes
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="display-1 text-white mb-4"
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
      </div>

      {/* -- Filter Bar ----------------------------------------- */}
      <div className="sticky top-0 z-20 bg-editorial-warm/95 backdrop-blur-md border-b border-editorial-border">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === "all"
                  ? "bg-editorial-dark text-white shadow-editorial-md"
                  : "bg-white text-editorial-muted hover:bg-editorial-border-light border border-editorial-border"
              }`}
            >
              {filterAllLabel}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === cat
                    ? "bg-editorial-dark text-white shadow-editorial-md"
                    : "bg-white text-editorial-muted hover:bg-editorial-border-light border border-editorial-border"
                }`}
              >
                {cat}
              </button>
            ))}

            {/* Image count */}
            <span className="ml-auto caption hidden sm:block">
              {filtered.length} {filtered.length === 1 ? "foto" : "fotos"}
            </span>
          </div>
        </div>
      </div>

      {/* -- Masonry Grid --------------------------------------- */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <SectionReveal>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }}
                  className="break-inside-avoid cursor-pointer group relative rounded-xl overflow-hidden editorial-hover-scale"
                  onClick={() => openLightbox(i)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={400}
                    sizes={IMAGE_SIZES.gallery}
                    className="w-full h-auto object-cover editorial-scale-target transition-transform duration-700"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 editorial-overlay-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  {/* Caption on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white text-sm font-medium leading-snug">{img.alt}</p>
                    <span className="label text-white/60 mt-1 block">{img.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </SectionReveal>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="body-lg text-editorial-muted">No hay fotos en esta categoría.</p>
          </div>
        )}
      </div>

      {/* -- Lightbox -------------------------------------------- */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Galería de fotos"
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10 p-2"
              aria-label="Cerrar"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 label text-white/40">
              {lightbox + 1} / {filtered.length}
            </div>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 md:left-8 text-white/40 hover:text-white transition-colors z-10 p-2"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-[90vw] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightbox].src}
                alt={filtered[lightbox].alt}
                width={1400}
                height={900}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
                quality={90}
              />
              <div className="absolute -bottom-12 left-0 right-0 text-center">
                <p className="text-white/70 text-sm">{filtered[lightbox].alt}</p>
                <span className="label text-white/40 mt-1 block">{filtered[lightbox].category}</span>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 md:right-8 text-white/40 hover:text-white transition-colors z-10 p-2"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
