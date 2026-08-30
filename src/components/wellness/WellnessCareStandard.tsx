"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Check } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CarePackage {
  id: string;
  categoria: string;
  titulo: string;
  descripcion: string;
  caracteristicas: string[];
  tipo: "estetica" | "preventivo";
  waMessage: string;
}

export interface CareStandardStrings {
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  requestInfo?: string;
  helpTitle?: string;
  helpSubtitle?: string;
  helpButton?: string;
}

// ─── Localized Packages Data ──────────────────────────────────────────────────

const PACKAGES_BY_LOCALE: Record<string, CarePackage[]> = {
  es: [
    {
      id: "blefaroplastia",
      categoria: "Cirugía Plástica",
      titulo: "Blefaroplastia Superior",
      descripcion:
        "Mejora cosmética del párpado superior con anestesia local y control post-quirúrgico incluido.",
      caracteristicas: [
        "Entrevista virtual + registro fotográfico",
        "Consulta presencial 2 días antes",
        "Psicología virtual o presencial",
        "Kit medicamentos incluido",
      ],
      tipo: "estetica",
      waMessage:
        "Hola OnTour, me interesa el paquete de Blefaroplastia Superior. ¿Podrían darme más información?",
    },
    {
      id: "liposuccion",
      categoria: "Cirugía Plástica",
      titulo: "Liposucción",
      descripcion:
        "Modelado corporal con técnica de alta precisión y acompañamiento completo pre y post operatorio.",
      caracteristicas: [
        "Valoración por especialista",
        "Anestesia general o local",
        "Control post-quirúrgico",
        "Kit medicamentos incluido",
      ],
      tipo: "estetica",
      waMessage:
        "Hola OnTour, me interesa el paquete de Liposucción. ¿Podrían darme más información?",
    },
    {
      id: "chequeo-hombres",
      categoria: "Chequeo Preventivo",
      titulo: "Elite Hombres",
      descripcion:
        "Evaluación médica completa diseñada específicamente para la salud masculina preventiva.",
      caracteristicas: [
        "Batería de laboratorios completa",
        "Evaluación cardiovascular",
        "Consulta con especialista",
        "Informe médico detallado",
      ],
      tipo: "preventivo",
      waMessage:
        "Hola OnTour, me interesa el Chequeo Preventivo Elite Hombres. ¿Podrían darme más información?",
    },
    {
      id: "chequeo-mujeres",
      categoria: "Chequeo Preventivo",
      titulo: "Esencial Mujeres",
      descripcion:
        "Evaluación preventiva integral para la salud femenina con atención personalizada.",
      caracteristicas: [
        "Laboratorios especializados",
        "Evaluación ginecológica",
        "Consulta con especialista",
        "Informe médico detallado",
      ],
      tipo: "preventivo",
      waMessage:
        "Hola OnTour, me interesa el Chequeo Preventivo Esencial Mujeres. ¿Podrían darme más información?",
    },
    {
      id: "mamoplastia",
      categoria: "Cirugía Plástica",
      titulo: "Mamoplastia de Aumento",
      descripcion:
        "Procedimiento reconstructivo y estético con implantes certificados y seguimiento personalizado.",
      caracteristicas: [
        "Materiales FDA / CE certificados",
        "Consulta presencial previa",
        "Psicología incluida",
        "Kit medicamentos incluido",
      ],
      tipo: "estetica",
      waMessage:
        "Hola OnTour, me interesa el paquete de Mamoplastia de Aumento. ¿Podrían darme más información?",
    },
  ],
  en: [
    {
      id: "blefaroplastia",
      categoria: "Plastic Surgery",
      titulo: "Upper Blepharoplasty",
      descripcion:
        "Cosmetic upper eyelid enhancement with local anesthesia and post-surgical follow-up included.",
      caracteristicas: [
        "Virtual interview + photo record",
        "In-person consultation 2 days prior",
        "Virtual or in-person psychological support",
        "Medication kit included",
      ],
      tipo: "estetica",
      waMessage:
        "Hello OnTour, I'm interested in the Upper Blepharoplasty package. Could you provide more information?",
    },
    {
      id: "liposuccion",
      categoria: "Plastic Surgery",
      titulo: "Liposuction",
      descripcion:
        "High-precision body sculpting with comprehensive pre- and post-operative care.",
      caracteristicas: [
        "Specialist evaluation",
        "General or local anesthesia",
        "Post-surgical follow-up",
        "Medication kit included",
      ],
      tipo: "estetica",
      waMessage:
        "Hello OnTour, I'm interested in the Liposuction package. Could you provide more information?",
    },
    {
      id: "chequeo-hombres",
      categoria: "Preventive Checkup",
      titulo: "Elite Men's Checkup",
      descripcion:
        "Comprehensive medical evaluation designed specifically for preventive men's health.",
      caracteristicas: [
        "Complete laboratory battery",
        "Cardiovascular evaluation",
        "Specialist consultation",
        "Detailed medical report",
      ],
      tipo: "preventivo",
      waMessage:
        "Hello OnTour, I'm interested in the Elite Men's Preventive Checkup. Could you provide more information?",
    },
    {
      id: "chequeo-mujeres",
      categoria: "Preventive Checkup",
      titulo: "Essential Women's Checkup",
      descripcion:
        "Comprehensive preventive evaluation for women's health with personalized care.",
      caracteristicas: [
        "Specialized laboratory tests",
        "Gynecological evaluation",
        "Specialist consultation",
        "Detailed medical report",
      ],
      tipo: "preventivo",
      waMessage:
        "Hello OnTour, I'm interested in the Essential Women's Preventive Checkup. Could you provide more information?",
    },
    {
      id: "mamoplastia",
      categoria: "Plastic Surgery",
      titulo: "Breast Augmentation",
      descripcion:
        "Reconstructive and aesthetic procedure with certified implants and personalized follow-up.",
      caracteristicas: [
        "FDA / CE certified materials",
        "Prior in-person consultation",
        "Psychological support included",
        "Medication kit included",
      ],
      tipo: "estetica",
      waMessage:
        "Hello OnTour, I'm interested in the Breast Augmentation package. Could you provide more information?",
    },
  ],
  fr: [
    {
      id: "blefaroplastia",
      categoria: "Chirurgie Plastique",
      titulo: "Blépharoplastie Supérieure",
      descripcion:
        "Amélioration esthétique de la paupière supérieure sous anesthésie locale avec suivi post-opératoire inclus.",
      caracteristicas: [
        "Entretien virtuel + bilan photographique",
        "Consultation en présentiel 2 jours avant",
        "Soutien psychologique virtuel ou présentiel",
        "Kit de médicaments inclus",
      ],
      tipo: "estetica",
      waMessage:
        "Bonjour OnTour, je suis intéressé(e) par le forfait Blépharoplastie Supérieure. Pourriez-vous me donner plus d'informations ?",
    },
    {
      id: "liposuccion",
      categoria: "Chirurgie Plastique",
      titulo: "Liposuccion",
      descripcion:
        "Remodelage corporel de haute précision avec accompagnement complet pré et post-opératoire.",
      caracteristicas: [
        "Évaluation par spécialiste",
        "Anesthésie générale ou locale",
        "Suivi post-chirurgical",
        "Kit de médicaments inclus",
      ],
      tipo: "estetica",
      waMessage:
        "Bonjour OnTour, je suis intéressé(e) par le forfait Liposuccion. Pourriez-vous me donner plus d'informations ?",
    },
    {
      id: "chequeo-hombres",
      categoria: "Bilan Préventif",
      titulo: "Élite Hommes",
      descripcion:
        "Évaluation médicale complète spécialement conçue pour la santé préventive masculine.",
      caracteristicas: [
        "Bilan complet en laboratoire",
        "Évaluation cardiovasculaire",
        "Consultation avec spécialiste",
        "Rapport médical détaillé",
      ],
      tipo: "preventivo",
      waMessage:
        "Bonjour OnTour, je suis intéressé(e) par le Bilan Préventif Élite Hommes. Pourriez-vous me donner plus d'informations ?",
    },
    {
      id: "chequeo-mujeres",
      categoria: "Bilan Préventif",
      titulo: "Essentiel Femmes",
      descripcion:
        "Évaluation préventive complète pour la santé féminine avec une prise en charge personnalisée.",
      caracteristicas: [
        "Analyses spécialisées en laboratoire",
        "Évaluation gynécologique",
        "Consultation avec spécialiste",
        "Rapport médical détaillé",
      ],
      tipo: "preventivo",
      waMessage:
        "Bonjour OnTour, je suis intéressé(e) par le Bilan Préventif Essentiel Femmes. Pourriez-vous me donner plus d'informations ?",
    },
    {
      id: "mamoplastia",
      categoria: "Chirurgie Plastique",
      titulo: "Augmentation Mammaire",
      descripcion:
        "Procédure esthétique et reconstructive avec implants certifiés et suivi personnalisé.",
      caracteristicas: [
        "Matériaux certifiés FDA / CE",
        "Consultation préalable en présentiel",
        "Soutien psychologique inclus",
        "Kit de médicaments inclus",
      ],
      tipo: "estetica",
      waMessage:
        "Bonjour OnTour, je suis intéressé(e) par le forfait Augmentation Mammaire. Pourriez-vous me donner plus d'informations ?",
    },
  ],
  de: [
    {
      id: "blefaroplastia",
      categoria: "Plastische Chirurgie",
      titulo: "Oberlidstraffung (Blepharoplastik)",
      descripcion:
        "Kosmetische Verbesserung des Oberlids unter örtlicher Betäubung inklusive postoperativer Nachsorge.",
      caracteristicas: [
        "Virtuelles Erstgespräch + Fotodokumentation",
        "Persönliche Beratung 2 Tage vor dem Eingriff",
        "Psychologische Begleitung virtuell oder vor Ort",
        "Medikamenten-Kit inklusive",
      ],
      tipo: "estetica",
      waMessage:
        "Hallo OnTour, ich interessiere mich für das Paket Oberlidstraffung. Könnten Sie mir weitere Informationen geben?",
    },
    {
      id: "liposuccion",
      categoria: "Plastische Chirurgie",
      titulo: "Fettabsaugung (Liposuktion)",
      descripcion:
        "Körperformung mit Hochpräzisionstechnik und umfassender prä- und postoperativer Betreuung.",
      caracteristicas: [
        "Bewertung durch den Facharzt",
        "Vollnarkose oder Lokalanästhesie",
        "Postoperative Nachuntersuchung",
        "Medikamenten-Kit inklusive",
      ],
      tipo: "estetica",
      waMessage:
        "Hallo OnTour, ich interessiere mich für das Fettabsaugungs-Paket. Könnten Sie mir weitere Informationen geben?",
    },
    {
      id: "chequeo-hombres",
      categoria: "Präventiv-Check",
      titulo: "Elite Männer-Check",
      descripcion:
        "Umfassende medizinische Vorsorgeuntersuchung speziell für die Männergesundheit.",
      caracteristicas: [
        "Komplettes Laborprofil",
        "Kardiovaskuläre Untersuchung",
        "Facharzt-Beratung",
        "Detaillierter medizinischer Bericht",
      ],
      tipo: "preventivo",
      waMessage:
        "Hallo OnTour, ich interessiere mich für den Elite Männer-Präventiv-Check. Könnten Sie mir weitere Informationen geben?",
    },
    {
      id: "chequeo-mujeres",
      categoria: "Präventiv-Check",
      titulo: "Essentieller Frauen-Check",
      descripcion:
        "Ganzheitliche Vorsorgeuntersuchung für die Frauengesundheit mit individueller Betreuung.",
      caracteristicas: [
        "Spezialisierte Laboranalysen",
        "Gynäkologische Untersuchung",
        "Facharzt-Beratung",
        "Detaillierter medizinischer Bericht",
      ],
      tipo: "preventivo",
      waMessage:
        "Hallo OnTour, ich interessiere mich für den Essentiellen Frauen-Präventiv-Check. Könnten Sie mir weitere Informationen geben?",
    },
    {
      id: "mamoplastia",
      categoria: "Plastische Chirurgie",
      titulo: "Brustvergrößerung (Mammamammoplastik)",
      descripcion:
        "Ästhetischer und rekonstruktiver Eingriff mit zertifizierten Implantaten und individueller Nachsorge.",
      caracteristicas: [
        "FDA- / CE-zertifizierte Materialien",
        "Vorherige persönliche Beratung",
        "Psychologische Unterstützung inklusive",
        "Medikamenten-Kit inklusive",
      ],
      tipo: "estetica",
      waMessage:
        "Hallo OnTour, ich interessiere mich für das Paket Brustvergrößerung. Könnten Sie mir weitere Informationen geben?",
    },
  ],
};

// ─── Subcomponents ─────────────────────────────────────────────────────────────

function PaqueteCard({
  paquete,
  phoneNumber,
  requestInfoLabel,
}: {
  paquete: CarePackage;
  phoneNumber: string;
  requestInfoLabel?: string;
}) {
  const isEstetica = paquete.tipo === "estetica";

  const accentGradient = isEstetica
    ? "from-[var(--color-wellness-primary)] to-[var(--color-wellness-accent)]"
    : "from-[var(--color-wellness-accent)] to-[var(--color-wellness-gold)]";
  const catColor = isEstetica
    ? "text-[var(--color-wellness-accent)]"
    : "text-[var(--color-wellness-gold)]";

  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    paquete.waMessage
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col rounded-3xl border border-[var(--color-wellness-border)] bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--color-wellness-gold)] hover:shadow-[var(--shadow-wellness-lg)]"
    >
      {/* Top accent gradient bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${accentGradient}`} />

      <div className="flex flex-col flex-1 p-6 sm:p-7">
        {/* Category Label */}
        <div className="mb-5">
          <span
            className={`text-xs font-bold uppercase tracking-wider ${catColor}`}
          >
            {paquete.categoria}
          </span>
        </div>

        {/* Title */}
        <h3 className="heading-3 text-[var(--color-wellness-primary)] mb-3 text-lg md:text-xl font-bold">
          {paquete.titulo}
        </h3>

        {/* Description */}
        <p className="body text-sm text-[#171717]/65 leading-relaxed mb-6 flex-grow">
          {paquete.descripcion}
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-[var(--color-wellness-border)] mb-5" />

        {/* Features */}
        <ul className="mb-6 space-y-2.5">
          {paquete.caracteristicas.map((c) => (
            <li
              key={c}
              className="flex items-start gap-2.5 text-xs sm:text-sm text-[#171717]/80 leading-snug"
            >
              <div className="mt-0.5 w-4 h-4 rounded-full bg-[var(--color-wellness-accent-bg)] flex items-center justify-center shrink-0">
                <Check className="h-2.5 w-2.5 text-[var(--color-wellness-accent)] stroke-[3]" />
              </div>
              <span>{c}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full font-semibold text-sm transition-all duration-300 bg-[var(--color-wellness-accent-bg)] text-[var(--color-wellness-primary)] border border-[var(--color-wellness-accent)]/30 hover:bg-[var(--color-wellness-accent)] hover:text-white hover:shadow-md"
        >
          {requestInfoLabel || "Solicitar información"}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

interface BeneficiosSaludProps {
  phoneNumber?: string;
  strings?: CareStandardStrings;
  locale?: string;
}

export function WellnessCareStandard(props: BeneficiosSaludProps) {
  return <BeneficiosSalud {...props} />;
}

export default function BeneficiosSalud({
  phoneNumber = "573143415177",
  strings: s = {},
  locale = "es",
}: BeneficiosSaludProps) {
  const currentLang = locale in PACKAGES_BY_LOCALE ? locale : "es";
  const paquetes = PACKAGES_BY_LOCALE[currentLang];

  const defaultTitle = "Tu salud, nuestra prioridad.";
  const defaultHighlight = "Colombia te cuida.";
  const defaultSubtitle =
    "Accede a procedimientos médicos y estéticos de clase mundial en el Tolima, respaldados por especialistas certificados y acompañamiento completo antes, durante y después de tu procedimiento.";

  const consultaUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    currentLang === "en"
      ? "Hello OnTour, I would like a consultation regarding the available health packages."
      : currentLang === "fr"
      ? "Bonjour OnTour, je souhaiterais une consultation concernant les forfaits de santé disponibles."
      : currentLang === "de"
      ? "Hallo OnTour, ich möchte mich gerne über die verfügbaren Gesundheitspakete beraten lassen."
      : "Hola OnTour, me gustaría recibir una consulta sobre los paquetes de salud disponibles."
  )}`;

  return (
    <section className="py-16 md:py-24 bg-[var(--color-wellness-bg)] editorial-section">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 max-w-3xl"
        >
          <h2 className="display-2 text-[var(--color-wellness-primary)] mb-4">
            {s.title || defaultTitle}{" "}
            <span className="text-[var(--color-wellness-accent)]">
              {s.titleHighlight || defaultHighlight}
            </span>
          </h2>
          <p className="body-lg text-[#171717]/65 leading-relaxed">
            {s.subtitle || defaultSubtitle}
          </p>
        </motion.div>

        {/* Grid de paquetes */}
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paquetes.map((p) => (
            <PaqueteCard
              key={p.id}
              paquete={p}
              phoneNumber={phoneNumber}
              requestInfoLabel={s.requestInfo}
            />
          ))}
        </div>

        {/* Bottom CTA band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-3xl border border-[var(--color-wellness-border)] bg-white p-6 sm:p-8 shadow-[var(--shadow-wellness-md)]"
        >
          <div className="max-w-xl">
            <h3 className="heading-3 text-[var(--color-wellness-primary)] text-lg md:text-xl font-bold mb-1">
              {s.helpTitle || "¿No sabes qué paquete es para ti?"}
            </h3>
            <p className="text-sm md:text-base text-[#171717]/65 leading-relaxed">
              {s.helpSubtitle ||
                "Nuestro equipo te orienta de forma personalizada y sin ningún compromiso."}
            </p>
          </div>
          <a
            href={consultaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-[var(--color-wellness-primary)] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[var(--color-wellness-primary)]/90 hover:scale-105 shadow-md"
          >
            <MessageCircle className="h-4 w-4 text-[var(--color-wellness-gold)]" />
            {s.helpButton || "Consulta"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
