"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

interface DestinationsShowcaseProps {
  locale: string;
}

interface CorridorData {
  id: string;
  name: string;
  tagline: string;
  image: string;
  duration: string;
  circuitHref: string;
  circuitName: string;
  priceFrom: string;
  highlights: string[];
  description: string;
}

const CORRIDORS: Record<string, CorridorData[]> = {
  es: [
    {
      id: "tolima-cafetero",
      name: "Tolima & Eje Cafetero",
      tagline: "El Corazón de los Andes",
      image: "/image/Tolima-fotos/tolima_palmas-cera-ladera-verde-cielo-azul.jpg",
      duration: "13 Días / 12 Noches",
      circuitHref: "/circuitos/tour-colombia-corazon-andes",
      circuitName: "Tour Corazón de los Andes",
      priceFrom: "Desde $1.980 USD pp",
      highlights: [
        "Palmas de cera gigantes en el Valle de Cocora",
        "Haciendas cafeteras tradicionales y catas especializadas",
        "Termales medicinales de montaña en Murillo",
        "Senderos y cañón del Combeima en Tolima",
      ],
      description: "Nuestra tierra natal. Montañas escarpadas, bosques de niebla, aroma a café recién tostado y la calidez hospitalaria de los pueblos andinos.",
    },
    {
      id: "bogota-boyaca",
      name: "Bogotá & Boyacá Colonial",
      tagline: "Cultura, Historia & Cordillera",
      image: "/image/villa de leyva.jpg",
      duration: "8 Días / 7 Noches",
      circuitHref: "/circuitos/tour-colombia-boyaca-colonial",
      circuitName: "Tour Boyacá Colonial",
      priceFrom: "Desde $1.320 USD pp",
      highlights: [
        "Vistas panorámicas desde el cerro de Monserrate",
        "Catedral de Sal subterránea de Zipaquirá",
        "Pueblo colonial empedrado de Villa de Leyva",
        "Aguas termales de Paipa y Laguna de Tota",
      ],
      description: "Un recorrido elegante por la arquitectura colonial, conventos centenarios y las lagunas sagradas donde nació la leyenda de El Dorado.",
    },
    {
      id: "tatacoa-san-agustin",
      name: "Tatacoa & San Agustín",
      tagline: "Desierto & Huella Precolombina",
      image: "/image/desierto-tatacoa.jpg",
      duration: "9 Días / 8 Noches",
      circuitHref: "/circuitos/epoca-precolombina-sur-colombia",
      circuitName: "Época Precolombina Sur de Colombia",
      priceFrom: "Desde $1.490 USD pp",
      highlights: [
        "Caminata por laberintos rojos y grises de la Tatacoa",
        "Observación de constelaciones astronómicas nocturnas",
        "Parque Arqueológico de San Agustín (Patrimonio UNESCO)",
        "Estrecho del Río Magdalena en Huila",
      ],
      description: "El sur mítico de Colombia: cañones de arcilla esculpidos por el viento, cielos nocturnos infinitos y las enigmáticas esculturas de civilizaciones milenarias.",
    },
    {
      id: "caribe-cartagena",
      name: "Cartagena & Costa Caribe",
      tagline: "Murallas Coloniales & Islas del Rosario",
      image: "/image/cuidad-amurallada.jpg",
      duration: "14 Días / 13 Noches",
      circuitHref: "/circuitos/tour-colombia-tres-ciudades",
      circuitName: "Colombia Diversamente Cultural",
      priceFrom: "Desde $2.150 USD pp",
      highlights: [
        "Paseo privado por la Ciudad Amurallada y Getsemaní",
        "Atardecer en las murallas con vista al Caribe",
        "Navegación privada a las Islas del Rosario",
        "Fusión gastronómica caribeña de autor",
      ],
      description: "El encanto caribeño con arquitectura militar española del siglo XVI, brisa marina, música en cada plaza y playas de arena blanca.",
    },
  ],
  en: [
    {
      id: "tolima-cafetero",
      name: "Coffee Heartland & Tolima",
      tagline: "The Andean Heartland",
      image: "/image/Tolima-fotos/tolima_palmas-cera-ladera-verde-cielo-azul.jpg",
      duration: "13 Days / 12 Nights",
      circuitHref: "/circuitos/tour-colombia-corazon-andes",
      circuitName: "Heart of the Andes Journey",
      priceFrom: "From $1,980 USD pp",
      highlights: [
        "Towering wax palms of the Cocora Valley",
        "Specialty coffee estate cupping & roasting workshops",
        "Natural Andean thermal mineral hot springs",
        "Combeima Canyon trails and cloud forest biodiversity",
      ],
      description: "Our home ground. Lush emerald slopes, cloud forests, the aroma of handpicked Arabica coffee, and timeless Andean hospitality.",
    },
    {
      id: "bogota-boyaca",
      name: "Bogotá & Colonial Boyacá",
      tagline: "Heritage, High Altitudes & Culture",
      image: "/image/villa de leyva.jpg",
      duration: "8 Days / 7 Nights",
      circuitHref: "/circuitos/tour-colombia-boyaca-colonial",
      circuitName: "Colonial Boyacá Journey",
      priceFrom: "From $1,320 USD pp",
      highlights: [
        "Monserrate sanctuary overlooking Bogotá's skyline",
        "Underground Salt Cathedral of Zipaquirá",
        "Cobblestone plazas and whitewashed Villa de Leyva",
        "High-altitude Lake Tota and Paipa hot springs",
      ],
      description: "A refined immersion into 16th-century Spanish architecture, ancient indigenous gold legends, and serene highland landscapes.",
    },
    {
      id: "tatacoa-san-agustin",
      name: "Tatacoa & San Agustín",
      tagline: "Desert Stars & Ancient Megaliths",
      image: "/image/desierto-tatacoa.jpg",
      duration: "9 Days / 8 Nights",
      circuitHref: "/circuitos/epoca-precolombina-sur-colombia",
      circuitName: "Pre-Columbian South & Tatacoa",
      priceFrom: "From $1,490 USD pp",
      highlights: [
        "Trekking through red clay labyrinths of the Tatacoa Desert",
        "Guided astronomical stargazing under zero light pollution",
        "UNESCO-protected San Agustín megalithic stone sculptures",
        "The dramatic narrows of the Upper Magdalena River",
      ],
      description: "The mystical south of Colombia: wind-sculpted clay canyons, celestial night skies, and the continent's largest pre-Columbian necropolis.",
    },
    {
      id: "caribe-cartagena",
      name: "Cartagena & Caribbean Coast",
      tagline: "Walled Splendor & Coral Islands",
      image: "/image/cuidad-amurallada.jpg",
      duration: "14 Days / 13 Nights",
      circuitHref: "/circuitos/tour-colombia-tres-ciudades",
      circuitName: "Diverse Colombia Grand Tour",
      priceFrom: "From $2,150 USD pp",
      highlights: [
        "Private historic strolls through the Walled City & Getsemaní",
        "Golden-hour sunsets over Caribbean stone ramparts",
        "Private boat charters to the Rosario Coral Islands",
        "Tasting menus celebrating Afro-Caribbean coastal cuisine",
      ],
      description: "Timeless Caribbean romance with 16th-century Spanish bastions, vibrant bougainvillea, world-class seafood, and crystalline waters.",
    },
  ],
  de: [
    {
      id: "tolima-cafetero",
      name: "Kaffeeregion & Tolima",
      tagline: "Das Herz der Anden",
      image: "/image/Tolima-fotos/tolima_palmas-cera-ladera-verde-cielo-azul.jpg",
      duration: "13 Tage / 12 Nächte",
      circuitHref: "/circuitos/tour-colombia-corazon-andes",
      circuitName: "Reise Herz der Anden",
      priceFrom: "Ab $1.980 USD pp",
      highlights: [
        "Wachspalmen im Cocora-Tal",
        "Traditionelle Kaffeefincas mit Verkostung",
        "Natürliche Thermalquellen in Murillo",
        "Combeima-Schlucht und Anden-Natur",
      ],
      description: "Unsere Heimatregion. Grüne Berglandschaften, Nebelwälder, frischer Hochlandkaffee und herzliche kolumbianische Gastfreundschaft.",
    },
    {
      id: "bogota-boyaca",
      name: "Bogotá & Koloniales Boyacá",
      tagline: "Kultur & Geschichte",
      image: "/image/villa de leyva.jpg",
      duration: "8 Tage / 7 Nächte",
      circuitHref: "/circuitos/tour-colombia-boyaca-colonial",
      circuitName: "Koloniales Boyacá Tour",
      priceFrom: "Ab $1.320 USD pp",
      highlights: [
        "Panoramablick vom Monserrate-Hügel",
        "Unterirdische Salzkathedrale von Zipaquirá",
        "Kopfsteinpflaster in Villa de Leyva",
        "Thermalbäder in Paipa und Tota-See",
      ],
      description: "Eine Reise durch Kolonialarchitektur, jahrhundertealte Klöster und die mythischen Hochlandseen Kolumbiens.",
    },
    {
      id: "tatacoa-san-agustin",
      name: "Tatacoa & San Agustín",
      tagline: "Wüste & Archäologie",
      image: "/image/desierto-tatacoa.jpg",
      duration: "9 Tage / 8 Nächte",
      circuitHref: "/circuitos/epoca-precolombina-sur-colombia",
      circuitName: "Präkolumbischer Süden",
      priceFrom: "Ab $1.490 USD pp",
      highlights: [
        "Wanderung durch rote Lehmcanyons der Tatacoa",
        "Sternenbeobachtung am Nachthimmel",
        "UNESCO-Welterbe San Agustín Megalithen",
        "Schlucht des Magdalena-Flusses",
      ],
      description: "Der mystische Süden: Lehmformationen, klarer Sternenhimmel und die monumentalen Steinstatuen präkolumbischer Kulturen.",
    },
    {
      id: "caribe-cartagena",
      name: "Cartagena & Karibikküste",
      tagline: "Kolonialromantik & Koralleninseln",
      image: "/image/cuidad-amurallada.jpg",
      duration: "14 Tage / 13 Nächte",
      circuitHref: "/circuitos/tour-colombia-tres-ciudades",
      circuitName: "Kulturelle Vielfalt Kolumbiens",
      priceFrom: "Ab $2.150 USD pp",
      highlights: [
        "Historische Altstadt und Viertel Getsemaní",
        "Sonnenuntergang auf den Stadtmauern",
        "Bootsausflug zu den Rosario-Inseln",
        "Karibische Küche auf Sterneniveau",
      ],
      description: "Kolonialer Zauber mit spanischen Festungsmauern des 16. Jahrhunderts, Meeresbrise und türkisblauem Wasser.",
    },
  ],
  fr: [
    {
      id: "tolima-cafetero",
      name: "Région du Café & Tolima",
      tagline: "Le Cœur des Andes",
      image: "/image/Tolima-fotos/tolima_palmas-cera-ladera-verde-cielo-azul.jpg",
      duration: "13 Jours / 12 Nuits",
      circuitHref: "/circuitos/tour-colombia-corazon-andes",
      circuitName: "Voyage Cœur des Andes",
      priceFrom: "À partir de $1 980 USD pp",
      highlights: [
        "Palmiers de cire géants dans la Vallée de Cocora",
        "Plantations de café traditionnelles et dégustations",
        "Sources thermales de montagne à Murillo",
        "Sentiers du Canyon de Combeima",
      ],
      description: "Notre terroir d'origine. Montagnes verdoyantes, forêts de brume, café d'exception et hospitalité andine chaleureuse.",
    },
    {
      id: "bogota-boyaca",
      name: "Bogotá & Boyacá Colonial",
      tagline: "Histoire, Culture & Cordillère",
      image: "/image/villa de leyva.jpg",
      duration: "8 Jours / 7 Nuits",
      circuitHref: "/circuitos/tour-colombia-boyaca-colonial",
      circuitName: "Voyage Boyacá Colonial",
      priceFrom: "À partir de $1 320 USD pp",
      highlights: [
        "Sanctuaire de Monserrate dominant Bogotá",
        "Cathédrale de Sel souterraine de Zipaquirá",
        "Rues pavées de Villa de Leyva",
        "Eaux thermales de Paipa et Lac de Tota",
      ],
      description: "Un itinéraire raffiné au cœur de l'architecture coloniale espagnole et des légendes sacrées de l'Eldorado.",
    },
    {
      id: "tatacoa-san-agustin",
      name: "Tatacoa & San Agustín",
      tagline: "Désert & Vestiges Précolombiens",
      image: "/image/desierto-tatacoa.jpg",
      duration: "9 Jours / 8 Nuits",
      circuitHref: "/circuitos/epoca-precolombina-sur-colombia",
      circuitName: "Sud Précolombien & Tatacoa",
      priceFrom: "À partir de $1 490 USD pp",
      highlights: [
        "Randonnée dans les canyons ocres du Désert de Tatacoa",
        "Soirée d'observation astronomique sous un ciel pur",
        "Parc Archéologique de San Agustín (UNESCO)",
        "Gorges spectaculaires du Fleuve Magdalena",
      ],
      description: "Le sud mystique : paysages minéraux sculptés par le vent, ciels étoilés et mystérieuses statues millénaires.",
    },
    {
      id: "caribe-cartagena",
      name: "Carthagène & Côte Caraïbe",
      tagline: "Remparts Historiques & Îles Coralliennes",
      image: "/image/cuidad-amurallada.jpg",
      duration: "14 Jours / 13 Nuits",
      circuitHref: "/circuitos/tour-colombia-tres-ciudades",
      circuitName: "Grande Traversée de Colombie",
      priceFrom: "À partir de $2 150 USD pp",
      highlights: [
        "Flânerie privée dans la Cité Fortifiée et Getsemaní",
        "Coucher de soleil sur les remparts face aux Caraïbes",
        "Navigation privée vers les Îles du Rosaire",
        "Gastronomie côtière d'auteur",
      ],
      description: "Le romantisme caribéen avec ses bastions du XVIe siècle, ses façades colorées et ses eaux turquoise.",
    },
  ],
};

const SECTION_STRINGS = {
  es: {
    badge: "CORREDORES & DESTINOS CLAVE",
    title: "Explora las cuatro Colombias",
    subtitle: "Desde los cañones desérticos hasta las cumbres cafeteras y las costas coloniales, cada región ofrece una atmósfera completamente diferente.",
    ctaViewCircuit: "Ver Itinerario Completo",
    viewAllDestinations: "Explorar todos los circuitos",
  },
  en: {
    badge: "SIGNATURE TRAVEL CORRIDORS",
    title: "Explore the Four Faces of Colombia",
    subtitle: "From desert canyonlands and coffee-crested highlands to 16th-century Caribbean bastions, discover private routes curated by local insiders.",
    ctaViewCircuit: "View Full Itinerary",
    viewAllDestinations: "Explore all journeys",
  },
  de: {
    badge: "REISEKORRIDORE & DESTINATIONEN",
    title: "Die vier Gesichter Kolumbiens",
    subtitle: "Von Wüstencanyons über grüne Kaffeegipfel bis zu kolonialen Festungsstädten an der Karibik.",
    ctaViewCircuit: "Reisedetails ansehen",
    viewAllDestinations: "Alle Reisen entdecken",
  },
  fr: {
    badge: "CORRIDORS & DESTINATIONS PHARES",
    title: "Explorez les quatre visages de la Colombie",
    subtitle: "Des canyons désertiques aux crêtes caféières et aux cités fortifiées des Caraïbes.",
    ctaViewCircuit: "Voir l'itinéraire complet",
    viewAllDestinations: "Explorer tous les circuits",
  },
};

export function DestinationsShowcase({ locale }: DestinationsShowcaseProps) {
  const [activeId, setActiveId] = useState("tolima-cafetero");
  const corridors = CORRIDORS[(locale as keyof typeof CORRIDORS)] || CORRIDORS.es;
  const strings = SECTION_STRINGS[(locale as keyof typeof SECTION_STRINGS)] || SECTION_STRINGS.es;

  const active = corridors.find((c) => c.id === activeId) || corridors[0];

  return (
    <section className="py-20 md:py-28 bg-white border-t border-stone-200/60 relative">
      <div className="container mx-auto px-4 md:px-8">
        <SectionReveal>
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="max-w-2xl">
              <span className="label text-editorial-accent mb-3 block font-bold tracking-widest">
                {strings.badge}
              </span>
              <h2 className="display-2 text-editorial-dark font-heading font-medium tracking-tight">
                {strings.title}
              </h2>
              <p className="body text-editorial-muted mt-3">
                {strings.subtitle}
              </p>
            </div>
            <Link
              href={"/circuitos" as any}
              className="text-editorial-accent font-semibold hover:underline underline-offset-4 flex items-center gap-1.5 whitespace-nowrap self-start md:self-end group"
            >
              <span>{strings.viewAllDestinations}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-10 pb-2 border-b border-stone-200/70">
            {corridors.map((c) => {
              const isActive = c.id === active.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 min-h-[44px] flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-[#16352D] text-white shadow-md"
                      : "bg-[#FAF8F4] text-stone-700 hover:bg-stone-200/60 hover:text-stone-900 border border-stone-200/60"
                  }`}
                  aria-pressed={isActive}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isActive ? "text-emerald-400" : "text-stone-400"}`} />
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Corridor Card & Story */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#FAF8F4] rounded-3xl p-6 sm:p-8 md:p-12 border border-stone-200/80 shadow-sm"
            >
              {/* Image Col (5 cols) */}
              <div className="lg:col-span-5 relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-xl group">
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{active.duration}</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold block mb-1">
                    {active.tagline}
                  </span>
                  <h3 className="heading-2 font-heading font-medium text-white drop-shadow">
                    {active.name}
                  </h3>
                </div>
              </div>

              {/* Content Col (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full py-2">
                <div>
                  <span className="text-xs uppercase tracking-widest text-editorial-accent font-bold block mb-2">
                    {active.tagline}
                  </span>
                  <h3 className="display-3 text-editorial-dark font-heading font-medium mb-4">
                    {active.circuitName}
                  </h3>
                  <p className="body text-editorial-muted leading-relaxed mb-6">
                    {active.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-3 mb-8">
                    {active.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-stone-700 font-medium leading-snug">
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and CTA row */}
                <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] uppercase text-stone-500 block font-medium">
                      Tarifa base orientativa
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#16352D]">
                      {active.priceFrom}
                    </span>
                  </div>
                  <Link
                    href={active.circuitHref as any}
                    className="inline-flex items-center gap-2 bg-[#16352D] hover:bg-[#B49A68] hover:text-[#16352D] text-white px-6 py-3 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 shadow-md min-h-[44px]"
                  >
                    <span>{strings.ctaViewCircuit}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </SectionReveal>
      </div>
    </section>
  );
}
