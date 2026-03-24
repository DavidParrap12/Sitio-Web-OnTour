"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Compass, Calendar } from "lucide-react";

const slides = [
  {
    src: "/image/makalu-colombia-3631740.jpg",
    alt: "Paisaje montañoso de Colombia",
  },
  {
    src: "/image/cuidad-amurallada.jpg",
    alt: "Ciudad Amurallada de Cartagena",
  },
  {
    src: "/image/desierto-tatacoa.jpg",
    alt: "Desierto de la Tatacoa",
  },
  {
    src: "/image/guatape.jpg",
    alt: "Guatapé",
  },
];

const INTERVAL = 5000; // ms entre cambios

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      
      {/* Slider de imágenes de fondo: todas apiladas, sólo la activa tiene opacity 1 */}
      {slides.map((slide, i) => (
        <motion.div
          key={slide.src}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${slide.src}')` }}
          aria-label={slide.alt}
          aria-hidden={i !== current}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center max-w-5xl pt-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium tracking-wide mb-6 uppercase"
        >
          Descubre el mundo con Ontour
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-white mb-6 leading-tight"
        >
          Experiencias Inolvidables,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-400">
            Destinos Extraordinarios
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light"
        >
          Ofrecemos los mejores pasadías y circuitos turísticos. Tu próxima gran aventura comienza aquí.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/pasadias"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:brightness-90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <Compass className="w-5 h-5" />
            Ver Pasadías
          </Link>
          <Link
            href="/circuitos"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-primary px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <Calendar className="w-5 h-5" />
            Ver Circuitos
          </Link>
        </motion.div>

        {/* Indicadores de slide */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Ir a imagen ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "bg-white w-8 h-2"
                  : "bg-white/40 hover:bg-white/70 w-2 h-2"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Gradiente inferior */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
