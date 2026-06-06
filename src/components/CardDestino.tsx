"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Clock, MapPin, MessageCircle, Mail, ChevronDown, Eye, ArrowRight } from "lucide-react";
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
  index?: number;
}

export function CardDestino({
  title,
  description,
  duration,
  image,
  href,
  type = "pasadia",
  brochureUrl,
  index = 0,
}: CardDestinoProps) {
  const t = useTranslations("card");
  const [showOptions, setShowOptions] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const whatsappMessage =
    type === "pasadia"
      ? t("whatsappDayTrip", { title })
      : t("whatsappCircuit", { title });

  const whatsappUrl = `https://api.whatsapp.com/send/?phone=573143415177&text=${encodeURIComponent(whatsappMessage)}`;

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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => { setIsHovered(false); setShowOptions(false); }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100 relative"
    >
      {/* Image section with hover overlay */}
      <div className="relative h-60 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.15]"
        />

        {/* Default subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-0" />

        {/* Hover overlay with CTA */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col items-center justify-center gap-3 p-4">
          {/* "Reservar" dropdown */}
          <div className="relative" ref={dropdownRef}>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowOptions(!showOptions); }}
              className="flex items-center gap-2 bg-accent hover:brightness-110 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
            >
              {t("book")}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${showOptions ? "rotate-180" : ""}`}
              />
            </motion.button>

            <AnimatePresence>
              {showOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                >
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors text-sm font-medium text-foreground/80 group/opt"
                    onClick={(e) => { e.stopPropagation(); setShowOptions(false); }}
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
                    href={"/contacto" as any}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-sm font-medium text-foreground/80 group/opt"
                    onClick={(e) => { e.stopPropagation(); setShowOptions(false); }}
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

          {/* "Ver detalle" link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Link
              href={href as any}
              className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors hover:underline underline-offset-4"
            >
              <Eye className="w-4 h-4" />
              {t("brochure")}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>

        {/* Duration badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-primary shadow-sm flex items-center gap-1 z-10">
          <Clock className="w-4 h-4" />
          {duration}
        </div>
      </div>

      {/* Text content */}
      <Link href={href as any} className="flex flex-col flex-grow p-6">
        <div className="flex items-center gap-1.5 text-secondary text-sm font-medium mb-2">
          <MapPin className="w-4 h-4" />
          <span>{t("colombia")}</span>
        </div>

        <h3 className="text-xl font-bold font-heading text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-foreground/70 text-sm line-clamp-3 flex-grow">
          {description}
        </p>
      </Link>
    </motion.div>
  );
}

