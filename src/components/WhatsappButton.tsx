"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

const WHATSAPP_MESSAGES: Record<string, string> = {
  es: "Hola Ontour, me gustaría recibir más información sobre sus paquetes turísticos.",
  en: "Hello Ontour, I'd like more information about your tourism packages.",
  fr: "Bonjour Ontour, je souhaiterais recevoir plus d'informations sur vos forfaits touristiques.",
  de: "Hallo Ontour, ich würde gerne mehr Informationen zu Ihren Reisepaketen erhalten.",
};

export function WhatsappButton() {
  const locale = useLocale();
  const message = WHATSAPP_MESSAGES[locale] ?? WHATSAPP_MESSAGES.es;
  const url = `https://wa.me/573143415177?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1 
      }}
      aria-label="Contactar por WhatsApp"
    >
      {/* Pulse rings */}
      <span className="absolute inset-0 rounded-full bg-green-400 animate-[wa-pulse_3s_ease-out_infinite]" />
      <span className="absolute inset-0 rounded-full bg-green-400 animate-[wa-pulse_3s_ease-out_1.5s_infinite]" />
      <MessageCircle className="w-7 h-7 relative z-10" />
    </motion.a>
  );
}
