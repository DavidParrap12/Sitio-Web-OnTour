"use client";

import { motion } from "framer-motion";
import { ShieldCheck, FlaskConical, FileText, Languages, Video } from "lucide-react";

interface TrustStrings {
  certified: string;
  materials: string;
  quote: string;
  bilingual: string;
  telehealth: string;
}

const ICONS = [ShieldCheck, FlaskConical, FileText, Languages, Video];
const KEYS = ["certified", "materials", "quote", "bilingual", "telehealth"] as const;

export function WellnessTrustBar({ strings: s }: { strings: TrustStrings }) {
  return (
    <div className="relative z-20 -mt-10 sm:-mt-12 mb-8 md:mb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white rounded-2xl md:rounded-3xl border border-[var(--color-wellness-border)] shadow-xl shadow-black/5 py-3 sm:py-4 px-2 sm:px-4">
          <div className="flex flex-wrap items-center justify-center divide-y sm:divide-y-0 sm:divide-x divide-[#f0ebe3]">
            {KEYS.map((key, i) => {
              const Icon = ICONS[i];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-2 sm:gap-3 px-4 xl:px-6 py-3 sm:py-2 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[var(--color-wellness-accent-bg)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-wellness-gold-bg)] transition-colors duration-300">
                    <Icon className="w-[18px] h-[18px] text-[var(--color-wellness-primary)] group-hover:text-[var(--color-wellness-gold)] transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-[#171717]/75 leading-snug">
                    {s[key]}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
