"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  FlaskConical,
  FileText,
  Languages,
  Video,
  Sparkles,
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
  const [activeKey, setActiveKey] = useState<keyof TrustStrings | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const lang = (locale in NARRATIVE_CONFIG ? locale : "es") as keyof typeof NARRATIVE_CONFIG;
  const config = NARRATIVE_CONFIG[lang];

  // Close tooltip if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveKey(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderInlineLink = (key: keyof TrustStrings) => {
    const item = TRUST_ITEMS.find((it) => it.key === key);
    if (!item) return null;

    const Icon = item.icon;
    const isActive = activeKey === key;
    const label = s[key] || "";
    const badgeText = item.badge[lang] || item.badge.es;
    const descText = item.description[lang] || item.description.es;

    return (
      <span
        key={key}
        className="relative inline-block my-1 align-baseline group/item"
        onMouseEnter={() => setActiveKey(key)}
        onMouseLeave={() => setActiveKey(null)}
      >
        <button
          type="button"
          onClick={() => setActiveKey(isActive ? null : key)}
          aria-expanded={isActive}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 border text-left ${
            isActive
              ? "bg-[var(--color-wellness-gold-bg)] text-[#8c6517] border-[var(--color-wellness-gold)] shadow-md scale-102 ring-2 ring-[var(--color-wellness-gold)]/20"
              : "bg-emerald-50/80 text-[var(--color-wellness-accent)] border-emerald-200/70 hover:bg-[var(--color-wellness-gold-bg)] hover:text-[#8c6517] hover:border-[var(--color-wellness-gold)]/60 shadow-2xs hover:shadow-xs"
          }`}
        >
          {/* Animated floating icon */}
          <span
            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-transform duration-300 ${
              isActive
                ? "bg-[var(--color-wellness-gold)] text-[#0A2540] rotate-6 scale-110"
                : "bg-[var(--color-wellness-accent)]/15 text-[var(--color-wellness-accent)] group-hover/item:bg-[var(--color-wellness-gold)] group-hover/item:text-[#0A2540]"
            }`}
          >
            <Icon className="w-3.5 h-3.5" strokeWidth={2.2} />
          </span>

          <span className="underline decoration-dotted decoration-[var(--color-wellness-accent)]/40 underline-offset-4 group-hover/item:decoration-[var(--color-wellness-gold)]">
            {label}
          </span>
        </button>

        {/* Floating Contextual Tooltip Popover */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-50 w-72 sm:w-80 pointer-events-auto"
            >
              <div className="bg-[#0A2540] text-white p-4 rounded-2xl shadow-2xl border border-[#C9A961]/30 backdrop-blur-xl relative">
                {/* Header with Icon & Badge */}
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[var(--color-wellness-gold)]/20 text-[var(--color-wellness-gold)] flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5" strokeWidth={2.2} />
                    </div>
                    <span className="text-xs font-bold text-white tracking-wide">
                      {label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-wellness-gold)] text-[#0A2540] shrink-0">
                    {badgeText}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-white/85 leading-relaxed">
                  {descText}
                </p>

                {/* Bottom Pointer Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-[#0A2540]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </span>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative z-20 -mt-10 sm:-mt-12 mb-10 md:mb-14"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-visible rounded-3xl border border-[var(--color-wellness-border)] bg-gradient-to-br from-white via-[#fcfbf9] to-[#f7f5f0] p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(10,37,64,0.06)]"
        >
          {/* Top Label & Micro Hint */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6 pb-4 border-b border-[var(--color-wellness-border)]/60">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-wellness-gold-bg)] border border-[var(--color-wellness-gold)]/25 text-[var(--color-wellness-gold-hover)] text-xs font-bold tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-wellness-gold)]" />
              <span>{config.badge}</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#171717]/60 font-medium">
              <Info className="w-3.5 h-3.5 text-[var(--color-wellness-accent)]" />
              <span>{config.hint}</span>
            </div>
          </div>

          {/* Fluid Editorial Narrative Paragraph */}
          <p className="text-base sm:text-lg md:text-xl lg:text-[22px] font-normal leading-relaxed sm:leading-[1.8] md:leading-[1.85] text-[#0A2540]">
            <span>{config.parts.prefix}</span>
            {renderInlineLink("certified")}
            <span>{config.parts.afterCertified}</span>
            {renderInlineLink("materials")}
            <span>{config.parts.afterMaterials}</span>
            {renderInlineLink("quote")}
            <span>{config.parts.afterQuote}</span>
            {renderInlineLink("bilingual")}
            <span>{config.parts.afterBilingual}</span>
            {renderInlineLink("telehealth")}
            <span>{config.parts.suffix}</span>
          </p>

          {/* Mobile-only Hint at bottom */}
          <div className="mt-4 sm:hidden flex items-center gap-1.5 text-xs text-[#171717]/60 font-medium">
            <Info className="w-3.5 h-3.5 text-[var(--color-wellness-accent)] shrink-0" />
            <span>{config.hint}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default WellnessTrustBar;
