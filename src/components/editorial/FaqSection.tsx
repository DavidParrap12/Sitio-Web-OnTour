"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle, ArrowRight } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

interface FaqSectionProps {
  locale: string;
}

const FAQS_CONTENT = {
  es: {
    badge: "PREGUNTAS FRECUENTES",
    title: "Preguntas Frecuentes",
    subtitle: "Todo lo que necesitas saber antes de comenzar a diseñar tu experiencia privada en Colombia.",
    items: [
      {
        q: "¿Cómo comienza mi viaje con OnTour?",
        a: "Todo inicia compartiéndonos tus fechas tentativas, número de viajeros y preferencias. En menos de 24 horas recibirás respuesta de nuestro equipo local para afinar detalles, y en 3 a 5 días hábiles tu propuesta completa personalizada con itinerario diario, traslados privados, hoteles sugeridos y presupuesto transparente.",
      },
      {
        q: "¿Qué incluye un viaje privado?",
        a: "Nuestros itinerarios incluyen vehículos privados con chofer profesional, guías bilingües certificados, entradas a parques y monumentos, hospedaje de categoría y póliza médica Assist Card. Las comidas y actividades especiales se ajustan a tu estilo.",
      },
      {
        q: "¿Es seguro viajar por Colombia?",
        a: "Totalmente seguro. Como operador DMC con Registro Nacional de Turismo (RNT 62212), operamos exclusivamente en corredores turísticos consolidados y verificados, con monitoreo en tiempo real de cada traslado y concierge local 24/7.",
      },
      {
        q: "¿Cómo se personalizan los itinerarios?",
        a: "Cada viaje es 100% a medida. Adaptamos los ritmos, tiempos de estancia, categorías de hotel (haciendas boutique, hoteles históricos o resorts de bienestar) y experiencias culinarias o culturales según tus intereses.",
      },
      {
        q: "¿Cuáles son las opciones de pago y reserva?",
        a: "Aceptamos transferencias bancarias internacionales (USD / EUR), tarjetas de crédito y plataformas seguras de pago en línea. Un depósito inicial confirma tus servicios y el saldo se abona con anterioridad a tu llegada.",
      },
    ],
    ctaFullFaq: "Ver todas las preguntas frecuentes en el Centro de Ayuda",
  },
  en: {
    badge: "FREQUENTLY ASKED QUESTIONS",
    title: "Frequently Asked Questions",
    subtitle: "Clear answers on planning, safety, and private travel before designing your journey in Colombia.",
    items: [
      {
        q: "How does my journey begin?",
        a: "Your journey starts with a conversation. Share your travel dates, party size, and personal preferences. You'll receive an initial response within 24 hours to fine-tune your vision, followed by a comprehensive tailor-made proposal within 3 to 5 business days — complete with day-by-day pacing, private logistics, boutique stays, and transparent pricing.",
      },
      {
        q: "What's included in a journey?",
        a: "All private itineraries include dedicated air-conditioned vehicles with professional drivers, certified bilingual guides, scheduled park and site entries, handpicked accommodations, and comprehensive Assist Card medical insurance coverage.",
      },
      {
        q: "Is Colombia safe for travelers?",
        a: "Exceptionally safe when planned with an experienced local operator. As a licensed DMC (RNT 62212), we operate exclusively in proven, secure travel corridors with real-time operational monitoring and a 24/7 on-the-ground concierge team.",
      },
      {
        q: "How are private itineraries customized?",
        a: "Every itinerary is uniquely designed around you. We customize daily pacing, hotel styles (from colonial boutique mansions to mountain wellness retreats), and private culinary or historical encounters to match your travel rhythm.",
      },
      {
        q: "What payment and booking terms apply?",
        a: "We accept international bank wire transfers (USD / EUR), major credit cards, and secure online payment gateways. A standard deposit confirms your reservations, with the balance settled prior to departure.",
      },
    ],
    ctaFullFaq: "View all frequently asked questions in our Help Center",
  },
  de: {
    badge: "HÄUFIG GESTELLTE FRAGEN",
    title: "Häufig Gestellte Fragen",
    subtitle: "Wichtiges zu Ablauf, Sicherheit und Reiseplanung in Kolumbien.",
    items: [
      {
        q: "Wie beginnt meine Reise mit OnTour?",
        a: "Sie teilen uns Ihre Reisetermine, Wünsche und Gruppengröße mit. Innerhalb von 24 Stunden erhalten Sie eine erste Rückmeldung zur Abstimmung, und innerhalb von 3 bis 5 Werktagen Ihren maßgeschneiderten Reisevorschlag mit privaten Transfers, handverlesenen Unterkünften und transparenter Kostenaufstellung.",
      },
      {
        q: "Was ist in einer Rundreise enthalten?",
        a: "Unsere Reisen beinhalten private klimatisierte Fahrzeuge mit Chauffeur, zertifizierte mehrsprachige Guides, Eintrittsgelder, ausgewählte Boutique-Hotels und eine Assist Card Reisekrankenversicherung.",
      },
      {
        q: "Ist das Reisen in Kolumbien sicher?",
        a: "Sehr sicher. Als lizensierter DMC-Veranstalter (RNT 62212) bereisen wir ausschließlich sichere, bewährte Routen mit ständiger Erreichbarkeit und 24/7 Notfallbetreuung vor Ort.",
      },
      {
        q: "Wie werden individuelle Reiserouten angepasst?",
        a: "Jede Reise wird ganz nach Ihren Vorlieben gestaltet. Wir passen Tagesrhythmus, Hotelkategorien und spezielle Aktivitäten exakt an Ihre Wünsche an.",
      },
      {
        q: "Welche Zahlungs- und Buchungskonditionen gelten?",
        a: "Wir akzeptieren internationale Banküberweisungen in USD oder EUR sowie gängige Kreditkarten. Eine Anzahlung sichert Ihre Reservierung, der Restbetrag wird vor Reisebeginn fällig.",
      },
    ],
    ctaFullFaq: "Alle Fragen und Antworten im Hilfe-Center ansehen",
  },
  fr: {
    badge: "FOIRE AUX QUESTIONS",
    title: "Foire Aux Questions",
    subtitle: "Toutes les réponses pour préparer votre voyage sur mesure en Colombie en toute sérénité.",
    items: [
      {
        q: "Comment commence mon voyage avec OnTour ?",
        a: "Partagez avec nous vos dates souhaitées, le nombre de voyageurs et vos envies. Notre équipe locale vous répond sous 24 heures pour échanger sur vos attentes, puis vous remet sous 3 à 5 jours ouvrés une proposition complète sur mesure avec itinéraire jour par jour, transports privés, hébergements de charme et tarification transparente.",
      },
      {
        q: "Que comprend un voyage avec OnTour DMC ?",
        a: "Nos itinéraires incluent un véhicule privé avec chauffeur professionnel, des guides bilingues certifiés, les entrées aux parcs et musées, les hébergements sélectionnés et une assurance médicale Assist Card.",
      },
      {
        q: "Voyager en Colombie est-il sûr ?",
        a: "Absolument sûr. En tant qu'opérateur agréé détenteur du RNT 62212, nous opérons exclusivement dans des corridors touristiques sécurisés, avec suivi opérationnel permanent et assistance conciergerie 24h/24.",
      },
      {
        q: "Comment les itinéraires sont-ils personnalisés ?",
        a: "Chaque voyage est 100% sur mesure. Nous adaptons le rythme des étapes, les catégories d'hôtels et les expériences culinaires ou culturelles selon vos préférences personnelles.",
      },
      {
        q: "Quelles sont les modalités de paiement et de réservation ?",
        a: "Nous acceptons les virements bancaires internationaux (USD / EUR), les cartes bancaires et les plateformes de paiement sécurisées. Un acompte confirme vos réservations, le solde étant réglé avant le départ.",
      },
    ],
    ctaFullFaq: "Consulter toutes les questions fréquentes dans le Centre d'Aide",
  },
};

export function FaqSection({ locale }: FaqSectionProps) {
  const content = FAQS_CONTENT[(locale as keyof typeof FAQS_CONTENT)] || FAQS_CONTENT.es;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 md:py-28 bg-[#faf8f4] border-t border-stone-200/80 relative">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <SectionReveal>
          {/* Header — clean editorial presentation */}
          <div className="mb-14">
            <span className="label text-editorial-accent mb-3 block tracking-widest font-bold">
              {content.badge}
            </span>
            <h2 className="display-2 font-heading font-medium text-editorial-dark tracking-tight mb-4">
              {content.title}
            </h2>
            <p className="body-lg text-editorial-muted leading-relaxed">
              {content.subtitle}
            </p>
          </div>

          {/* Editorial Accordion with Hairline Dividers */}
          <div className="border-t border-stone-300/80 divide-y divide-stone-300/80 mb-12">
            {content.items.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="transition-colors">
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left group min-h-[44px] cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading font-medium text-lg sm:text-xl md:text-2xl text-stone-900 group-hover:text-editorial-accent transition-colors leading-snug">
                      {item.q}
                    </span>
                    <span
                      className="shrink-0 text-stone-400 group-hover:text-editorial-accent transition-transform duration-300 text-xl font-light pl-2"
                      style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pt-1 pr-8 sm:pr-12 text-sm sm:text-base text-stone-600 leading-relaxed font-sans max-w-2xl">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Link to full FAQ */}
          <div className="pt-2">
            <Link
              href={"/legal/faq" as any}
              className="inline-flex items-center gap-2 text-sm font-semibold text-editorial-accent hover:underline underline-offset-4 group"
            >
              <span>{content.ctaFullFaq}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
