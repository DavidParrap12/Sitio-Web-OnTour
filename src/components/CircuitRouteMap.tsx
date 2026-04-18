"use client";

import { useRef, useMemo, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ────────────────────────────────────────────────────────────────
   City positions as PERCENTAGES (x%, y%) on the 1024×1024
   colombia-map-dark.png image.
   
   Calibrated visually against the generated map which shows:
   - Full Colombia with departmental borders
   - Guajira at top, Leticia trapezoid at bottom
   - Pacific coast (Chocó) on left, Llanos on right
   ──────────────────────────────────────────────────────────────── */
type LabelDir = "left" | "right" | "top" | "bottom";

interface CityPos {
  x: number; // % from left
  y: number; // % from top
  dir: LabelDir;
}

const CITIES: Record<string, CityPos> = {
  // ── Costa Caribe ──────────────────────────
  "BARRANQUILLA":       { x: 42.0, y: 12.0, dir: "right" },
  "CARTAGENA":          { x: 33.0, y: 14.5, dir: "left" },
  "ISLAS DEL ROSARIO":  { x: 30.0, y: 17.0, dir: "left" },
  "BARÚ":               { x: 33.5, y: 16.0, dir: "right" },

  // ── Antioquia ─────────────────────────────
  "MEDELLÍN":           { x: 29.5, y: 30.0, dir: "left" },
  "GUATAPÉ":            { x: 34.0, y: 30.5, dir: "right" },

  // ── Eje Cafetero ──────────────────────────
  "MANIZALES":          { x: 29.0, y: 34.5, dir: "left" },
  "SALENTO":            { x: 27.5, y: 37.0, dir: "left" },
  "ARMENIA":            { x: 27.0, y: 38.0, dir: "left" },
  "QUINDÍO":            { x: 27.0, y: 38.0, dir: "left" },

  // ── Tolima / Cundinamarca ─────────────────
  "HONDA":              { x: 36.0, y: 33.0, dir: "right" },
  "GUADUAS":            { x: 38.0, y: 34.5, dir: "right" },
  "LÍBANO":             { x: 33.0, y: 35.0, dir: "bottom" },
  "IBAGUÉ":             { x: 31.0, y: 37.5, dir: "left" },
  "COMBEIMA":           { x: 30.5, y: 39.0, dir: "left" },
  "TOLIMA":             { x: 32.0, y: 38.0, dir: "left" },

  // ── Bogotá region ──────────────────────────
  "BOGOTÁ":             { x: 42.0, y: 36.5, dir: "right" },
  "MONSERRATE":         { x: 42.0, y: 36.5, dir: "right" },
  "ZIPAQUIRÁ":          { x: 41.0, y: 34.5, dir: "right" },

  // ── Boyacá ────────────────────────────────
  "VILLA DE LEYVA":     { x: 44.0, y: 32.0, dir: "right" },
  "TUNJA":              { x: 45.5, y: 33.5, dir: "right" },
  "LAGO DE TOTA":       { x: 47.5, y: 33.0, dir: "right" },
  "BOYACÁ":             { x: 45.5, y: 33.5, dir: "right" },

  // ── Sur ───────────────────────────────────
  "PRADO":              { x: 38.5, y: 41.5, dir: "right" },
  "HUILA":              { x: 34.0, y: 49.0, dir: "right" },
  "SAN AGUSTÍN":        { x: 28.0, y: 53.5, dir: "left" },
};

/* ────────────────────────────────────────────────────────────────
   Component
   ──────────────────────────────────────────────────────────────── */
interface CircuitRouteMapProps {
  dayImages: { image: string; location: string }[];
  circuitName: string;
}

export default function CircuitRouteMap({
  dayImages,
  circuitName,
}: CircuitRouteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.12 });
  const [activeStop, setActiveStop] = useState<number | null>(null);

  /* Build unique stops & route segments from circuit data */
  const { uniqueStops, segments, stopDayMap } = useMemo(() => {
    const points = dayImages
      .map((d, dayIdx) => {
        const info = CITIES[d.location];
        return info
          ? { name: d.location, x: info.x, y: info.y, dir: info.dir, dayIdx, image: d.image }
          : null;
      })
      .filter(Boolean) as {
        name: string; x: number; y: number; dir: LabelDir; dayIdx: number; image: string;
      }[];

    const seen = new Set<string>();
    const unique: typeof points = [];
    const dayMap = new Map<string, { dayNum: number; image: string; location: string }>();

    for (const p of points) {
      const key = `${p.x},${p.y}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(p);
        dayMap.set(key, { dayNum: p.dayIdx + 1, image: p.image, location: p.name });
      }
    }

    /* Build route segments between consecutive distinct stops */
    const segs: { x1: number; y1: number; x2: number; y2: number; idx: number }[] = [];
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      if (a.x === b.x && a.y === b.y) continue;
      /* Check if this segment already exists */
      const exists = segs.some(
        (s) => s.x1 === a.x && s.y1 === a.y && s.x2 === b.x && s.y2 === b.y
      );
      if (!exists) {
        segs.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, idx: segs.length });
      }
    }
    return { uniqueStops: unique, segments: segs, stopDayMap: dayMap };
  }, [dayImages]);

  const STAGGER = 0.12;

  function labelOffset(dir: LabelDir) {
    switch (dir) {
      case "right":  return { dx: 1.8, dy: 0.3 , anchor: "start" as const };
      case "left":   return { dx: -1.8, dy: 0.3, anchor: "end" as const };
      case "top":    return { dx: 0, dy: -1.5, anchor: "middle" as const };
      case "bottom": return { dx: 0, dy: 2.0, anchor: "middle" as const };
    }
  }

  /* Build curved path in % coords → SVG that covers 100×100 viewBox */
  function segmentPath(s: typeof segments[0], i: number) {
    const dx = s.x2 - s.x1;
    const dy = s.y2 - s.y1;
    const len = Math.hypot(dx, dy);
    if (len === 0) return "";
    const curveAmount = Math.min(3, Math.max(0.8, len * 0.08));
    const direction = i % 2 === 0 ? 1 : -1;
    const nx = (-dy / len) * curveAmount * direction;
    const ny = (dx / len) * curveAmount * direction;
    const cx = (s.x1 + s.x2) / 2 + nx;
    const cy = (s.y1 + s.y2) / 2 + ny;
    return `M ${s.x1} ${s.y1} Q ${cx} ${cy} ${s.x2} ${s.y2}`;
  }

  const tooltipStop = activeStop !== null ? uniqueStops[activeStop] : null;
  const tooltipInfo = tooltipStop
    ? stopDayMap.get(`${tooltipStop.x},${tooltipStop.y}`)
    : null;

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden shadow-lg"
      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* ── Background: the real Colombia map with departments ── */}
      <Image
        src="/images/colombia-map-dark.png"
        alt="Mapa de Colombia"
        width={1024}
        height={1024}
        className="w-full h-auto block"
        priority
      />

      {/* ── SVG overlay: routes + markers at percentage positions ── */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Glow filter for the route */}
        <defs>
          <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Route segments ── */}
        {segments.map((seg, i) => {
          const d = segmentPath(seg, i);
          if (!d) return null;
          return (
            <motion.path
              key={`seg-${seg.idx}`}
              d={d}
              fill="none"
              stroke="#4dd8e0"
              strokeWidth={0.4}
              strokeLinecap="round"
              filter="url(#routeGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                isInView
                  ? { pathLength: 1, opacity: 0.9 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{
                pathLength: { duration: 0.6, delay: 0.3 + seg.idx * STAGGER, ease: "easeInOut" },
                opacity: { duration: 0.1, delay: 0.3 + seg.idx * STAGGER },
              }}
            />
          );
        })}

        {/* ── City markers + labels ── */}
        {uniqueStops.map((stop, i) => {
          const { dx, dy, anchor } = labelOffset(stop.dir);
          const isActive = activeStop === i;

          return (
            <motion.g
              key={`${stop.name}-${stop.x}-${stop.y}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.35, delay: 0.5 + i * 0.1 }}
              onMouseEnter={() => setActiveStop(i)}
              onMouseLeave={() => setActiveStop(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Pulse ring on hover */}
              {isActive && (
                <motion.circle
                  cx={stop.x}
                  cy={stop.y}
                  r={2}
                  fill="none"
                  stroke="#4dd8e0"
                  strokeWidth={0.15}
                  initial={{ r: 0.8, opacity: 0.6 }}
                  animate={{ r: 2, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              )}
              {/* Outer glow */}
              <circle
                cx={stop.x}
                cy={stop.y}
                r={isActive ? 1.4 : 1}
                fill="#4dd8e0"
                opacity={isActive ? 0.3 : 0.15}
                style={{ transition: "all 0.2s" }}
              />
              {/* Marker dot */}
              <circle
                cx={stop.x}
                cy={stop.y}
                r={isActive ? 0.7 : 0.5}
                fill="#4dd8e0"
                stroke="#fff"
                strokeWidth={0.15}
                style={{ transition: "all 0.2s" }}
              />
              {/* City name */}
              <text
                x={stop.x + dx}
                y={stop.y + dy}
                textAnchor={anchor}
                fontSize={1.3}
                fontWeight={700}
                fill="rgba(255,255,255,0.9)"
                style={{
                  fontFamily: "var(--font-sans, system-ui), sans-serif",
                  letterSpacing: "0.06em",
                  paintOrder: "stroke",
                  stroke: "rgba(0,0,0,0.6)",
                  strokeWidth: "0.25px",
                }}
              >
                {stop.name}
              </text>
            </motion.g>
          );
        })}

        {/* ── Compass ── */}
        <motion.g
          opacity={0.5}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <line x1={5} y1={5} x2={5} y2={2.5} stroke="#fff" strokeWidth={0.12} />
          <polygon points="5,2 4.7,3.5 5.3,3.5" fill="#fff" />
          <text x={5} y={1.5} textAnchor="middle" fontSize={1} fontWeight={700} fill="#fff"
            style={{ fontFamily: "var(--font-sans, system-ui)" }}>N</text>
        </motion.g>
      </svg>

      {/* ── Circuit name overlay at bottom ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 px-4 py-2 flex items-center justify-end gap-2"
        style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.5))" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.8 + segments.length * STAGGER, duration: 0.5 }}
      >
        <span
          className="text-[10px] sm:text-xs font-bold tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-heading, Georgia), serif" }}
        >
          {circuitName}
        </span>
        <span className="w-2 h-2 rounded-full" style={{ background: "#4dd8e0" }} />
      </motion.div>

      {/* ── Hover tooltip with image ── */}
      <AnimatePresence>
        {tooltipStop && tooltipInfo && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-3 left-3 right-3 flex items-center gap-3 rounded-xl overflow-hidden"
            style={{
              background: "rgba(13,33,55,0.92)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(77,216,224,0.25)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}
          >
            <div className="relative w-20 h-16 shrink-0">
              <Image
                src={tooltipInfo.image}
                alt={tooltipInfo.location}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="py-2 pr-3">
              <p className="text-[11px] font-bold tracking-wider" style={{ color: "#4dd8e0" }}>
                DÍA {tooltipInfo.dayNum}
              </p>
              <p className="text-sm font-semibold text-white">
                {tooltipInfo.location}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
