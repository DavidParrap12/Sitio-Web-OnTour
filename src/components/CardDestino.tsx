"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Clock, MapPin, MessageCircle, Mail, ChevronDown, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface CardDestinoProps {
  title: string;
  description: string;
  duration: string;
  image: string;
  href: string;
  type?: "pasadia" | "circuito";
  brochureUrl?: string;
}

export function CardDestino({
  title,
  description,
  duration,
  image,
  href,
  type = "pasadia",
  brochureUrl,
}: CardDestinoProps) {
  const t = useTranslations("card");
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const whatsappMessage =
    type === "pasadia"
      ? t("whatsappDayTrip", { title })
      : t("whatsappCircuit", { title });

  const whatsappUrl = `https://api.whatsapp.com/send/?phone=573002322335&text=${encodeURIComponent(whatsappMessage)}`;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowOptions(false);
      }
    }
    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOptions]);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 relative"
    >
      <Link href={href} className="flex flex-col flex-grow">
        <div className="relative h-56 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />

          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-primary shadow-sm flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {duration}
          </div>
        </div>

        <div className="p-6 pb-2 flex flex-col flex-grow">
          <div className="flex items-center gap-1.5 text-secondary text-sm font-medium mb-2">
            <MapPin className="w-4 h-4" />
            <span>{t("colombia")}</span>
          </div>

          <h3 className="text-xl font-bold font-heading text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          <p className="text-foreground/70 text-sm line-clamp-2 flex-grow">
            {description}
          </p>
        </div>
      </Link>

      {/* Footer — outside Link to avoid invalid nested <a> */}
      <div className="px-6 pb-6 pt-4 flex items-center justify-between mt-auto border-t border-gray-50/50 gap-3">
        {/* "Ver Folleto" → now goes to detail page */}
        <Link
          href={href}
          className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-full font-medium transition-colors text-sm"
        >
          <Eye className="w-4 h-4" />
          {t("brochure")}
        </Link>

        {/* "Reservar" dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="flex items-center gap-2 bg-accent hover:brightness-90 text-white px-4 py-2 rounded-full font-medium transition-colors cursor-pointer text-sm"
          >
            {t("book")}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${showOptions ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {showOptions && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full right-0 mb-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors text-sm font-medium text-foreground/80 group/opt"
                  onClick={() => setShowOptions(false)}
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center group-hover/opt:bg-green-200 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-foreground">{t("bookWhatsapp")}</span>
                    <span className="block text-xs text-foreground/50">{t("bookWhatsappHint")}</span>
                  </div>
                </a>
                <div className="border-t border-gray-100" />
                <Link
                  href="/contacto"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-sm font-medium text-foreground/80 group/opt"
                  onClick={() => setShowOptions(false)}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover/opt:bg-blue-200 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-foreground">{t("bookEmail")}</span>
                    <span className="block text-xs text-foreground/50">{t("bookEmailHint")}</span>
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
