"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Heart, Camera } from "lucide-react";
import { SectionReveal } from "@/components/editorial/SectionReveal";
import { ParallaxFloat } from "@/components/editorial/ParallaxFloat";
import { IMAGE_SIZES } from "@/lib/design-config";
import { useTranslations } from "next-intl";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";

export interface GalleryImageData {
  src: string;
  alt: string;
  category: string;
  author?: string; // Nombre del viajero, solo para categoría Experiencias
}

interface GaleriaEditorialProps {
  images: GalleryImageData[];
  categories: string[];
  title: string;
  subtitle: string;
  filterAllLabel: string;
}

const EXPERIENCIAS_KEY = "Experiencias";
// Número de WhatsApp de OnTour — ajustar si cambia
const WA_NUMBER = "573143415177";

export function GaleriaEditorial({
  images,
  categories,
  title,
  subtitle,
  filterAllLabel,
}: GaleriaEditorialProps) {
  const t = useTranslations("gallery");
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? images : images.filter((img) => img.category === filter)),
    [filter, images]
  );

  const isExperienciasMode = filter === EXPERIENCIAS_KEY;
  const experienciasImages = useMemo(
    () => images.filter((img) => img.category === EXPERIENCIAS_KEY),
    [images]
  );
  const hasExperiencias = experienciasImages.length > 0;

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("¡Hola! Quiero compartir una foto de mi experiencia con OnTour 📸")}`;

  // Focus trap for lightbox
  const lightboxRef = useFocusTrap(lightbox !== null);

  function openLightbox(i: number) {
    setLightbox(i);
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    setLightbox(null);
    document.body.style.overflow = "";
  }

  function handleFocusTrapEscape() {
    closeLightbox();
  }

  useEffect(() => {
    if (lightbox !== null) {
      const container = lightboxRef.current;
      if (container) {
        container.addEventListener("focusTrapEscape", handleFocusTrapEscape);
      }
      return () => {
        if (container) {
          container.removeEventListener("focusTrapEscape", handleFocusTrapEscape);
        }
      };
    }
  }, [lightbox]);

  function navigate(dir: -1 | 1) {
    if (lightbox === null) return;
    setLightbox((lightbox + dir + filtered.length) % filtered.length);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigate(-1);
    if (e.key === "ArrowRight") navigate(1);
  }

  return (
    <div className="min-h-screen bg-editorial-warm">
      {/* -- Masonry Collage Hero --------------------------------- */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end overflow-hidden">
        <ParallaxFloat speed={0.08} className="absolute inset-0">
          {/* Desktop collage: 1 large + 4 supporting */}
          <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-1 h-full w-full">
            {images.slice(0, 5).map((img, i) => (
              <div key={img.src} className={`relative ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes={i === 0 ? "50vw" : "25vw"}
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
          {/* Mobile collage: simple 2x2 */}
          <div className="md:hidden grid grid-cols-2 grid-rows-2 gap-1 h-full w-full">
            {images.slice(0, 4).map((img) => (
              <div key={img.src} className="relative">
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </ParallaxFloat>
        <div className="absolute inset-0 bg-gradient-to-t from-editorial-dark/95 via-editorial-dark/55 to-editorial-dark/20" />
        <div className="absolute inset-0 editorial-overlay-vignette" />

        <div className="relative z-10 container mx-auto px-4 md:px-6 pb-16 md:pb-20">
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
      </section>

      {/* -- Filter Bar ----------------------------------------- */}
      <div className="sticky top-0 z-20 bg-editorial-warm/95 backdrop-blur-md border-b border-editorial-border relative">
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

            {/* Categorías regulares */}
            {categories
              .filter((cat) => cat !== EXPERIENCIAS_KEY)
              .map((cat) => (
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

            {/* Experiencias — tab especial con icono corazón */}
            {categories.includes(EXPERIENCIAS_KEY) && (
              <button
                onClick={() => setFilter(EXPERIENCIAS_KEY)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  filter === EXPERIENCIAS_KEY
                    ? "bg-rose-500 text-white shadow-editorial-md"
                    : "bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200"
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
                {t("experienciasLabel")}
                {experienciasImages.length > 0 && (
                  <span className={`text-xs rounded-full px-1.5 py-0.5 font-bold ${filter === EXPERIENCIAS_KEY ? "bg-white/20" : "bg-rose-100"}`}>
                    {experienciasImages.length}
                  </span>
                )}
              </button>
            )}

            {/* Image count */}
            <span className="ml-auto caption hidden sm:block">
              {filtered.length} {filtered.length === 1 ? "foto" : "fotos"}
            </span>
          </div>
        </div>
      </div>

      {/* -- Experiencias: Banner especial cuando está filtrado --- */}
      <AnimatePresence>
        {isExperienciasMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-b border-rose-100">
              <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center shrink-0">
                    <Camera className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <p className="label text-rose-500 mb-1">{t("experienciasTagline")}</p>
                    <p className="body text-editorial-dark font-medium max-w-lg">{t("experienciasDesc")}</p>
                  </div>
                </div>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                >
                  <Heart className="w-4 h-4" />
                  {t("experienciasCtaBtn")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -- Grid / Empty State ---------------------------------- */}
      <section className="bg-editorial-warm editorial-section--bleed relative">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 relative z-10">
          {/* Empty state para Experiencias */}
          {isExperienciasMode && !hasExperiencias ? (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center text-center py-24 md:py-32"
            >
              <div className="w-24 h-24 rounded-3xl bg-rose-100 flex items-center justify-center mb-8">
                <Camera className="w-12 h-12 text-rose-400" />
              </div>
              <h2 className="heading-1 text-editorial-dark mb-4">{t("experienciasEmptyTitle")}</h2>
              <p className="body text-editorial-muted mb-10 max-w-md">{t("experienciasEmptyDesc")}</p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:-translate-y-0.5 shadow-editorial-lg hover:shadow-editorial-xl"
              >
                <Heart className="w-5 h-5" />
                {t("experienciasEmptyBtn")}
              </a>
            </motion.div>
          ) : (
            <>
              <SectionReveal className="editorial-stagger-variance">
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

                        {/* Badge especial para fotos de viajeros */}
                        {img.category === EXPERIENCIAS_KEY && (
                          <div className="absolute top-3 left-3 flex items-center gap-1 bg-rose-500/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                            <Heart className="w-3 h-3" />
                            {img.author ?? "Viajero OnTour"}
                          </div>
                        )}

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
            </>
          )}

          {filtered.length === 0 && !isExperienciasMode && (
            <div className="text-center py-24">
              <p className="body-lg text-editorial-muted">No hay fotos en esta categoría.</p>
            </div>
          )}

          {/* CTA compartir foto — solo en modo Experiencias con fotos */}
          {isExperienciasMode && hasExperiencias && (
            <SectionReveal>
              <div className="mt-16 text-center p-10 md:p-14 rounded-3xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100">
                <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-7 h-7 text-rose-500" />
                </div>
                <h3 className="heading-1 text-editorial-dark mb-3">{t("experienciasCtaTitle")}</h3>
                <p className="body text-editorial-muted mb-8 mx-auto">{t("experienciasCtaDesc")}</p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:-translate-y-0.5 shadow-editorial-lg hover:shadow-editorial-xl"
                >
                  <Heart className="w-5 h-5" />
                  {t("experienciasCtaBtn")}
                </a>
              </div>
            </SectionReveal>
          )}
        </div>
      </section>

      {/* -- Lightbox -------------------------------------------- */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            ref={lightboxRef}
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

            {/* Experiencias badge en lightbox */}
            {filtered[lightbox]?.category === EXPERIENCIAS_KEY && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-rose-500/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                <Heart className="w-3 h-3" />
                {filtered[lightbox].author ?? "Viajero OnTour"}
              </div>
            )}

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
