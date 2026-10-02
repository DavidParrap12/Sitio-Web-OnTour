"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  X,
  ShieldCheck,
  Clock,
  UserCheck,
  Building2,
  Calendar,
  DollarSign,
  FileText,
  Lock,
  MessageCircle,
} from "lucide-react";
import { useLocale } from "next-intl";
import { RequestQuoteModal } from "@/components/RequestQuoteModal";

export interface SpecialtyTreatmentItem {
  name: string;
  desc: string;
  procedures: string[];
}

export interface TreatmentsStrings {
  title: string;
  subtitle: string;
  learnMore: string;
  cirugiaPlastica: SpecialtyTreatmentItem;
  chequeosPreventivos: SpecialtyTreatmentItem;
  cardiologia: SpecialtyTreatmentItem;
  urologia: SpecialtyTreatmentItem;
  nutricion: SpecialtyTreatmentItem;
  psicologia: SpecialtyTreatmentItem;
}

const SPECIALTY_KEYS = [
  "cirugiaPlastica",
  "chequeosPreventivos",
  "cardiologia",
  "urologia",
  "nutricion",
  "psicologia",
] as const;

type SpecialtyKey = (typeof SPECIALTY_KEYS)[number];

const SPECIALTY_IMAGES: Record<SpecialtyKey, string> = {
  cirugiaPlastica: "/image/bienestar/tratamientos/cirugia-plastica.jpg",
  chequeosPreventivos: "/image/bienestar/tratamientos/chequeos-preventivos.jpg",
  cardiologia: "/image/bienestar/tratamientos/cardiologia.jpg",
  urologia: "/image/bienestar/tratamientos/urologia.jpg",
  nutricion: "/image/bienestar/tratamientos/nutricion.jpg",
  psicologia: "/image/bienestar/tratamientos/psicologia.jpg",
};

interface ClinicalSheetData {
  basePrice: string;
  candidateProfile: Record<string, string>;
  stayAndRecovery: Record<string, string>;
  specialist: {
    name: string;
    role: Record<string, string>;
    rethus: string;
    hospital: string;
  };
}

const CLINICAL_DATA: Record<SpecialtyKey, ClinicalSheetData> = {
  cirugiaPlastica: {
    basePrice: "From $USD 2,800",
    candidateProfile: {
      es: "Pacientes con expectativas realistas, peso estable (IMC < 30) y sin contraindicaciones cardiovasculares o de coagulación activas.",
      en: "Patients with realistic goals, stable weight (BMI < 30), and no uncontrolled cardiovascular or bleeding disorders.",
      fr: "Patients avec des attentes réalistes, un IMC < 30 et sans contre-indications cardiovasculaires actives.",
      de: "Patienten mit realistischen Zielen, stabilem Gewicht (BMI < 30) und ohne kardiovaskuläre Kontraindikationen.",
    },
    stayAndRecovery: {
      es: "Estancia sugerida: 10–14 días en Colombia. Drenajes y retiro de puntos en días 5–7. Telemonitoreo continuo por 6 meses.",
      en: "Recommended stay: 10–14 days in Colombia. Initial post-op check & sutures removed on days 5–7. 6 months follow-up telehealth.",
      fr: "Séjour recommandé: 10–14 jours en Colombie. Retrait des points aux jours 5–7. Télésuivi pendant 6 mois.",
      de: "Empfohlener Aufenthalt: 10–14 Tage in Kolumbien. Fädenentfernung Tag 5–7. 6 Monate telemedizinische Nachsorge.",
    },
    specialist: {
      name: "Dr. Alejandro Reyes",
      role: {
        es: "Cirujano Plástico, Estético y Reconstructivo",
        en: "Plastic, Aesthetic & Reconstructive Surgeon",
        fr: "Chirurgien Plastique & Reconstructeur",
        de: "Facharzt für Plastische & Rekonstruktive Chirurgie",
      },
      rethus: "RETHUS 1128472901",
      hospital: "Clínica Medicádiz (Acreditación Nacional)",
    },
  },
  chequeosPreventivos: {
    basePrice: "From $USD 950",
    candidateProfile: {
      es: "Adultos y ejecutivos mayores de 30 años que buscan evaluación integral de salud, marcadores oncológicos y biomarcadores en 48 horas.",
      en: "Adults and executives aged 30+ seeking comprehensive health screening, tumor markers, and imaging with results in 48 hours.",
      fr: "Adultes et dirigeants recherchant un bilan de santé global et examens biologiques complets en 48h.",
      de: "Erwachsene und Führungskräfte ab 30 für umfassende Gesundheitsvorsorge und Labordiagnostik in 48h.",
    },
    stayAndRecovery: {
      es: "Estancia sugerida: 3–5 días en Colombia. Estudios diagnósticos en 48 horas con entrega de informe médico multidisciplinario.",
      en: "Recommended stay: 3–5 days in Colombia. All diagnostic imaging and tests completed in 48 hours with multidisciplinary report.",
      fr: "Séjour recommandé: 3–5 jours en Colombie. Examens réalisés en 48h avec rapport médical multidisciplinaire.",
      de: "Empfohlener Aufenthalt: 3–5 Tage in Kolumbien. Alle Untersuchungen in 48 Stunden mit ausführlichem Befundbericht.",
    },
    specialist: {
      name: "Dra. Mariana Gómez",
      role: {
        es: "Médico Internista & Especialista en Diagnóstico Integral",
        en: "Internal Medicine & Diagnostic Health Specialist",
        fr: "Médecin Interniste & Spécialiste Diagnostic",
        de: "Fachärztin für Innere Medizin & Prävention",
      },
      rethus: "RETHUS 1098327411",
      hospital: "Hospital Universitario San Rafael",
    },
  },
  cardiologia: {
    basePrice: "From $USD 1,200",
    candidateProfile: {
      es: "Pacientes con antecedentes cardiovasculares, hipertensión, arritmias o necesidad de ecocardiogramas de esfuerzo y cateterismo no invasivo.",
      en: "Patients with cardiovascular history, hypertension, arrhythmias, or requiring stress echocardiography and advanced imaging.",
      fr: "Patients avec antécédents cardiaques, hypertension ou nécessitant une échocardiographie d'effort de haute précision.",
      de: "Patienten mit kardiovaskulärer Vorgeschichte, Bluthochdruck oder Bedarf an Stressechokardiographie.",
    },
    stayAndRecovery: {
      es: "Estancia sugerida: 4–6 días en Colombia. Evaluación hemodinámica completa y plan de manejo farmacológico personalizado.",
      en: "Recommended stay: 4–6 days in Colombia. Full hemodynamic evaluation and tailored pharmacological protocol.",
      fr: "Séjour recommandé: 4–6 jours en Colombie. Évaluation hémodynamique complète et protocole personnalisé.",
      de: "Empfohlener Aufenthalt: 4–6 Tage in Kolumbien. Vollständige hämodynamische Analyse und personalisierter Plan.",
    },
    specialist: {
      name: "Dr. Carlos V. Mendoza",
      role: {
        es: "Cardiólogo Clínico & Hemodinamista",
        en: "Clinical Cardiologist & Hemodynamic Specialist",
        fr: "Cardiologue Clinicien & Spécialiste Hémodynamique",
        de: "Klinischer Kardiologe & Herzspezialist",
      },
      rethus: "RETHUS 98324102",
      hospital: "Instituto Cardiovascular del Tolima",
    },
  },
  urologia: {
    basePrice: "From $USD 1,600",
    candidateProfile: {
      es: "Pacientes que requieren valoración prostática avanzada, cirugía láser o resolución de cálculos renales con tecnología mínimamente invasiva.",
      en: "Patients needing advanced prostate screening, laser enucleation, or minimally invasive treatment for urinary calculi.",
      fr: "Patients nécessitant un bilan prostatique avancé, chirurgie laser ou traitement peu invasif des calculs.",
      de: "Patienten mit Bedarf an Prostata-Diagnostik, Laserchirurgie oder minimalinvasiver Steintherapie.",
    },
    stayAndRecovery: {
      es: "Estancia sugerida: 5–8 días en Colombia. Procedimientos ambulatorios o con 24h de hospitalización según indicación clínica.",
      en: "Recommended stay: 5–8 days in Colombia. Outpatient or 24-hour observational admission based on procedure.",
      fr: "Séjour recommandé: 5–8 jours en Colombie. Intervention ambulatoire ou hospitalisation 24h selon le cas.",
      de: "Empfohlener Aufenthalt: 5–8 Tage in Kolumbien. Ambulant oder 24h Überwachung je nach Befund.",
    },
    specialist: {
      name: "Dr. Andrés E. Quintero",
      role: {
        es: "Urólogo & Especialista en Cirugía Laparoscópica",
        en: "Urologist & Laparoscopic Surgery Specialist",
        fr: "Urologue & Chirurgien Laparoscopique",
        de: "Facharzt für Urologie & Minimalinvasive Chirurgie",
      },
      rethus: "RETHUS 87492014",
      hospital: "Clínica Asotrauma Ibagué",
    },
  },
  nutricion: {
    basePrice: "From $USD 750",
    candidateProfile: {
      es: "Pacientes con síndrome metabólico, sobrepeso, preparación prequirúrgica o interés en reprogramación metabólica y bioimpedancia médica.",
      en: "Patients with metabolic syndrome, weight management needs, pre-surgical prep, or cellular nutrition goals.",
      fr: "Patients atteints de syndrome métabolique, gestion du poids ou optimisation nutritionnelle pré/post-opératoire.",
      de: "Patienten mit metabolischem Syndrom, Gewichtsmanagement oder prä-/postoperativer Ernährungsoptimierung.",
    },
    stayAndRecovery: {
      es: "Estancia sugerida: 4–7 días en Colombia (con posibilidad de programa de retiro en finca cafetera). Soporte digital por 3 meses.",
      en: "Recommended stay: 4–7 days in Colombia (available with wellness retreat in the coffee region). 3 months virtual coaching.",
      fr: "Séjour recommandé: 4–7 jours en Colombie (option retraite en domaine caféier). 3 mois de suivi digital.",
      de: "Empfohlener Aufenthalt: 4–7 Tage in Kolumbien (Kombinierbar mit Rückzugsort in Kaffeefarm). 3 Monate Coaching.",
    },
    specialist: {
      name: "Dra. Valentina Salazar",
      role: {
        es: "Nutricionista Clínica & Especialista en Metabolismo",
        en: "Clinical Nutritionist & Metabolic Health Specialist",
        fr: "Nutritionniste Clinique & Métabolisme",
        de: "Klinische Ernährungsmedizinerin & Stoffwechselexpertin",
      },
      rethus: "RETHUS 1023849102",
      hospital: "Centro Médico Especializado Tolima",
    },
  },
  psicologia: {
    basePrice: "From $USD 650",
    candidateProfile: {
      es: "Personas en proceso de duelo, burnout ejecutivo, preparación psicoemocional pre-quirúrgica o en búsqueda de mindfulness guiado.",
      en: "Individuals experiencing burnout, executive stress, pre-surgical mental preparation, or seeking guided therapeutic mindfulness.",
      fr: "Personnes souffrant de burnout, stress professionnel ou nécessitant un accompagnement psycho-émotionnel.",
      de: "Personen mit Burnout, beruflicher Überlastung oder Bedarf an psychologischer Vor-/Nachbereitung.",
    },
    stayAndRecovery: {
      es: "Estancia sugerida: 5–7 días en ambiente de naturaleza y aguas termales. Sesiones diarias y paquete de seguimiento remoto.",
      en: "Recommended stay: 5–7 days amidst nature and thermal hot springs. Daily sessions and remote tele-counseling plan.",
      fr: "Séjour recommandé: 5–7 jours dans un cadre naturel avec sources thermales. Séances quotidiennes et suivi en ligne.",
      de: "Empfohlener Aufenthalt: 5–7 Tage in natürlicher Umgebung mit Thermalbädern. Tägliche Sitzungen und Tele-Betreuung.",
    },
    specialist: {
      name: "Dr. Camilo Ortiz",
      role: {
        es: "Psicólogo Clínico & Especialista en Bienestar Integral",
        en: "Clinical Psychologist & Mind-Body Health Specialist",
        fr: "Psychologue Clinicien & Bien-être Global",
        de: "Klinischer Psychologe & Experte für Ganzheitliche Gesundheit",
      },
      rethus: "RETHUS 1102948215",
      hospital: "Alianza Salud Mental & Neurociencias",
    },
  },
};

const UI_MODAL: Record<string, {
  clinicalSheet: string;
  scope: string;
  candidateProfile: string;
  stayAndRecovery: string;
  estimatedBasePrice: string;
  assignedSpecialist: string;
  startIntake: string;
  close: string;
  hipaaNotice: string;
}> = {
  es: {
    clinicalSheet: "Ficha Clínica de Especialidad",
    scope: "Alcance y Procedimientos Clave",
    candidateProfile: "Perfil del Candidato",
    stayAndRecovery: "Estancia & Recuperación Recomendada",
    estimatedBasePrice: "Precio Base Estimado",
    assignedSpecialist: "Especialista Clínico Responsable",
    startIntake: "Solicitar Valoración Médica Segura",
    close: "Cerrar",
    hipaaNotice: "Información médica protegida bajo secreto profesional (Ley 1581 / Estándares internacionales de privacidad). Respuesta garantizada en < 24h.",
  },
  en: {
    clinicalSheet: "Specialty Clinical Sheet",
    scope: "Scope & Core Procedures",
    candidateProfile: "Candidate Profile & Eligibility",
    stayAndRecovery: "Recommended Stay & Recovery",
    estimatedBasePrice: "Estimated Starting Price",
    assignedSpecialist: "Lead Certified Specialist",
    startIntake: "Start Secure Medical Assessment",
    close: "Close",
    hipaaNotice: "Your clinical data is strictly confidential (Ley 1581 / International health privacy standards). Guaranteed response in < 24h.",
  },
  fr: {
    clinicalSheet: "Fiche Clinique de Spécialité",
    scope: "Champ d'application & Procédures",
    candidateProfile: "Profil du Patient Éligible",
    stayAndRecovery: "Séjour & Rétablissement Recommandés",
    estimatedBasePrice: "Tarif de Base Estimé",
    assignedSpecialist: "Spécialiste Médical Référent",
    startIntake: "Demander une Évaluation Médicale Sécurisée",
    close: "Fermer",
    hipaaNotice: "Données médicales strictement confidentielles. Réponse médicale garantie sous 24h.",
  },
  de: {
    clinicalSheet: "Klinisches Datenblatt",
    scope: "Klinischer Umfang & Eingriffe",
    candidateProfile: "Patientenprofil & Indikation",
    stayAndRecovery: "Empfohlener Aufenthalt & Genesung",
    estimatedBasePrice: "Geschätzter Richtpreis",
    assignedSpecialist: "Leitender Facharzt",
    startIntake: "Sichere Medizinische Ersteinschätzung anfordern",
    close: "Schließen",
    hipaaNotice: "Ihre medizinischen Daten unterliegen strengster Schweigepflicht. Antwort innerhalb von 24h garantiert.",
  },
};

export function WellnessTreatmentsGrid({
  strings: s,
}: {
  strings: TreatmentsStrings;
}) {
  const locale = useLocale();
  const tModal = UI_MODAL[locale] || UI_MODAL.es;

  const [activeSheetKey, setActiveSheetKey] = useState<SpecialtyKey | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [preselectedTreatment, setPreselectedTreatment] = useState<string>("");

  const openSheet = (key: SpecialtyKey) => {
    setActiveSheetKey(key);
  };

  const closeSheet = () => {
    setActiveSheetKey(null);
  };

  const handleStartIntake = (treatmentName: string) => {
    setPreselectedTreatment(treatmentName);
    setActiveSheetKey(null);
    setIsQuoteOpen(true);
  };

  return (
    <section id="tratamientos" className="py-16 md:py-24 bg-white editorial-section">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-deep-forest mb-4">
            {s.title}
          </h2>
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed font-light">
            {s.subtitle}
          </p>
        </motion.div>

        {/* 6 Specialty Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SPECIALTY_KEYS.map((key, i) => {
            const item = s[key];
            if (!item) return null;
            const clinical = CLINICAL_DATA[key];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex flex-col rounded-3xl border border-stone-200 bg-white overflow-hidden hover:border-muted-gold/60 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300"
              >
                {/* Photo Header */}
                <div className="relative w-full aspect-[4/3] bg-stone-100 overflow-hidden">
                  <Image
                    src={SPECIALTY_IMAGES[key]}
                    alt={item.name}
                    fill
                    quality={90}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                  {/* Badge over image */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-deep-forest shadow-sm backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-gold" />
                      {item.name}
                    </span>
                    <span className="text-xs font-semibold text-white/90 bg-deep-forest/80 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                      {clinical.basePrice}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 sm:p-7 gap-4 justify-between">
                  <div className="space-y-3">
                    {/* Description */}
                    <p className="text-sm text-stone-600 leading-relaxed font-light">
                      {item.desc}
                    </p>

                    {/* Procedure Pills */}
                    {item.procedures && item.procedures.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.procedures.map((proc, pi) => (
                          <span
                            key={pi}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-stone-100 text-stone-700 border border-stone-200"
                          >
                            {proc}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer Action to Open Clinical Sheet Modal */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => openSheet(key)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-deep-forest hover:text-muted-gold transition-colors duration-200 cursor-pointer min-h-[44px]"
                    >
                      <span>{s.learnMore}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStartIntake(item.name)}
                      className="px-3 py-1.5 rounded-full bg-stone-100 hover:bg-deep-forest hover:text-white text-stone-700 text-xs font-medium transition-colors min-h-[36px]"
                    >
                      Cotizar
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ======== DETAILED CLINICAL SHEET MODAL (FICHA CLÍNICA) ======== */}
      <AnimatePresence>
        {activeSheetKey && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSheet}
              className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
            >
              {/* Header Image Strip */}
              <div className="relative h-48 sm:h-56 w-full shrink-0">
                <Image
                  src={SPECIALTY_IMAGES[activeSheetKey]}
                  alt={s[activeSheetKey]?.name || "Medical specialty"}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/95 via-deep-forest/60 to-transparent" />

                <button
                  type="button"
                  onClick={closeSheet}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-md transition-colors min-h-[44px]"
                  aria-label={tModal.close}
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-muted-gold text-charcoal">
                      {tModal.clinicalSheet}
                    </span>
                    <span className="text-xs text-white/80 font-medium">
                      {CLINICAL_DATA[activeSheetKey].basePrice}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light">
                    {s[activeSheetKey]?.name}
                  </h3>
                </div>
              </div>

              {/* Scrollable Clinical Sheet Details */}
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
                {/* 1. Scope & Description */}
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-forest mb-2">
                    <FileText className="w-4 h-4 text-muted-gold" />
                    {tModal.scope}
                  </h4>
                  <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-light mb-3">
                    {s[activeSheetKey]?.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {s[activeSheetKey]?.procedures.map((p, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 rounded-full bg-deep-forest/5 text-deep-forest font-medium border border-deep-forest/10"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2. Candidate Profile */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    <UserCheck className="w-4 h-4 text-deep-forest" />
                    {tModal.candidateProfile}
                  </h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {CLINICAL_DATA[activeSheetKey].candidateProfile[locale] ||
                      CLINICAL_DATA[activeSheetKey].candidateProfile.es}
                  </p>
                </div>

                {/* 3. Stay & Recovery */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    <Calendar className="w-4 h-4 text-deep-forest" />
                    {tModal.stayAndRecovery}
                  </h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {CLINICAL_DATA[activeSheetKey].stayAndRecovery[locale] ||
                      CLINICAL_DATA[activeSheetKey].stayAndRecovery.es}
                  </p>
                </div>

                {/* 4. Specialist Assigned */}
                <div className="p-5 rounded-2xl border border-muted-gold/40 bg-warm-ivory/50">
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-forest mb-2">
                    <ShieldCheck className="w-4 h-4 text-muted-gold" />
                    {tModal.assignedSpecialist}
                  </h4>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className="font-semibold text-charcoal text-base">
                        {CLINICAL_DATA[activeSheetKey].specialist.name}
                      </p>
                      <p className="text-xs text-stone-600">
                        {CLINICAL_DATA[activeSheetKey].specialist.role[locale] ||
                          CLINICAL_DATA[activeSheetKey].specialist.role.es}
                      </p>
                      <p className="text-xs font-mono font-semibold text-deep-forest mt-1">
                        {CLINICAL_DATA[activeSheetKey].specialist.rethus}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="inline-flex items-center gap-1 text-xs text-stone-500 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-muted-gold" />
                        {CLINICAL_DATA[activeSheetKey].specialist.hospital}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Privacy and HIPAA Compliance Notice */}
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-deep-forest/5 text-deep-forest text-xs leading-relaxed border border-deep-forest/10">
                  <Lock className="w-4 h-4 shrink-0 text-muted-gold mt-0.5" />
                  <p>{tModal.hipaaNotice}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 sm:p-6 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left w-full sm:w-auto">
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block">
                    {tModal.estimatedBasePrice}
                  </span>
                  <span className="font-serif text-xl font-bold text-deep-forest">
                    {CLINICAL_DATA[activeSheetKey].basePrice}
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleStartIntake(s[activeSheetKey]?.name || "")}
                    className="group/btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-deep-forest text-warm-ivory text-sm font-medium tracking-wide hover:bg-muted-gold hover:text-charcoal transition-all shadow-md min-h-[44px] cursor-pointer"
                  >
                    <span>{tModal.startIntake}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Direct Secure Intake Modal */}
      <RequestQuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        preselectedExperience="wellness"
        preselectedItem={preselectedTreatment}
      />
    </section>
  );
}
