"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Send,
  MessageCircle,
  Sparkles,
  Users,
  Calendar,
  MapPin,
  Check,
  Compass,
  Mountain,
  Waves,
  Landmark,
  Building2,
  Trees,
  Map,
  UtensilsCrossed,
  Footprints,
  HeartPulse,
  Crown,
  Loader2,
} from "lucide-react";
import { useLocale } from "next-intl";
import { trackQuoteFormSubmit, trackWhatsAppClick } from "@/lib/analytics";

interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedExperience?: string;
  preselectedItem?: string;
}

const MODAL_CONTENT = {
  es: {
    headerBadge: "OnTour DMC · Concierge Local",
    stepOf: "Paso {step} de 6",
    back: "Atrás",
    continue: "Continuar",
    step1: {
      title: "¿A dónde te gustaría viajar?",
      subtitle: "Selecciona una o más regiones en Colombia, o déjate guiar por nuestro equipo local.",
      destinations: [
        { id: "andes-coffee", name: "Corazón Andino & Eje Cafetero", desc: "Bogotá, Tolima, Quindío, Salento y cafetales tradicionales" },
        { id: "caribbean", name: "Costa Caribe & Cartagena", desc: "Cartagena amurallada, Santa Marta y Parque Nacional Tayrona" },
        { id: "archaeological-south", name: "Sur Precolombino & Tatacoa", desc: "Desierto de la Tatacoa, San Agustín y valles del Huila" },
        { id: "medellin-antioquia", name: "Medellín, Guatapé & Antioquia", desc: "Innovación urbana, peñol de Guatapé y pueblos coloniales" },
        { id: "pacific", name: "Pacífico & Selva Virgen", desc: "Nuquí, migración de ballenas y playas vírgenes en Chocó" },
        { id: "grand-tour", name: "Gran Circuito de Colombia", desc: "Lo más emblemático del país en una sola gran travesía" },
        { id: "open", name: "Aún decidiendo / Asesoría experta", desc: "Diseñemos juntos la ruta óptima según tus gustos personales" },
      ],
    },
    step2: {
      title: "¿Cuándo planeas viajar?",
      subtitle: "Conocer tus fechas nos ayuda a garantizar los mejores guías y hoteles boutique.",
      timeframes: [
        { id: "next-3m", label: "Próximos 1 a 3 meses", sub: "Planificación inmediata" },
        { id: "in-3-6m", label: "En 3 a 6 meses", sub: "Ventana ideal de diseño" },
        { id: "in-6-12m", label: "En 6 a 12 meses", sub: "Reserva anticipada" },
        { id: "next-year", label: "Siguiente año / Fechas flexibles", sub: "Sin prisa de calendario" },
      ],
      monthsTitle: "O selecciona el mes estimado de salida:",
      months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    },
    step3: {
      title: "¿Cuántas personas viajan?",
      subtitle: "Todos los viajes de OnTour son 100% privados y a la medida de tu grupo.",
      partyTypes: [
        { id: "solo", count: 1, label: "Viajero Solo (1)", sub: "Aventura personal" },
        { id: "couple", count: 2, label: "En Pareja (2)", sub: "Escapada o aniversario" },
        { id: "family", count: 4, label: "Familia / Amigos (3 a 5)", sub: "Grupo pequeño privado" },
        { id: "group", count: 8, label: "Grupo Privado (6+)", sub: "Logística exclusiva" },
        { id: "b2b", count: 12, label: "Agencia de Viajes / B2B", sub: "Tarifario y white-label" },
      ],
      exactCount: "Ajustar número exacto de viajeros:",
    },
    step4: {
      title: "¿Qué tipo de experiencia buscas?",
      subtitle: "Selecciona todas las que te inspiren (selección múltiple).",
      interests: [
        { id: "culture", label: "Cultura & Historia", desc: "Pueblos coloniales, arqueología y tradiciones vivas" },
        { id: "nature", label: "Naturaleza & Biodiversidad", desc: "Páramos andinos, aviturismo y reservas naturales" },
        { id: "gastronomy", label: "Gastronomía & Café", desc: "Catas de café especial y alta cocina de autor" },
        { id: "adventure", label: "Aventura Suave & Senderismo", desc: "Caminatas en volcanes, desierto y cañones" },
        { id: "wellness", label: "Salud, Termales & Bienestar", desc: "Aguas termales andinas o turismo médico certificado" },
        { id: "luxury", label: "Lujo & Hoteles de Autor", desc: "Haciendas históricas, concierge privado y relax VIP" },
      ],
    },
    step5: {
      title: "Cuéntanos un poco sobre tu viaje",
      subtitle: "¿Hay alguna ocasión especial, ritmo preferido o detalle importante?",
      placeholder: "Ej. Celebramos nuestro aniversario de bodas; preferimos mañanas tranquilas, excelente café y hoteles boutique con historia...",
      quickTagsTitle: "Inspiración rápida (haz clic para agregar):",
      quickTags: [
        "Celebración especial (aniversario o luna de miel)",
        "Ritmo relajado y sin prisas",
        "Hoteles boutique y haciendas con encanto",
        "Enfoque en alta gastronomía y café",
        "Avistamiento de aves y naturaleza",
        "Guía privado bilingüe en todo momento",
      ],
    },
    step6: {
      title: "¿Dónde te enviamos tu propuesta?",
      subtitle: "Nuestros diseñadores locales prepararán tu itinerario personalizado en menos de 24 horas.",
      nameLabel: "Nombre completo *",
      namePlaceholder: "Ej. Sofia Gómez",
      emailLabel: "Correo electrónico *",
      emailPlaceholder: "nombre@ejemplo.com",
      phoneLabel: "WhatsApp / Teléfono *",
      phonePlaceholder: "+57 300 000 0000",
      countryLabel: "País de residencia",
      countryPlaceholder: "Ej. España, México, Estados Unidos...",
      submitBtn: "PLANEAR MI VIAJE (SLA < 24H)",
      whatsappBtn: "Enviar y Chatear por WhatsApp",
      slaNote: "RNT 62212 · Operador DMC Oficial · Cotización 100% confidencial y gratuita",
    },
    success: {
      headline: "Thank you. Your journey is now in the hands of our local team.",
      subheadline: "Gracias. Tu viaje ya está en manos de nuestro equipo local.",
      body: "Un diseñador de viajes de OnTour DMC Colombia está revisando tus preferencias. Te contactaremos en menos de 24 horas hábiles con una propuesta detallada y transparente.",
      recapTitle: "Resumen de tu viaje:",
      whatsappCta: "Chatear con un asesor en WhatsApp ahora",
      closeBtn: "Volver al sitio",
    },
  },
  en: {
    headerBadge: "OnTour DMC · Local Concierge",
    stepOf: "Step {step} of 6",
    back: "Back",
    continue: "Continue",
    step1: {
      title: "Where would you like to go?",
      subtitle: "Select your preferred regions in Colombia, or let our local team recommend the ideal route.",
      destinations: [
        { id: "andes-coffee", name: "Andean Heartland & Coffee Region", desc: "Bogotá, Tolima, Quindío, Salento and traditional coffee estates" },
        { id: "caribbean", name: "Caribbean Coast & Cartagena", desc: "Walled Cartagena, Santa Marta and Tayrona National Park" },
        { id: "archaeological-south", name: "Archaeological South & Tatacoa", desc: "Tatacoa Desert, San Agustín and Huila valley heritage" },
        { id: "medellin-antioquia", name: "Medellín, Guatapé & Antioquia", desc: "Urban renaissance, giant rock and heritage pueblos" },
        { id: "pacific", name: "Wild Pacific & Chocó Rainforest", desc: "Nuquí, humpback whale migration and pristine jungle" },
        { id: "grand-tour", name: "Grand Colombia Highlights", desc: "The country's most iconic wonders in one grand journey" },
        { id: "open", name: "Help Me Decide / Open Advice", desc: "Let's co-create the ideal route matched to your personal style" },
      ],
    },
    step2: {
      title: "When are you traveling?",
      subtitle: "Timing helps us secure the finest boutique accommodations and private guides.",
      timeframes: [
        { id: "next-3m", label: "Within the next 3 months", sub: "Immediate planning" },
        { id: "in-3-6m", label: "In 3 to 6 months", sub: "Ideal preparation window" },
        { id: "in-6-12m", label: "In 6 to 12 months", sub: "Advance booking" },
        { id: "next-year", label: "Flexible / Sometime next year", sub: "Open dates" },
      ],
      monthsTitle: "Or select your target month:",
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    },
    step3: {
      title: "How many travelers?",
      subtitle: "All OnTour journeys are 100% private and curated for your party size.",
      partyTypes: [
        { id: "solo", count: 1, label: "Solo Traveler (1)", sub: "Personal exploration" },
        { id: "couple", count: 2, label: "Couple / Duo (2)", sub: "Romantic or getaway" },
        { id: "family", count: 4, label: "Family / Friends (3 to 5)", sub: "Private small group" },
        { id: "group", count: 8, label: "Private Group (6+)", sub: "Dedicated logistics" },
        { id: "b2b", count: 12, label: "Travel Trade / Agency Partner", sub: "Net rates & white-label" },
      ],
      exactCount: "Fine-tune exact traveler count:",
    },
    step4: {
      title: "What kind of experience are you looking for?",
      subtitle: "Select all that appeal to you (multi-select).",
      interests: [
        { id: "culture", label: "Culture & History", desc: "Colonial towns, archaeology and living traditions" },
        { id: "nature", label: "Nature & Biodiversity", desc: "Andean páramos, birding and private reserves" },
        { id: "gastronomy", label: "Gastronomy & Coffee", desc: "Specialty coffee cupping and signature chef dining" },
        { id: "adventure", label: "Soft Adventure & Hiking", desc: "Volcano trails, desert trekking and canyon vistas" },
        { id: "wellness", label: "Wellness, Hot Springs & Health", desc: "Mountain thermal waters or accredited medical concierge" },
        { id: "luxury", label: "Luxury & Heritage Boutique", desc: "Historic haciendas, private air transfers and VIP care" },
      ],
    },
    step5: {
      title: "Tell us a little about your trip",
      subtitle: "What matters most to you? Any special celebration, pacing preferences, or must-haves?",
      placeholder: "e.g., Celebrating our 10th anniversary; we prefer unhurried mornings, specialty coffee tasting, and charming heritage hotels...",
      quickTagsTitle: "Quick inspiration (click to add):",
      quickTags: [
        "Special celebration (anniversary or honeymoon)",
        "Relaxed, unhurried pace",
        "Historic boutique haciendas & stays",
        "Signature culinary & coffee focus",
        "Birdwatching & pristine nature",
        "Bilingual private guide throughout",
      ],
    },
    step6: {
      title: "Where can we send your proposal?",
      subtitle: "Our local travel designers will craft your bespoke itinerary proposal within 24 hours.",
      nameLabel: "Full Name *",
      namePlaceholder: "e.g. Eleanor Vance",
      emailLabel: "Email Address *",
      emailPlaceholder: "name@example.com",
      phoneLabel: "WhatsApp / Phone *",
      phonePlaceholder: "+1 (555) 000-0000",
      countryLabel: "Country of Residence",
      countryPlaceholder: "e.g. United States, United Kingdom, Canada...",
      submitBtn: "PLAN MY JOURNEY (SLA < 24H)",
      whatsappBtn: "Send & Chat on WhatsApp",
      slaNote: "RNT 62212 · Licensed Local DMC · 100% Free & Confidential Consultation",
    },
    success: {
      headline: "Thank you. Your journey is now in the hands of our local team.",
      subheadline: "Your Colombian travel designers are on it.",
      body: "We have received your trip details. A dedicated travel designer based in Colombia is reviewing your preferences and will craft a comprehensive, transparent proposal in under 24 hours.",
      recapTitle: "Your Journey Blueprint:",
      whatsappCta: "Chat with a travel designer on WhatsApp now",
      closeBtn: "Return to Site",
    },
  },
  de: {
    headerBadge: "OnTour DMC · Lokaler Concierge",
    stepOf: "Schritt {step} von 6",
    back: "Zurück",
    continue: "Weiter",
    step1: {
      title: "Wohin möchten Sie reisen?",
      subtitle: "Wählen Sie Ihre Wunschregionen in Kolumbien oder lassen Sie sich von uns beraten.",
      destinations: [
        { id: "andes-coffee", name: "Andenherzland & Kaffeeregion", desc: "Bogotá, Tolima, Quindío, Salento und Kaffeefarmen" },
        { id: "caribbean", name: "Karibikküste & Cartagena", desc: "Koloniales Cartagena, Santa Marta und Tayrona-Nationalpark" },
        { id: "archaeological-south", name: "Archäologischer Süden & Tatacoa", desc: "Tatacoa-Wüste, San Agustín und Huila" },
        { id: "medellin-antioquia", name: "Medellín, Guatapé & Antioquia", desc: "Urbane Kultur, Fels von Guatapé und Dörfer" },
        { id: "pacific", name: "Wilder Pazifik & Chocó", desc: "Nuquí, Buckelwale und unberührter Regenwald" },
        { id: "grand-tour", name: "Große Kolumbien-Rundreise", desc: "Alle Höhepunkte des Landes in einer Reise" },
        { id: "open", name: "Noch offen / Expertenberatung", desc: "Gemeinsam die perfekte Route abstimmen" },
      ],
    },
    step2: {
      title: "Wann möchten Sie reisen?",
      subtitle: "Der Reisezeitraum hilft uns bei der Reservierung erstklassiger Boutique-Hotels.",
      timeframes: [
        { id: "next-3m", label: "In den nächsten 1 bis 3 Monaten", sub: "Kurzfristige Planung" },
        { id: "in-3-6m", label: "In 3 bis 6 Monaten", sub: "Optimaler Vorlauf" },
        { id: "in-6-12m", label: "In 6 bis 12 Monaten", sub: "Frühzeitige Buchung" },
        { id: "next-year", label: "Nächstes Jahr / Flexibel", sub: "Ohne festes Datum" },
      ],
      monthsTitle: "Oder Reisemonat wählen:",
      months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    },
    step3: {
      title: "Wie viele Personen reisen?",
      subtitle: "Alle OnTour-Reisen sind 100% privat und individuell auf Ihre Gruppe abgestimmt.",
      partyTypes: [
        { id: "solo", count: 1, label: "Alleinreisende(r) (1)", sub: "Individuelle Entdeckung" },
        { id: "couple", count: 2, label: "Zu zweit (2)", sub: "Paare & Jubiläen" },
        { id: "family", count: 4, label: "Familie / Freunde (3–5)", sub: "Kleine private Gruppe" },
        { id: "group", count: 8, label: "Private Gruppe (6+)", sub: "Exklusive Logistik" },
        { id: "b2b", count: 12, label: "Reisebüro / B2B-Partner", sub: "Nettotarife & White-Label" },
      ],
      exactCount: "Genaue Personenanzahl anpassen:",
    },
    step4: {
      title: "Welche Reiseerlebnisse suchen Sie?",
      subtitle: "Wählen Sie alle gewünschten Schwerpunkte (Mehrfachauswahl).",
      interests: [
        { id: "culture", label: "Kultur & Geschichte", desc: "Kolonialstädte, Archäologie und Traditionen" },
        { id: "nature", label: "Natur & Biodiversität", desc: "Anden-Páramos, Vogelbeobachtung und Reservate" },
        { id: "gastronomy", label: "Kulinarik & Kaffee", desc: "Spezialitätenkaffee und Gourmetküche" },
        { id: "adventure", label: "Sanftes Abenteuer & Wandern", desc: "Vulkanrouten, Wüstentrails und Canyons" },
        { id: "wellness", label: "Wellness, Thermalbäder & Gesundheit", desc: "Thermalquellen oder medizinischer Concierge" },
        { id: "luxury", label: "Luxus & Boutique-Haciendas", desc: "Historische Anwesen und persönlicher VIP-Service" },
      ],
    },
    step5: {
      title: "Erzählen Sie uns von Ihrer Wunschreise",
      subtitle: "Besondere Anlässe, bevorzugtes Tempo oder Must-Haves?",
      placeholder: "z.B. Wir feiern unser Jubiläum; wir schätzen entspannte Vormittage, exzellenten Kaffee und historische Boutique-Hotels...",
      quickTagsTitle: "Inspirationen zum Anklicken:",
      quickTags: [
        "Besonderer Anlass (Jubiläum oder Flitterwochen)",
        "Entspanntes, ruhiges Reisetempo",
        "Boutique-Hotels & historische Haciendas",
        "Fokus auf Gastronomie & Kaffee",
        "Vogelbeobachtung & Naturerlebnisse",
        "Durchgehend privater Guide",
      ],
    },
    step6: {
      title: "Wohin dürfen wir Ihr Angebot senden?",
      subtitle: "Unsere Reiseexperten vor Ort erstellen Ihr individuelles Angebot innerhalb von 24 Stunden.",
      nameLabel: "Vollständiger Name *",
      namePlaceholder: "z.B. Max Mustermann",
      emailLabel: "E-Mail-Adresse *",
      emailPlaceholder: "name@beispiel.de",
      phoneLabel: "WhatsApp / Telefon *",
      phonePlaceholder: "+49 170 0000000",
      countryLabel: "Wohnsitzland",
      countryPlaceholder: "z.B. Deutschland, Schweiz, Österreich...",
      submitBtn: "MEINE REISE PLANEN (SLA < 24H)",
      whatsappBtn: "Über WhatsApp Senden & Chatten",
      slaNote: "RNT 62212 · Lizensierter Incoming-DMC · 100% unverbindlich & vertraulich",
    },
    success: {
      headline: "Thank you. Your journey is now in the hands of our local team.",
      subheadline: "Vielen Dank. Ihre Reise ist in besten Händen.",
      body: "Unser Team in Kolumbien prüft Ihre Wünsche und meldet sich innerhalb von 24 Stunden mit einem detaillierten Reisevorschlag.",
      recapTitle: "Ihre Reiseübersicht:",
      whatsappCta: "Jetzt direkt auf WhatsApp chatten",
      closeBtn: "Zurück zur Website",
    },
  },
  fr: {
    headerBadge: "OnTour DMC · Concierge Local",
    stepOf: "Étape {step} sur 6",
    back: "Retour",
    continue: "Continuer",
    step1: {
      title: "Où aimeriez-vous voyager ?",
      subtitle: "Sélectionnez vos régions préférées en Colombie ou laissez notre équipe locale vous guider.",
      destinations: [
        { id: "andes-coffee", name: "Cœur des Andes & Région du Café", desc: "Bogotá, Tolima, Quindío, Salento et haciendas traditionnelles" },
        { id: "caribbean", name: "Côte Caraïbe & Carthagène", desc: "Carthagène fortifiée, Santa Marta et parc Tayrona" },
        { id: "archaeological-south", name: "Sud Précolombien & Tatacoa", desc: "Désert de la Tatacoa, San Agustín et Huila" },
        { id: "medellin-antioquia", name: "Medellín, Guatapé & Antioquia", desc: "Créativité urbaine, rocher géant et villages coloniaux" },
        { id: "pacific", name: "Pacifique Sauvage & Chocó", desc: "Nuquí, baleines à bosse et forêt tropicale vierge" },
        { id: "grand-tour", name: "Grand Tour de Colombie", desc: "Les plus beaux trésors du pays réunis en un voyage" },
        { id: "open", name: "En cours de réflexion / Conseils", desc: "Co-créons votre itinéraire sur mesure selon vos envies" },
      ],
    },
    step2: {
      title: "Quand prévoyez-vous de partir ?",
      subtitle: "Vos dates nous permettent de réserver les meilleurs guides et hôtels de charme.",
      timeframes: [
        { id: "next-3m", label: "Dans les 1 à 3 mois", sub: "Planification immédiate" },
        { id: "in-3-6m", label: "D'ici 3 à 6 mois", sub: "Fenêtre de création idéale" },
        { id: "in-6-12m", label: "D'ici 6 à 12 mois", sub: "Réservation anticipée" },
        { id: "next-year", label: "L'année prochaine / Flexible", sub: "Dates ouvertes" },
      ],
      monthsTitle: "Ou sélectionnez le mois envisagé :",
      months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    },
    step3: {
      title: "Combien de voyageurs ?",
      subtitle: "Tous les voyages OnTour sont 100% privés et adaptés à votre groupe.",
      partyTypes: [
        { id: "solo", count: 1, label: "Voyageur Solo (1)", sub: "Aventure personnelle" },
        { id: "couple", count: 2, label: "En Couple (2)", sub: "Échappée à deux ou anniversaire" },
        { id: "family", count: 4, label: "Famille / Amis (3 à 5)", sub: "Petit groupe privé" },
        { id: "group", count: 8, label: "Groupe Privé (6+)", sub: "Logistique dédiée" },
        { id: "b2b", count: 12, label: "Professionnel / Agence B2B", sub: "Tarifs nets & marque blanche" },
      ],
      exactCount: "Ajuster le nombre exact de participants :",
    },
    step4: {
      title: "Quel style d'expérience recherchez-vous ?",
      subtitle: "Sélectionnez toutes les thématiques souhaitées (choix multiple).",
      interests: [
        { id: "culture", label: "Culture & Histoire", desc: "Cités coloniales, archéologie et traditions" },
        { id: "nature", label: "Nature & Biodiversité", desc: "Páramos andins, observation d'oiseaux et parcs" },
        { id: "gastronomy", label: "Gastronomie & Terroir", desc: "Dégustation de café d'exception et tables de chefs" },
        { id: "adventure", label: "Aventure Douce & Randonnée", desc: "Sentiers de volcans, désert et canyons" },
        { id: "wellness", label: "Bien-être & Eaux Thermales", desc: "Sources chaudes des Andes ou conciergerie médicale" },
        { id: "luxury", label: "Luxe & Hôtels d'Auteur", desc: "Haciendas historiques, transferts privés et service VIP" },
      ],
    },
    step5: {
      title: "Parlez-nous un peu de votre voyage",
      subtitle: "Une célébration particulière, un rythme de voyage ou des envies précises ?",
      placeholder: "Ex. Nous fêtons notre anniversaire de mariage ; nous aimons les matinées tranquilles, le bon café et les hôtels historiques...",
      quickTagsTitle: "Suggestions rapides (cliquez pour ajouter) :",
      quickTags: [
        "Occasion spéciale (anniversaire ou lune de miel)",
        "Rythme détendu sans précipitation",
        "Hôtels de charme & haciendas historiques",
        "Accent sur la gastronomie & le café",
        "Observation de la faune & nature",
        "Guide privé bilingue permanent",
      ],
    },
    step6: {
      title: "Où pouvons-nous vous envoyer votre proposition ?",
      subtitle: "Nos concepteurs de voyage locaux prépareront votre itinéraire sur mesure sous 24h.",
      nameLabel: "Nom complet *",
      namePlaceholder: "Ex. Marie Dupont",
      emailLabel: "Adresse e-mail *",
      emailPlaceholder: "nom@exemple.fr",
      phoneLabel: "WhatsApp / Téléphone *",
      phonePlaceholder: "+33 6 00 00 00 00",
      countryLabel: "Pays de résidence",
      countryPlaceholder: "Ex. France, Belgique, Canada...",
      submitBtn: "PLANIFIER MON VOYAGE (SLA < 24H)",
      whatsappBtn: "Envoyer & Échanger sur WhatsApp",
      slaNote: "RNT 62212 · Réceptif DMC Agréé · Devis 100% gratuit et sans engagement",
    },
    success: {
      headline: "Thank you. Your journey is now in the hands of our local team.",
      subheadline: "Merci. Votre voyage est entre de bonnes mains.",
      body: "Un concepteur de voyages OnTour DMC Colombie examine vos préférences. Nous vous contacterons sous 24 heures ouvrées avec une proposition détaillée et transparente.",
      recapTitle: "Récapitulatif de votre voyage :",
      whatsappCta: "Discuter avec un conseiller sur WhatsApp dès maintenant",
      closeBtn: "Fermer et retourner au site",
    },
  },
};

function getDestinationIcon(id: string) {
  switch (id) {
    case "andes-coffee":
      return <Mountain className="w-5 h-5 text-[#B49A68]" />;
    case "caribbean":
      return <Waves className="w-5 h-5 text-[#B49A68]" />;
    case "archaeological-south":
      return <Landmark className="w-5 h-5 text-[#B49A68]" />;
    case "medellin-antioquia":
      return <Building2 className="w-5 h-5 text-[#B49A68]" />;
    case "pacific":
      return <Trees className="w-5 h-5 text-[#B49A68]" />;
    case "grand-tour":
      return <Map className="w-5 h-5 text-[#B49A68]" />;
    default:
      return <Compass className="w-5 h-5 text-[#B49A68]" />;
  }
}

function getInterestIcon(id: string) {
  switch (id) {
    case "culture":
      return <Landmark className="w-5 h-5 text-[#B49A68]" />;
    case "nature":
      return <Trees className="w-5 h-5 text-[#B49A68]" />;
    case "gastronomy":
      return <UtensilsCrossed className="w-5 h-5 text-[#B49A68]" />;
    case "adventure":
      return <Footprints className="w-5 h-5 text-[#B49A68]" />;
    case "wellness":
      return <HeartPulse className="w-5 h-5 text-[#B49A68]" />;
    case "luxury":
      return <Crown className="w-5 h-5 text-[#B49A68]" />;
    default:
      return <Sparkles className="w-5 h-5 text-[#B49A68]" />;
  }
}

export function RequestQuoteModal({
  isOpen,
  onClose,
  preselectedExperience,
  preselectedItem,
}: RequestQuoteModalProps) {
  const locale = useLocale();
  const lang = (["es", "en", "fr", "de"].includes(locale) ? locale : "es") as "es" | "en" | "fr" | "de";
  const c = MODAL_CONTENT[lang] || MODAL_CONTENT.es;

  // Conversational Steps 1 to 6
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  // Selections state
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [travelerCount, setTravelerCount] = useState<number>(2);
  const [partyType, setPartyType] = useState<string>("couple");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>("");

  // Contact info
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  // Status state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize or handle preselection
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);

      if (preselectedExperience === "wellness") {
        setSelectedInterests(["wellness"]);
        if (preselectedItem) {
          setNotes((prev) => (prev ? prev : `Procedimiento / Interés médico: ${preselectedItem}`));
        }
      } else if (preselectedExperience === "b2b") {
        setPartyType("b2b");
        setTravelerCount(10);
        setNotes((prev) => (prev ? prev : "Solicitud de tarifario y colaboración B2B Travel Trade."));
      } else if (preselectedItem) {
        setNotes((prev) => (prev ? prev : `Interés en itinerario: ${preselectedItem}`));
        if (preselectedItem.toLowerCase().includes("precolombina") || preselectedItem.toLowerCase().includes("tatacoa")) {
          setSelectedDestinations(["archaeological-south"]);
        } else if (preselectedItem.toLowerCase().includes("andes") || preselectedItem.toLowerCase().includes("cafetero")) {
          setSelectedDestinations(["andes-coffee"]);
        }
      }
    }
  }, [isOpen, preselectedExperience, preselectedItem]);

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

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Toggle helpers
  const toggleDestination = (id: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const addQuickTag = (tag: string) => {
    setNotes((prev) => {
      if (prev.includes(tag)) return prev;
      return prev ? `${prev} · ${tag}` : tag;
    });
  };

  // Compile summary data
  const getDestinationLabel = () => {
    if (selectedDestinations.length === 0) return "Colombia a medida";
    return selectedDestinations
      .map((id) => c.step1.destinations.find((d) => d.id === id)?.name || id)
      .join(", ");
  };

  const getTimeLabel = () => {
    if (selectedMonth && selectedTimeframe) {
      return `${selectedMonth} (${c.step2.timeframes.find((t) => t.id === selectedTimeframe)?.label || selectedTimeframe})`;
    }
    if (selectedMonth) return selectedMonth;
    if (selectedTimeframe) {
      return c.step2.timeframes.find((t) => t.id === selectedTimeframe)?.label || selectedTimeframe;
    }
    return "Fechas flexibles";
  };

  const getInterestsLabel = () => {
    if (selectedInterests.length === 0) return "A medida / Integral";
    return selectedInterests
      .map((id) => c.step4.interests.find((i) => i.id === id)?.label || id)
      .join(", ");
  };

  // Build WhatsApp text (strictly without emojis)
  const buildWhatsAppMessage = () => {
    const lines = [
      `*Hola OnTour DMC Colombia, deseo solicitar una cotización personalizada:*`,
      ``,
      `• Destinos / Región: ${getDestinationLabel()}`,
      `• Época / Mes: ${getTimeLabel()}`,
      `• Viajeros: ${travelerCount} personas (${partyType})`,
      `• Estilo / Intereses: ${getInterestsLabel()}`,
      notes ? `• Notas / Preferencias: ${notes}` : null,
      ``,
      `• Nombre: ${name || "Viajero"}`,
      email ? `• Email: ${email}` : null,
      phone ? `• Teléfono: ${phone}` : null,
      country ? `• País: ${country}` : null,
    ].filter(Boolean);

    return lines.join("\n");
  };

  const handleWhatsAppSend = () => {
    const text = buildWhatsAppMessage();
    trackWhatsAppClick("request_quote_conversational_modal", text);
    trackQuoteFormSubmit({
      experience: getDestinationLabel(),
      item: getInterestsLabel(),
      method: "whatsapp",
      travelers: travelerCount.toString(),
      dates: getTimeLabel(),
    });

    window.open(`https://wa.me/573143415177?text=${encodeURIComponent(text)}`, "_blank");
    setIsSubmitted(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);

    const payload = {
      name,
      email,
      phone,
      country,
      destination: getDestinationLabel(),
      travelMonth: getTimeLabel(),
      travelers: travelerCount.toString(),
      interests: selectedInterests,
      notes,
    };

    trackQuoteFormSubmit({
      experience: payload.destination,
      item: getInterestsLabel(),
      method: "email",
      travelers: payload.travelers,
      dates: payload.travelMonth,
    });

    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("[RequestQuoteModal] Submission error:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Dark luxury backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#0A1628]/80 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden z-10 flex flex-col my-auto max-h-[92vh]"
      >
        {/* Header */}
        <div className="relative px-6 py-4.5 bg-[#16352D] text-white flex items-center justify-between shrink-0 border-b border-white/10">
          <div className="flex items-center gap-3">
            {step > 1 && !isSubmitted && (
              <button
                type="button"
                onClick={() => setStep((s) => (s > 1 ? ((s - 1) as any) : s))}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors min-h-[36px] min-w-[36px] cursor-pointer"
                aria-label={c.back}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#B49A68]" />
              <span className="text-xs uppercase tracking-widest font-semibold text-white/85">
                {c.headerBadge}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-amber-200 font-semibold">
                {c.stepOf.replace("{step}", step.toString())}
              </span>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors min-h-[36px] min-w-[36px] cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress bar track */}
        {!isSubmitted && (
          <div className="w-full bg-stone-100 h-1 shrink-0 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#16352D] via-[#B49A68] to-[#16352D] transition-all duration-300 ease-out"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Scrollable Body with comfortable typography scale */}
        <div className="p-6 sm:p-8 md:p-10 overflow-y-auto flex-1">
          {isSubmitted ? (
            /* FINAL SUCCESS STATE */
            <div className="py-6 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-medium text-[#16352D] mb-3 leading-tight">
                {c.success.headline}
              </h3>
              <p className="text-sm sm:text-base uppercase tracking-wider text-editorial-accent font-bold mb-4">
                {c.success.subheadline}
              </p>

              <p className="text-base sm:text-lg text-stone-600 max-w-lg mx-auto leading-relaxed mb-8 font-normal">
                {c.success.body}
              </p>

              {/* Journey Blueprint Card */}
              <div className="w-full max-w-md bg-[#faf8f4] border border-stone-200/90 rounded-2xl p-6 mb-8 text-left shadow-sm">
                <span className="text-xs uppercase tracking-wider text-stone-500 font-bold block mb-3.5">
                  {c.success.recapTitle}
                </span>
                <div className="space-y-3 text-sm sm:text-base text-stone-700">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-editorial-accent shrink-0 mt-1" />
                    <span><strong>Destino:</strong> {getDestinationLabel()}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-editorial-accent shrink-0 mt-1" />
                    <span><strong>Fecha / Época:</strong> {getTimeLabel()}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Users className="w-4 h-4 text-editorial-accent shrink-0 mt-1" />
                    <span><strong>Viajeros:</strong> {travelerCount} pax</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-editorial-accent shrink-0 mt-1" />
                    <span><strong>Estilo:</strong> {getInterestsLabel()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md">
                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-7 py-4 rounded-full font-bold text-sm sm:text-base transition-all shadow-md min-h-[48px] cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{c.success.whatsappCta}</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#16352D] hover:bg-[#16352D]/90 text-white font-semibold text-sm sm:text-base transition-all shadow-sm min-h-[48px] cursor-pointer"
                >
                  {c.success.closeBtn}
                </button>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {/* STEP 1: DESTINATIONS */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-heading font-medium text-stone-900 tracking-tight mb-2">
                      {c.step1.title}
                    </h2>
                    <p className="text-sm sm:text-base text-stone-500 leading-relaxed">
                      {c.step1.subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {c.step1.destinations.map((dest) => {
                      const isSelected = selectedDestinations.includes(dest.id);
                      return (
                        <button
                          key={dest.id}
                          type="button"
                          onClick={() => toggleDestination(dest.id)}
                          className={`p-4.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer min-h-[105px] ${
                            isSelected
                              ? "border-[#16352D] bg-[#F7F5EF] ring-2 ring-[#16352D]/15 shadow-sm"
                              : "border-stone-200 bg-white hover:border-editorial-accent/60 hover:bg-stone-50/70"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="w-8 h-8 rounded-lg bg-[#16352D]/5 flex items-center justify-center">
                                {getDestinationIcon(dest.id)}
                              </div>
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                  isSelected ? "bg-[#16352D] border-[#16352D] text-white" : "border-stone-300 bg-white"
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </div>
                            <h3 className="font-heading font-bold text-stone-900 text-sm sm:text-base leading-snug">
                              {dest.name}
                            </h3>
                            <p className="caption text-stone-500 text-xs sm:text-sm mt-1 leading-normal">
                              {dest.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 bg-[#16352D] hover:bg-[#B49A68] hover:text-[#16352D] text-white px-9 py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-md min-h-[48px] cursor-pointer"
                    >
                      <span>{c.continue}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: TIMEFRAMES / MONTH */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-heading font-medium text-stone-900 tracking-tight mb-2">
                      {c.step2.title}
                    </h2>
                    <p className="text-sm sm:text-base text-stone-500 leading-relaxed">
                      {c.step2.subtitle}
                    </p>
                  </div>

                  {/* Quick Time Horizon Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {c.step2.timeframes.map((tf) => {
                      const isSelected = selectedTimeframe === tf.id;
                      return (
                        <button
                          key={tf.id}
                          type="button"
                          onClick={() => setSelectedTimeframe(tf.id)}
                          className={`p-4.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? "border-[#16352D] bg-[#F7F5EF] ring-2 ring-[#16352D]/15 font-semibold"
                              : "border-stone-200 bg-white hover:border-editorial-accent/60 hover:bg-stone-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="font-heading font-bold text-stone-900 text-sm sm:text-base">
                              {tf.label}
                            </h3>
                            {isSelected && <Check className="w-4 h-4 text-[#16352D] stroke-[3]" />}
                          </div>
                          <span className="caption text-stone-500 text-xs sm:text-sm block mt-1">
                            {tf.sub}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Or select specific month */}
                  <div>
                    <label className="block text-xs uppercase font-bold tracking-wider text-stone-600 mb-2.5">
                      {c.step2.monthsTitle}
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                      {c.step2.months.map((m) => {
                        const isMonthSelected = selectedMonth === m;
                        return (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setSelectedMonth(isMonthSelected ? "" : m)}
                            className={`py-2.5 px-3.5 rounded-xl border text-center text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                              isMonthSelected
                                ? "bg-[#16352D] text-white border-[#16352D]"
                                : "bg-white text-stone-700 border-stone-200 hover:border-editorial-accent hover:bg-stone-50"
                            }`}
                          >
                            {m}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 bg-[#16352D] hover:bg-[#B49A68] hover:text-[#16352D] text-white px-9 py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-md min-h-[48px] cursor-pointer"
                    >
                      <span>{c.continue}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: TRAVELERS */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-heading font-medium text-stone-900 tracking-tight mb-2">
                      {c.step3.title}
                    </h2>
                    <p className="text-sm sm:text-base text-stone-500 leading-relaxed">
                      {c.step3.subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {c.step3.partyTypes.map((pt) => {
                      const isSelected = partyType === pt.id;
                      return (
                        <button
                          key={pt.id}
                          type="button"
                          onClick={() => {
                            setPartyType(pt.id);
                            setTravelerCount(pt.count);
                          }}
                          className={`p-4.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? "border-[#16352D] bg-[#F7F5EF] ring-2 ring-[#16352D]/15 font-semibold"
                              : "border-stone-200 bg-white hover:border-editorial-accent/60 hover:bg-stone-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="font-heading font-bold text-stone-900 text-sm sm:text-base">
                              {pt.label}
                            </h3>
                            {isSelected && <Check className="w-4 h-4 text-[#16352D] stroke-[3]" />}
                          </div>
                          <span className="caption text-stone-500 text-xs sm:text-sm block mt-1">
                            {pt.sub}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Stepper for exact passenger count */}
                  <div className="p-5 rounded-2xl bg-[#faf8f4] border border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="font-heading font-bold text-stone-900 text-sm sm:text-base block">
                        {c.step3.exactCount}
                      </span>
                      <span className="text-xs sm:text-sm text-stone-500 mt-0.5 block">
                        {travelerCount} {travelerCount === 1 ? "viajero" : "viajeros"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <button
                        type="button"
                        onClick={() => setTravelerCount((c) => Math.max(1, c - 1))}
                        className="w-10 h-10 rounded-full bg-white border border-stone-300 text-stone-800 font-bold hover:bg-stone-100 flex items-center justify-center transition-colors cursor-pointer text-lg"
                        aria-label="Disminuir viajeros"
                      >
                        -
                      </button>
                      <span className="font-heading font-bold text-xl text-stone-900 w-8 text-center">
                        {travelerCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setTravelerCount((c) => c + 1)}
                        className="w-10 h-10 rounded-full bg-white border border-stone-300 text-stone-800 font-bold hover:bg-stone-100 flex items-center justify-center transition-colors cursor-pointer text-lg"
                        aria-label="Aumentar viajeros"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="inline-flex items-center gap-2 bg-[#16352D] hover:bg-[#B49A68] hover:text-[#16352D] text-white px-9 py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-md min-h-[48px] cursor-pointer"
                    >
                      <span>{c.continue}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: EXPERIENCE / INTERESTS */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-heading font-medium text-stone-900 tracking-tight mb-2">
                      {c.step4.title}
                    </h2>
                    <p className="text-sm sm:text-base text-stone-500 leading-relaxed">
                      {c.step4.subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {c.step4.interests.map((item) => {
                      const isSelected = selectedInterests.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleInterest(item.id)}
                          className={`p-4.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer min-h-[100px] ${
                            isSelected
                              ? "border-[#16352D] bg-[#F7F5EF] ring-2 ring-[#16352D]/15 shadow-sm"
                              : "border-stone-200 bg-white hover:border-editorial-accent/60 hover:bg-stone-50"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="w-8 h-8 rounded-lg bg-[#16352D]/5 flex items-center justify-center">
                                {getInterestIcon(item.id)}
                              </div>
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                  isSelected ? "bg-[#16352D] border-[#16352D] text-white" : "border-stone-300 bg-white"
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </div>
                            <h3 className="font-heading font-bold text-stone-900 text-sm sm:text-base leading-snug">
                              {item.label}
                            </h3>
                            <p className="caption text-stone-500 text-xs sm:text-sm mt-1 leading-normal">
                              {item.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(5)}
                      className="inline-flex items-center gap-2 bg-[#16352D] hover:bg-[#B49A68] hover:text-[#16352D] text-white px-9 py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-md min-h-[48px] cursor-pointer"
                    >
                      <span>{c.continue}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: NOTES & PREFERENCES */}
              {step === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-heading font-medium text-stone-900 tracking-tight mb-2">
                      {c.step5.title}
                    </h2>
                    <p className="text-sm sm:text-base text-stone-500 leading-relaxed">
                      {c.step5.subtitle}
                    </p>
                  </div>

                  <div>
                    <textarea
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={c.step5.placeholder}
                      className="w-full p-4.5 text-sm sm:text-base rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#16352D] leading-relaxed resize-none font-sans"
                    />
                  </div>

                  {/* Quick-add chips */}
                  <div>
                    <label className="block text-xs uppercase font-bold tracking-wider text-stone-600 mb-2.5">
                      {c.step5.quickTagsTitle}
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {c.step5.quickTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => addQuickTag(tag)}
                          className="px-3.5 py-2 rounded-full bg-stone-100 hover:bg-[#16352D] hover:text-white text-stone-700 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                        >
                          + {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(6)}
                      className="inline-flex items-center gap-2 bg-[#16352D] hover:bg-[#B49A68] hover:text-[#16352D] text-white px-9 py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-md min-h-[48px] cursor-pointer"
                    >
                      <span>{c.continue}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 6: CONTACT & SEND */}
              {step === 6 && (
                <motion.div
                  key="step-6"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-heading font-medium text-stone-900 tracking-tight mb-2">
                      {c.step6.title}
                    </h2>
                    <p className="text-sm sm:text-base text-stone-500 leading-relaxed">
                      {c.step6.subtitle}
                    </p>
                  </div>

                  <form onSubmit={handleEmailSubmit} className="space-y-4.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5">
                          {c.step6.nameLabel}
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={c.step6.namePlaceholder}
                          className="w-full px-4 py-3 text-sm sm:text-base rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#16352D] min-h-[48px]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5">
                          {c.step6.emailLabel}
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={c.step6.emailPlaceholder}
                          className="w-full px-4 py-3 text-sm sm:text-base rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#16352D] min-h-[48px]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5">
                          {c.step6.phoneLabel}
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={c.step6.phonePlaceholder}
                          className="w-full px-4 py-3 text-sm sm:text-base rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#16352D] min-h-[48px]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5">
                          {c.step6.countryLabel}
                        </label>
                        <input
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder={c.step6.countryPlaceholder}
                          className="w-full px-4 py-3 text-sm sm:text-base rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#16352D] min-h-[48px]"
                        />
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-3 flex flex-col sm:flex-row gap-3.5">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-4 px-8 rounded-full bg-[#16352D] text-white font-bold text-sm sm:text-base hover:bg-[#B49A68] hover:text-[#16352D] shadow-md flex items-center justify-center gap-2 transition-all duration-300 min-h-[50px] disabled:opacity-70 cursor-pointer tracking-wide"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin text-amber-300" />
                            <span>Procesando...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 text-amber-300" />
                            <span>{c.step6.submitBtn}</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleWhatsAppSend}
                        className="py-4 px-8 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm sm:text-base shadow-md flex items-center justify-center gap-2 transition-all min-h-[50px] cursor-pointer"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>{c.step6.whatsappBtn}</span>
                      </button>
                    </div>

                    <p className="text-xs text-stone-400 text-center flex items-center justify-center gap-1.5 pt-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{c.step6.slaNote}</span>
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
}
