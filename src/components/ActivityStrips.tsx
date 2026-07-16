"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface Activity {
  nombre: string;
  destino: string;
  precio_desde: number | string | null;
  incluye: string[];
  reserva?: string;
  opera?: string;
  tipo?: string;
  operador?: string;
  duracion?: string;
  outfit?: string;
  salida?: string;
}

interface ActivityStripsProps {
  activities: Activity[];
  coverImage: string;
  t: Record<string, string>;
}

export function ActivityStrips({ activities, coverImage, t }: ActivityStripsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i));

  return (
    <div className="divide-y divide-editorial-border border-y border-editorial-border">
      {activities.map((act, i) => {
        const isOpen = openIndex === i;
        const price = act.precio_desde
          ? typeof act.precio_desde === "number"
            ? `$${act.precio_desde.toLocaleString()}`
            : act.precio_desde
          : t.consult || "A consultar";

        return (
          <div key={i} className="relative overflow-hidden">
            {/* Ambient image layer */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url(${coverImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: isOpen ? 0.07 : 0,
                transition: "opacity 0.5s ease",
              }}
            />
            {/* Accent left border */}
            <motion.div
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-[3px] bg-editorial-accent origin-top"
              initial={false}
              animate={{ scaleY: isOpen ? 1 : 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Strip header */}
            <button
              onClick={() => toggle(i)}
              className="relative w-full text-left flex items-center gap-4 md:gap-8 px-6 md:px-10 py-5 md:py-6 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-editorial-accent"
              aria-expanded={isOpen}
            >
              <span
                className="font-display text-3xl md:text-5xl font-bold tabular-nums shrink-0 transition-colors duration-300"
                style={{ color: isOpen ? "var(--color-editorial-accent)" : "var(--color-editorial-border)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <p
                  className="font-display font-semibold text-lg md:text-xl leading-snug transition-colors duration-300 truncate"
                  style={{ color: isOpen ? "var(--color-editorial-accent)" : "var(--color-editorial-dark)" }}
                >
                  {act.nombre}
                </p>
                <p className="text-sm text-editorial-muted flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  {act.destino}
                </p>
              </div>
              <div className="hidden md:flex items-center gap-3 shrink-0">
                {act.duracion && (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-editorial-muted">
                    <Clock className="w-3.5 h-3.5" /> {act.duracion}
                  </span>
                )}
                <span className="text-sm font-bold text-editorial-dark whitespace-nowrap">{price}</span>
              </div>
              <motion.span
                className="ml-2 shrink-0 text-editorial-accent"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </motion.span>
            </button>

            {/* Expandable panel */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="detail"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="relative px-6 md:px-10 pb-8 pt-1">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8">
                      <div>
                        <h4 className="label text-editorial-accent mb-3">{t.includes || "Incluye"}</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                          {act.incluye.map((item, j) => (
                            <li key={j} className="flex items-start gap-2.5 text-sm text-editorial-dark">
                              <span className="mt-[5px] shrink-0 w-4 h-4 rounded-full border border-editorial-accent/40 flex items-center justify-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent" />
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                        {(act.reserva || act.salida || act.outfit || act.opera) && (
                          <div className="flex flex-wrap gap-2 mt-5">
                            {act.reserva && (
                              <span className="text-xs px-3 py-1.5 rounded-md bg-editorial-warm border border-editorial-border text-editorial-muted font-medium">
                                {t.booking || "Reserva"}: {act.reserva}
                              </span>
                            )}
                            {act.salida && (
                              <span className="text-xs px-3 py-1.5 rounded-md bg-editorial-warm border border-editorial-border text-editorial-muted font-medium">
                                {t.departure || "Salida"}: {act.salida}
                              </span>
                            )}
                            {act.outfit && (
                              <span className="text-xs px-3 py-1.5 rounded-md bg-editorial-warm border border-editorial-border text-editorial-muted font-medium">
                                Outfit: {act.outfit}
                              </span>
                            )}
                            {act.opera && (
                              <span className="text-xs px-3 py-1.5 rounded-md bg-editorial-warm border border-editorial-border text-editorial-muted font-medium">
                                {act.opera}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4 md:gap-6 shrink-0">
                        <div className="text-right">
                          <span className="block text-xs font-semibold uppercase tracking-wider text-editorial-muted mb-1">
                            {t.priceFrom || "Precio desde"}
                          </span>
                          <span className="block text-2xl md:text-3xl font-bold text-editorial-dark leading-none">
                            {price}
                          </span>
                        </div>
                        <Link
                          href={"/contacto" as any}
                          className="inline-flex items-center gap-2 bg-editorial-accent hover:bg-editorial-accent-hover text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors duration-200 whitespace-nowrap"
                        >
                          {t.quote || "Cotizar"}
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
