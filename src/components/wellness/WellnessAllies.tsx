"use client";

import { motion } from "framer-motion";
import { Building2, MapPin, ShieldCheck, Stethoscope } from "lucide-react";
import { useLocale } from "next-intl";

interface AllyClinic {
  name: string;
  city: string;
  treatments: Record<string, string>;
}

/** Only partners already referenced elsewhere on the wellness page. */
const CLINICS: AllyClinic[] = [
  {
    name: "Clínica Medicádiz",
    city: "Ibagué, Tolima",
    treatments: {
      es: "Cirugía plástica · Chequeos · Cardiología · Urología",
      en: "Plastic surgery · Check-ups · Cardiology · Urology",
      fr: "Chirurgie plastique · Bilans · Cardiologie · Urologie",
      de: "Plastische Chirurgie · Vorsorge · Kardiologie · Urologie",
    },
  },
  {
    name: "Clínica Avidanti",
    city: "Ibagué, Tolima",
    treatments: {
      es: "Cirugía plástica · Urología · Atención internacional",
      en: "Plastic surgery · Urology · International patient care",
      fr: "Chirurgie plastique · Urologie · Patients internationaux",
      de: "Plastische Chirurgie · Urologie · Internationale Patienten",
    },
  },
  {
    name: "Hospital Federico Lleras Acosta",
    city: "Ibagué, Tolima",
    treatments: {
      es: "Urología · Cirugía especializada · Hospitalización",
      en: "Urology · Specialised surgery · Inpatient care",
      fr: "Urologie · Chirurgie spécialisée · Hospitalisation",
      de: "Urologie · Spezialchirurgie · Stationäre Versorgung",
    },
  },
  {
    name: "Centro Quirúrgico Ibagué",
    city: "Ibagué, Tolima",
    treatments: {
      es: "Cirugía plástica · Procedimientos ambulatorios",
      en: "Plastic surgery · Outpatient procedures",
      fr: "Chirurgie plastique · Procédures ambulatoires",
      de: "Plastische Chirurgie · Ambulante Eingriffe",
    },
  },
  {
    name: "Clínica Asotrauma",
    city: "Ibagué, Tolima",
    treatments: {
      es: "Urología · Cirugía laparoscópica · Recuperación",
      en: "Urology · Laparoscopic surgery · Recovery",
      fr: "Urologie · Chirurgie laparoscopique · Récupération",
      de: "Urologie · Laparoskopische Chirurgie · Genesung",
    },
  },
  {
    name: "IPS Imágenes Diagnósticas",
    city: "Tolima",
    treatments: {
      es: "Imágenes diagnósticas · Chequeos preventivos",
      en: "Diagnostic imaging · Preventive screening",
      fr: "Imagerie diagnostique · Bilans préventifs",
      de: "Diagnostische Bildgebung · Vorsorgeuntersuchungen",
    },
  },
];

const COPY = {
  es: {
    eyebrow: "Red médica aliada",
    title: "Tratamientos en el Tolima con clínicas verificadas",
    subtitle:
      "Trabajamos con instituciones de Ibagué ya referenciadas en nuestra red. Cada paciente se deriva al centro adecuado según su especialidad y necesidad de recuperación.",
    note: "Odontología, cirugía plástica, chequeos, cardiología y urología se coordinan con estas instituciones.",
    badge: "Aliados verificados",
  },
  en: {
    eyebrow: "Allied medical network",
    title: "Treatments in Tolima with verified clinics",
    subtitle:
      "We work with Ibagué institutions already listed in our network. Each patient is referred to the right centre for their specialty and recovery needs.",
    note: "Dentistry, plastic surgery, check-ups, cardiology and urology are coordinated with these institutions.",
    badge: "Verified partners",
  },
  fr: {
    eyebrow: "Réseau médical partenaire",
    title: "Traitements dans le Tolima avec des cliniques vérifiées",
    subtitle:
      "Nous travaillons avec des institutions d'Ibagué déjà référencées dans notre réseau. Chaque patient est orienté vers le centre adapté à sa spécialité et à sa convalescence.",
    note: "Dentisterie, chirurgie plastique, bilans, cardiologie et urologie sont coordonnés avec ces institutions.",
    badge: "Partenaires vérifiés",
  },
  de: {
    eyebrow: "Medizinisches Partnernetz",
    title: "Behandlungen in Tolima mit geprüften Kliniken",
    subtitle:
      "Wir arbeiten mit bereits in unserem Netzwerk gelisteten Einrichtungen in Ibagué. Jeder Patient wird je nach Fachgebiet und Genesungsbedarf an das passende Zentrum verwiesen.",
    note: "Zahnmedizin, plastische Chirurgie, Vorsorge, Kardiologie und Urologie werden mit diesen Einrichtungen koordiniert.",
    badge: "Geprüfte Partner",
  },
} as const;

export function WellnessAllies() {
  const locale = useLocale();
  const lang = (["es", "en", "fr", "de"].includes(locale) ? locale : "es") as
    | "es"
    | "en"
    | "fr"
    | "de";
  const c = COPY[lang] || COPY.es;

  return (
    <section className="bg-[var(--color-wellness-bg)] py-16 editorial-section md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-wellness-gold)]/40 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-wellness-primary)]">
            <ShieldCheck className="h-4 w-4 text-[var(--color-wellness-gold)]" />
            {c.eyebrow}
          </span>
          <h2 className="display-2 mb-4 text-[var(--color-wellness-primary)]">
            {c.title}
          </h2>
          <p className="text-base leading-relaxed text-stone-600 sm:text-lg">
            {c.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CLINICS.map((clinic, index) => (
            <motion.div
              key={clinic.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="rounded-2xl border border-stone-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-[var(--color-wellness-gold)]/60 hover:shadow-lg"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-wellness-primary)]/5">
                  <Building2 className="h-5 w-5 text-[var(--color-wellness-primary)]" />
                </span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  {c.badge}
                </span>
              </div>
              <h3 className="font-heading text-base font-semibold text-stone-900">
                {clinic.name}
              </h3>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-stone-500">
                <MapPin className="h-3.5 w-3.5" />
                {clinic.city}
              </p>
              <p className="mt-3 flex items-start gap-1.5 text-sm leading-relaxed text-stone-600">
                <Stethoscope className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-wellness-gold)]" />
                {clinic.treatments[lang] || clinic.treatments.es}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-stone-500 sm:text-sm">
          {c.note}
        </p>
      </div>
    </section>
  );
}
