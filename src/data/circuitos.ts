export interface Circuito {
  id: string;
  days: number;
  nights: number;
  image: string;
}

export const circuitos: Circuito[] = [
  {
    id: "legado-ancestral-muiscas-pijaos-opitas",
    days: 9,
    nights: 8,
    image: "/image/estatuas-san-agustin-antiguedad-portada.jpg",
  },
  {
    id: "tour-colombia-corazon-andes",
    days: 13,
    nights: 12,
    image: "/image/makalu-colombia-3631740.jpg",
  },
  {
    id: "tour-colombia-boyaca-colonial",
    days: 8,
    nights: 7,
    image: "/image/villa de leyva.jpg",
  },
  {
    id: "tour-colombia-tres-ciudades",
    days: 14,
    nights: 13,
    image: "/image/cuidad-amurallada.jpg",
  },
  {
    id: "tour-colombia-capitales-rubiaceas",
    days: 12,
    nights: 11,
    image: "/image/nevado-tolima.jpg",
  },
];
