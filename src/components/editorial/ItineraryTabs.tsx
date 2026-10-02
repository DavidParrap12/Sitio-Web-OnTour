"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Map } from "lucide-react";
import dynamic from "next/dynamic";

const ItineraryTimeline = dynamic(() => import("@/components/ItineraryTimeline"));

interface DayImage {
  image: string;
  location: string;
}

interface ItineraryTabsProps {
  itinerary: string[];
  highlights: string[];
  dayImages?: DayImage[];
  t: {
    tabItinerary: string;
    tabHighlights: string;
    close: string;
    photoOf: string;
    clickToEnlarge: string;
  };
}

const tabs = [
  { id: "itinerary", icon: Map },
  { id: "highlights", icon: CheckCircle2 },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ItineraryTabs({
  itinerary,
  highlights,
  dayImages = [],
  t,
}: ItineraryTabsProps) {
  const [active, setActive] = useState<TabId>("itinerary");

  return (
    <div>
      {/* Tab Bar */}
      <div
        role="tablist"
        aria-label="Secciones del circuito"
        className="flex gap-1 p-1 bg-editorial-warm rounded-2xl mb-8 w-fit"
      >
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          const label = tab.id === "itinerary" ? t.tabItinerary : t.tabHighlights;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-editorial-accent"
              style={{
                color: isActive ? "#ffffff" : "var(--color-editorial-muted)",
              }}
            >
              {/* Animated pill background */}
              {isActive && (
                <motion.span
                  layoutId="itinerary-tab-pill"
                  className="absolute inset-0 rounded-xl bg-editorial-accent"
                  style={{ zIndex: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <tab.icon
                className="relative z-10 w-4 h-4 shrink-0"
                aria-hidden="true"
              />
              <span className="relative z-10 whitespace-nowrap">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait" initial={false}>
        {active === "itinerary" && (
          <motion.div
            key="itinerary"
            role="tabpanel"
            id="panel-itinerary"
            aria-labelledby="tab-itinerary"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <ItineraryTimeline
              itinerary={itinerary}
              dayImages={dayImages}
              t={{
                close: t.close,
                photoOf: t.photoOf,
                clickToEnlarge: t.clickToEnlarge,
              }}
            />
          </motion.div>
        )}

        {active === "highlights" && (
          <motion.div
            key="highlights"
            role="tabpanel"
            id="panel-highlights"
            aria-labelledby="tab-highlights"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: i * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-start gap-3 bg-editorial-warm p-5 rounded-xl border border-editorial-border"
                >
                  <CheckCircle2 className="w-5 h-5 text-editorial-accent shrink-0 mt-0.5" />
                  <span className="body text-editorial-dark font-medium leading-snug">
                    {h}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
