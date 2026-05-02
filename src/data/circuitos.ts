export interface CircuitoDayImage {
  image: string;
  location: string;
}

export interface Circuito {
  id: string;
  days: number;
  nights: number;
  image: string;
  dayImages: CircuitoDayImage[];
  brochureUrl?: string;
  brochurePdfUrl?: string;
}

export const circuitos: Circuito[] = [
  {
    id: "epoca-precolombina-sur-colombia",
    days: 9,
    nights: 8,
    image: "/image/estatuas-san-agustin-antiguedad-portada.jpg",
    brochureUrl: "/downloads/circuitos/Epoca-Precolombina-Sur-de-Colombia.docx",
    brochurePdfUrl: "/downloads/circuitos/Epoca-Precolombina-Sur-de-Colombia.pdf",
    dayImages: [
      { image: "/image/legado-ancestral/Aeropuerto-Internacional-El-Dorado-Bogota-Colombia-5.jpg", location: "BOGOTÁ" },
      { image: "/image/legado-ancestral/iglesia-monserrate-1.jpg", location: "MONSERRATE" },
      { image: "/image/legado-ancestral/catedral-1.jpg", location: "ZIPAQUIRÁ" },
      { image: "/image/legado-ancestral/img2asdf.jpg", location: "PRADO" },
      { image: "/image/legado-ancestral/cascadas-prado-tolima.jpg", location: "TOLIMA" },
      { image: "/image/legado-ancestral/Desierto-de-la-tatacoa.png", location: "HUILA" },
      { image: "/image/legado-ancestral/rio-magdalena.jpg", location: "SAN AGUSTÍN" },
      { image: "/image/legado-ancestral/puente-de-cristal.jpg", location: "HUILA" },
      { image: "/image/legado-ancestral/cordillera-de-los-andes.jpg", location: "BOGOTÁ" },
    ],
  },
  {
    id: "tour-colombia-corazon-andes",
    days: 13,
    nights: 12,
    image: "/image/makalu-colombia-3631740.jpg",
    dayImages: [
      { image: "/image/legado-ancestral/Aeropuerto-Internacional-El-Dorado-Bogota-Colombia-5.jpg", location: "BOGOTÁ" },
      { image: "/image/legado-ancestral/iglesia-monserrate-1.jpg", location: "MONSERRATE" },
      { image: "/image/legado-ancestral/catedral-1.jpg", location: "ZIPAQUIRÁ" },
      { image: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.10 PM (3).jpeg", location: "IBAGUÉ" },
      { image: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.12 PM.jpeg", location: "IBAGUÉ" },
      { image: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.14 PM (3).jpeg", location: "QUINDÍO" },
      { image: "/image/jardin-botanico-quindio.jpg", location: "ARMENIA" },
      { image: "/image/kinenriquez-valle-de-cocora-4959051_1920.jpg", location: "SALENTO" },
      { image: "/image/murillo-tolima.jpg", location: "MANIZALES" },
      { image: "/image/LÍBANO.jpeg", location: "LÍBANO" },
      { image: "/image/honda-tolima.jpg", location: "HONDA" },
      { image: "/image/guadas.jpg", location: "GUADUAS" },
      { image: "/image/legado-ancestral/Aeropuerto-Internacional-El-Dorado-Bogota-Colombia-5.jpg", location: "BOGOTÁ" },
    ],
  },
  {
    id: "tour-colombia-boyaca-colonial",
    days: 8,
    nights: 7,
    image: "/image/villa de leyva.jpg",
    dayImages: [
      { image: "/image/legado-ancestral/Aeropuerto-Internacional-El-Dorado-Bogota-Colombia-5.jpg", location: "BOGOTÁ" },
      { image: "/image/legado-ancestral/iglesia-monserrate-1.jpg", location: "MONSERRATE" },
      { image: "/image/legado-ancestral/catedral-1.jpg", location: "ZIPAQUIRÁ" },
      { image: "/image/villa de leyva.jpg", location: "VILLA DE LEYVA" },
      { image: "/image/termales-paipa.jpg", location: "TUNJA" },
      { image: "/image/lago-de-tota.jfif", location: "LAGO DE TOTA" },
      { image: "/image/puente-de-boyaca-tfyx640.jpg", location: "BOYACÁ" },
      { image: "/image/legado-ancestral/Aeropuerto-Internacional-El-Dorado-Bogota-Colombia-5.jpg", location: "BOGOTÁ" },
    ],
  },
  {
    id: "tour-colombia-tres-ciudades",
    days: 14,
    nights: 13,
    image: "/image/cuidad-amurallada.jpg",
    dayImages: [
      { image: "/image/legado-ancestral/Aeropuerto-Internacional-El-Dorado-Bogota-Colombia-5.jpg", location: "BOGOTÁ" },
      { image: "/image/legado-ancestral/iglesia-monserrate-1.jpg", location: "MONSERRATE" },
      { image: "/image/legado-ancestral/catedral-1.jpg", location: "ZIPAQUIRÁ" },
      { image: "/image/medellin.jpg", location: "MEDELLÍN" },
      { image: "/image/comuna-13-historia-turismo-portada.jpg", location: "MEDELLÍN" },
      { image: "/image/guatape.jpg", location: "GUATAPÉ" },
      { image: "/image/julianza-medellin-182353.jpg", location: "MEDELLÍN" },
      { image: "/image/Orchidiarium_-_Medellin_Botanical_Gardens.jpg", location: "MEDELLÍN" },
      { image: "/image/cartagena.jfif", location: "CARTAGENA" },
      { image: "/image/castillo-san-felipe.jpg", location: "CARTAGENA" },
      { image: "/image/islas-corales-del-rosario.jpeg", location: "ISLAS DEL ROSARIO" },
      { image: "/image/pasadia-playa-tranquila-en-baru-1.jpg", location: "PLAYA TRANQUILA" },
      { image: "/image/barranquilla.jpg", location: "BARRANQUILLA" },
      { image: "/image/CAMARA-2-AEROPUERTO-CARTAGENA-AJUSTE-FINAL.jpg", location: "CARTAGENA" },
    ],
  },
  {
    id: "tour-colombia-capitales-cafeteras",
    days: 12,
    nights: 11,
    image: "/image/nevado-tolima.jpg",
    brochureUrl: "/downloads/circuitos/Capitales-Cafeteras-de-Colombia-12-dias.docx",
    brochurePdfUrl: "/downloads/circuitos/Capitales-Cafeteras-de-Colombia-12-dias.pdf",
    dayImages: [
      { image: "/image/legado-ancestral/Aeropuerto-Internacional-El-Dorado-Bogota-Colombia-5.jpg", location: "BOGOTÁ" },
      { image: "/image/legado-ancestral/iglesia-monserrate-1.jpg", location: "BOGOTÁ" },
      { image: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.10 PM (3).jpeg", location: "IBAGUÉ" },
      { image: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.12 PM.jpeg", location: "IBAGUÉ" },
      { image: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.14 PM (3).jpeg", location: "QUINDÍO" },
      { image: "/image/jardin-botanico-quindio.jpg", location: "ARMENIA" },
      { image: "/image/kinenriquez-valle-de-cocora-4959051_1920.jpg", location: "SALENTO" },
      { image: "/image/murillo-tolima.jpg", location: "MANIZALES" },
      { image: "/image/LÍBANO.jpeg", location: "LÍBANO" },
      { image: "/image/honda-tolima.jpg", location: "HONDA" },
      { image: "/image/guadas.jpg", location: "GUADUAS" },
      { image: "/image/legado-ancestral/Aeropuerto-Internacional-El-Dorado-Bogota-Colombia-5.jpg", location: "BOGOTÁ" },
    ],
  },
  {
    id: "tour-camino-real",
    days: 7,
    nights: 6,
    image: "/image/nevado-frailejones.jpeg",
    dayImages: [
      { image: "/image/legado-ancestral/Aeropuerto-Internacional-El-Dorado-Bogota-Colombia-5.jpg", location: "BOGOTÁ" },
      { image: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.10 PM (3).jpeg", location: "IBAGUÉ" },
      { image: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.12 PM.jpeg", location: "IBAGUÉ" },
      { image: "/image/cerroMachin.png", location: "IBAGUÉ" },
      { image: "/image/honda-tolima.jpg", location: "HONDA" },
      { image: "/image/guadas.jpg", location: "GUADUAS" },
      { image: "/image/legado-ancestral/Aeropuerto-Internacional-El-Dorado-Bogota-Colombia-5.jpg", location: "BOGOTÁ" },
    ],
  },
  {
    id: "tour-colombia-colonial-aventurera",
    days: 7,
    nights: 6,
    image: "/image/villa de leyva.jpg",
    dayImages: [
      { image: "/image/legado-ancestral/Aeropuerto-Internacional-El-Dorado-Bogota-Colombia-5.jpg", location: "BOGOTÁ" },
      { image: "/image/legado-ancestral/catedral-1.jpg", location: "ZIPAQUIRÁ" },
      { image: "/image/villa de leyva.jpg", location: "VILLA DE LEYVA" },
      { image: "/image/termales-paipa.jpg", location: "TUNJA" },
      { image: "/image/lago-de-tota.jfif", location: "LAGO DE TOTA" },
      { image: "/image/puente-de-boyaca-tfyx640.jpg", location: "NOBSA" },
      { image: "/image/legado-ancestral/Aeropuerto-Internacional-El-Dorado-Bogota-Colombia-5.jpg", location: "BOGOTÁ" },
    ],
  },
  {
    id: "tour-colombia-eje-cafetero",
    days: 7,
    nights: 6,
    image: "/image/kinenriquez-valle-de-cocora-4959051_1920.jpg",
    dayImages: [
      { image: "/image/legado-ancestral/Aeropuerto-Internacional-El-Dorado-Bogota-Colombia-5.jpg", location: "BOGOTÁ" },
      { image: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.10 PM (3).jpeg", location: "IBAGUÉ" },
      { image: "/image/kinenriquez-valle-de-cocora-4959051_1920.jpg", location: "SALENTO" },
      { image: "/image/jardin-botanico-quindio.jpg", location: "QUINDÍO" },
      { image: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.14 PM (3).jpeg", location: "PEREIRA" },
      { image: "/image/murillo-tolima.jpg", location: "MANIZALES" },
      { image: "/image/legado-ancestral/Aeropuerto-Internacional-El-Dorado-Bogota-Colombia-5.jpg", location: "PEREIRA" },
    ],
  },
  {
    id: "tour-tras-leyenda-dorado",
    days: 10,
    nights: 9,
    image: "/image/guadas.jpg",
    dayImages: [
      { image: "/image/legado-ancestral/Aeropuerto-Internacional-El-Dorado-Bogota-Colombia-5.jpg", location: "BOGOTÁ" },
      { image: "/image/guadas.jpg", location: "GUADUAS" },
      { image: "/image/honda-tolima.jpg", location: "HONDA" },
      { image: "/image/murillo-tolima.jpg", location: "MANIZALES" },
      { image: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.14 PM (3).jpeg", location: "MURILLO" },
      { image: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.10 PM (3).jpeg", location: "IBAGUÉ" },
      { image: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.12 PM.jpeg", location: "IBAGUÉ" },
      { image: "/image/legado-ancestral/img2asdf.jpg", location: "PRADO" },
      { image: "/image/clubesybloc_calle de salida_Piscilago.jpg", location: "MELGAR" },
      { image: "/image/legado-ancestral/Aeropuerto-Internacional-El-Dorado-Bogota-Colombia-5.jpg", location: "BOGOTÁ" },
    ],
  }
];
