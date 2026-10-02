"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Compass,
  HeartPulse,
  Briefcase,
  CheckCircle2,
  Calendar,
  Users,
  Send,
  ArrowRight,
  ShieldCheck,
  Clock,
  ChevronRight,
  Loader2,
  Mail,
  MessageCircle,
} from "lucide-react";
import { useLocale } from "next-intl";
import { trackQuoteFormSubmit, trackWhatsAppClick } from "@/lib/analytics";

interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedExperience?: string;
  preselectedItem?: string;
}

const EXPERIENCES = [
  {
    id: "circuits",
    title: {
      es: "Circuitos & Grandes Rutas",
      en: "Multi-Day Journeys & Circuits",
      fr: "Circuits & Grands Voyages",
      de: "Rundreisen & Mehrtagestouren",
    },
    desc: {
      es: "Descubre los Andes, Caribe, San Agustín y la Región Cafetera",
      en: "Explore the Andes, Caribbean coast, archaeology and coffee country",
      fr: "Découvrez les Andes, les Caraïbes, l'archéologie et le café",
      de: "Entdecken Sie die Anden, die Karibik und die Kaffeeregion",
    },
    icon: Compass,
    options: [
      { id: "epoca-precolombina-sur-colombia", name: "Época Precolombina (9D/8N)", price: "From $1,490 USD" },
      { id: "tour-colombia-corazon-andes", name: "Corazón de los Andes (13D/12N)", price: "From $1,980 USD" },
      { id: "tour-colombia-boyaca-colonial", name: "Boyacá Colonial & Termales (8D/7N)", price: "From $1,320 USD" },
      { id: "pasadias-colombia", name: "Pasadías & Day Trips Exclusivos", price: "From $85 USD" },
    ],
  },
  {
    id: "wellness",
    title: {
      es: "Turismo Médico & Bienestar",
      en: "Medical & Wellness Tourism",
      fr: "Tourisme Médical & Bien-être",
      de: "Medizin- & Wellnesstourismus",
    },
    desc: {
      es: "Atención clínica certificada con hasta 70% de ahorro vs EE.UU.",
      en: "Board-certified care with up to 70% savings vs. the US/Europe",
      fr: "Soins certifiés avec jusqu'à 70 % d'économies vs USA/Europe",
      de: "Zertifizierte Behandlungen mit bis zu 70 % Ersparnis",
    },
    icon: HeartPulse,
    options: [
      { id: "cirugia-plastica", name: "Cirugía Plástica & Rejuvenecimiento Facial", price: "Desde $1,800 USD" },
      { id: "chequeos-preventivos", name: "Chequeos Médicos Ejecutivos / Preventivos", price: "Desde $650 USD" },
      { id: "cardiologia-urologia", name: "Cardiología & Urología Avanzada", price: "Evaluación Personalizada" },
      { id: "nutricion-psicologia", name: "Bienestar Integral & Psicooncología", price: "Planes a Medida" },
    ],
  },
  {
    id: "tailor-b2b",
    title: {
      es: "A Medida / Servicios B2B",
      en: "Tailor-Made & B2B DMC",
      fr: "Sur Mesure & Services B2B",
      de: "Maßgeschneidert & B2B DMC",
    },
    desc: {
      es: "Operación receptiva para agencias internacionales, MICE y VIP",
      en: "Inbound DMC operations for tour operators, travel agents & VIPs",
      fr: "Opérations réceptives pour agences de voyages et groupes VIP",
      de: "Incoming-DMC-Service für Reisebüros und VIP-Reisende",
    },
    icon: Briefcase,
    options: [
      { id: "tailor-made", name: "Itinerario Privado 100% Personalizado", price: "Cotización a Medida" },
      { id: "b2b-agency", name: "Alianza B2B para Agencias de Viajes", price: "Tarifario Confidencial" },
      { id: "vip-transport", name: "Transporte Especial & Guías Multilingües", price: "Flota Propia" },
    ],
  },
];

export function RequestQuoteModal({
  isOpen,
  onClose,
  preselectedExperience = "circuits",
  preselectedItem,
}: RequestQuoteModalProps) {
  const locale = useLocale();
  const lang = (["es", "en", "fr", "de"].includes(locale) ? locale : "es") as "es" | "en" | "fr" | "de";

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedExp, setSelectedExp] = useState(preselectedExperience);
  const [selectedOption, setSelectedOption] = useState<string>(preselectedItem || "");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    dates: "",
    travelers: "2",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMethod, setSubmitMethod] = useState<"email" | "whatsapp">("email");

  useEffect(() => {
    if (preselectedItem) {
      setSelectedOption(preselectedItem);
      setStep(3);
    } else if (preselectedExperience) {
      setSelectedExp(preselectedExperience);
      setStep(2);
    }
  }, [preselectedExperience, preselectedItem, isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentExpObj = EXPERIENCES.find((e) => e.id === selectedExp) || EXPERIENCES[0];

  const handleSendWhatsApp = () => {
    setSubmitMethod("whatsapp");
    const isMedical = selectedExp === "wellness";
    const header = isMedical
      ? `Hola OnTour Health, deseo cotizar el procedimiento médico: ${selectedOption || "Valoración Médica"}`
      : `Hola OnTour DMC Colombia, deseo cotizar el circuito: ${selectedOption || "Colombia Grand Tour"}`;

    const text = `${header}\n\n• Experiencia: ${currentExpObj.title[lang]}\n• Nombre: ${formData.name || "Viajero"}\n• Email: ${formData.email || "No especificado"}\n• Teléfono: ${formData.phone || "No especificado"}\n• Viajeros: ${formData.travelers}\n• Fechas tentativas: ${formData.dates || "Por definir"}\n• Notas/Historial: ${formData.notes || "Ninguna"}`;

    trackWhatsAppClick("request_quote_modal", text);
    trackQuoteFormSubmit({
      experience: selectedExp,
      item: selectedOption || "General",
      method: "whatsapp",
      travelers: formData.travelers,
      dates: formData.dates,
    });

    window.open(`https://wa.me/573143415177?text=${encodeURIComponent(text)}`, "_blank");
    setSubmitted(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMethod("email");

    trackQuoteFormSubmit({
      experience: selectedExp,
      item: selectedOption || "General",
      method: "email",
      travelers: formData.travelers,
      dates: formData.dates,
    });

    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experience: currentExpObj.title[lang],
          option: selectedOption || "General",
          ...formData,
        }),
      });
    } catch (err) {
      console.error("[RequestQuoteModal] Quote dispatch error:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#0A1628]/80 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 flex flex-col my-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="relative px-6 py-5 bg-[#16352D] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#B49A68]/20 text-[#B49A68] flex items-center justify-center border border-[#B49A68]/30">
              <Compass className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-white tracking-wide">
                {lang === "es" && "Cotización Rápida en 3 Clics"}
                {lang === "en" && "Fast 3-Click Quote Request"}
                {lang === "fr" && "Demande de Devis en 3 Clics"}
                {lang === "de" && "Schnelle 3-Klick-Angebotsanfrage"}
              </h3>
              <p className="text-xs text-white/70 flex items-center gap-1.5 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#B49A68]" />
                <span className="font-medium text-[#B49A68]">SLA garantizado:</span>{" "}
                {lang === "es" && "Respuesta personalizada en menos de 24h"}
                {lang === "en" && "Guaranteed response in under 24 hours"}
                {lang === "fr" && "Réponse garantie en moins de 24h"}
                {lang === "de" && "Garantierte Antwort innerhalb von 24h"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors min-h-[44px] min-w-[44px] -mr-2"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="grid grid-cols-3 border-b border-stone-200 bg-stone-50 text-xs font-semibold text-stone-600 shrink-0">
          <button
            onClick={() => setStep(1)}
            className={`py-3 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 min-h-[44px] ${
              step === 1 ? "border-[#16352D] text-[#16352D] bg-white font-bold" : "border-transparent"
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-[#16352D] text-white text-[11px] flex items-center justify-center">1</span>
            <span className="hidden sm:inline">Experiencia</span>
          </button>
          <button
            onClick={() => setStep(2)}
            className={`py-3 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 min-h-[44px] ${
              step === 2 ? "border-[#16352D] text-[#16352D] bg-white font-bold" : "border-transparent"
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-[#16352D] text-white text-[11px] flex items-center justify-center">2</span>
            <span className="hidden sm:inline">Detalle</span>
          </button>
          <button
            onClick={() => setStep(3)}
            className={`py-3 px-2 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 min-h-[44px] ${
              step === 3 ? "border-[#16352D] text-[#16352D] bg-white font-bold" : "border-transparent"
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-[#16352D] text-white text-[11px] flex items-center justify-center">3</span>
            <span className="hidden sm:inline">Tus Datos</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl font-light text-[#16352D] mb-2">
                {lang === "es" && "¡Solicitud Recibida con Éxito!"}
                {lang === "en" && "Request Successfully Received!"}
                {lang === "fr" && "Demande Reçue avec Succès !"}
                {lang === "de" && "Anfrage Erfolgreich Erhalten!"}
              </h4>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16352D]/5 text-[#16352D] text-xs font-semibold mb-4">
                <Clock className="w-3.5 h-3.5 text-[#B49A68]" />
                <span>Tiempo de respuesta garantizado: &lt; 24h hábiles</span>
              </div>

              <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed mb-6 font-light">
                {lang === "es" &&
                  "Tu solicitud ha sido radicada directamente con nuestro equipo en Colombia (info@ontourdmc.com). Analizaremos tu itinerario y te contactaremos en menos de 24 horas."}
                {lang === "en" &&
                  "Your request has been registered with our Colombia headquarters (info@ontourdmc.com). Our concierge team will review your requirements and respond in under 24 hours."}
                {lang === "fr" &&
                  "Votre demande a été transmise à notre équipe en Colombie (info@ontourdmc.com). Nous vous répondrons avec une proposition personnalisée en moins de 24h."}
                {lang === "de" &&
                  "Ihre Anfrage wurde an unser Team in Kolumbien weitergeleitet (info@ontourdmc.com). Wir werden uns innerhalb von 24 Stunden mit einem Angebot bei Ihnen melden."}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`mailto:info@ontourdmc.com?subject=${encodeURIComponent(`Cotización: ${selectedOption || "Viaje Colombia"}`)}&body=${encodeURIComponent(`Hola OnTour DMC,\n\nReitero mi solicitud para ${selectedOption}.\nNombre: ${formData.name}\nTeléfono: ${formData.phone}`)}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-50 transition-colors min-h-[44px]"
                >
                  <Mail className="w-3.5 h-3.5 text-[#B49A68]" />
                  <span>Copia a info@ontourdmc.com</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-7 py-2.5 rounded-full bg-[#16352D] text-white font-semibold text-xs sm:text-sm hover:bg-[#16352D]/90 transition-all min-h-[44px] shadow-sm"
                >
                  Finalizar
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: Select Experience */}
              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-stone-700 mb-2">
                    {lang === "es" && "Paso 1: Selecciona el tipo de experiencia que deseas cotizar:"}
                    {lang === "en" && "Step 1: Select the type of travel experience you want to quote:"}
                    {lang === "fr" && "Étape 1 : Choisissez le type d'expérience souhaité :"}
                    {lang === "de" && "Schritt 1: Wählen Sie Ihre gewünschte Reiseart :"}
                  </p>

                  <div className="grid grid-cols-1 gap-3">
                    {EXPERIENCES.map((exp) => {
                      const Icon = exp.icon;
                      const isSel = selectedExp === exp.id;
                      return (
                        <button
                          key={exp.id}
                          type="button"
                          onClick={() => {
                            setSelectedExp(exp.id);
                            setSelectedOption(exp.options[0].name);
                            setStep(2);
                          }}
                          className={`w-full p-4 rounded-2xl border text-left flex items-start gap-4 transition-all min-h-[48px] ${
                            isSel
                              ? "border-[#16352D] bg-[#F7F5EF] ring-2 ring-[#16352D]/15"
                              : "border-stone-200 bg-white hover:border-[#B49A68] hover:bg-stone-50"
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-[#16352D]/10 text-[#16352D] flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-heading font-bold text-stone-900 text-base">
                                {exp.title[lang]}
                              </h4>
                              <ChevronRight className="w-4 h-4 text-stone-400" />
                            </div>
                            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                              {exp.desc[lang]}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: Select Option / Tour */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-stone-700">
                      {lang === "es" && "Paso 2: Elige el circuito, tratamiento o paquete preferido:"}
                      {lang === "en" && "Step 2: Choose your preferred circuit, treatment or package:"}
                      {lang === "fr" && "Étape 2 : Sélectionnez votre circuit ou forfait de soins :"}
                      {lang === "de" && "Schritt 2: Wählen Sie Ihre Tour oder Behandlung :"}
                    </p>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-[#16352D] underline font-semibold min-h-[44px] flex items-center"
                    >
                      ← Cambiar categoría
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {currentExpObj.options.map((opt) => {
                      const isSel = selectedOption === opt.name;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setSelectedOption(opt.name);
                            setStep(3);
                          }}
                          className={`w-full p-4 rounded-xl border text-left flex items-center justify-between gap-3 transition-all min-h-[48px] ${
                            isSel
                              ? "border-[#16352D] bg-[#F7F5EF] ring-2 ring-[#16352D]/20 font-semibold"
                              : "border-stone-200 bg-white hover:border-[#B49A68] hover:bg-stone-50"
                          }`}
                        >
                          <span className="text-sm text-stone-800 font-medium">{opt.name}</span>
                          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-stone-100 text-[#16352D] font-semibold shrink-0">
                            {opt.price}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: Contact Form & Instant Send */}
              {step === 3 && (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="p-3 rounded-xl bg-[#F7F5EF] border border-[#16352D]/15 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-stone-500 font-bold block">
                        Seleccionado:
                      </span>
                      <span className="text-sm font-bold text-[#16352D]">
                        {selectedOption || currentExpObj.title[lang]}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs text-[#16352D] underline font-semibold min-h-[44px] flex items-center"
                    >
                      Modificar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ej. Sofia Gómez"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#16352D] min-h-[44px]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Correo Electrónico *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nombre@ejemplo.com"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#16352D] min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">WhatsApp / Teléfono *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+57 300 000 0000"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#16352D] min-h-[44px]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Fecha Aprox. Viaje</label>
                      <input
                        type="text"
                        value={formData.dates}
                        onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                        placeholder="Ej. Octubre 2026"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#16352D] min-h-[44px]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Viajeros / Pacientes</label>
                      <select
                        value={formData.travelers}
                        onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#16352D] min-h-[44px] bg-white"
                      >
                        <option value="1">1 Persona</option>
                        <option value="2">2 Personas (Pareja)</option>
                        <option value="3-5">3 - 5 Personas (Familia)</option>
                        <option value="6+">6+ Personas (Grupo)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Detalles especiales, historial o solicitudes:
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Indica preferencias de hoteles, historial previo o preguntas puntuales..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#16352D]"
                    />
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3.5 px-6 rounded-full bg-[#16352D] text-white font-bold text-sm hover:bg-[#16352D]/90 shadow-md flex items-center justify-center gap-2 transition-all min-h-[44px] disabled:opacity-70 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#B49A68]" />
                          <span>Procesando...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#B49A68]" />
                          <span>Enviar Solicitud (SLA &lt;24h)</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleSendWhatsApp}
                      className="py-3.5 px-6 rounded-full bg-[#25D366] text-white font-bold text-sm hover:brightness-105 shadow-md flex items-center justify-center gap-2 transition-all min-h-[44px]"
                    >
                      <span>Cotizar por WhatsApp</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1 mt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Tus datos están protegidos bajo estricto secreto médico y Ley 1581 Habeas Data.</span>
                  </p>
                </form>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
