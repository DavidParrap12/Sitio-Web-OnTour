import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ServiciosHero } from "./ServiciosHero";
import { ServiciosInteractiveGrid } from "./ServiciosInteractiveGrid";

const INTRO_HEADERS: Record<string, { tag: string; sub: string }> = {
  es: {
    tag: "Servicios DMC de Alta Calidad",
    sub: "Sitúa el cursor o toca cualquier servicio para explorar sus especialidades y estándares certificados.",
  },
  en: {
    tag: "High-End DMC Solutions",
    sub: "Hover or tap any service to explore certified standards, fleet details, and specialized capabilities.",
  },
  fr: {
    tag: "Services DMC Haut de Gamme",
    sub: "Survolez ou touchez un service pour découvrir nos normes certifiées, équipements et spécialités.",
  },
  de: {
    tag: "Erstklassige DMC-Dienstleistungen",
    sub: "Fahren Sie mit der Maus über einen Service oder tippen Sie darauf, um zertifizierte Standards und Schwerpunkte zu sehen.",
  },
};

const EXTENDED_DETAILS: Record<
  "es" | "en" | "fr" | "de",
  Record<
    string,
    {
      highlight: string;
      specialties: string[];
      certification: string;
    }
  >
> = {
  es: {
    guides: {
      highlight: "Guías oficiales con Tarjeta Profesional RNT, bilingüismo certificado y profundo arraigo cultural.",
      specialties: [
        "Alta Montaña & Nevados",
        "Arqueología de San Agustín",
        "Avistamiento de Aves (Birding)",
        "Cultura Cafetera & Patrimonio",
      ],
      certification: "Tarjeta Profesional RNT · Certificación WFA Primeros Auxilios en Zonas Remotas · Idiomas: Español, Inglés, Francés y Alemán",
    },
    transport: {
      highlight: "Flota moderna con conductores profesionales y monitoreo satelital GPS continuo.",
      specialties: [
        "Camionetas 4x4 de Expedición",
        "Vans Ejecutivas Climatizadas",
        "Conductores Certificados de Montaña",
        "Traslados Aeroportuarios VIP",
      ],
      certification: "Pólizas contractuales y extracontractuales al día · Monitoreo GPS 24/7 y asistencia en carretera",
    },
    accommodation: {
      highlight: "Curaduría estricta de alojamientos con encanto patrimonial, confort y privacidad.",
      specialties: [
        "Haciendas Cafeteras Tradicionales",
        "Hoteles Boutique con Historia",
        "Glampings de Lujo & Termales",
        "Ecolodges de Selva y Páramo",
      ],
      certification: "Auditoría de calidad y privacidad OnTour DMC · Alianzas con sellos de turismo sostenible",
    },
    insurance: {
      highlight: "Cobertura médica y operativa diseñada para expediciones y turismo de aventura.",
      specialties: [
        "Asistencia Médica Nacional",
        "Rescate y Evacuación en Zonas Remotas",
        "Atención Telefónica 24/7",
        "Cobertura de Deportes de Aventura",
      ],
      certification: "Respaldo de aseguradoras líderes · Pólizas integrales para viajeros internacionales",
    },
    food: {
      highlight: "Sabores auténticos de origen, catas privadas de café especial y alta cocina regional.",
      specialties: [
        "Catas de Café Varietales (Geisha, Borbón)",
        "Menús Degustación con Chefs Locales",
        "Gastronomía Típica del Tolima & Huila",
        "Adaptabilidad Vegetariana & Alérgenos",
      ],
      certification: "Estándares higiénicos certificados · Insumos de cooperativas y familias campesinas",
    },
    events: {
      highlight: "Coordinación experta de incentivos corporativos, convenciones y bodas de destino.",
      specialties: [
        "Viajes de Incentivo MICE",
        "Bodas de Destino en el Eje Cafetero",
        "Retiros Corporativos de Bienestar",
        "Producción Audiovisual & Escenografía",
      ],
      certification: "Equipo de operaciones dedicado en territorio con SLA de contingencia 24h",
    },
  },
  en: {
    guides: {
      highlight: "Official certified guides with National Tourism Cards (RNT), verified fluency, and local heritage expertise.",
      specialties: [
        "High Mountain & Nevados",
        "San Agustín Archaeology",
        "Birdwatching Expeditions",
        "Coffee Cultural Landscape",
      ],
      certification: "Official RNT Professional Card · Wilderness First Aid (WFA) Certified · Languages: English, French, German, Spanish",
    },
    transport: {
      highlight: "Modern executive fleet with experienced mountain drivers and 24/7 satellite GPS tracking.",
      specialties: [
        "Expedition 4x4 Vehicles",
        "Executive Air-Conditioned Vans",
        "Certified Mountain Drivers",
        "VIP Airport Chauffeur Service",
      ],
      certification: "Full contractual & liability commercial insurance policies · 24/7 GPS dispatch and roadside support",
    },
    accommodation: {
      highlight: "Strict boutique curation prioritizing architectural heritage, comfort, and secluded privacy.",
      specialties: [
        "Historic Coffee Haciendas",
        "Boutique Heritage Hotels",
        "Luxury Hot Spring Glampings",
        "Cloud Forest & Moor Ecolodges",
      ],
      certification: "OnTour DMC comfort and privacy audit · Partnered with verified sustainable tourism certifications",
    },
    insurance: {
      highlight: "Comprehensive medical and operational coverage tailored for remote adventure expeditions.",
      specialties: [
        "Nationwide Medical Assistance",
        "Remote Search & Evacuation Rescue",
        "24/7 Multilingual Emergency Line",
        "Adventure Sports Coverage",
      ],
      certification: "Underwritten by leading international underwriters · Full coverage for inbound international travelers",
    },
    food: {
      highlight: "Origin-driven culinary experiences, private specialty coffee cuppings, and fine regional gastronomy.",
      specialties: [
        "Specialty Coffee Cuppings (Geisha, Bourbon)",
        "Tasting Menus by Renowned Local Chefs",
        "Traditional Tolima & Huila Cuisine",
        "Plant-Based & Allergen Dietary Options",
      ],
      certification: "Certified hygiene & food safety standards · Fair-trade sourcing from local farming cooperatives",
    },
    events: {
      highlight: "Turnkey management for corporate incentives, conferences, and luxury destination weddings.",
      specialties: [
        "Corporate MICE Incentive Trips",
        "Coffee Region Destination Weddings",
        "Executive Wellness Retreats",
        "Audiovisual Production & Staging",
      ],
      certification: "Dedicated on-ground operations squad with guaranteed 24h contingency response",
    },
  },
  fr: {
    guides: {
      highlight: "Guides officiels certifiés RNT, bilingues et trilingues, passionnés par l'histoire et la biodiversité colombienne.",
      specialties: [
        "Haute Montagne & Nevados",
        "Archéologie de San Agustín",
        "Observation des Oiseaux (Birding)",
        "Culture du Café & Patrimoine",
      ],
      certification: "Carte Professionnelle RNT · Brevet Premiers Secours en Milieu Isolé (WFA) · Langues : Français, Anglais, Allemand, Espagnol",
    },
    transport: {
      highlight: "Flotte moderne avec chauffeurs expérimentés et suivi GPS par satellite en temps réel.",
      specialties: [
        "Véhicules 4x4 d'Expédition",
        "Vans Exécutifs Climatisés",
        "Chauffeurs Certifiés de Montagne",
        "Transferts Aéroportuaires VIP",
      ],
      certification: "Assurances transport complètes à jour · Suivi GPS 24/7 et assistance routière continue",
    },
    accommodation: {
      highlight: "Sélection rigoureuse d'adresses d'exception alliant charme patrimonial, confort et intimité.",
      specialties: [
        "Haciendas Caféières Historiques",
        "Hôtels Boutique Patrimoniaux",
        "Glampings de Luxe & Thermes",
        "Écolodges en Forêt de Nuages",
      ],
      certification: "Audit rigoureux de confort et d'intimité OnTour DMC · Partenaires certifiés écoresponsables",
    },
    insurance: {
      highlight: "Assistance médicale et opérationnelle complète conçue pour l'aventure et l'expédition.",
      specialties: [
        "Assistance Médicale Nationale",
        "Recherche & Évacuation en Milieu Isolé",
        "Ligne d'Urgence Multilingue 24/7",
        "Couverture Sports d'Aventure",
      ],
      certification: "Garantie par les plus grands assureurs internationaux · Couverture totale pour voyageurs étrangers",
    },
    food: {
      highlight: "Immersion culinaire du terroir, dégustations privées de cafés de spécialité et haute cuisine locale.",
      specialties: [
        "Dégustations de Cafés Rares (Geisha, Bourbon)",
        "Menus Dégustation avec Chefs Locaux",
        "Gastronomie Traditionnelle du Tolima",
        "Options Végétariennes & Sans Allergènes",
      ],
      certification: "Normes strictes d'hygiène alimentaire · Produits issus directement de coopératives paysannes",
    },
    events: {
      highlight: "Organisation sur-mesure de voyages d'affaires, séminaires MICE et mariages de destination.",
      specialties: [
        "Voyages de Motivation & Séminaires MICE",
        "Mariages de Prestige dans la Région du Café",
        "Retraites d'Entreprise Bien-être",
        "Production Scénique & Audiovisuelle",
      ],
      certification: "Équipe locale dédiée à l'événementiel avec protocole d'assistance immédiate 24/7",
    },
  },
  de: {
    guides: {
      highlight: "Offiziell lizenzierte Reiseleiter mit RNT-Zertifizierung, Mehrsprachigkeit und fundierter Landeskenntnis.",
      specialties: [
        "Hochgebirge & Nevados",
        "Archäologie in San Agustín",
        "Vogelbeobachtung (Birding)",
        "Kaffeekultur & Welterbe",
      ],
      certification: "Offizieller RNT-Ausweis · WFA-Wildnis-Erste-Hilfe zertifiziert · Sprachen: Deutsch, Englisch, Französisch, Spanisch",
    },
    transport: {
      highlight: "Moderne Fahrzeugflotte mit erfahrenen Chauffeuren und kontinuierlicher 24/7 GPS-Satellitenüberwachung.",
      specialties: [
        "4x4-Expeditionsfahrzeuge",
        "Klimatisierte Executive-Vans",
        "Zertifizierte Gebirgsfahrer",
        "VIP-Flughafentransfers",
      ],
      certification: "Vollständige Personen- und Haftpflichtversicherung · 24/7 GPS-Überwachung und Pannenhilfe",
    },
    accommodation: {
      highlight: "Sorgfältig kuratierte Boutique-Unterkünfte mit historischem Charme, höchstem Komfort und Privatsphäre.",
      specialties: [
        "Historische Kaffee-Haciendas",
        "Kulturerbe-Boutiquehotels",
        "Luxus-Thermalglampings",
        "Nebelwald- & Páramo-Ecolodges",
      ],
      certification: "OnTour DMC Qualitäts- und Privatsphäre-Audit · Verifizierte Nachhaltigkeitssiegel",
    },
    insurance: {
      highlight: "Umfassender medizinischer und operativer Schutz für Expeditionen und Abenteuerreisen.",
      specialties: [
        "Landesweite medizinische Hilfe",
        "Notfall-Evakuierung in abgelegenen Gebieten",
        "24/7 mehrsprachige Notruf-Hotline",
        "Versicherungsschutz für Outdoorsport",
      ],
      certification: "Kooperation mit führenden Reiseversicherern · Volldeckung für internationale Gäste",
    },
    food: {
      highlight: "Authentische regionale Kulinarik, private Kaffeeverkostungen und hochwertige Erzeugerküche.",
      specialties: [
        "Verkostung von Spitzenkaffees (Geisha, Bourbon)",
        "Degustationsmenüs mit einheimischen Köchen",
        "Traditionelle Küche aus Tolima & Huila",
        "Vegetarische & allergikerfreundliche Optionen",
      ],
      certification: "Zertifizierte Hygiene- und Frischestandards · Direktbezug von lokalen Bauernkooperativen",
    },
    events: {
      highlight: "Professionelle Organisation von Incentive-Reisen, Tagungen und exklusiven Destination Weddings.",
      specialties: [
        "MICE-Incentivereisen für Unternehmen",
        "Traumhochzeiten in der Kaffeeregion",
        "Führungskräfte-Gesundheitsretreats",
        "Bühnen- & Medientechnik",
      ],
      certification: "Erfahrenes Event-Team vor Ort mit verlässlichem 24h-Bereitschaftsservice",
    },
  },
};

export default async function ServiciosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  const langKey = (["es", "en", "fr", "de"].includes(locale) ? locale : "es") as "es" | "en" | "fr" | "de";
  const headerTexts = INTRO_HEADERS[langKey] || INTRO_HEADERS.es;
  const detailsByLang = EXTENDED_DETAILS[langKey] || EXTENDED_DETAILS.es;

  const servicesKeys = ["guides", "transport", "accommodation", "insurance", "food", "events"] as const;

  const imagesMap: Record<string, string> = {
    guides: "/image/servicios/guides.jpeg",
    transport: "/image/servicios/transport.jpeg",
    accommodation: "/image/servicios/accommodation.jpeg",
    insurance: "/image/servicios/insurance.jpeg",
    food: "/image/servicios/food.jpg",
    events: "/image/servicios/events.jpeg",
  };

  const servicesData = servicesKeys.map((key) => ({
    key,
    image: imagesMap[key],
    title: t(`${key}.title`),
    description: t(`${key}.description`),
    features: [
      t(`${key}.feature1`),
      t(`${key}.feature2`),
      t(`${key}.feature3`),
    ],
    extendedInfo: detailsByLang[key],
  }));

  return (
    <div className="min-h-screen bg-[#F7F5EF]">
      {/* Hero — editorial style */}
      <ServiciosHero title={t("title")} subtitle={t("subtitle")} />

      {/* Services Grid with Interactive Hover/Tap Expansion */}
      <div className="container mx-auto px-4 md:px-6 mt-16 md:mt-20">
        <div className="max-w-6xl mx-auto mb-8 text-center sm:text-left">
          <p className="text-xs uppercase font-bold tracking-widest text-[#B49A68]">
            {headerTexts.tag}
          </p>
          <p className="text-stone-500 text-sm mt-1">
            {headerTexts.sub}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <ServiciosInteractiveGrid services={servicesData} />
        </div>

        {/* CTA B2B / Direct Booking */}
        <div className="max-w-6xl mx-auto mt-20 text-center bg-white rounded-3xl p-10 md:p-14 shadow-sm border border-stone-200">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-[#16352D] mb-4">
            {t("ctaTitle")}
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto mb-8 text-base font-light leading-relaxed">
            {t("ctaSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contacto"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#16352D] hover:bg-[#B49A68] hover:text-[#16352D] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all min-h-[44px]"
            >
              {t("ctaButton")}
            </Link>
            <a
              href="https://reservas.ontourdmc.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-stone-300 hover:border-stone-400 bg-stone-50 hover:bg-stone-100 text-stone-700 text-sm font-medium transition-all min-h-[44px]"
            >
              <span>{t("aviaturButton")}</span>
              <ExternalLink className="w-4 h-4 text-stone-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
