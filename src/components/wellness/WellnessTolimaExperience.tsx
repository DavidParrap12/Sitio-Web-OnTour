"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export interface TolimaStrings {
  title: string;
  subtitle: string;
  cta: string;
  imageAlt: string;
}

export function WellnessTolimaExperience({ strings: s }: { strings: TolimaStrings }) {
  return (
    <section className="py-16 md:py-24 bg-[var(--color-wellness-bg)] editorial-section">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1"
          >
            <h2 className="display-2 text-[var(--color-wellness-primary)] mb-6">
              {s.title}
            </h2>
            <p className="body-lg text-[#171717]/60 mb-8">
              {s.subtitle}
            </p>
            <Link
              href="/circuitos"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[var(--color-wellness-accent)] text-[var(--color-wellness-primary)] text-sm font-semibold hover:bg-[var(--color-wellness-accent)] hover:text-white transition-all duration-300"
            >
              {s.cta}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Right — Tolima image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2"
          >
            <div className="group relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[var(--shadow-wellness-lg)] bg-[#0A2540]">
              <Image
                src="/image/bienestar/paisaje_montanoso_tolima.jpeg"
                alt={s.imageAlt || s.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 via-transparent to-transparent pointer-events-none" />

              {/* Decorative overlay card */}
              <div className="absolute bottom-5 left-5 right-5 bg-[#0A2540]/85 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                <p className="text-white/90 text-sm font-medium leading-relaxed">
                  {s.subtitle}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
