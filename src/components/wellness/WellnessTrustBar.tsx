"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  FlaskConical,
  FileText,
  Languages,
  Video,
  Info,
  LucideIcon,
} from "lucide-react";

export interface TrustStrings {
  certified: string;
  materials: string;
  quote: string;
  bilingual: string;
  telehealth: string;
}

interface TrustItemDetail {
  key: keyof TrustStrings;
  icon: LucideIcon;
  badge: Record<string, string>;
  description: Record<string, string>;
}

const TRUST_ITEMS: TrustItemDetail[] = [
  {
    key: "certified",
    icon: ShieldCheck,
    badge: {
      es: "100% Verificado",
      en: "100% Verified",
      fr: "100% Vérifié",
      de: "100% Verifiziert",
    },
    description: {
      es: "Cirujanos y médicos adscritos a sociedades científicas oficiales y con acreditación nacional e internacional.",
      en: "Surgeons and physicians accredited by official medical societies and verified international boards.",
      fr: "Chirurgiens et médecins affiliés à des sociétés scientifiques officielles et reconnus mondialement.",
      de: "Fachärzte und Chirurgen mit offizieller Mitgliedschaft in wissenschaftlichen Gesellschaften.",
    },
  },
  {
    key: "materials",
    icon: FlaskConical,
    badge: {
      es: "Grado Médico Superior",
      en: "Top Medical Grade",
      fr: "Qualité Médicale Supérieure",
      de: "Höchste Medizintechnik",
    },
    description: {
      es: "Implantes, prótesis e insumos biomédicos de última generación con número de lote y homologación FDA / CE.",
      en: "Next-generation implants, prosthetics, and supplies with batch traceability and FDA / CE approvals.",
      fr: "Implants, prothèses et fournitures biomédicales homologués FDA / CE avec traçabilité complète.",
      de: "Modernste Implantate und Materialien mit FDA- und CE-Zulassung sowie Chargennummer.",
    },
  },
  {
    key: "quote",
    icon: FileText,
    badge: {
      es: "Cero Costos Ocultos",
      en: "Zero Hidden Costs",
      fr: "Zéro Frais Cachés",
      de: "Keine Versteckten Kosten",
    },
    description: {
      es: "Presupuesto cerrado y detallado por escrito antes de comprar tus pasajes. Sabes con exactitud lo que pagas.",
      en: "A closed, transparent written quote before booking flights. You know exactly what your care costs.",
      fr: "Devis clair, détaillé et définitif par écrit avant l'achat de vos billets d'avion.",
      de: "Feste, verbindliche Kostenaufstellung vor Antritt Ihrer Flugreise für absolute Planungssicherheit.",
    },
  },
  {
    key: "bilingual",
    icon: Languages,
    badge: {
      es: "Acompañamiento 24/7",
      en: "24/7 Concierge",
      fr: "Assistance Dédiée",
      de: "24/7 Begleitung",
    },
    description: {
      es: "Concierge médico dedicado que te asiste y traduce en cada consulta, traslado y paso de tu recuperación.",
      en: "A dedicated medical concierge fluent in your language throughout every consultation and transfer.",
      fr: "Un concierge médical dédié qui vous accompagne et traduit chaque échange médical durant le séjour.",
      de: "Persönlicher Betreuer, der Sie in Ihrer Sprache bei allen Konsultationen und Wegen begleitet.",
    },
  },
  {
    key: "telehealth",
    icon: Video,
    badge: {
      es: "Seguimiento Remoto",
      en: "Remote Follow-Up",
      fr: "Suivi À Distance",
      de: "Online-Nachsorge",
    },
    description: {
      es: "Consultas de evolución y chequeos virtuales con tu especialista tras regresar a tu país de residencia.",
      en: "Ongoing video checkups and progress monitoring with your specialist once you return home safely.",
      fr: "Consultations de contrôle en visioconférence avec votre médecin une fois rentré chez vous.",
      de: "Regelmäßige Video-Sprechstunden mit Ihrem Spezialisten nach Ihrer Rückkehr nach Hause.",
    },
  },
];

const NARRATIVE_CONFIG = {
  es: {
    badge: "ESTÁNDAR DE EXCELENCIA CLÍNICA",
    subtitle: "Garantía de calidad clínica y acompañamiento integral en Colombia",
    hint: "Pasa el cursor o toca cada concepto para ver detalles",
    parts: {
      prefix: "Cuidamos cada detalle de tu viaje y bienestar con ",
      afterCertified: ", respaldado con ",
      afterMaterials: ", con la tranquilidad de una ",
      afterQuote: ", la cercanía de nuestra ",
      afterBilingual: " y el acompañamiento de ",
      suffix: " cuando regreses a casa.",
    },
  },
  en: {
    badge: "CLINICAL SAFETY & TRUST STANDARD",
    subtitle: "Certified clinical quality standards and comprehensive medical accompaniment in Colombia",
    hint: "Hover or tap on highlighted terms to explore details",
    parts: {
      prefix: "We protect every detail of your medical journey with ",
      afterCertified: ", backed by ",
      afterMaterials: ", guaranteed with a ",
      afterQuote: ", supported by personal ",
      afterBilingual: " and dedicated ",
      suffix: " once you safely return home.",
    },
  },
  fr: {
    badge: "EXCELLENCE ET SÉCURITÉ CLINIQUES",
    subtitle: "Normes de qualité clinique certifiée et accompagnement médical complet en Colombie",
    hint: "Survolez ou touchez chaque terme pour découvrir les détails",
    parts: {
      prefix: "Nous veillons sur chaque étape de votre séjour avec des ",
      afterCertified: ", l'exigence de ",
      afterMaterials: ", la clarté d'un ",
      afterQuote: ", l'attention d'une ",
      afterBilingual: " et une ",
      suffix: " continue à votre retour.",
    },
  },
  de: {
    badge: "KLINISCHE SICHERHEIT & TRANSPARENZ",
    subtitle: "Zertifizierte klinische Qualitätsstandards und lückenlose Betreuung in Kolumbien",
    hint: "Fahren Sie über die Begriffe, um Details anzuzeigen",
    parts: {
      prefix: "Wir begleiten jeden Schritt Ihrer Behandlung mit ",
      afterCertified: ", zertifizierten ",
      afterMaterials: ", einem verbindlichen ",
      afterQuote: ", persönlicher ",
      afterBilingual: " und fortlaufender ",
      suffix: " nach Ihrer Heimreise.",
    },
  },
};

export function WellnessTrustBar({
  strings: s,
  locale = "es",
}: {
  strings: TrustStrings;
  locale?: string;
}) {
  const lang = (locale in NARRATIVE_CONFIG ? locale : "es") as keyof typeof NARRATIVE_CONFIG;
  const config = NARRATIVE_CONFIG[lang];

  return (
    <div className="relative z-20 -mt-10 sm:-mt-12 mb-12 md:mb-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-[var(--color-wellness-border)] bg-gradient-to-br from-white via-[#fcfbf9] to-[#f7f5f0] p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(10,37,64,0.06)]"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[var(--color-wellness-border)]/60">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-wellness-gold-bg)] border border-[var(--color-wellness-gold)]/25 text-[var(--color-wellness-gold-hover)] text-xs font-semibold tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-wellness-gold)] stroke-[1.5]" />
              <span>{config.badge}</span>
            </div>
            <p className="text-xs text-[#171717]/70 font-medium">
              {config.subtitle}
            </p>
          </div>

          {/* 5 Visible Clinical Trust Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {TRUST_ITEMS.map((item) => {
              const Icon = item.icon;
              const label = s[item.key] || "";
              const descText = item.description[lang] || item.description.es;

              return (
                <div
                  key={item.key}
                  className="group flex flex-col p-5 sm:p-6 rounded-2xl bg-white border border-[var(--color-wellness-border)]/70 hover:border-[var(--color-wellness-gold)]/80 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[var(--color-wellness-accent)] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105 shrink-0">
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </div>

                  <h3 className="font-sans font-semibold text-base text-[var(--color-wellness-primary)] mb-2 leading-snug">
                    {label}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed font-normal mt-auto">
                    {descText}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default WellnessTrustBar;
