"use client";

import { useState } from "react";
import { X, ZoomIn } from "lucide-react";

interface ReconocimientosGalleryProps {
  closeLabel: string;
}

const pdfs = [
  "/image/reconocimientos/reconocimiento-1.pdf",
  "/image/reconocimientos/reconocimiento-2.pdf",
  "/image/reconocimientos/reconocimiento-3.pdf",
  "/image/reconocimientos/reconocimiento-4.pdf",
];

export function ReconocimientosGallery({ closeLabel }: ReconocimientosGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {pdfs.map((pdf, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
          >
            {/* PDF Preview – rotated 90deg CW */}
            <div className="w-full aspect-[11/8.5] relative overflow-hidden pointer-events-none">
              <object
                data={`${pdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                type="application/pdf"
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: "translate(-50%, -50%) rotate(90deg)",
                  width: "77.27%",   /* 8.5/11 * 100 — CSS width = container height */
                  height: "129.41%", /* 11/8.5 * 100 — CSS height = container width */
                }}
                aria-label={`Reconocimiento ${i + 1}`}
              >
                <div className="w-full h-full flex items-center justify-center bg-gray-50 text-foreground/40">
                  <p className="text-sm">PDF {i + 1}</p>
                </div>
              </object>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                <ZoomIn className="w-6 h-6 text-primary" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal de zoom */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setActiveIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveIndex(null)}
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label={closeLabel}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(activeIndex > 0 ? activeIndex - 1 : pdfs.length - 1);
            }}
            className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-2xl cursor-pointer"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(activeIndex < pdfs.length - 1 ? activeIndex + 1 : 0);
            }}
            className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-2xl cursor-pointer"
          >
            ›
          </button>

          {/* PDF ampliado – rotated 90deg CW */}
          <div
            className="bg-white rounded-2xl shadow-2xl overflow-hidden relative"
            style={{ width: "90vw", maxWidth: "1000px", aspectRatio: "11 / 8.5" }}
            onClick={(e) => e.stopPropagation()}
          >
            <object
              data={`${pdfs[activeIndex]}#toolbar=0&navpanes=0&view=FitH`}
              type="application/pdf"
              className="absolute top-1/2 left-1/2"
              style={{
                transform: "translate(-50%, -50%) rotate(90deg)",
                width: "77.27%",
                height: "129.41%",
              }}
              aria-label={`Reconocimiento ${activeIndex + 1}`}
            >
              <embed
                src={`${pdfs[activeIndex]}#toolbar=0&navpanes=0&view=FitH`}
                type="application/pdf"
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: "translate(-50%, -50%) rotate(90deg)",
                  width: "77.27%",
                  height: "129.41%",
                }}
              />
            </object>
          </div>

          {/* Indicator dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {pdfs.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(i);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  i === activeIndex
                    ? "bg-white scale-125"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
