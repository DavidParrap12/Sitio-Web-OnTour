"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface StepItem {
  title: string;
  desc: string;
  image?: string;
}

export interface ProcessStrings {
  title: string;
  subtitle: string;
  s1: StepItem;
  s2: StepItem;
  s3: StepItem;
  s4: StepItem;
  s5: StepItem;
}

const STEPS = ["s1", "s2", "s3", "s4", "s5"] as const;

// Fallback high-res pictures from the project if custom step image is pending
const FALLBACK_STEP_IMAGES: Record<string, string> = {
  s1: "/image/bienestar/Specialist_conducting_virtual_me…_2K_202608292100.jpeg",
  s2: "/image/bienestar/Specialist_reviewing_medical_tre…_2K_202608292104.jpeg",
  s3: "/image/bienestar/Woman_preparing_dental_travel_it…_202608282016.jpeg",
  s4: "/image/bienestar/Woman_relaxing_on_hotel_terrace_202608282028.jpeg",
  s5: "/image/bienestar/Woman_having_dental_video_consul…_202608282040.jpeg",
};

export function WellnessProcessTimeline({ strings: s }: { strings: ProcessStrings }) {
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToStep = (newIndex: number) => {
    setDirection(newIndex > activeStep ? 1 : -1);
    setActiveStep(Math.max(0, Math.min(STEPS.length - 1, newIndex)));
  };

  const nextStep = () => {
    if (activeStep < STEPS.length - 1) {
      goToStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      goToStep(activeStep - 1);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <section id="proceso" className="py-16 md:py-24 bg-[var(--color-wellness-primary)] editorial-section overflow-hidden scroll-mt-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="display-2 text-white mb-4">
            {s.title}
          </h2>
          <p className="body-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            {s.subtitle}
          </p>
        </motion.div>

        {/* === MOBILE INTERACTIVE TACTILE VIEW (< md) === */}
        <div className="md:hidden">
          {/* Stepper Progress Bar */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {STEPS.map((_, idx) => {
              const isActive = idx === activeStep;

              return (
                <button
                  key={idx}
                  onClick={() => goToStep(idx)}
                  className={`h-2 rounded-full transition-all duration-300 touch-manipulation ${
                    isActive
                      ? "bg-[var(--color-wellness-gold)] w-8 shadow-[var(--shadow-wellness-glow-gold)]"
                      : "bg-white/20 hover:bg-white/40 w-3"
                  }`}
                  aria-label={`Ir al paso ${idx + 1}`}
                />
              );
            })}
          </div>

          {/* Swipeable Card with Clean Image */}
          <div className="relative overflow-hidden py-2 px-1 min-h-[320px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -35) {
                    nextStep();
                  } else if (info.offset.x > 35) {
                    prevStep();
                  }
                }}
                className="w-full cursor-grab active:cursor-grabbing touch-pan-y"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/15 shadow-xl flex flex-col">
                  {/* Step Image (Clean, Full Quality) */}
                  <div className="relative w-full h-52 bg-[#0c2e4e] overflow-hidden">
                    <Image
                      src={s[STEPS[activeStep]]?.image || FALLBACK_STEP_IMAGES[STEPS[activeStep]]}
                      alt={s[STEPS[activeStep]]?.title || "Paso del proceso"}
                      fill
                      quality={90}
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/30 via-transparent to-transparent" />
                  </div>

                  {/* Step Content */}
                  <div className="p-6 text-center">
                    <h3 className="font-heading font-bold text-white text-xl mb-2.5 leading-snug">
                      {s[STEPS[activeStep]]?.title}
                    </h3>
                    <p className="text-white/75 text-sm leading-relaxed max-w-sm mx-auto">
                      {s[STEPS[activeStep]]?.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6 px-2">
            <button
              onClick={prevStep}
              disabled={activeStep === 0}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/20 text-white text-sm font-medium transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none hover:bg-white/10 touch-manipulation"
              aria-label="Paso anterior"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <button
              onClick={nextStep}
              disabled={activeStep === STEPS.length - 1}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/20 bg-white/10 text-white text-sm font-medium transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none hover:bg-white/20 touch-manipulation"
              aria-label="Siguiente paso"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* === DESKTOP STATIC GRID VIEW (md+) === */}
        <div className="hidden md:grid md:grid-cols-5 gap-5 items-stretch">
          {STEPS.map((key, i) => {
            const step = s[key];
            const imgSrc = step?.image || FALLBACK_STEP_IMAGES[key];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col rounded-3xl bg-white/5 border border-white/10 hover:border-[var(--color-wellness-gold)] hover:bg-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                {/* Step Image Slot (Full Quality, No Dimming) */}
                <div className="relative w-full aspect-[4/3] bg-[#0c2e4e] overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={step?.title || "Paso"}
                    fill
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/25 via-transparent to-transparent" />
                </div>

                {/* Step Text Info */}
                <div className="p-5 flex flex-col flex-1 text-left">
                  <h3 className="font-heading font-bold text-white text-base mb-2 leading-snug group-hover:text-[var(--color-wellness-gold)] transition-colors duration-300">
                    {step?.title}
                  </h3>
                  <p className="text-white/65 text-xs sm:text-sm leading-relaxed flex-1">
                    {step?.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
