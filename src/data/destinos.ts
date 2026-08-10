
export interface AsExtension {
  /** IDs of circuits that offer this pasadía as an optional add-on */
  linkedCircuits: string[];
  /** Base price in USD shown in the extension card */
  extensionPrice?: number;
  /** Human-readable duration shown in the card, e.g. "1 day" */
  extensionDuration?: string;
  /** Context label for the extension, e.g. "Arrival day", "Add-on" */
  extensionLabel?: string;
}

export interface Destino {
  id: string;
  image: string;
  brochureUrl?: string;
  gallery?: string[];
  /** When present, this pasadía can be offered as an optional add-on for the linked circuits */
  asExtension?: AsExtension;
}

export const destinos: Destino[] = [
  {
    id: "Medellin-Magica",
    image: "/image/comuna 13.jpg",
    asExtension: {
      linkedCircuits: [
        "tour-colombia-eje-cafetero",
        "tour-colombia-tres-ciudades",
        "tour-colombia-corazon-andes",
      ],
      extensionPrice: 85,
      extensionDuration: "1 day",
      extensionLabel: "Arrival or departure day",
    },
    gallery: [
      "/image/pasadias/Pasadias_por_medellin_2026/Captura-de-pantalla-2025-12-27-115519-720x1024.png",
      "/image/pasadias/Pasadias_por_medellin_2026/Captura-de-pantalla-2025-12-27-115509-717x1024.png",
      "/image/pasadias/Pasadias_por_medellin_2026/Captura-de-pantalla-2025-12-27-115453-717x1024.png",
      "/image/pasadias/Pasadias_por_medellin_2026/Captura-de-pantalla-2025-12-27-115442-720x1024.png",
      "/image/pasadias/Pasadias_por_medellin_2026/Captura-de-pantalla-2025-12-27-115424-723x1024.png",
      "/image/pasadias/Pasadias_por_medellin_2026/Captura-de-pantalla-2025-12-27-115411-722x1024.png",
      "/image/pasadias/Pasadias_por_medellin_2026/Captura-de-pantalla-2025-12-27-115354-722x1024.png",
    ]   
  },
  {
    id: "bogota-tu-casa-pasadia",
    image: "/image/la-candelaria.jpg",
    asExtension: {
      linkedCircuits: [
        "epoca-precolombina-sur-colombia",
        "tour-colombia-boyaca-colonial",
        "tour-colombia-colonial-aventurera",
        "tour-santander-expedicion-aventurera",
      ],
      extensionPrice: 75,
      extensionDuration: "1 day",
      extensionLabel: "Start your journey with a full day in Bogotá",
    },
    gallery: [
      "/image/pasadias/Pasadias_por_bogota_2026/Captura-de-pantalla-2025-12-27-121529-721x1024.png",
      "/image/pasadias/Pasadias_por_bogota_2026/Captura-de-pantalla-2025-12-27-121627-717x1024.png",
      "/image/pasadias/Pasadias_por_bogota_2026/Captura-de-pantalla-2025-12-27-122059-719x1024.png",
      "/image/pasadias/Pasadias_por_bogota_2026/Captura-de-pantalla-2025-12-27-122310-722x1024.png",
      "/image/pasadias/Pasadias_por_bogota_2026/Captura-de-pantalla-2025-12-27-122322-718x1024.png",
    ]
  },
  {
    id: "cascada-la-plata-pasadia",
    image: "/image/rivera.jpg",
    asExtension: {
      linkedCircuits: [
        "tour-camino-real",
        "tour-colombia-corazon-andes",
        "tour-colombia-capitales-cafeteras",
        "tour-tras-leyenda-dorado",
      ],
      extensionPrice: 70,
      extensionDuration: "1 day",
      extensionLabel: "Nature day from Ibagué",
    },
    gallery: [
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0001.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0002.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0003.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0004.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0005.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0006.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0007.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0008.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0009.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0010.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0011.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0012.jpg",
      "/image/pasadias/Pasadias_por_tolima_2026/PASADIAS POR EL TOLIMA 2026_page-0013.jpg",
    ],
  },
  {
    id: "Cali-es-donde-debe-estar",
    image: "/image/Lago-Calima-aventura.jpg",
    gallery:[
      "/image/pasadias/Pasadias_por_cali_2026/Captura-de-pantalla-2026-03-18-094216-717x1024.png", 
      "/image/pasadias/Pasadias_por_cali_2026/Captura-de-pantalla-2026-03-18-094436-721x1024.png",
      "/image/pasadias/Pasadias_por_cali_2026/Captura-de-pantalla-2026-03-18-094520-717x1024.png", 
      "/image/pasadias/Pasadias_por_cali_2026/Captura-de-pantalla-2026-03-18-094552-719x1024.png", 
      "/image/pasadias/Pasadias_por_cali_2026/Captura-de-pantalla-2026-03-18-094622-724x1024.png",
      "/image/pasadias/Pasadias_por_cali_2026/Captura-de-pantalla-2026-03-18-094816-719x1024.png"
    ]
  },
  {
    id: "Cartagena-Mas-Heroica",
    image: "/image/amurallada-cuidad (1).jpg",
    gallery: [
      "/image/pasadias/Pasadias_por_cartagena_2026/Captura2-1-722x1024.png",
      "/image/pasadias/Pasadias_por_cartagena_2026/Captura3-1-721x1024.png",
      "/image/pasadias/Pasadias_por_cartagena_2026/Captura4-1-721x1024.png",
      "/image/pasadias/Pasadias_por_cartagena_2026/Captura6-1-718x1024.png",
      "/image/pasadias/Pasadias_por_cartagena_2026/Captura7-1-720x1024.png",
      "/image/pasadias/Pasadias_por_cartagena_2026/Captura8-1-721x1024.png  ",
    ]
  },
  {
    id: "Santa-Marta-Naturalmente-Magica",
    image: "/image/parque-nacional-natural.jpg",
    gallery: [
      "/image/pasadias/Pasadias_Santa_Marta_2026/Captura-de-pantalla-2025-12-29-101449-724x1024.png", 
      "/image/pasadias/Pasadias_Santa_Marta_2026/Captura-de-pantalla-2025-12-29-101503-721x1024.png", 
      "/image/pasadias/Pasadias_Santa_Marta_2026/Captura-de-pantalla-2025-12-29-101514-722x1024.png", 
      "/image/pasadias/Pasadias_Santa_Marta_2026/Captura-de-pantalla-2025-12-29-101910-721x1024.png", 
      "/image/pasadias/Pasadias_Santa_Marta_2026/Captura-de-pantalla-2025-12-29-101933-720x1024.png", 
      "/image/pasadias/Pasadias_Santa_Marta_2026/Captura-de-pantalla-2025-12-29-101944-723x1024 (1).png", 
      "/image/pasadias/Pasadias_Santa_Marta_2026/Captura-de-pantalla-2025-12-29-101944-723x1024.png"
    ]
  },
  {
    id: "San-Andres-Islas-Vas-A-mar",
    image: "/image/Parque-regional-johnny-cay_0.jpg",
    gallery: [
      "/image/pasadias/Pasadias_san_andres_2026/Captura-718x1024.png",
      "/image/pasadias/Pasadias_san_andres_2026/Captura2-725x1024.png",
      "/image/pasadias/Pasadias_san_andres_2026/Captura3-719x1024.png",
      "/image/pasadias/Pasadias_san_andres_2026/Captura4-725x1024.png",
      "/image/pasadias/Pasadias_san_andres_2026/Captura5-719x1024.png",
      "/image/pasadias/Pasadias_san_andres_2026/Captura6-720x1024.png",
      "/image/pasadias/Pasadias_san_andres_2026/Captura7-722x1024.png",
      "/image/pasadias/Pasadias_san_andres_2026/Captura8-719x1024.png",
      "/image/pasadias/Pasadias_san_andres_2026/Captura9-721x1024.png",
      "/image/pasadias/Pasadias_san_andres_2026/Captura10-720x1024.png"
    ]
  }
];
