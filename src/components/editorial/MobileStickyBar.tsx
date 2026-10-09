"use client";

import { useState, useEffect } from "react";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackWhatsAppClick, trackRequestQuoteClick } from "@/lib/analytics";

interface MobileStickyBarProps {
  locale: string;
  onOpenQuote: () => void;
}

const BAR_STRINGS: Record<string, { quote: string; whatsapp: string; waMessage: string }> = {
  es: {
    quote: "Cotizar Viaje",
    whatsapp: "WhatsApp",
    waMessage: "Hola OnTour DMC, me gustaría planear un viaje privado a Colombia.",
  },
  en: {
    quote: "Plan Your Journey",
    whatsapp: "WhatsApp",
    waMessage: "Hello OnTour DMC, I would like to plan a private trip to Colombia.",
  },
  de: {
    quote: "Reise Anfragen",
    whatsapp: "WhatsApp",
    waMessage: "Hallo OnTour DMC, ich möchte eine private Reise nach Kolumbien planen.",
  },
  fr: {
    quote: "Créer Mon Voyage",
    whatsapp: "WhatsApp",
    waMessage: "Bonjour OnTour DMC, je souhaite organiser un voyage privé en Colombie.",
  },
};

export function MobileStickyBar({ locale, onOpenQuote }: MobileStickyBarProps) {
  const [visible, setVisible] = useState(false);
  const strings = BAR_STRINGS[locale] || BAR_STRINGS.es;

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past hero
      setVisible(window.scrollY > 280);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const waUrl = `https://wa.me/573143415177?text=${encodeURIComponent(strings.waMessage)}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          role="region"
          aria-label="Acciones rápidas de viaje"
        >
          <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
            {/* Direct WhatsApp Action */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("mobile_sticky_bar")}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#25D366] text-white font-bold text-xs shadow-sm hover:bg-[#20ba59] active:scale-95 transition-all min-h-[44px] shrink-0 touch-manipulation"
              aria-label="Hablar por WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{strings.whatsapp}</span>
            </a>

            {/* Plan Your Journey Modal Action */}
            <button
              onClick={() => {
                trackRequestQuoteClick("mobile_sticky_bar");
                onOpenQuote();
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#16352D] hover:bg-[#B49A68] hover:text-[#16352D] text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all min-h-[44px] touch-manipulation cursor-pointer"
            >
              <span>{strings.quote}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
