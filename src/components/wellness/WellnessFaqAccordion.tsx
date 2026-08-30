"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqStrings {
  title: string;
  q1: FaqItem;
  q2: FaqItem;
  q3: FaqItem;
  q4: FaqItem;
  q5: FaqItem;
}

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5"] as const;

export function WellnessFaqAccordion({ strings: s }: { strings: FaqStrings }) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24 bg-white editorial-section">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="display-2 text-[var(--color-wellness-primary)]">
            {s.title}
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {FAQ_KEYS.map((key, i) => {
            const isOpen = openKey === key;
            const item = s[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                    ? "border-[var(--color-wellness-gold)] shadow-[var(--shadow-wellness-md)]"
                    : "border-[var(--color-wellness-border)] hover:border-[var(--color-wellness-accent)]"
                  }`}
              >
                {/* Question */}
                <button
                  onClick={() => setOpenKey(isOpen ? null : key)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-[var(--color-wellness-primary)] font-heading leading-snug">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-[var(--color-wellness-gold)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 text-sm text-[#171717]/75 leading-relaxed border-t border-[var(--color-wellness-border)] pt-4">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
