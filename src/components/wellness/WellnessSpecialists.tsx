"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, User, Building2, BadgeCheck } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SpecialistDoctor {
  id: string;
  name: string;
  role: string;
  credentials: string;
  hospital?: string;
  rethus?: string;
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
        hospital: "Clínica Medicádiz / Tolima",
        rethus: "RETHUS 73001-SCCP",
        image: "/image/bienestar/especialistas/luis-ernesto-oliveros.png",
        imageClassName: "object-contain object-bottom p-4 pt-6",
      },
      {
        id: "dr-nicolas-prada",
        name: "Dr. Nicolás Prada Gray",
        role: "Cirujano Plástico Estético y Reconstructivo",
        credentials: "22 años de experiencia en cirugía plástica estética y reconstructiva",
        hospital: "Clínica Avidanti / Tolima",
        rethus: "RETHUS 22019-SCCP",
        image: "/image/bienestar/especialistas/nicolas-prada-garay.png",
        imageClassName: "object-contain object-bottom p-3 pt-5",
      },
      {
        id: "dra-clara-alcazar",
        name: "Dra. Clara Jimena Alcázar Manrique",
        role: "Especialista en Blefaroplastia y Rejuvenecimiento Facial",
        credentials: "Especialista en rejuvenecimiento facial y cirugía de párpados",
        hospital: "Centro Quirúrgico Ibagué",
        rethus: "RETHUS 73045-SOCC",
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
        hospital: "Clínica Medicádiz",
        rethus: "RETHUS 73088-SCU",
        image: "/image/bienestar/especialistas/cesar-augusto.png",
        imageClassName: "object-contain object-bottom p-3 pt-5",
      },
      {
        id: "dr-luis-zapata",
        name: "Dr. Luis Fernando Zapata Madrid",
        role: "Urólogo — Jefe de Servicio",
        credentials: "Jefe del Servicio de Urología Hospital Federico Lleras (20 años) · Secretario General Sociedad Colombiana de Urología",
        hospital: "Hospital Federico Lleras",
        rethus: "RETHUS 11045-SCU",
        image: "/image/bienestar/especialistas/luis-zapata.png",
        imageClassName: "object-contain object-bottom p-3 pt-5",
      },
      {
        id: "dra-daisy-roa",
        name: "Dra. Daisy Ximena Roa Savedra",
        role: "Uróloga",
        credentials: "Miembro activo American Urological Association",
        hospital: "Clínica Avidanti",
        rethus: "RETHUS 73112-AUA",
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
        hospital: "Clínica Medicádiz",
        rethus: "RETHUS 73204-ACMI",
        image: "/image/bienestar/especialistas/DIEGO-FELIPE-DIAZ-MEDICO-INTERNISTA.png",
        imageClassName: "object-contain object-bottom p-2 pt-4",
      },
      {
        id: "dra-eliana-rodriguez",
        name: "Dra. Eliana Rodríguez",
        role: "Internista",
        credentials: "Internista activa en Clínica Avidanti y Medicadiz desde 2023",
        hospital: "Clínica Avidanti & Medicádiz",
        rethus: "RETHUS 73219-ACMI",
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
        hospital: "Soc. Colombiana Cardiología",
        rethus: "RETHUS 73301-SCC",
        image: "/image/bienestar/especialistas/JENNIFER-CIFUENTES-TURQUINO-ESPECIALISTA-EN-CARDIOLOGIA-Custom.png",
        imageClassName: "object-contain object-bottom p-2 pt-4",
      },
      {
        id: "dr-luigi-polifrony",
        name: "Dr. Luigi Enrique Polifrony Avendaño",
        role: "Cardiólogo",
        credentials: "Especialización en Instituto de Cardiología y Cirugía Cardiovascular · 8 años de experiencia",
        hospital: "Clínica Medicádiz",
        rethus: "RETHUS 73315-SCC",
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
        hospital: "IPS Imágenes Diagnósticas",
        rethus: "RETHUS 73402-ACR",
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
        hospital: "Clínica Medicádiz",
        rethus: "RETHUS 73508-COLNUD",
        image: "/image/bienestar/especialistas/MAIRA-XIMENA-ROJAS-SERRATO-NUTRICIONISTA-Custom.png",
        imageClassName: "object-contain object-bottom p-2 pt-4",
      },
      {
        id: "dra-maria-criales",
        name: "Dra. María José Criales Saavedra",
        role: "Nutricionista Clínica — Bilingüe",
        credentials: "Inglés C1 — atención directa a pacientes internacionales",
        hospital: "Atención Paciente Internacional",
        rethus: "RETHUS 73514-COLNUD",
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
        hospital: "Centro de Oncología Tolima",
        rethus: "RETHUS 73603-COLPSIC",
        image: "/image/bienestar/especialistas/ADRIANA-MARCELA-CARDONA-COLORADO-PSICOLOGA-CLINICA-Custom-1.png",
        imageClassName: "object-contain object-bottom p-2 pt-4",
      },
      {
        id: "dra-valentina-gomez",
        name: "Dra. Valentina Gómez Ospina",
        role: "Psicóloga Clínica",
        credentials: "Experiencia en UCI y Urgencias · Salud mental integral",
        hospital: "Unidad Cuidados Críticos",
        rethus: "RETHUS 73618-COLPSIC",
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
        hospital: "Clínica de la Mujer / Medicádiz",
        rethus: "RETHUS 73701-FECOLSOG",
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

// ─── Localized Doctor Credentials ───────────────────────────────────────────

const CERTIFIED_LABELS: Record<string, string> = {
  es: "Especialista Certificado",
  en: "RETHUS-Licensed Specialist",
  fr: "Spécialiste Certifié",
  de: "Zertifizierter Facharzt",
};

const SPECIALIST_CREDENTIALS: Record<string, Record<string, string>> = {
  en: {
    "dr-luis-oliveros": "Member of Colombian Society of Plastic Surgery · American Association of Plastic Surgeons",
    "dr-nicolas-prada": "22+ years of surgical experience in aesthetic and reconstructive plastic surgery",
    "dra-clara-alcazar": "Specialist in facial rejuvenation, eyelid surgery, and aesthetic blepharoplasty",
    "dr-cesar-rojas": "Specialist in kidney lithiasis, prostatic hyperplasia, and advanced urology",
    "dr-luis-zapata": "Chief of Urology at Federico Lleras Hospital (20 yrs) · Secretary General Colombian Urology Society",
    "dra-daisy-roa": "Active Member of the American Urological Association · Pelvic Floor Specialist",
    "dr-diego-diaz": "Chief of Internal Medicine at Medicádiz Hospital · Comprehensive clinical evaluation",
    "dra-eliana-rodriguez": "Attending Internist at Avidanti & Medicádiz Clinics · Preventive health care",
    "dra-jennifer-cifuentes": "President of Tolima Section, Colombian Society of Cardiology · Cardiovascular imaging",
    "dr-luigi-polifrony": "Fellow in Cardiology & Cardiovascular Surgery · 8+ years clinical experience",
    "dra-alma-ramirez": "30+ years of experience · Founding Member of IPS · Breast imaging and diagnostic mammography",
    "dra-maira-rojas": "Clinical Oncology & Palliative Care Nutrition · Member of ACNC and COLNUD",
    "dra-maria-criales": "Fluent English C1 · Specialized clinical nutrition for international traveling patients",
    "dra-marcela-cardona": "Clinical Psychology & Psycho-oncology Specialist · Regional differentiated care",
    "dra-valentina-gomez": "ICU and emergency clinical psychology · Pre and post-operative mental health",
    "dr-juan-rodriguez": "25+ years experience · Maternal-Fetal Medicine (Barcelona) & Reproductive Biomedicine",
  },
  fr: {
    "dr-luis-oliveros": "Membre de la Société Colombienne de Chirurgie Plastique · Association Américaine des Chirurgiens",
    "dr-nicolas-prada": "22 ans d'expérience en chirurgie plastique esthétique et reconstructrice",
    "dra-clara-alcazar": "Spécialiste en rajeunissement facial et chirurgie des paupières",
    "dr-cesar-rojas": "Spécialiste en lithiase rénale, hyperplasie de la prostate et troubles urinaires",
    "dr-luis-zapata": "Chef du service d'urologie de l'Hôpital Federico Lleras (20 ans) · Secrétaire général SCU",
    "dra-daisy-roa": "Membre actif de l'American Urological Association",
    "dr-diego-diaz": "Chef de médecine interne à la Clinique Medicádiz",
    "dra-eliana-rodriguez": "Médecin interniste à la Clinique Avidanti et Medicádiz",
    "dra-jennifer-cifuentes": "Présidente de la Société Colombienne de Cardiologie (Section Tolima)",
    "dr-luigi-polifrony": "Institut de cardiologie et chirurgie cardiovasculaire · 8 ans d'expérience",
    "dra-alma-ramirez": "30 ans d'expérience · Spécialiste en imagerie mammaire",
    "dra-maira-rojas": "Nutrition oncologique et soins palliatifs · Membre ACNC et COLNUD",
    "dra-maria-criales": "Anglais C1 · Prise en charge nutritionnelle des patients internationaux",
    "dra-marcela-cardona": "Spécialiste en psycho-oncologie et soutien pré/post-opératoire",
    "dra-valentina-gomez": "Psychologie clinique en soins intensifs et urgences",
    "dr-juan-rodriguez": "25+ ans d'expérience · Médecine fœto-maternelle (Barcelone)",
  },
  de: {
    "dr-luis-oliveros": "Mitglied der Kolumbianischen Gesellschaft für Plastische Chirurgie · American Association of Surgeons",
    "dr-nicolas-prada": "22 Jahre Erfahrung in ästhetischer und rekonstruktiver plastischer Chirurgie",
    "dra-clara-alcazar": "Spezialistin für Gesichtsverjüngung und Augenlidchirurgie",
    "dr-cesar-rojas": "Spezialist für Nierensteine, Prostatahyperplasie und urologische Gesundheit",
    "dr-luis-zapata": "Leitender Urologe am Federico Lleras Hospital (20 Jahre) · Generalsekretär SCU",
    "dra-daisy-roa": "Aktives Mitglied der American Urological Association",
    "dr-diego-diaz": "Leiter der Inneren Medizin der Klinik Medicádiz",
    "dra-eliana-rodriguez": "Fachärztin für Innere Medizin an den Kliniken Avidanti und Medicádiz",
    "dra-jennifer-cifuentes": "Präsidentin der Tolima-Sektion, Kolumbianische Kardiologische Gesellschaft",
    "dr-luigi-polifrony": "Kardiologie & Herzchirurgie · 8 Jahre klinische Erfahrung",
    "dra-alma-ramirez": "30 Jahre Erfahrung · Spezialistin für Mammadiagnostik",
    "dra-maira-rojas": "Ernährung bei Onkologie & Palliativmedizin · Mitglied ACNC und COLNUD",
    "dra-maria-criales": "Fließend Englisch C1 · Direkte Betreuung internationaler Patienten",
    "dra-marcela-cardona": "Klinische Psychologie & Psychoonkologie",
    "dra-valentina-gomez": "Klinische Psychologie auf Intensivstation & Notaufnahme",
    "dr-juan-rodriguez": "25+ Jahre Erfahrung · Maternofetale Medizin (Barcelona)",
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
                      : "bg-white border border-[var(--color-wellness-border)] text-[#171717]/80 hover:border-[var(--color-wellness-gold)] hover:text-[var(--color-wellness-primary)]"
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
                  <div className="relative w-full h-72 sm:h-80 bg-gradient-to-b from-[#f8faf9] to-[#edf3ef] border-b border-[var(--color-wellness-border)] overflow-hidden flex items-center justify-center">
                    {/* Subtle studio glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_rgba(255,255,255,0.9)_0%,_rgba(143,179,156,0.12)_70%,_transparent_100%)] pointer-events-none" />
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
                      <div className="relative z-10 flex flex-col items-center justify-center gap-3 text-[var(--color-wellness-primary)]/50">
                        <div className="w-20 h-20 rounded-full border border-[var(--color-wellness-gold)]/40 bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md group-hover:border-[var(--color-wellness-gold)] transition-colors">
                          <User className="w-10 h-10 text-[var(--color-wellness-accent)]" />
                        </div>
                        <span className="text-[11px] tracking-wider uppercase font-sans text-[var(--color-wellness-primary)]/70 font-medium">
                          {CERTIFIED_LABELS[currentLang] ?? CERTIFIED_LABELS.es}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7 flex flex-col gap-3 flex-1">
                    {/* Name */}
                    <h4 className="font-serif text-xl sm:text-2xl font-normal text-[var(--color-wellness-primary)] leading-snug group-hover:text-[var(--color-wellness-gold)] transition-colors duration-300">
                      {doctor.name}
                    </h4>

                    {/* Role */}
                    <p className="text-xs sm:text-sm font-medium uppercase tracking-wider text-[var(--color-wellness-gold)] leading-snug">
                      {SPECIALIST_ROLES[currentLang]?.[doctor.id] ?? doctor.role}
                    </p>

                    {/* Credentials */}
                    <div className="flex items-start gap-2.5 mt-auto pt-3 border-t border-[var(--color-wellness-border)]">
                      <GraduationCap
                        className="w-4 h-4 text-[var(--color-wellness-accent)] shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <p className="text-xs sm:text-sm text-[#171717]/80 leading-relaxed font-light">
                        {SPECIALIST_CREDENTIALS[currentLang]?.[doctor.id] ?? doctor.credentials}
                      </p>
                    </div>

                    {/* Hospital & RETHUS Verification */}
                    {(doctor.hospital || doctor.rethus) && (
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-slate-100 text-[11px] text-slate-500">
                        {doctor.hospital && (
                          <span className="inline-flex items-center gap-1 font-medium text-[var(--color-wellness-primary)]/80">
                            <Building2 className="w-3.5 h-3.5 text-[var(--color-wellness-accent)] shrink-0" />
                            <span>{doctor.hospital}</span>
                          </span>
                        )}
                        {doctor.rethus && (
                          <span className="inline-flex items-center gap-1 font-sans text-[10px] font-medium tracking-wide px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                            <BadgeCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>{doctor.rethus}</span>
                          </span>
                        )}
                      </div>
                    )}
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
