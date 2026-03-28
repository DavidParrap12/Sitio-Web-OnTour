"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, MessageCircle, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface CardDestinoProps {
  title: string;
  description: string;
  duration: string;
  image: string;
  href: string;
  type?: "pasadia" | "circuito";
  brochureUrl?: string;
}

export function CardDestino({ title, description, duration, image, href, type = "pasadia", brochureUrl }: CardDestinoProps) {

  const whatsappMessage = `Hola, me interesa el ${type === "pasadia" ? "pasadía" : "circuito"}: ${title}`;
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=573132322335&text=${encodeURIComponent(whatsappMessage)}`;

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
            <span>Colombia</span>
          </div>
          
          <h3 className="text-xl font-bold font-heading text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-foreground/70 text-sm line-clamp-3 flex-grow">
            {description}
          </p>
        </div>
      </Link>

      {/* Footer out of Link to prevent invalid nested <a> hydration errors */}
      <div className="px-6 pb-6 pt-4 flex items-center justify-between mt-auto border-t border-gray-50/50 gap-3">
        {brochureUrl ? (
          <a
            href={brochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-full font-medium transition-colors text-sm"
          >
            <FileText className="w-4 h-4" />
            Ver Folleto
          </a>
        ) : (
          <div>
            <p className="text-xs text-foreground/50 font-medium uppercase tracking-wider mb-0.5">Desde</p>
            <p className="text-lg font-bold text-primary">A Cotizar</p>
          </div>
        )}
        
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-accent hover:brightness-90 text-white px-4 py-2 rounded-full font-medium transition-colors cursor-pointer text-sm"
        >
          Reservar
          <MessageCircle className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}
