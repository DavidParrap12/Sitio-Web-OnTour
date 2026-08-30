"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, User } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SpecialistDoctor {
  id: string;
  name: string;
  role: string;
  credentials: string;
  image?: string;
  imageClassName?: string;
}

export interface SpecialtyCategory {
  id: string;
  label: string;
  doctors: SpecialistDoctor[];
}

export interface SpecialistsStrings {
  title: string;
  subtitle: string;
  categories: SpecialtyCategory[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SPECIALTIES: SpecialtyCategory[] = [
  {
    id: "cirugia-plastica",
    label: "Cirugía Plástica",
    doctors: [
      {
        id: "dr-luis-oliveros",
        name: "Dr. Luis Ernesto Oliveros Méndez",
        role: "Cirujano Plástico y Estético",
        credentials: "Miembro Sociedad Colombiana de Cirugía Plástica · Asociación Americana de Cirujanos",
        image: "/image/bienestar/especialistas/luis-ernesto-oliveros.png",
        imageClassName: "object-contain object-bottom p-4 pt-6",
      },
      {
        id: "dr-nicolas-prada",
        name: "Dr. Nicolás Prada Gray",
        role: "Cirujano Plástico Estético y Reconstructivo",
        credentials: "22 años de experiencia en cirugía plástica estética y reconstructiva",
        image: "/image/bienestar/especialistas/nicolas-prada-garay.png",
        imageClassName: "object-contain object-bottom p-3 pt-5",
      },
      {
        id: "dra-clara-alcazar",
        name: "Dra. Clara Jimena Alcázar Manrique",
        role: "Especialista en Blefaroplastia y Rejuvenecimiento Facial",
        credentials: "Especialista en rejuvenecimiento facial y cirugía de párpados",
        image: "/image/bienestar/especialistas/DRA-ALCAZAR-CIRUJANA-Custom.png",
        imageClassName: "object-contain object-bottom p-2 pt-4",
      },
    ],
  },
  {
    id: "urologia",
    label: "Urología",
    doctors: [
      {
        id: "dr-cesar-rojas",
        name: "Dr. Cesar Augusto Rojas Rodríguez",
        role: "Urólogo",
        credentials: "Especialista en litiasis, hiperplasia prostática e incontinencia urinaria femenina",
        image: "/image/bienestar/especialistas/cesar-augusto.png",
        imageClassName: "object-contain object-bottom p-3 pt-5",
      },
      {
        id: "dr-luis-zapata",
        name: "Dr. Luis Fernando Zapata Madrid",
        role: "Urólogo — Jefe de Servicio",
        credentials: "Jefe del Servicio de Urología Hospital Federico Lleras (20 años) · Secretario General Sociedad Colombiana de Urología",
        image: "/image/bienestar/especialistas/luis-zapata.png",
        imageClassName: "object-contain object-bottom p-3 pt-5",
      },
      {
        id: "dra-daisy-roa",
        name: "Dra. Daisy Ximena Roa Savedra",
        role: "Uróloga",
        credentials: "Miembro activo American Urological Association",
        image: "/image/bienestar/especialistas/daisy-ximena.png",
        imageClassName: "object-contain object-bottom p-3 pt-5",
      },
    ],
  },
  {
    id: "medicina-interna",
    label: "Medicina Interna",
    doctors: [
      {
        id: "dr-diego-diaz",
        name: "Dr. Diego Felipe Díaz",
        role: "Internista — Jefe de Medicina Interna",
        credentials: "Jefe de Medicina Interna en Clínica Medicadiz",
        image: "/image/bienestar/especialistas/DIEGO-FELIPE-DIAZ-MEDICO-INTERNISTA.png",
        imageClassName: "object-contain object-bottom p-2 pt-4",
      },
      {
        id: "dra-eliana-rodriguez",
        name: "Dra. Eliana Rodríguez",
        role: "Internista",
        credentials: "Internista activa en Clínica Avidanti y Medicadiz desde 2023",
        image: "/image/bienestar/especialistas/ELIANA-LUCIA-RODRIGUEZ-SUAREZ-ESP.-MEDICINA-INTERNA-1.png",
        imageClassName: "object-contain object-bottom p-2 pt-4",
      },
    ],
  },
  {
    id: "cardiologia",
    label: "Cardiología",
    doctors: [
      {
        id: "dra-jennifer-cifuentes",
        name: "Dra. Jennifer Cifuentes Tarquino",
        role: "Cardióloga — Presidenta Seccional Tolima",
        credentials: "Presidenta Seccional Tolima, Sociedad Colombiana de Cardiología",
        image: "/image/bienestar/especialistas/JENNIFER-CIFUENTES-TURQUINO-ESPECIALISTA-EN-CARDIOLOGIA-Custom.png",
        imageClassName: "object-contain object-bottom p-2 pt-4",
      },
      {
        id: "dr-luigi-polifrony",
        name: "Dr. Luigi Enrique Polifrony Avendaño",
        role: "Cardiólogo",
        credentials: "Especialización en Instituto de Cardiología y Cirugía Cardiovascular · 8 años de experiencia",
        image: "/image/bienestar/especialistas/LUIGI-ENRICO-POLIFRONY-AVENDANO-MEDICO-CARDIOLOGO-Custom.png",
        imageClassName: "object-contain object-bottom p-2 pt-4",
      },
    ],
  },
  {
    id: "radiologia",
    label: "Radiología",
    doctors: [
      {
        id: "dra-alma-ramirez",
        name: "Dra. Alma Patricia Ramírez Córdoba",
        role: "Radióloga — Especialista en Imagenología de Mama",
        credentials: "30 años de experiencia · Socia fundadora de IPS · Especialista en imagenología de mama",
        image: "/image/bienestar/especialistas/Alma-Patricia-Ramirez.png",
        imageClassName: "object-contain object-bottom p-2 pt-4",
      },
    ],
  },
  {
    id: "nutricion",
    label: "Nutrición",
    doctors: [
      {
        id: "dra-maira-rojas",
        name: "Dra. Maira Ximena Rojas Serrato",
        role: "Nutricionista Clínica",
        credentials: "Diplomados en Oncología y Cuidados Paliativos · Miembro ACNC y COLNUD",
        image: "/image/bienestar/especialistas/MAIRA-XIMENA-ROJAS-SERRATO-NUTRICIONISTA-Custom.png",
        imageClassName: "object-contain object-bottom p-2 pt-4",
      },
      {
        id: "dra-maria-criales",
        name: "Dra. María José Criales Saavedra",
        role: "Nutricionista Clínica — Bilingüe",
        credentials: "Inglés C1 — atención directa a pacientes internacionales",
        image: "/image/bienestar/especialistas/MARIA-JOSE-CRIALES-SAAVEDRA-NUTRICIONISTA-Custom.png",
        imageClassName: "object-contain object-bottom p-2 pt-4",
      },
    ],
  },
  {
    id: "psicologia",
    label: "Psicología",
    doctors: [
      {
        id: "dra-marcela-cardona",
        name: "Dra. Adriana Marcela Cardona Colorado",
        role: "Psicóloga Clínica — Psicooncóloga",
        credentials: "Especialista en Psicooncología · Diferenciador único en la región",
        image: "/image/bienestar/especialistas/ADRIANA-MARCELA-CARDONA-COLORADO-PSICOLOGA-CLINICA-Custom-1.png",
        imageClassName: "object-contain object-bottom p-2 pt-4",
      },
      {
        id: "dra-valentina-gomez",
        name: "Dra. Valentina Gómez Ospina",
        role: "Psicóloga Clínica",
        credentials: "Experiencia en UCI y Urgencias · Salud mental integral",
        image: "/image/bienestar/especialistas/VALENTINA-GOMEZ-OSPINA-PSICOLOGA-CLINICA-Custom.png",
        imageClassName: "object-contain object-bottom p-2 pt-4",
      },
    ],
  },
  {
    id: "ginecologia",
    label: "Ginecología",
    doctors: [
      {
        id: "dr-juan-rodriguez",
        name: "Dr. Juan Carlos Rodríguez",
        role: "Ginecólogo — Medicina Materno Fetal",
        credentials: "25+ años · Subespecialista en Medicina Materno Fetal (Barcelona) y Biomedicina Reproductiva",
        image: "/image/bienestar/especialistas/Dr.-Juan-carlos-valencia-Custom.jpg",
        imageClassName: "object-contain object-bottom p-2 pt-4",
      },
    ],
  },
];

// ─── Localized Tab Labels ───────────────────────────────────────────────────

const SPECIALTY_LABELS: Record<string, Record<string, string>> = {
  es: {
    "cirugia-plastica": "Cirugía Plástica",
    urologia: "Urología",
    "medicina-interna": "Medicina Interna",
    cardiologia: "Cardiología",
    radiologia: "Radiología",
    nutricion: "Nutrición",
    psicologia: "Psicología",
    ginecologia: "Ginecología",
  },
  en: {
    "cirugia-plastica": "Plastic Surgery",
    urologia: "Urology",
    "medicina-interna": "Internal Medicine",
    cardiologia: "Cardiology",
    radiologia: "Radiology",
    nutricion: "Nutrition",
    psicologia: "Psychology",
    ginecologia: "Gynecology",
  },
  fr: {
    "cirugia-plastica": "Chirurgie Plastique",
    urologia: "Urologie",
    "medicina-interna": "Médecine Interne",
    cardiologia: "Cardiologie",
    radiologia: "Radiologie",
    nutricion: "Nutrition",
    psicologia: "Psychologie",
    ginecologia: "Gynécologie",
  },
  de: {
    "cirugia-plastica": "Plastische Chirurgie",
    urologia: "Urologie",
    "medicina-interna": "Innere Medizin",
    cardiologia: "Kardiologie",
    radiologia: "Radiologie",
    nutricion: "Ernährungsberatung",
    psicologia: "Psychologie",
    ginecologia: "Gynäkologie",
  },
};

// ─── Localized Doctor Roles (credentials stay in ES as proper nouns) ──────────

const SPECIALIST_ROLES: Record<string, Record<string, string>> = {
  en: {
    "dr-luis-oliveros": "Plastic & Aesthetic Surgeon",
    "dr-nicolas-prada": "Aesthetic & Reconstructive Plastic Surgeon",
    "dra-clara-alcazar": "Specialist in Blepharoplasty and Facial Rejuvenation",
    "dr-cesar-rojas": "Urologist",
    "dr-luis-zapata": "Urologist — Head of Department",
    "dra-daisy-roa": "Urologist",
    "dr-diego-diaz": "Internist — Head of Internal Medicine",
    "dra-eliana-rodriguez": "Internist",
    "dra-jennifer-cifuentes": "Cardiologist — Tolima Section President",
    "dr-luigi-polifrony": "Cardiologist",
    "dra-alma-ramirez": "Radiologist — Breast Imaging Specialist",
    "dra-maira-rojas": "Clinical Nutritionist",
    "dra-maria-criales": "Clinical Nutritionist — Bilingual",
    "dra-marcela-cardona": "Clinical Psychologist — Psycho-oncologist",
    "dra-valentina-gomez": "Clinical Psychologist",
    "dr-juan-rodriguez": "Gynecologist — Maternal-Fetal Medicine",
  },
  fr: {
    "dr-luis-oliveros": "Chirurgien Plastique et Esthétique",
    "dr-nicolas-prada": "Chirurgien Plastique Esthétique et Reconstructeur",
    "dra-clara-alcazar": "Spécialiste en Blépharoplastie et Rajeunissement du Visage",
    "dr-cesar-rojas": "Urologue",
    "dr-luis-zapata": "Urologue — Chef de Service",
    "dra-daisy-roa": "Urologue",
    "dr-diego-diaz": "Interniste — Chef de la Médecine Interne",
    "dra-eliana-rodriguez": "Interniste",
    "dra-jennifer-cifuentes": "Cardiologue — Présidente Section Tolima",
    "dr-luigi-polifrony": "Cardiologue",
    "dra-alma-ramirez": "Radiologue — Spécialiste en Imagerie Mammaire",
    "dra-maira-rojas": "Nutritionniste Clinique",
    "dra-maria-criales": "Nutritionniste Clinique — Bilingue",
    "dra-marcela-cardona": "Psychologue Clinique — Psycho-oncologue",
    "dra-valentina-gomez": "Psychologue Clinique",
    "dr-juan-rodriguez": "Gynécologue — Médecine Materno-Fœtale",
  },
  de: {
    "dr-luis-oliveros": "Plastischer & Ästhetischer Chirurg",
    "dr-nicolas-prada": "Ästhetischer und Rekonstruktiver Plastischer Chirurg",
    "dra-clara-alcazar": "Spezialistin für Blepharoplastik und Gesichtsverjüngung",
    "dr-cesar-rojas": "Urologe",
    "dr-luis-zapata": "Urologe — Abteilungsleiter",
    "dra-daisy-roa": "Urologin",
    "dr-diego-diaz": "Internist — Leiter der Inneren Medizin",
    "dra-eliana-rodriguez": "Internistin",
    "dra-jennifer-cifuentes": "Kardiologin — Sektionspräsidentin Tolima",
    "dr-luigi-polifrony": "Kardiologe",
    "dra-alma-ramirez": "Radiologin — Spezialistin für Brustbildgebung",
    "dra-maira-rojas": "Klinische Ernährungsberaterin",
    "dra-maria-criales": "Klinische Ernährungsberaterin — Zweisprachig",
    "dra-marcela-cardona": "Klinische Psychologin — Psycho-Onkologin",
    "dra-valentina-gomez": "Klinische Psychologin",
    "dr-juan-rodriguez": "Gynäkologe — Maternofetale Medizin",
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function WellnessSpecialists({
  strings: s,
  locale = "es",
}: {
  strings: SpecialistsStrings;
  locale?: string;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const currentLang = locale in SPECIALTY_LABELS ? locale : "es";
  const labels = SPECIALTY_LABELS[currentLang];

  return (
    <section className="py-16 md:py-24 bg-[var(--color-wellness-bg)] editorial-section">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="display-2 text-[var(--color-wellness-primary)] mb-4">
            {s.title}
          </h2>
          <p className="body-lg text-[#171717]/55 max-w-2xl mx-auto leading-relaxed">
            {s.subtitle}
          </p>
        </motion.div>

        {/* Specialty Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 md:mb-14"
        >
          {/* Mobile: Horizontal scrollable pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center md:gap-3">
            {SPECIALTIES.map((spec, i) => {
              const isActive = i === activeTab;
              const displayLabel = labels[spec.id] || spec.label;
              return (
                <button
                  key={spec.id}
                  onClick={() => setActiveTab(i)}
                  className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 touch-manipulation shrink-0 ${
                    isActive
                      ? "bg-[var(--color-wellness-primary)] text-white shadow-md"
                      : "bg-white border border-[var(--color-wellness-border)] text-[#171717]/65 hover:border-[var(--color-wellness-gold)] hover:text-[var(--color-wellness-primary)]"
                  }`}
                >
                  {displayLabel}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Doctor Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Cards */}
            <div
              className={`grid gap-6 ${
                SPECIALTIES[activeTab].doctors.length === 1
                  ? "grid-cols-1 max-w-lg"
                  : SPECIALTIES[activeTab].doctors.length === 2
                  ? "grid-cols-1 sm:grid-cols-2 max-w-3xl"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {SPECIALTIES[activeTab].doctors.map((doctor, di) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: di * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex flex-col rounded-3xl border border-[var(--color-wellness-border)] bg-white overflow-hidden hover:border-[var(--color-wellness-gold)] hover:shadow-[var(--shadow-wellness-lg)] transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Photo Container */}
                  <div className="relative w-full h-72 sm:h-80 bg-[#ffffff] border-b border-[var(--color-wellness-border)] overflow-hidden flex items-center justify-center">
                    {doctor.image ? (
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        quality={90}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                        className={`transition-transform duration-700 group-hover:scale-105 ${
                          doctor.imageClassName || "object-cover object-top"
                        }`}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-3 text-[var(--color-wellness-primary)]/40">
                        <div className="w-20 h-20 rounded-full border border-[var(--color-wellness-border)] bg-white flex items-center justify-center shadow-sm">
                          <User className="w-10 h-10 text-[var(--color-wellness-primary)]/45" />
                        </div>
                        <span className="text-xs tracking-wider uppercase font-mono text-[var(--color-wellness-primary)]/50 font-medium">
                          Foto Profesional
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7 flex flex-col gap-3 flex-1">
                    {/* Name */}
                    <h4 className="font-heading font-bold text-lg text-[var(--color-wellness-primary)] leading-snug group-hover:text-[var(--color-wellness-gold)] transition-colors duration-300">
                      {doctor.name}
                    </h4>

                    {/* Role */}
                    <p className="text-sm font-semibold text-[var(--color-wellness-gold)] leading-snug">
                      {SPECIALIST_ROLES[currentLang]?.[doctor.id] ?? doctor.role}
                    </p>

                    {/* Credentials */}
                    <div className="flex items-start gap-2.5 mt-auto pt-4 border-t border-[var(--color-wellness-border)]">
                      <GraduationCap
                        className="w-4 h-4 text-[var(--color-wellness-accent)] shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <p className="text-xs sm:text-sm text-[#171717]/65 leading-relaxed">
                        {doctor.credentials}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
