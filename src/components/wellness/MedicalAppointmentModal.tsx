"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Loader2,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { useLocale } from "next-intl";

type Status = "idle" | "submitting" | "success" | "error";

const COPY = {
  es: {
    badge: "OnTour Health · Coordinación médica",
    title: "Agendar una cita médica",
    subtitle:
      "Espacio para médicos remitentes y profesionales de la salud. Indícanos el paciente, la especialidad y una fecha posible; nuestro equipo confirma disponibilidad con el especialista.",
    doctor: "Nombre del médico o remitente *",
    doctorPlaceholder: "Dr. / Dra. Nombre y apellido",
    specialty: "Especialidad o tratamiento",
    specialtyPlaceholder: "Ej. Cirugía plástica, odontología, chequeo preventivo",
    patient: "Paciente / referencia",
    patientPlaceholder: "Nombre del paciente o código interno (opcional)",
    date: "Fecha posible de cita *",
    phone: "Teléfono / WhatsApp *",
    phonePlaceholder: "+57 300 000 0000",
    email: "Correo electrónico *",
    emailPlaceholder: "medico@clinica.com",
    country: "País",
    countryPlaceholder: "Ej. Colombia, Estados Unidos, España",
    notes: "Notas de coordinación (sin datos médicos)",
    notesPlaceholder:
      "Estudios previos, requerimientos de traducción, acompañamiento, tiempo de estancia...",
    submit: "Solicitar cita médica",
    processing: "Enviando...",
    successTitle: "Solicitud de cita recibida",
    successBody:
      "Nuestro equipo médico confirmará disponibilidad con el especialista y te responderá en menos de 24 horas hábiles.",
    close: "Cerrar",
    retry: "Reintentar",
    errorTitle: "No pudimos enviar la solicitud",
    errorBody:
      "Revisa tu conexión e inténtalo de nuevo, o escríbenos por WhatsApp y te atendemos de inmediato.",
    privacy:
      "Use este formulario solo para coordinar un contacto. No envíe diagnósticos ni documentos médicos. La solicitud se procesa con nuestros proveedores de formularios y alojamiento.",
    required: "Este campo es obligatorio.",
    invalidEmail: "Escribe un correo válido.",
    invalidPhone: "Escribe un teléfono con al menos 6 dígitos.",
  },
  en: {
    badge: "OnTour Health · Medical coordination",
    title: "Request a medical appointment",
    subtitle:
      "For referring doctors and healthcare professionals. Tell us the patient, specialty and a possible date; our team confirms availability with the specialist.",
    doctor: "Referring doctor or contact *",
    doctorPlaceholder: "Dr. First and last name",
    specialty: "Specialty or treatment",
    specialtyPlaceholder: "e.g. Plastic surgery, dentistry, preventive check-up",
    patient: "Patient / reference",
    patientPlaceholder: "Patient name or internal code (optional)",
    date: "Preferred appointment date *",
    phone: "Phone / WhatsApp *",
    phonePlaceholder: "+1 555 000 0000",
    email: "Email *",
    emailPlaceholder: "doctor@clinic.com",
    country: "Country",
    countryPlaceholder: "e.g. Colombia, United States, Spain",
    notes: "Coordination notes (no medical information)",
    notesPlaceholder:
      "Previous studies, interpretation needs, companion, length of stay...",
    submit: "Request medical appointment",
    processing: "Sending...",
    successTitle: "Appointment request received",
    successBody:
      "Our medical team will confirm availability with the specialist and reply within 24 business hours.",
    close: "Close",
    retry: "Try again",
    errorTitle: "We could not send your request",
    errorBody:
      "Check your connection and try again, or message us on WhatsApp for immediate assistance.",
    privacy:
      "Use this form only to request contact. Do not send diagnoses or medical records. Our form and hosting providers process the request.",
    required: "This field is required.",
    invalidEmail: "Enter a valid email address.",
    invalidPhone: "Enter a phone number with at least 6 digits.",
  },
  fr: {
    badge: "OnTour Health · Coordination médicale",
    title: "Demander un rendez-vous médical",
    subtitle:
      "Espace réservé aux médecins référents et professionnels de santé. Indiquez le patient, la spécialité et une date possible ; notre équipe confirme la disponibilité auprès du spécialiste.",
    doctor: "Médecin référent ou contact *",
    doctorPlaceholder: "Dr. Prénom et nom",
    specialty: "Spécialité ou traitement",
    specialtyPlaceholder: "Ex. Chirurgie plastique, dentisterie, bilan préventif",
    patient: "Patient / référence",
    patientPlaceholder: "Nom du patient ou code interne (facultatif)",
    date: "Date de rendez-vous souhaitée *",
    phone: "Téléphone / WhatsApp *",
    phonePlaceholder: "+33 6 00 00 00 00",
    email: "E-mail *",
    emailPlaceholder: "medecin@clinique.com",
    country: "Pays",
    countryPlaceholder: "Ex. Colombie, États-Unis, France",
    notes: "Notes cliniques ou logistiques",
    notesPlaceholder:
      "Examens antérieurs, interprétation, accompagnant, durée du séjour...",
    submit: "Demander le rendez-vous",
    processing: "Envoi...",
    successTitle: "Demande de rendez-vous reçue",
    successBody:
      "Notre équipe médicale confirmera la disponibilité auprès du spécialiste et vous répondra sous 24 heures ouvrées.",
    close: "Fermer",
    retry: "Réessayer",
    errorTitle: "Nous n'avons pas pu envoyer la demande",
    errorBody:
      "Vérifiez votre connexion et réessayez, ou contactez-nous sur WhatsApp pour une réponse immédiate.",
    privacy:
      "Données traitées sous confidentialité médicale (Ley 1581). Aucune information clinique n'est partagée avec des tiers.",
    required: "Ce champ est obligatoire.",
    invalidEmail: "Saisissez une adresse e-mail valide.",
    invalidPhone: "Saisissez un téléphone d'au moins 6 chiffres.",
  },
  de: {
    badge: "OnTour Health · Medizinische Koordination",
    title: "Arzttermin anfragen",
    subtitle:
      "Für überweisende Ärzte und medizinisches Fachpersonal. Nennen Sie Patient, Fachgebiet und einen möglichen Termin; unser Team bestätigt die Verfügbarkeit mit dem Spezialisten.",
    doctor: "Überweisender Arzt oder Kontakt *",
    doctorPlaceholder: "Dr. Vor- und Nachname",
    specialty: "Fachgebiet oder Behandlung",
    specialtyPlaceholder: "z. B. Plastische Chirurgie, Zahnmedizin, Vorsorge",
    patient: "Patient / Referenz",
    patientPlaceholder: "Patientenname oder interne Nummer (optional)",
    date: "Wunschtermin *",
    phone: "Telefon / WhatsApp *",
    phonePlaceholder: "+49 170 000 0000",
    email: "E-Mail *",
    emailPlaceholder: "arzt@klinik.de",
    country: "Land",
    countryPlaceholder: "z. B. Kolumbien, USA, Deutschland",
    notes: "Klinische oder organisatorische Hinweise",
    notesPlaceholder:
      "Voruntersuchungen, Dolmetscher, Begleitung, Aufenthaltsdauer...",
    submit: "Arzttermin anfragen",
    processing: "Wird gesendet...",
    successTitle: "Terminanfrage erhalten",
    successBody:
      "Unser medizinisches Team bestätigt die Verfügbarkeit mit dem Spezialisten und antwortet innerhalb von 24 Arbeitsstunden.",
    close: "Schließen",
    retry: "Erneut versuchen",
    errorTitle: "Anfrage konnte nicht gesendet werden",
    errorBody:
      "Prüfen Sie Ihre Verbindung und versuchen Sie es erneut, oder schreiben Sie uns über WhatsApp.",
    privacy:
      "Vertrauliche medizinische Daten (Ley 1581). Klinische Informationen werden nicht an Dritte weitergegeben.",
    required: "Dieses Feld ist erforderlich.",
    invalidEmail: "Geben Sie eine gültige E-Mail-Adresse ein.",
    invalidPhone: "Geben Sie eine Telefonnummer mit mindestens 6 Ziffern ein.",
  },
} as const;

export function MedicalAppointmentModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  treatment?: string;
}) {
  const locale = useLocale();
  const lang = (["es", "en", "fr", "de"].includes(locale) ? locale : "es") as
    | "es"
    | "en"
    | "fr"
    | "de";
  const c = COPY[lang] || COPY.es;

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [status, setStatus] = useState<Status>("idle");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Reset transient state while rendering, not in an effect.
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setStatus("idle");
      setErrors([]);
    }
  }


  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const validate = () => {
    const next: string[] = [];
    if (doctor.trim().length < 2) next.push("doctor");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) next.push("email");
    if (phone.replace(/[^\d]/g, "").length < 6) next.push("phone");
    if (!date) next.push("date");
    setErrors(next);
    return next.length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    const payload = {
      name: doctor.trim(),
      email: email.trim(),
      phone: phone.trim(),
      country: country.trim(),
      agency: "",
      destination: "Solicitud de contacto",
      travelMonth: date,
      travelers: "1",
      interests: ["wellness"],
      notes: "",
      inquiryType: "medical",
    };

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as
        | { success?: boolean }
        | null;

      if (!response.ok || !result?.success) {
        throw new Error(`Medical appointment failed with ${response.status}`);
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto p-3 sm:p-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#0A1628]/80 backdrop-blur-md"
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={c.title}
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        className="relative z-10 my-auto flex max-h-[calc(100dvh-1.5rem)] w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-stone-200/90 bg-white shadow-2xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#16352D] px-6 py-4.5 text-white">
          <div className="flex items-center gap-3">
            <Stethoscope className="h-5 w-5 text-[#C9A961]" />
            <span className="text-xs font-bold uppercase tracking-wider text-white/80">
              {c.badge}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={c.close}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center px-6 py-12 text-center sm:px-10"
            >
              <CheckCircle2 className="mb-5 h-16 w-16 text-emerald-600" />
              <h2 className="mb-3 font-heading text-2xl font-medium text-stone-900">
                {c.successTitle}
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-stone-600 sm:text-base">
                {c.successBody}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-8 min-h-[48px] cursor-pointer rounded-full bg-[#16352D] px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#B49A68] hover:text-[#16352D]"
              >
                {c.close}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="overflow-y-auto px-6 py-6 sm:px-8"
            >
              <h2 className="mb-2 font-heading text-2xl font-medium text-stone-900 sm:text-3xl">
                {c.title}
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-stone-500">
                {({es:"Solicite contacto con el equipo de coordinación. No envíe información clínica.",en:"Request contact with the coordination team. Do not submit medical information.",fr:"Demandez à être contacté par notre équipe. Ne transmettez pas de données médicales.",de:"Bitten Sie unser Team um Kontaktaufnahme. Übermitteln Sie keine medizinischen Daten."})[lang]}
              </p>

              {status === "error" && (
                <div
                  role="alert"
                  className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
                >
                  <p className="font-bold">{c.errorTitle}</p>
                  <p className="mt-1 leading-relaxed">{c.errorBody}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-stone-800 sm:text-sm">
                      {c.doctor}
                    </label>
                    <input
                      type="text"
                      value={doctor}
                      onChange={(e) => setDoctor(e.target.value)}
                      placeholder={c.doctorPlaceholder}
                      required
                      className="min-h-[48px] w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#16352D] sm:text-base"
                    />
                    {errors.includes("doctor") && (
                      <p className="mt-1 text-xs text-rose-600">{c.required}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-stone-800 sm:text-sm">
                      {c.date}
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="min-h-[48px] w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#16352D] sm:text-base"
                    />
                    {errors.includes("date") && (
                      <p className="mt-1 text-xs text-rose-600">{c.required}</p>
                    )}
                  </div>
                </div>



                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-stone-800 sm:text-sm">
                      {c.phone}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={c.phonePlaceholder}
                      required
                      className="min-h-[48px] w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#16352D] sm:text-base"
                    />
                    {errors.includes("phone") && (
                      <p className="mt-1 text-xs text-rose-600">{c.invalidPhone}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-stone-800 sm:text-sm">
                      {c.email}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={c.emailPlaceholder}
                      required
                      className="min-h-[48px] w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#16352D] sm:text-base"
                    />
                    {errors.includes("email") && (
                      <p className="mt-1 text-xs text-rose-600">{c.invalidEmail}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-stone-800 sm:text-sm">
                    {c.country}
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder={c.countryPlaceholder}
                    className="min-h-[48px] w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#16352D] sm:text-base"
                  />
                </div>


                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex min-h-[50px] w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#16352D] px-8 py-4 text-sm font-bold tracking-wide text-white shadow-md transition-colors hover:bg-[#B49A68] hover:text-[#16352D] disabled:opacity-70 sm:text-base"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin text-amber-300" />
                      <span>{c.processing}</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 text-amber-300" />
                      <span>{status === "error" ? c.retry : c.submit}</span>
                    </>
                  )}
                </button>

                <p className="flex items-start justify-center gap-1.5 pt-1 text-center text-xs text-stone-400">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {({es:"Usamos sus datos de contacto para responder a su solicitud, mediante nuestros proveedores de alojamiento y formularios.",en:"Our hosting and form providers process your contact details to respond to your request.",fr:"Nos prestataires d’hébergement et de formulaires traitent vos coordonnées pour répondre à votre demande.",de:"Unsere Hosting- und Formularanbieter verarbeiten Ihre Kontaktdaten zur Beantwortung Ihrer Anfrage."})[lang]}
                  </span>
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>,
    document.body
  );
}
