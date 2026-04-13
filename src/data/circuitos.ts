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
      { image: "/image/bogota-zipaquira.jpg", location: "BOGOTÁ" },
      { image: "/image/makalu-colombia-3631740.jpg", location: "BOGOTÁ" },
      { image: "/image/bogota-zipaquira.jpg", location: "ZIPAQUIRÁ" },
      { image: "/image/ibagúe-tolima.jpg", location: "IBAGUÉ" },
      { image: "/image/nevado-tolima.jpg", location: "COMBEIMA" },
      { image: "/image/makalu-colombia-3631740.jpg", location: "QUINDÍO" },
      { image: "/image/guatape.jpg", location: "ARMENIA" },
      { image: "/image/villa de leyva.jpg", location: "SALENTO" },
      { image: "/image/nevado-tolima.jpg", location: "MANIZALES" },
      { image: "/image/ibagúe-tolima.jpg", location: "LÍBANO" },
      { image: "/image/cuidad-amurallada.jpg", location: "HONDA" },
      { image: "/image/guatape.jpg", location: "GUADUAS" },
      { image: "/image/bogota-zipaquira.jpg", location: "BOGOTÁ" },
    ],
  },
  {
    id: "tour-colombia-boyaca-colonial",
    days: 8,
    nights: 7,
    image: "/image/villa de leyva.jpg",
    dayImages: [
      { image: "/image/bogota-zipaquira.jpg", location: "BOGOTÁ" },
      { image: "/image/makalu-colombia-3631740.jpg", location: "BOGOTÁ" },
      { image: "/image/villa de leyva.jpg", location: "VILLA DE LEYVA" },
      { image: "/image/villa de leyva.jpg", location: "VILLA DE LEYVA" },
      { image: "/image/nevado-tolima.jpg", location: "TUNJA" },
      { image: "/image/guatape.jpg", location: "LAGO DE TOTA" },
      { image: "/image/ibagúe-tolima.jpg", location: "BOYACÁ" },
      { image: "/image/bogota-zipaquira.jpg", location: "BOGOTÁ" },
    ],
  },
  {
    id: "tour-colombia-tres-ciudades",
    days: 14,
    nights: 13,
    image: "/image/cuidad-amurallada.jpg",
    dayImages: [
      { image: "/image/bogota-zipaquira.jpg", location: "BOGOTÁ" },
      { image: "/image/makalu-colombia-3631740.jpg", location: "BOGOTÁ" },
      { image: "/image/bogota-zipaquira.jpg", location: "ZIPAQUIRÁ" },
      { image: "/image/julianza-medellin-182353.jpg", location: "MEDELLÍN" },
      { image: "/image/julianza-medellin-182353.jpg", location: "MEDELLÍN" },
      { image: "/image/guatape.jpg", location: "GUATAPÉ" },
      { image: "/image/julianza-medellin-182353.jpg", location: "MEDELLÍN" },
      { image: "/image/guatape.jpg", location: "MEDELLÍN" },
      { image: "/image/cuidad-amurallada.jpg", location: "CARTAGENA" },
      { image: "/image/cuidad-amurallada.jpg", location: "CARTAGENA" },
      { image: "/image/guatape.jpg", location: "ISLAS DEL ROSARIO" },
      { image: "/image/cuidad-amurallada.jpg", location: "BARÚ" },
      { image: "/image/ibagúe-tolima.jpg", location: "BARRANQUILLA" },
      { image: "/image/cuidad-amurallada.jpg", location: "CARTAGENA" },
    ],
  },
  {
    id: "tour-colombia-capitales-rubiaceas",
    days: 12,
    nights: 11,
    image: "/image/nevado-tolima.jpg",
    dayImages: [
      { image: "/image/bogota-zipaquira.jpg", location: "BOGOTÁ" },
      { image: "/image/makalu-colombia-3631740.jpg", location: "BOGOTÁ" },
      { image: "/image/ibagúe-tolima.jpg", location: "IBAGUÉ" },
      { image: "/image/nevado-tolima.jpg", location: "COMBEIMA" },
      { image: "/image/makalu-colombia-3631740.jpg", location: "QUINDÍO" },
      { image: "/image/guatape.jpg", location: "ARMENIA" },
      { image: "/image/villa de leyva.jpg", location: "SALENTO" },
      { image: "/image/nevado-tolima.jpg", location: "MANIZALES" },
      { image: "/image/ibagúe-tolima.jpg", location: "LÍBANO" },
      { image: "/image/cuidad-amurallada.jpg", location: "HONDA" },
      { image: "/image/guatape.jpg", location: "GUADUAS" },
      { image: "/image/bogota-zipaquira.jpg", location: "BOGOTÁ" },
    ],
  },
];
