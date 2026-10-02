"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Compass,
  MapPin,
  Move,
} from "lucide-react";
import { SectionReveal } from "@/components/editorial/SectionReveal";

interface RegionStyle {
  key: "caribe" | "pacifico" | "andesOccidentales" | "andesOrientales" | "macizo" | "amazoniaOrinoquia";
  badgeColor: string;
  textColor: string;
  borderColor: string;
}

const REGION_STYLES: RegionStyle[] = [
  {
    key: "caribe",
    badgeColor: "bg-sky-50",
    textColor: "text-sky-700",
    borderColor: "border-sky-200",
  },
  {
    key: "pacifico",
    badgeColor: "bg-blue-50",
    textColor: "text-blue-800",
    borderColor: "border-blue-200",
  },
  {
    key: "andesOccidentales",
    badgeColor: "bg-rose-50",
    textColor: "text-rose-700",
    borderColor: "border-rose-200",
  },
  {
    key: "andesOrientales",
    badgeColor: "bg-amber-50",
    textColor: "text-amber-800",
    borderColor: "border-amber-200",
  },
  {
    key: "macizo",
    badgeColor: "bg-orange-50",
    textColor: "text-orange-800",
    borderColor: "border-orange-200",
  },
  {
    key: "amazoniaOrinoquia",
    badgeColor: "bg-emerald-50",
    textColor: "text-emerald-800",
    borderColor: "border-emerald-200",
  },
];

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const SCALE_STEP = 0.5;

export function MacrorregionesColombia() {
  const t = useTranslations("macrorregiones");
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + SCALE_STEP, MAX_SCALE));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => {
      const next = Math.max(prev - SCALE_STEP, MIN_SCALE);
      if (next === MIN_SCALE) setPosition({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const handleToggleDoubleClick = useCallback(() => {
    if (scale > 1) {
      resetZoom();
    } else {
      setScale(2.2);
    }
  }, [scale, resetZoom]);

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "+" || e.key === "=") {
        handleZoomIn();
      } else if (e.key === "-") {
        handleZoomOut();
      } else if (e.key === "0") {
        resetZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleZoomIn, handleZoomOut, resetZoom]);

  // Reset zoom on modal open/close
  useEffect(() => {
    if (!isOpen) {
      resetZoom();
    }
  }, [isOpen, resetZoom]);

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    setPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (scale <= 1 || e.touches.length !== 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.touches[0].clientX - position.x,
      y: e.touches[0].clientY - position.y,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || scale <= 1 || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - dragStartRef.current.x,
      y: e.touches[0].clientY - dragStartRef.current.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-20 md:py-28 bg-editorial-warm/40 editorial-section--bleed border-t border-b border-editorial-border relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionReveal className="editorial-stagger-variance">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-editorial-border shadow-xs text-xs font-semibold uppercase tracking-wider text-editorial-accent mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>{t("tagline")}</span>
            </div>
            <h2 className="display-2 text-editorial-dark mb-4">
              {t("title")}
            </h2>
            <p className="body-lg text-editorial-muted">
              {t("subtitle")}
            </p>
          </div>

          {/* Interactive Image Display Card */}
          <div className="max-w-5xl mx-auto">
            <div
              onClick={() => setIsOpen(true)}
              className="group relative bg-white rounded-3xl p-4 sm:p-8 md:p-10 border border-editorial-border shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-editorial-accent/30 cursor-pointer overflow-hidden"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setIsOpen(true);
              }}
              aria-label={t("clickToZoom")}
            >
              {/* Top Hint Bar */}
              <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-editorial-border/60 text-xs text-editorial-subtle">
                <span className="flex items-center gap-1.5 font-medium text-editorial-dark">
                  <MapPin className="w-3.5 h-3.5 text-editorial-accent" />
                  {t("mapBadge")}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-editorial-warm font-medium text-editorial-accent group-hover:bg-editorial-accent group-hover:text-white transition-colors">
                  <ZoomIn className="w-3.5 h-3.5" />
                  {t("exploreZoom")}
                </span>
              </div>

              {/* Main Image */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] md:aspect-[16/10] max-h-[640px] flex items-center justify-center">
                <Image
                  src="/image/procolombia-macrorregionesjpg.jpg.jpeg"
                  alt={t("mapAlt")}
                  width={1400}
                  height={1400}
                  className="w-full h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                  quality={95}
                  priority
                />
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-editorial-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none rounded-3xl">
                <div className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-full shadow-xl flex items-center gap-2 text-editorial-dark text-sm font-semibold transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <ZoomIn className="w-4 h-4 text-editorial-accent" />
                  {t("clickToZoom")}
                </div>
              </div>
            </div>

            {/* 6 Macro-regions summary cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-8">
              {REGION_STYLES.map((r) => (
                <div
                  key={r.key}
                  className={`p-3.5 rounded-2xl ${r.badgeColor} border ${r.borderColor} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs`}
                >
                  <p className={`text-xs font-bold ${r.textColor} leading-tight mb-1`}>
                    {t(`regions.${r.key}.name`)}
                  </p>
                  <p className="text-[11px] text-editorial-subtle leading-tight">
                    {t(`regions.${r.key}.slogan`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>

      {/* Fullscreen Interactive Zoom & Pan Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-lg flex flex-col justify-between select-none animate-in fade-in duration-200"
          onClick={() => {
            if (!isDragging) setIsOpen(false);
          }}
        >
          {/* Top Bar */}
          <header
            className="w-full flex items-center justify-between px-4 sm:px-8 py-4 text-white z-20 bg-gradient-to-b from-black/80 to-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center">
                <Compass className="w-4 h-4 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-white">
                  {t("title")}
                </h3>
                <p className="text-xs text-white/60 hidden sm:block">
                  {t("modalInstructions")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white/90 border border-white/10">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 sm:p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer focus:outline-none"
                aria-label={t("closeLabel")}
                title={t("closeTitle")}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </header>

          {/* Interactive Zoomable Viewport */}
          <div
            ref={containerRef}
            className={`relative flex-1 w-full overflow-hidden flex items-center justify-center ${
              scale > 1
                ? isDragging
                  ? "cursor-grabbing"
                  : "cursor-grab"
                : "cursor-zoom-in"
            }`}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onDoubleClick={handleToggleDoubleClick}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
                transformOrigin: "center center",
              }}
              className="relative max-w-full max-h-full flex items-center justify-center p-2 sm:p-6"
            >
              <Image
                src="/image/procolombia-macrorregionesjpg.jpg.jpeg"
                alt={t("mapDetailAlt")}
                width={2400}
                height={2400}
                className="max-w-[92vw] max-h-[75vh] sm:max-h-[80vh] w-auto h-auto object-contain rounded-2xl shadow-2xl bg-white p-2.5 pointer-events-none"
                quality={100}
                priority
              />
            </div>
          </div>

          {/* Floating Bottom Control Bar */}
          <footer
            className="w-full flex items-center justify-center pb-6 pt-2 z-20 pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
              <button
                onClick={handleZoomOut}
                disabled={scale <= MIN_SCALE}
                className="p-2 rounded-full hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                title={t("zoomOut")}
                aria-label={t("zoomOut")}
              >
                <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={resetZoom}
                className="px-3 py-1.5 text-xs font-semibold rounded-full hover:bg-white/20 transition-colors flex items-center gap-1.5 cursor-pointer"
                title={t("resetTitle")}
                aria-label={t("reset")}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t("reset")}</span>
              </button>

              <button
                onClick={handleZoomIn}
                disabled={scale >= MAX_SCALE}
                className="p-2 rounded-full hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                title={t("zoomIn")}
                aria-label={t("zoomIn")}
              >
                <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {scale > 1 && (
                <div className="hidden sm:flex items-center gap-1 text-[11px] text-white/70 pl-2 border-l border-white/20">
                  <Move className="w-3 h-3" />
                  <span>{t("dragToMove")}</span>
                </div>
              )}
            </div>
          </footer>
        </div>
      )}
    </section>
  );
}
