"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ZoomIn, Download, ChevronLeft, ChevronRight, FileText } from "lucide-react";

interface ReconocimientosGalleryProps {
  closeLabel: string;
}

interface RecognitionsItem {
  id: number;
  title: string;
  issuer: string;
  image: string;
  pdf: string;
}

const recognitions: RecognitionsItem[] = [
  {
    id: 1,
    title: "Programa de Formación Exportadora en Turismo de Ibagué 2024",
    issuer: "ProColombia & Alcaldía de Ibagué",
    image: "/image/reconocimientos/reconocimiento-1.jpg",
    pdf: "/image/reconocimientos/reconocimiento-1.pdf",
  },
  {
    id: 2,
    title: "Reconocimiento al Compromiso con el Turismo del Tolima",
    issuer: "Gobernación del Tolima",
    image: "/image/reconocimientos/reconocimiento-2.jpg",
    pdf: "/image/reconocimientos/reconocimiento-2.pdf",
  },
  {
    id: 3,
    title: "Proveedor Idóneo — Calificación 10/10",
    issuer: "Cámara de Comercio de Ibagué",
    image: "/image/reconocimientos/reconocimiento-3.jpg",
    pdf: "/image/reconocimientos/reconocimiento-3.pdf",
  },
  {
    id: 4,
    title: "Programa de Formación Exportadora Andes Orientales 2025",
    issuer: "ProColombia",
    image: "/image/reconocimientos/reconocimiento-4.jpg",
    pdf: "/image/reconocimientos/reconocimiento-4.pdf",
  },
];

export function ReconocimientosGallery({ closeLabel }: ReconocimientosGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === null ? null : prev > 0 ? prev - 1 : recognitions.length - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === null ? null : prev < recognitions.length - 1 ? prev + 1 : 0));
  }, []);

  const handleClose = useCallback(() => {
    setActiveIndex(null);
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, handleClose, handlePrev, handleNext]);

  const activeItem = activeIndex !== null ? recognitions[activeIndex] : null;

  return (
    <>
      {/* Grid de certificados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
        {recognitions.map((item, index) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-stone-200/80 overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            {/* Visualización del certificado */}
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="relative w-full aspect-[1122/815] bg-stone-100 overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
              aria-label={`Ver ${item.title}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                className="object-contain p-1 transition-transform duration-500 group-hover:scale-[1.02]"
                priority={index < 2}
              />

              {/* Overlay en hover */}
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/25 transition-colors duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/95 text-stone-900 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                  <ZoomIn className="w-5 h-5 text-primary" />
                </div>
              </div>
            </button>

            {/* Pie de la tarjeta con información y descarga de PDF */}
            <div className="p-4 bg-white border-t border-stone-100 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-stone-900 truncate" title={item.title}>
                  {item.title}
                </h3>
                <p className="text-xs text-stone-500 truncate">{item.issuer}</p>
              </div>

              <a
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors shrink-0"
                title="Descargar documento PDF oficial"
              >
                <FileText className="w-3.5 h-3.5 text-primary" />
                <span>PDF</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Lightbox de visualización ampliada */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/85 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={handleClose}
        >
          {/* Barra superior con datos y acciones */}
          <div
            className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-stone-900/80 backdrop-blur-md px-4 py-2 rounded-xl text-white pointer-events-auto max-w-[70vw] truncate">
              <p className="text-sm font-medium truncate">{activeItem.title}</p>
              <p className="text-xs text-stone-300 truncate">{activeItem.issuer}</p>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              <a
                href={activeItem.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-medium backdrop-blur-md transition-colors"
                title="Abrir o descargar PDF oficial"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Descargar PDF</span>
              </a>

              <button
                type="button"
                onClick={handleClose}
                className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                aria-label={closeLabel}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Flechas de navegación */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 sm:left-6 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Certificado anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 sm:right-6 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Siguiente certificado"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Contenedor del certificado en alta resolución */}
          <div
            className="relative w-full max-w-5xl aspect-[1122/815] bg-white rounded-2xl shadow-2xl overflow-hidden p-2 sm:p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeItem.image}
              alt={activeItem.title}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          {/* Paginación / Puntos inferiores */}
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {recognitions.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  i === activeIndex
                    ? "bg-white scale-125"
                    : "bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Ir al certificado ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
