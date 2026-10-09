"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X, Globe, ChevronDown, ChevronRight, Compass, HeartPulse, Briefcase, Info, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { RequestQuoteModal } from "./RequestQuoteModal";
import { trackRequestQuoteClick } from "@/lib/analytics";

const LOCALES = [
  { code: "es", flag: "🇨🇴", label: "Español" },
  { code: "en", flag: "🇺🇸", label: "English" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.15 } },
};

export interface NavPillar {
  id: string;
  label: Record<string, string>;
  href: string;
  icon: typeof Compass;
  items: {
    name: Record<string, string>;
    desc: Record<string, string>;
    href: string;
  }[];
}

const NAV_PILLARS: NavPillar[] = [
  {
    id: "destinations",
    label: {
      es: "Destinos",
      en: "Destinations",
      fr: "Destinations",
      de: "Reiseziele",
    },
    href: "/circuitos",
    icon: Compass,
    items: [
      {
        name: { es: "Andes & Capital", en: "Andes & Capital", fr: "Andes & Capitale", de: "Anden & Hauptstadt" },
        desc: { es: "Bogotá, Monserrate y Catedral de Sal", en: "Bogotá, Monserrate & Salt Cathedral", fr: "Bogotá, Monserrate et Cathédrale de Sel", de: "Bogotá & Salzkathedrale" },
        href: "/circuitos",
      },
      {
        name: { es: "Eje Cafetero & Tolima", en: "Coffee Region & Tolima", fr: "Région du Café & Tolima", de: "Kaffeeregion & Tolima" },
        desc: { es: "Ibagué, Cocora, Salento y termales", en: "Ibagué, Cocora Valley & hot springs", fr: "Ibagué, Vallée de Cocora et thermes", de: "Ibagué, Cocora-Tal & Thermalquellen" },
        href: "/circuitos/tour-colombia-corazon-andes",
      },
      {
        name: { es: "Boyacá Colonial", en: "Colonial Boyacá", fr: "Boyacá Colonial", de: "Koloniales Boyacá" },
        desc: { es: "Villa de Leyva, Paipa y Lago de Tota", en: "Villa de Leyva, Paipa & Lake Tota", fr: "Villa de Leyva, Paipa et Lac de Tota", de: "Villa de Leyva, Paipa & Tota-See" },
        href: "/circuitos/tour-colombia-boyaca-colonial",
      },
      {
        name: { es: "San Agustín Arqueológico", en: "San Agustín & Archaeological South", fr: "San Agustín Archéologique", de: "San Agustín Archäologie" },
        desc: { es: "Misterio milenario, Desierto y Huila", en: "Ancient sculptures, Tatacoa Desert & Huila", fr: "Statues antiques, Désert de Tatacoa", de: "Antike Statuen & Tatacoa-Wüste" },
        href: "/circuitos/epoca-precolombina-sur-colombia",
      },
    ],
  },
  {
    id: "experiences",
    label: {
      es: "Experiencias",
      en: "Experiences",
      fr: "Expériences",
      de: "Erlebnisse",
    },
    href: "/circuitos",
    icon: Compass,
    items: [
      {
        name: { es: "Circuitos Multi-Día", en: "Multi-Day Journeys", fr: "Circuits Multi-Jours", de: "Mehrtagestouren" },
        desc: { es: "Rutas completas de 8 a 13 días con guía y traslados", en: "8 to 13-day curated itineraries with guide", fr: "Itinéraires complets de 8 à 13 jours", de: "8- bis 13-tägige geführte Rundreisen" },
        href: "/circuitos",
      },
      {
        name: { es: "Pasadías / Day Trips", en: "Day Trips & Tours", fr: "Excursions d'un Jour", de: "Tagesausflüge" },
        desc: { es: "Escapadas de un día a pueblos patrimonio y naturaleza", en: "One-day excursions to natural and cultural gems", fr: "Escapades d'un jour au cœur de la nature", de: "Eintägige Highlights und Kulturtouren" },
        href: "/pasadias",
      },
      {
        name: { es: "Galería de Viajeros", en: "Travelers Gallery", fr: "Galerie des Voyageurs", de: "Reisegalerie" },
        desc: { es: "Fotografías reales y momentos inolvidables", en: "Authentic moments and photography from travellers", fr: "Moments authentiques et photos de voyageurs", de: "Echte Momente unserer Reisenden" },
        href: "/galeria",
      },
      {
        name: { es: "Viajes a Medida (Tailor-Made)", en: "Tailor-Made Journeys", fr: "Voyages Sur Mesure", de: "Maßgeschneiderte Reisen" },
        desc: { es: "Diseñamos la ruta ideal según tus fechas y gustos", en: "Custom itinerary crafted for your travel style", fr: "Création d'itinéraires selon vos envies", de: "Individuelle Routen nach Ihren Wünschen" },
        href: "/contacto",
      },
    ],
  },
  {
    id: "wellness",
    label: {
      es: "Turismo Médico",
      en: "Medical & Wellness",
      fr: "Santé & Bien-être",
      de: "Medizin & Wellness",
    },
    href: "/bienestar",
    icon: HeartPulse,
    items: [
      {
        name: { es: "Tratamientos & Especialidades", en: "Treatments & Specialties", fr: "Soins & Spécialités", de: "Behandlungen & Fächer" },
        desc: { es: "Cirugía plástica, cardiología, chequeos y urología", en: "Plastic surgery, cardiology, checkups & urology", fr: "Chirurgie plastique, cardiologie et bilans", de: "Plastische Chirurgie, Kardiologie & Check-ups" },
        href: "/bienestar#tratamientos",
      },
      {
        name: { es: "Cuerpo Médico & Especialistas", en: "Specialists & Medical Profiles", fr: "Corps Médical & Spécialistes", de: "Fachärzte & Spezialisten" },
        desc: { es: "Doctores certificados con registro RETHUS y clínica aliada", en: "Colombia-licensed specialists registered with RETHUS and hospital clinics", fr: "Médecins agréés et cliniques partenaires", de: "Zertifizierte Fachärzte mit Klinikanbindung" },
        href: "/bienestar#especialistas",
      },
      {
        name: { es: "El Recorrido en 5 Pasos", en: "5-Step Patient Journey", fr: "Parcours Patient en 5 Étapes", de: "5-Schritte-Patientenweg" },
        desc: { es: "Desde la consulta virtual previa hasta el seguimiento", en: "From virtual consultation to home follow-up", fr: "De la consultation vidéo au suivi à domicile", de: "Von der Online-Sprechstunde bis zur Nachsorge" },
        href: "/bienestar#proceso",
      },
      {
        name: { es: "Recuperación en el Tolima", en: "Recovery in the Andes", fr: "Convalescence dans les Andes", de: "Erholung in den Anden" },
        desc: { es: "Hotelería boutique, clima templado y descanso natural", en: "Boutique stays, mild climate and peaceful nature", fr: "Hôtels de charme et repos bienfaisant", de: "Boutique-Hotels und heilende Natur" },
        href: "/bienestar#recuperacion",
      },
    ],
  },
  {
    id: "professionals",
    label: {
      es: "Agencias & B2B",
      en: "Travel Trade",
      fr: "Pour Professionnels",
      de: "Für Reisebüros",
    },
    href: "/servicios",
    icon: Briefcase,
    items: [
      {
        name: { es: "Servicios Receptivos DMC", en: "Inbound DMC Services", fr: "Services DMC Réceptif", de: "Incoming DMC-Services" },
        desc: { es: "Operación terrestre completa para agencias del mundo", en: "Full ground operations for global travel agencies", fr: "Opérations complètes pour voyagistes mondiaux", de: "Komplette Vor-Ort-Betreuung für Agenturen" },
        href: "/servicios",
      },
      {
        name: { es: "Flota Propia de Transporte", en: "Private Transport Fleet", fr: "Flotte de Transport Privé", de: "Eigene Fahrzeugflotte" },
        desc: { es: "Vans y microbuses con conductor profesional certificado", en: "Modern vans and minibuses with certified drivers", fr: "Véhicules récents avec chauffeurs certifiés", de: "Moderne Vans mit zertifizierten Fahrern" },
        href: "/servicios",
      },
      {
        name: { es: "Alianzas y Tarifarios B2B", en: "B2B Rates & Partnerships", fr: "Tarifs B2B & Partenariats", de: "B2B-Tarife & Kooperation" },
        desc: { es: "Comisiones protegidas y respuesta garantizada en 24h", en: "Protected net rates & 24h response guarantee", fr: "Tarifs négociés et réponse sous 24 heures", de: "Netto-Tarife und 24h-Angebotsservice" },
        href: "/contacto",
      },
    ],
  },
  {
    id: "about",
    label: {
      es: "Nosotros",
      en: "About & Trust",
      fr: "À Propos",
      de: "Über Uns",
    },
    href: "/nosotros",
    icon: Info,
    items: [
      {
        name: { es: "Nuestra Historia & Equipo", en: "Our Story & Team", fr: "Notre Histoire & Équipe", de: "Unsere Geschichte & Team" },
        desc: { es: "Expertos locales comprometidos con Colombia", en: "Local experts dedicated to sustainable tourism", fr: "Experts locaux passionnés de la Colombie", de: "Lokale Experten mit Herzblut für Kolumbien" },
        href: "/nosotros",
      },
      {
        name: { es: "Certificaciones & RNT 62212", en: "Certifications & RNT", fr: "Certifications & RNT", de: "Zertifikate & RNT-Lizenz" },
        desc: { es: "Registro Nacional de Turismo y aval de FONTUR", en: "National Tourism Registry & FONTUR accreditation", fr: "Registre National du Tourisme colombien", de: "Nationales Tourismusregister Kolumbiens" },
        href: "/legal/registro-turismo",
      },
      {
        name: { es: "Testimonios y Reseñas", en: "Traveler Reviews", fr: "Avis de Voyageurs", de: "Erfahrungsberichte" },
        desc: { es: "Historias reales de viajeros de más de 15 países", en: "Real stories from guests around the globe", fr: "Témoignages de voyageurs du monde entier", de: "Echte Reiseerlebnisse aus aller Welt" },
        href: "/nosotros#testimonios",
      },
    ],
  },
];

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const langKey = (["es", "en", "fr", "de"].includes(locale) ? locale : "es") as "es" | "en" | "fr" | "de";
  const currentLocale = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
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

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setLangOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(newLocale: string) {
    if (newLocale === locale) {
      setLangOpen(false);
      setIsOpen(false);
      return;
    }

    try {
      sessionStorage.setItem("ontour_locale_scroll", window.scrollY.toString());
    } catch {
      // Ignore
    }

    startTransition(() => {
      router.replace(
        // @ts-expect-error – dynamic params typed loosely
        { pathname: pathname as any, params },
        { locale: newLocale as any, scroll: false }
      );
    });

    setLangOpen(false);
    setIsOpen(false);
  }

  const navClass = scrolled
    ? "bg-white/98 backdrop-blur-lg shadow-sm py-3 sm:py-3.5 text-stone-900 border-b border-stone-200/80"
    : "bg-white/85 backdrop-blur-md py-4 sm:py-5 text-stone-900 border-b border-stone-200/40";

  return (
    <>
      <nav ref={navRef} className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300 ${navClass}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group shrink-0">
            <Image
              src="/image/logo-ON-TOUR-Nuevo2.png"
              alt="Ontour DMC Logo"
              width={160}
              height={48}
              className="h-9 sm:h-10 object-contain transition-all duration-300"
              style={{ width: "auto" }}
              priority
            />
          </Link>

          {/* Desktop Nav Pillars */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_PILLARS.map((pillar) => {
              const isActive = pathname?.startsWith(pillar.href);
              const isOpen = activeDropdown === pillar.id;

              return (
                <div
                  key={pillar.id}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(pillar.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(isOpen ? null : pillar.id)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition-all min-h-[44px] ${
                      isActive
                        ? "text-[#16352D] bg-[#16352D]/5 font-bold"
                        : "text-stone-700 hover:text-[#16352D] hover:bg-stone-50"
                    }`}
                    aria-expanded={isOpen}
                  >
                    <span>{pillar.label[langKey]}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 top-full pt-2 z-50 w-72 xl:w-80 pointer-events-auto"
                      >
                        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-2.5 space-y-1">
                          {pillar.items.map((item, idx) => (
                            <Link
                              key={idx}
                              href={item.href as any}
                              onClick={() => setActiveDropdown(null)}
                              className="group flex flex-col p-2.5 rounded-xl hover:bg-[#F7F5EF] transition-colors min-h-[44px]"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-stone-900 group-hover:text-[#16352D] transition-colors">
                                  {item.name[langKey]}
                                </span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#16352D] transition-colors" />
                              </div>
                              <span className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                                {item.desc[langKey]}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Action Bar (Language + Persistent Quote CTA) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-50 font-medium text-xs transition-colors min-h-[44px]"
                aria-label={langKey === "es" ? "Seleccionar idioma" : "Select language"}
              >
                <Globe className="w-4 h-4 text-stone-500" />
                <span className="uppercase font-bold">{locale}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 min-w-[140px] z-50"
                  >
                    {LOCALES.map((loc) => (
                      <button
                        key={loc.code}
                        onClick={() => switchLocale(loc.code)}
                        className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs transition-colors min-h-[44px] ${
                          locale === loc.code
                            ? "text-[#16352D] font-bold bg-[#16352D]/5"
                            : "text-stone-700 hover:bg-stone-50"
                        }`}
                      >
                        <span className="text-base">{loc.flag}</span>
                        <span>{loc.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Persistent CTA Button: Plan Your Journey */}
            <button
              onClick={() => {
                trackRequestQuoteClick("navbar_desktop");
                setQuoteModalOpen(true);
              }}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium tracking-wide text-xs sm:text-sm text-white bg-[#16352D] hover:bg-[#B49A68] hover:text-[#16352D] shadow-sm hover:shadow-md transition-all duration-300 min-h-[44px] cursor-pointer shrink-0"
            >
              <span>
                {langKey === "es" && "Cotizar Viaje"}
                {langKey === "en" && "Plan Your Journey"}
                {langKey === "fr" && "Demander un Devis"}
                {langKey === "de" && "Angebot Anfordern"}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Right Controls: Fast Quote + Hamburger */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <button
              onClick={() => {
                trackRequestQuoteClick("navbar_mobile_header");
                setQuoteModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-medium tracking-wide text-xs text-white bg-[#16352D] hover:bg-[#B49A68] hover:text-[#16352D] shadow-sm min-h-[44px] touch-manipulation transition-colors shrink-0"
            >
              <span>
                {langKey === "es" && "Cotizar"}
                {langKey === "en" && "Plan Trip"}
                {langKey === "fr" && "Devis"}
                {langKey === "de" && "Angebot"}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              className="p-2.5 rounded-xl text-stone-800 hover:bg-stone-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? (langKey === "es" ? "Cerrar menú" : "Close menu") : (langKey === "es" ? "Abrir menú" : "Open menu")}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#0A1628]/60 backdrop-blur-sm lg:hidden flex justify-end"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col pt-6 pb-8 px-6 overflow-y-auto"
            >
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <Image
                  src="/image/logo-ON-TOUR-Nuevo2.png"
                  alt="Ontour DMC"
                  width={130}
                  height={38}
                  className="h-8 object-contain"
                  style={{ width: "auto" }}
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center min-h-[44px] min-w-[44px]"
                  aria-label={langKey === "es" ? "Cerrar menú" : "Close menu"}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Pillars Accordion */}
              <div className="flex-1 py-4 space-y-1">
                {NAV_PILLARS.map((pillar) => {
                  const isExp = mobileExpanded === pillar.id;

                  return (
                    <div key={pillar.id} className="border-b border-stone-100/80">
                      <button
                        onClick={() => setMobileExpanded(isExp ? null : pillar.id)}
                        className="w-full py-3.5 px-2 flex items-center justify-between text-left font-heading text-base font-bold text-stone-900 min-h-[48px] touch-manipulation"
                      >
                        <span>{pillar.label[langKey]}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                            isExp ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isExp && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden pb-3 pl-3 space-y-2"
                          >
                            {pillar.items.map((sub, sidx) => (
                              <Link
                                key={sidx}
                                href={sub.href as any}
                                onClick={() => setIsOpen(false)}
                                className="block py-2 px-3 rounded-xl bg-stone-50 hover:bg-[#F7F5EF] text-xs font-semibold text-stone-800 min-h-[44px] flex items-center justify-between"
                              >
                                <span>{sub.name[langKey]}</span>
                                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-4 border-t border-stone-100 space-y-4">
                {/* Language Picker */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                    {langKey === "es" && "Idioma / Language"}
                    {langKey === "en" && "Language"}
                    {langKey === "fr" && "Langue"}
                    {langKey === "de" && "Sprache"}
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {LOCALES.map((loc) => (
                      <button
                        key={loc.code}
                        onClick={() => switchLocale(loc.code)}
                        className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-medium min-h-[44px] touch-manipulation ${
                          locale === loc.code
                            ? "bg-[#16352D] text-white font-bold"
                            : "bg-stone-100 text-stone-700"
                        }`}
                      >
                        <span className="text-base">{loc.flag}</span>
                        <span className="text-[10px] uppercase font-mono">{loc.code}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Big Quote Button */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    trackRequestQuoteClick("navbar_mobile_drawer");
                    setQuoteModalOpen(true);
                  }}
                  className="w-full py-3.5 px-6 rounded-full bg-[#16352D] hover:bg-[#B49A68] hover:text-[#16352D] text-white font-medium tracking-wide text-sm shadow-md flex items-center justify-center gap-2 min-h-[48px] touch-manipulation active:scale-[0.99] transition-all"
                >
                  <span>
                    {langKey === "es" && "Solicitar Cotización (SLA <24h)"}
                    {langKey === "en" && "Request a Quote (SLA <24h)"}
                    {langKey === "fr" && "Demander un Devis (SLA <24h)"}
                    {langKey === "de" && "Angebot Anfordern (SLA <24h)"}
                  </span>
                  <ArrowUpRight className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global 3-Click Quote Modal */}
      <RequestQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />
    </>
  );
}
export default Navbar;
