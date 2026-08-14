"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ServiciosHeroProps {
  title: string;
  subtitle: string;
}

export function ServiciosHero({ title, subtitle }: ServiciosHeroProps) {
  return (
    <div className="relative h-[55vh] md:h-[60vh] flex items-end overflow-hidden">
      <Image
        src="/image/portadas/Andes_mountains_and_colonial_town_202608141343.jpeg"
        alt="Servicios OnTour"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-editorial-dark/90 via-editorial-dark/40 to-transparent" />
      <div className="absolute inset-0 editorial-overlay-vignette" />

      <div className="relative z-10 container mx-auto px-4 md:px-6 pb-14 md:pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="display-1 text-white mb-4"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="body-lg text-white/90 max-w-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}
