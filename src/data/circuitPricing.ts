/**
 * Tarifario público de Circuitos OnTour DMC, autorizado para mostrarse en el cotizador.
 * Precios por persona en USD según categoría hotelera (Turista Superior 4* y Turista 3*)
 * y tamaño de grupo (1-4 pax, 5-10 pax, 11-15 pax) extraídos de los programas oficiales en PDF.
 */

export type HotelCategoryKey = "turista_sup_4" | "turista_3";
export type PartyTierKey = "tier_1_4" | "tier_5_10" | "tier_11_15" | "tier_16_plus";

export interface CircuitTierPrices {
  tier_1_4: number | null;   // 1 a 4 personas (USD por persona)
  tier_5_10: number | null;  // 5 a 10 personas (USD por persona)
  tier_11_15: number | null; // 11 a 15 personas (USD por persona)
}

export interface CircuitPricingCategories {
  turista_sup_4: {
    label: string;
    sub: string;
    hotelExamples: string;
    prices: CircuitTierPrices;
  };
  turista_3: {
    label: string;
    sub: string;
    hotelExamples: string;
    prices: CircuitTierPrices;
  };
}

export interface CircuitPricingItem {
  id: string;
  name: string;
  shortName: string;
  days: number;
  nights: number;
  brochurePdfUrl?: string;
  categories: CircuitPricingCategories;
}

export const CIRCUIT_PRICING: Record<string, CircuitPricingItem> = {
  "tour-colombia-capitales-cafeteras": {
    id: "tour-colombia-capitales-cafeteras",
    name: "Capitales Cafeteras de Colombia",
    shortName: "Capitales Cafeteras (12D/11N)",
    days: 12,
    nights: 11,
    brochurePdfUrl: "/programas-circuitos/Capitales Cafeteras de Colombia 12 dias (1).pdf",
    categories: {
      turista_sup_4: {
        label: "Turista Superior 4*",
        sub: "Hoteles 4* seleccionados",
        hotelExamples: "Cosmos 100, GHL Sonesta, Mocawa Plaza, Pantagora, Colonial, Terra Inn",
        prices: {
          tier_1_4: 4360,
          tier_5_10: 5270,
          tier_11_15: 5950,
        },
      },
      turista_3: {
        label: "Turista 3*",
        sub: "Hoteles 3* confort",
        hotelExamples: "Dann Carlton, Eco Star, Isa Victory, Pantagora, Casa Celeste, Camino a Santafé",
        prices: {
          tier_1_4: 3970,
          tier_5_10: 4880,
          tier_11_15: 5550,
        },
      },
    },
  },

  "epoca-precolombina-sur-colombia": {
    id: "epoca-precolombina-sur-colombia",
    name: "Época Precolombina Sur de Colombia",
    shortName: "Época Precolombina (9D/8N)",
    days: 9,
    nights: 8,
    brochurePdfUrl: "/programas-circuitos/Época Precolombina 9 días.pdf",
    categories: {
      turista_sup_4: {
        label: "Turista Superior 4*",
        sub: "Hoteles 4* seleccionados",
        hotelExamples: "Cosmos 100, GHL Style, El Shaddai, Ceyba by Masaya",
        prices: {
          tier_1_4: 4380,
          tier_5_10: 4190,
          tier_11_15: 3890,
        },
      },
      turista_3: {
        label: "Turista 3*",
        sub: "Hoteles 3* confort",
        hotelExamples: "Dann Carlton, Club Campestre, Luna Azul, El Maco",
        prices: {
          tier_1_4: 4000,
          tier_5_10: 3880,
          tier_11_15: 3590,
        },
      },
    },
  },

  "tour-santander-expedicion-aventurera": {
    id: "tour-santander-expedicion-aventurera",
    name: "Santander Expedición Aventurera",
    shortName: "Santander Aventurera (10D/9N)",
    days: 10,
    nights: 9,
    brochurePdfUrl: "/programas-circuitos/Santander Expedición Aventurera 10 días.pdf",
    categories: {
      turista_sup_4: {
        label: "Turista Superior 4*",
        sub: "Hoteles 4* seleccionados",
        hotelExamples: "Cosmos 100, GHL Style, El Shaddai",
        prices: {
          tier_1_4: 4490,
          tier_5_10: 4180,
          tier_11_15: 3890,
        },
      },
      turista_3: {
        label: "Turista 3*",
        sub: "Hoteles 3* confort",
        hotelExamples: "Dann Carlton, Club Campestre, Luna Azul",
        prices: {
          tier_1_4: 4190,
          tier_5_10: 3990,
          tier_11_15: 3690,
        },
      },
    },
  },

  "tour-colombia-boyaca-colonial": {
    id: "tour-colombia-boyaca-colonial",
    name: "Época Prehispánica Boyacá Colonial",
    shortName: "Boyacá Colonial (7D/6N)",
    days: 7,
    nights: 6,
    brochurePdfUrl: "/programas-circuitos/Época Prehispanica Boyaca 7 días.pdf",
    categories: {
      turista_sup_4: {
        label: "Turista Superior 4*",
        sub: "Hoteles 4* seleccionados",
        hotelExamples: "Cosmos 100, Boutique El Carmel, Estelar Paipa",
        prices: {
          tier_1_4: 4590,
          tier_5_10: 4280,
          tier_11_15: 3990,
        },
      },
      turista_3: {
        label: "Turista 3*",
        sub: "Hoteles 3* confort",
        hotelExamples: "Dann Carlton, Casa Alcestre, El Bosque de Paipa",
        prices: {
          tier_1_4: 4290,
          tier_5_10: 4080,
          tier_11_15: 3790,
        },
      },
    },
  },

  // =========================================================================
  // ESPACIO RESERVADO PARA AGREGAR TARIFAS DE LOS DEMÁS CIRCUITOS
  // Modifica los valores null cuando tengas listos los PDFs/Word de cada uno.
  // =========================================================================

  "tour-colombia-corazon-andes": {
    id: "tour-colombia-corazon-andes",
    name: "Corazón de los Andes",
    shortName: "Corazón de los Andes (13D/12N)",
    days: 13,
    nights: 12,
    categories: {
      turista_sup_4: {
        label: "Turista Superior 4*",
        sub: "Hoteles 4* seleccionados",
        hotelExamples: "Bogotá, Ibagué, Salento, Manizales, Honda",
        prices: {
          tier_1_4: null,   // <-- Coloca aquí el precio para 1 a 4 personas en USD
          tier_5_10: null,  // <-- Coloca aquí el precio para 5 a 10 personas en USD
          tier_11_15: null, // <-- Coloca aquí el precio para 11 a 15 personas en USD
        },
      },
      turista_3: {
        label: "Turista 3*",
        sub: "Hoteles 3* confort",
        hotelExamples: "Hoteles 3* seleccionados",
        prices: {
          tier_1_4: null,
          tier_5_10: null,
          tier_11_15: null,
        },
      },
    },
  },

  "tour-camino-real": {
    id: "tour-camino-real",
    name: "Camino Real",
    shortName: "Camino Real (7D/6N)",
    days: 7,
    nights: 6,
    categories: {
      turista_sup_4: {
        label: "Turista Superior 4*",
        sub: "Hoteles 4* seleccionados",
        hotelExamples: "Bogotá, Ibagué, Honda, Guaduas",
        prices: {
          tier_1_4: null,   // <-- Coloca aquí el precio para 1 a 4 personas en USD
          tier_5_10: null,  // <-- Coloca aquí el precio para 5 a 10 personas en USD
          tier_11_15: null, // <-- Coloca aquí el precio para 11 a 15 personas en USD
        },
      },
      turista_3: {
        label: "Turista 3*",
        sub: "Hoteles 3* confort",
        hotelExamples: "Hoteles 3* seleccionados",
        prices: {
          tier_1_4: null,
          tier_5_10: null,
          tier_11_15: null,
        },
      },
    },
  },

  "tour-colombia-tres-ciudades": {
    id: "tour-colombia-tres-ciudades",
    name: "Colombia Diversamente Cultural",
    shortName: "Colombia Diversamente Cultural (14D/13N)",
    days: 14,
    nights: 13,
    brochurePdfUrl: "/programas-circuitos/Colombia Diversamente Cultural 14 días.pdf",
    categories: {
      turista_sup_4: {
        label: "Turista Superior 4*",
        sub: "Hoteles 4* seleccionados",
        hotelExamples: "Cosmos 100 Hotel, The Click Clack, Hotel Casa la Factoria",
        prices: {
          tier_1_4: 9890,
          tier_5_10: 8280,
          tier_11_15: 7880,
        },
      },
      turista_3: {
        label: "Turista 3*",
        sub: "Hoteles 3* confort",
        hotelExamples: "Dann Carlton, 23 Hotel Medellín, AI Alma",
        prices: {
          tier_1_4: 8180,
          tier_5_10: 7480,
          tier_11_15: 6990,
        },
      },
    },
  },
};

/** Lista ordenada de circuitos disponibles para cotización */
export const AVAILABLE_CIRCUITS_PRICING = Object.values(CIRCUIT_PRICING);

/** Helper para encontrar el circuito por ID o por coincidencia en texto */
export function findCircuitPricing(idOrSearch?: string): CircuitPricingItem | undefined {
  if (!idOrSearch) return undefined;
  const normalized = idOrSearch.toLowerCase().trim();

  // Búsqueda directa por ID
  if (CIRCUIT_PRICING[normalized]) {
    return CIRCUIT_PRICING[normalized];
  }

  // Búsqueda por palabras clave
  return AVAILABLE_CIRCUITS_PRICING.find((c) => {
    const cId = c.id.toLowerCase();
    const cName = c.name.toLowerCase();
    return (
      cId === normalized ||
      cName.includes(normalized) ||
      normalized.includes(cId) ||
      normalized.includes(cName) ||
      (normalized.includes("cafetera") && cId.includes("cafeteras")) ||
      (normalized.includes("precolombin") && cId.includes("precolombina")) ||
      (normalized.includes("boyac") && cId.includes("boyaca")) ||
      (normalized.includes("santander") && cId.includes("santander")) ||
      (normalized.includes("andes") && cId.includes("corazon-andes")) ||
      (normalized.includes("camino") && cId.includes("camino-real")) ||
      (normalized.includes("diversamente") && cId.includes("tres-ciudades"))
    );
  });
}

/** Devuelve la clave del tier ('tier_1_4', 'tier_5_10', 'tier_11_15', 'tier_16_plus') según el recuento */
export function getTierKeyFromCount(count: number): PartyTierKey {
  if (count <= 4) return "tier_1_4";
  if (count <= 10) return "tier_5_10";
  if (count <= 15) return "tier_11_15";
  return "tier_16_plus";
}

/** Devuelve el conteo de pasajeros por defecto de un tier */
export function getDefaultCountForTier(tier: PartyTierKey): number {
  switch (tier) {
    case "tier_1_4":
      return 4;
    case "tier_5_10":
      return 6;
    case "tier_11_15":
      return 12;
    case "tier_16_plus":
      return 16;
  }
}
