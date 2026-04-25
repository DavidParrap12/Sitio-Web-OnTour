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
}

export const circuitos: Circuito[] = [
  {
    id: "legado-ancestral-muiscas-pijaos-opitas",
    days: 9,
    nights: 8,
    image: "/image/estatuas-san-agustin-antiguedad-portada.jpg",
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
      { image: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.12 PM.jpeg", location: "COMBEIMA" },
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
    id: "tour-colombia-capitales-rubiaceas",
    days: 12,
    nights: 11,
    image: "/image/nevado-tolima.jpg",
    dayImages: [
      { image: "/image/legado-ancestral/Aeropuerto-Internacional-El-Dorado-Bogota-Colombia-5.jpg", location: "BOGOTÁ" },
      { image: "/image/legado-ancestral/iglesia-monserrate-1.jpg", location: "BOGOTÁ" },
      { image: "/image/Tolima-fotos/WhatsApp Image 2026-04-17 at 7.52.10 PM (3).jpeg", location: "IBAGUÉ" },
      { image: "/image/nevado-tolima.jpg", location: "COMBEIMA" },
      { image: "/image/makalu-colombia-3631740.jpg", location: "QUINDÍO" },
      { image: "/image/guatape.jpg", location: "ARMENIA" },
      { image: "/image/villa de leyva.jpg", location: "SALENTO" },
      { image: "/image/nevado-tolima.jpg", location: "MANIZALES" },
      { image: "/image/ibagúe-tolima.jpg", location: "LÍBANO" },
      { image: "/image/cuidad-amurallada.jpg", location: "HONDA" },
      { image: "/image/guatape.jpg", location: "GUADUAS" },
      { image: "/image/legado-ancestral/Aeropuerto-Internacional-El-Dorado-Bogota-Colombia-5.jpg", location: "BOGOTÁ" },
    ],
  },
];
