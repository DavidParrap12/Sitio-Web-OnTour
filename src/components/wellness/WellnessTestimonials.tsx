"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export interface TestimonialItem {
  name: string;
  origin: string;
  treatment: string;
  quote: string;
  avatarAlt: string;
}

export interface TestimonialsStrings {
  title: string;
  subtitle: string;
  t1: TestimonialItem;
  t2: TestimonialItem;
  t3: TestimonialItem;
}

const TESTIMONIALS = ["t1", "t2", "t3"] as const;
const AVATAR_GRADIENTS = [
  "from-[#0A2540] to-[#1a3a5c]",
  "from-[#1a4a2e] to-[#226b3a]",
  "from-[#4a2a00] to-[#6b4a10]",
];

export function WellnessTestimonials({ strings: s }: { strings: TestimonialsStrings }) {
  return (
    <section className="py-16 md:py-24 bg-white editorial-section">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="display-2 text-[var(--color-wellness-primary)] mb-4">
            {s.title}
          </h2>
          <p className="body-lg text-[#171717]/55 max-w-xl mx-auto">
            {s.subtitle}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((key, i) => {
            const item = s[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col p-8 rounded-3xl border border-[var(--color-wellness-border)] bg-[var(--color-wellness-bg)] hover:border-[var(--color-wellness-gold)] hover:shadow-[var(--shadow-wellness-md)] transition-all duration-300"
              >
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-[var(--color-wellness-gold)]/30 mb-4 shrink-0" fill="currentColor" />

                {/* Quote text */}
                <p className="text-sm text-[#171717]/70 leading-relaxed flex-1 italic mb-6">
                  {item.quote}
                </p>

                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className="w-4 h-4 fill-[#C9A961] text-[#C9A961]" />
                  ))}
                </div>

                {/* Patient info */}
                <div className="flex items-center gap-3 pt-5 border-t border-[var(--color-wellness-border)]">
                  {/* Avatar placeholder */}
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[i]} flex items-center justify-center shrink-0 text-white text-lg`}>
                    👤
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-wellness-primary)]">
                      {item.name}
                    </p>
                    <p className="text-xs text-[#171717]/45">
                      {item.origin} · {item.treatment}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
