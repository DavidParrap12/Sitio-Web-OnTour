"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsappButton() {
  const phoneNumber = "573132322335"; // Placeholder
  const message = "Hola Ontour, me gustaría recibir más información sobre sus paquetes turísticos.";
  const url = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

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
      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" style={{ animationDuration: '3s' }} />
      <MessageCircle className="w-7 h-7 relative z-10" />
    </motion.a>
  );
}
