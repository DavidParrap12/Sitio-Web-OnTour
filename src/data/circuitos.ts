export interface Circuito {
  id: string;
  name: string;
  description: string;
  days: number;
  nights: number;
  price: number;
  image: string;
  highlights: string[];
  itinerary: string[];
}

export const circuitos: Circuito[] = [
  {
    id: "legado-ancestral-muiscas-pijaos-opitas",
    name: "Muiscas, Pijaos, Opitas legado ancestral",
    description: "Un viaje profundo de 9 días descubriendo el corazón de la cultura precolombina, la gastronomía andina, el desierto de La Tatacoa y la historia arqueológica de Bogotá, Tolima y Huila.",
    days: 9,
    nights: 8,
    price: 0, // Precio no proporcionado, se requerirá consultar
    image: "/image/estatuas-san-agustin-antiguedad-portada.jpg", // Bogota
    highlights: [
      "Monserrate y Museo del Oro",
      "Catedral de Sal de Zipaquirá",
      "Represa de Prado y Pijaos",
      "Desierto de la Tatacoa",
      "Parque Arqueológico San Agustín"
    ],
    itinerary: [
      "DÍA 1: BOGOTÁ-AEROPUERTO EL DORADO. Recepción en el Aeropuerto Internacional 'EL Dorado', traslado al hotel. Tiempo libre. Alojamiento.",
      "DÍA 2: BOGOTÁ CITY TOUR Y MONSERRATE. Tour panorámico por el centro histórico de Bogotá, experiencia gastronómica en La Candelaria y ascenso a Monserrate en funicular/teleférico con cena al atardecer.",
      "DÍA 3: MUSEO DEL ORO Y CATEDRAL DE SAL. Recorrido guiado por el legado Muisca en el Museo del Oro. Luego partimos a Zipaquirá para probar su gastronomía e ingresar a la Catedral de Sal (a 180 Mts bajo tierra). Retorno a Bogotá.",
      "DÍA 4: BOGOTÁ-EL ESPINAL-MAR INTERIOR. Viaje al Tolima. Recorrido por el parque mitológico en El Espinal, degustación de la auténtica Lechona Tolimense. Traslado en lancha a la Represa de Prado (4.400 hectáreas). Fogata y avistamiento de estrellas.",
      "DÍA 5: PRADO-PÍJAOS DEL TOLIMA GRANDE. Recorrido por la represa (Laguna encantada, Cueva del Mohán, Isla de Morgan, Cascada del amor). Visita a Purificación, Saldaña y Chaparral para interactuar con la tribu de los Pijaos. Traslado a Neiva.",
      "DÍA 6: NEIVA Y DESIERTO DE LA TATACOA. Visita a Villa Vieja (Museo paleontológico y Artesanal). Recorrido por el Sendero del arco iris, Los Hoyos, Valle de los fantasmas, y baño en piscina natural. Regreso a Neiva.",
      "DÍA 7: SAN AGUSTÍN. Salida de 5 hrs a San Agustín. Recorrido de 4 hrs por el Parque Arqueológico (Mesitas, Fuente del Lavapatas, Bosque de las Estatuas). Tour eco-turístico al tablón, la chaquira y estrecho del Río Magdalena.",
      "DÍA 8: SALTO DEL MORTIÑO. Visita a la caída de agua (170 Mts) y paso por el Puente de cristal. Ingreso al parque arqueológico Alto de los Ídolos (montículos funerarios, sarcófagos monolíticos). Almuerzo y regreso a Neiva.",
      "DÍA 9: NEIVA-BOGOTÁ. Traslado al aeropuerto Benito Salas para tomar vuelo a Bogotá. (Posibilidad de adicionar noche en Bogotá no incluida). Fin de nuestros servicios."
    ]
  },
    {
    id: "tour-colombia-corazon-andes",
    name: "Corazón de los Andes – Colombia Completa",
    description: "Un recorrido épico de 13 días por lo mejor de Colombia: desde la vibrante Bogotá hasta el Eje Cafetero, pasando por el Tolima, Honda y Guaduas. Cultura, naturaleza, gastronomía e historia colonial en una sola experiencia.",
    days: 13,
    nights: 12,
    price: 0,
    image: "/image/makalu-colombia-3631740.jpg", //cocora
    highlights: [
      "City tour en Bogotá con cena en Monserrate",
      "Museo del Oro y Catedral de Sal de Zipaquirá",
      "Lechona Tolimense en El Espinal",
      "Cañón del Combeima en Jeep Willys y teleférico",
      "Bosque de Palma de Cera y Volcán Cerro Machín",
      "Jardín Botánico del Quindío con más de 1400 especies de mariposas",
      "Salento, Valle de Cocora y Filandia con panorámica 360°",
      "Ascenso al Parque Nacional Natural de Los Nevados a 4000 msnm",
      "Ciudad Perdida de San Felipe de Falan (siglo XVIII)",
      "Honda Pueblo Patrimonio y recorrido por el Río Magdalena"
    ],
    itinerary: [
      "DÍA 1: BOGOTÁ – AEROPUERTO EL DORADO. Recepción en el Aeropuerto Internacional 'El Dorado', traslado al hotel de su elección. Tiempo libre. Alojamiento.",
      "DÍA 2: BOGOTÁ CITY TOUR Y CENA EN MONSERRATE. Tour panorámico por Bogotá: zona centro, La Candelaria, plazas históricas y arte urbano. Ascenso al Cerro de Monserrate (3152 msnm) en funicular y/o teleférico. Cena con vista panorámica de la ciudad. Alojamiento.",
      "DÍA 3: MUSEO DEL ORO Y CATEDRAL DE SAL DE ZIPAQUIRÁ. Recorrido guiado por el Museo del Oro y el legado de la cultura Muisca. Viaje a Zipaquirá: experiencia gastronómica e ingreso a la Catedral de Sal a 180 mts bajo tierra. Regreso a Bogotá. Alojamiento.",
      "DÍA 4: BOGOTÁ – EL ESPINAL – IBAGUÉ, LA CIUDAD MUSICAL. Viaje al Departamento del Tolima por la Autopista Sur. Recorrido gastronómico en El Espinal: historia y degustación de la auténtica Lechona Tolimense. Llegada a Ibagué, la Ciudad Musical de Colombia. Alojamiento.",
      "DÍA 5: IBAGUÉ – CAÑÓN DEL COMBEIMA. Visita al Cañón del Combeima, zona de amortiguación del PNN Los Nevados. Recorrido en Jeep Willys por Villa Restrepo y Juntas. Teleférico a más de 300 mts de altura. Visita a la Finca La Rivera, miradores, caminata guiada y posible avistamiento del Nevado del Tolima. Avistamiento de aves endémicas. Alojamiento.",
      "DÍA 6: IBAGUÉ – BOSQUE DE PALMA DE CERA – QUINDÍO. Visita al Bosque de Palma de Cera más grande del mundo en Toche. Recorrido en Jeep Willys por el cráter del Volcán Cerro Machín (2do más activo del mundo): ascenso al domo, termales de aguas azufradas y fumarola. Traslado a Armenia, Quindío. Alojamiento.",
      "DÍA 7: ARMENIA – JARDÍN BOTÁNICO – PIJAO. Visita al Jardín Botánico del Quindío: más de 1400 especies de mariposas, aves y senderos naturales. Tarde en Pijao: recorrido por sus calles, degustación de café de exportación y experiencia de folclor en vivo. Alojamiento.",
      "DÍA 8: SALENTO – COCORA – FILANDIA. Recorrido por Salento: calles empinadas, fachadas coloridas y mirador. Visita al Valle de Cocora en Jeepao: miradores y cabalgata entre vestigios del bosque de Palma de Cera. Tarde en Filandia: café típico en plaza principal y mirador Colina Iluminada con panorámica 360° de las tres cordilleras. Alojamiento.",
      "DÍA 9: MANIZALES – PNN LOS NEVADOS – MURILLO. Ascenso al PNN Los Nevados: avistamiento del Nevado del Cumanday, frailejones a 4000 msnm, nacimientos de agua azufrada y cascadas del río Lagunilla. Visita a Murillo-Tolima: historia colonial, productos orgánicos y cascada El Silencio. Traslado a Líbano-Tolima. Alojamiento.",
      "DÍA 10: LÍBANO – CIUDAD PERDIDA – HONDA. Visita a Armero-Tolima: vestigios de la tragedia de 1985. Recorrido de 7 km por la selva en San Felipe de Falan hasta la Ciudad Perdida del siglo XVIII: cuevas y bodegas de oro de la colonia conectadas con Cartagena y España. Llegada a Honda. Alojamiento.",
      "DÍA 11: HONDA PUEBLO PATRIMONIO. Recorrido por Honda: plaza de mercado, calle de las trampas, catedral, puentes y calles empedradas coloniales. Visita al primer hotel y primera farmacia de Colombia en los Andes. Tarde cultural con grafiteros locales y visita al Museo del Río. Alojamiento.",
      "DÍA 12: HONDA Y EL RÍO MAGDALENA – GUADUAS. Recorrido en embarcadero por el Río Magdalena: fauna, flora y experiencia de pesca artesanal. Tarde en Guaduas Pueblo Patrimonio, cuna de Policarpa Salavarrieta: plaza principal y recorrido por la historia de la independencia de Colombia. Alojamiento.",
      "DÍA 13: GUADUAS – BOGOTÁ AEROPUERTO EL DORADO. Desayuno en el hotel. Traslado al Aeropuerto Internacional El Dorado según hora de vuelo. Posibilidad de adicionar 1 noche en Bogotá (no incluida). Fin de nuestros servicios."
  ]
  },
  {
  id: "tour-colombia-boyaca-colonial",
  name: "Boyacá Colonial – Historia, Cultura y Naturaleza",
  description: "Un viaje de 8 días por el corazón histórico de Colombia: desde la cosmopolita Bogotá hasta los pueblos patrimonio de Boyacá. Arte, arqueología, termales, lagos y artesanías en una experiencia única por la cuna de la independencia colombiana.",
  days: 8,
  nights: 7,
  price: 0,
  image: "/image/villa de leyva.jpg",
  highlights: [
    "City tour en Bogotá con cena en Monserrate",
    "Catedral de Sal de Zipaquirá a 180 mts bajo tierra",
    "Taller de cerámica con alfareros ancestrales en Ráquira",
    "Villa de Leyva Pueblo Patrimonio: fósiles, museos y pozos azules",
    "Recorrido en buggies por zona semidesértica",
    "Termales de Paipa de aguas azufradas medicinales",
    "Lago de Tota: el lago de agua dulce más grande de Colombia",
    "Experiencia artesanal en Nobsa: tejido de Ruana con las abuelas",
    "Puente de Boyacá, símbolo de la Libertad de Colombia"
  ],
  itinerary: [
    "DÍA 1: BOGOTÁ – AEROPUERTO EL DORADO. Recepción en el Aeropuerto Internacional 'El Dorado', traslado al hotel de su elección. Tiempo libre. Alojamiento.",
    "DÍA 2: BOGOTÁ CITY TOUR Y CENA EN MONSERRATE. Tour panorámico por Bogotá: zona centro, La Candelaria, plazas históricas y arte urbano. Ascenso al Cerro de Monserrate (3152 msnm) en funicular y/o teleférico. Cena con vista panorámica de la ciudad. Alojamiento.",
    "DÍA 3: CATEDRAL DE SAL – RÁQUIRA ANCESTRAL – VILLA DE LEYVA. Visita a la Catedral de Sal de Zipaquirá con audioguía a 180 mts de profundidad. Tarde en Ráquira: experiencia con alfareros, proceso de cerámica de barro y escultura personalizada. Llegada a Villa de Leyva. Alojamiento.",
    "DÍA 4: VILLA DE LEYVA PUEBLO PATRIMONIO Y ARQUEOLÓGICO. Recorrido por la ciudad colonial: Museo del Fósil (400+ piezas del periodo cretácico), Museo del Chocolate, Casa del Primer Congreso, Casa Museo Antonio Nariño e Iglesia Nuestra Señora del Rosario. Visita a la Laguna de Pozos Azules y recorrido en buggies por zona semidesértica. Alojamiento.",
    "DÍA 5: TUNJA – TERMALES DE PAIPA. City tour panorámico por Tunja (capital de Boyacá): Plaza de Bolívar y Catedral. Llegada a Paipa y visita nocturna a las termales de aguas azufradas medicinales en contraste con el frío de la región. Alojamiento.",
    "DÍA 6: LAGO DE TOTA Y RECORRIDO CULTURAL. Visita al Monumento a los Lanceros con exposición en vivo. Degustación de postre local en Iza. Recorrido de 1 hora por el Lago de Tota (playa de arena blanca, mayor lago de agua dulce de Colombia). Visita a Aquitania, capital mundial de la cebolla. Tibasosa: cultivo de Feijoa y taller de marroquinería personalizada con la comunidad. Regreso a Paipa. Alojamiento.",
    "DÍA 7: NOBSA – PUENTE DE BOYACÁ – BOGOTÁ. Experiencia artesanal en Nobsa: tejido de Ruana en lana con las abuelas y elaboración de ruana personalizada. Visita al Puente de Boyacá en Venta Quemada, símbolo de la libertad de Colombia. Llegada a Bogotá. Alojamiento.",
    "DÍA 8: BOGOTÁ – AEROPUERTO EL DORADO. Desayuno en el hotel. Traslado al Aeropuerto Internacional El Dorado según hora de vuelo. Posibilidad de adicionar 1 noche en Bogotá (no incluida). Fin de nuestros servicios."
  ]
  },
  {
  id: "tour-colombia-tres-ciudades",
  name: "Colombia – Bogotá, Medellín y Cartagena de Indias",
  description: "Un recorrido de 14 días por las tres joyas de Colombia: la cosmopolita Bogotá, la innovadora Medellín y la mágica Cartagena de Indias. Historia colonial, cultura paisa, playas del Caribe, arte urbano y experiencias únicas en un solo viaje.",
  days: 14,
  nights: 13,
  price: 0,
  image: "/image/cuidad-amurallada.jpg",
  highlights: [
    "City tour en Bogotá con cena en Monserrate",
    "Museo del Oro y Catedral de Sal de Zipaquirá",
    "Cena de bienvenida en Medellín con show en vivo del Trío América",
    "Graffitour por la Comuna 13 con guía local",
    "Recorrido en barco y ascenso a la Piedra del Peñol en Guatapé",
    "Experiencia silletera en Santa Elena y mirador El Picacho",
    "City tour en Cartagena: Castillo de San Felipe y Convento La Popa",
    "Full day en Islas del Rosario en catamarán con snorkel",
    "Baño en plancton luminoso en Playa Tranquila",
    "Tour panorámico por Barranquilla y Malecón del Río Magdalena"
  ],
  itinerary: [
    "DÍA 1: BOGOTÁ – AEROPUERTO EL DORADO. Recepción en el Aeropuerto Internacional 'El Dorado', traslado al hotel de su elección. Tiempo libre. Alojamiento.",
    "DÍA 2: BOGOTÁ CITY TOUR Y CENA EN MONSERRATE. Tour panorámico por Bogotá: zona centro, La Candelaria, plazas históricas y arte urbano. Ascenso al Cerro de Monserrate (3152 msnm) en funicular y/o teleférico. Cena con vista panorámica de la ciudad. Alojamiento.",
    "DÍA 3: MUSEO DEL ORO Y CATEDRAL DE SAL DE ZIPAQUIRÁ. Recorrido guiado por el Museo del Oro y el legado de la cultura Muisca. Viaje a Zipaquirá: experiencia gastronómica e ingreso a la Catedral de Sal a 180 mts bajo tierra. Regreso a Bogotá. Alojamiento.",
    "DÍA 4: BOGOTÁ – MEDELLÍN. Traslado al aeropuerto El Dorado y vuelo a Medellín. Cena de bienvenida en el lugar más icónico de la ciudad con show en vivo del Trío América. Recorrido nocturno por la zona de Laureles. Alojamiento.",
    "DÍA 5: MEDELLÍN – COMUNA 13 – CITY TOUR – GRAFFITOUR. Visita al Pueblito Paisa, Plaza Botero, Parque de los Deseos y Parque de los Pies Descalzos. Recorrido en Metro y Metrocable hasta la Comuna 13: tour con guía local por sus escaleras eléctricas, murales y arte urbano. Alojamiento.",
    "DÍA 6: MEDELLÍN – GUATAPÉ Y PIEDRA DEL PEÑOL. Recorrido por la réplica del Pueblo del Peñol. Paseo en barco por la Represa de Guatapé. Ascenso a la Piedra del Peñol (700+ escalones) con panorámica 360°. Almuerzo típico montañero. Regreso a Medellín. Alojamiento.",
    "DÍA 7: TOUR SILLETERO – MIRADOR EL PICACHO – EL POBLADO. Visita a finca silletera en Santa Elena: elaboración de silleta, tradición paisa y almuerzo montañero. Parada en el Mirador El Picacho. Tarde en la zona de Provenza con los restaurantes más exclusivos de Medellín. Alojamiento.",
    "DÍA 8: MEDELLÍN – JARDÍN BOTÁNICO. Recorrido de 2 a 3 horas por el Jardín Botánico de Medellín. Tarde y noche libre. (Opcional: restaurante El Cielo, chef Juan Manuel Barrientos – Estrella Michelin, no incluido). Alojamiento.",
    "DÍA 9: MEDELLÍN – CARTAGENA DE INDIAS. Traslado al aeropuerto y vuelo a Cartagena. Cena de bienvenida en la exclusiva zona amurallada con plato de alta cocina frente al Mar Caribe. Alojamiento.",
    "DÍA 10: CARTAGENA CITY TOUR Y CASTILLO DE SAN FELIPE. Recorrido por Bocagrande, Castillogrande, Torre del Reloj, Getsemaní y Centro de Convenciones. Visita al Convento Santa Cruz de La Popa (punto más alto de la ciudad). Ingreso al Castillo de San Felipe de Barajas y visita a la estatua de Blas de Lezo. Alojamiento.",
    "DÍA 11: ISLAS DEL ROSARIO Y BARÚ EN CATAMARÁN. Full day en catamarán desde Cartagena hasta las Islas del Rosario: snorkel en arrecifes, aguas turquesas, playa de arena blanca y almuerzo de arroz de mariscos. Regreso a Cartagena a las 4:00 pm. Alojamiento.",
    "DÍA 12: PLAYA TRANQUILA – EXPERIENCIA PLANCTON LUMINOSO. Recorrido terrestre a Playa Tranquila vía Barú: frutas tropicales, almuerzo típico y atardecer. Al caer la noche, experiencia de baño en plancton luminoso de luz azul en el mar. Regreso nocturno a Cartagena. Alojamiento.",
    "DÍA 13: FULL DAY BARRANQUILLA. Tour panorámico por Barranquilla: Puerto Colombia, Faro, Castillo de Salgar, Ciénaga de Mallorquín, Vía 40, Malecón del Río Magdalena y monumentos a Shakira, el Tiburón y Joe Arroyo. Recorrido por el Barrio Abajo, epicentro del folclore caribeño. Regreso a Cartagena. Alojamiento.",
    "DÍA 14: CARTAGENA – AEROPUERTO RAFAEL NÚÑEZ. Desayuno en el hotel. Traslado al aeropuerto Rafael Núñez para vuelo a Bogotá o país de destino. Posibilidad de adicionar 1 noche en Bogotá (no incluida). Fin de nuestros servicios."
  ]
  },
  {
  id: "tour-colombia-capitales-rubiaceas",
  name: "Capitales Rubiáceas de Colombia",
  description: "Un recorrido de 12 días por la ruta del café y la historia de Colombia: desde Bogotá hasta el Eje Cafetero pasando por el Tolima, la Ciudad Perdida y Honda Pueblo Patrimonio. Naturaleza, gastronomía, cultura colonial y paisajes andinos en una sola aventura.",
  days: 12,
  nights: 11,
  price: 0,
  image: "/image/nevado-tolima.jpg",
  highlights: [
    "City tour en Bogotá con cena en Monserrate",
    "Degustación de la auténtica Lechona Tolimense en El Espinal",
    "Cañón del Combeima en Jeep Willys y teleférico a 300 mts de altura",
    "Bosque de Palma de Cera y Volcán Cerro Machín (2do más activo del mundo)",
    "Jardín Botánico del Quindío con más de 1400 especies de mariposas",
    "Salento, Valle de Cocora y Filandia con vista a las 4 cordilleras",
    "Ascenso al PNN Los Nevados con frailejones a 4000 msnm",
    "Ciudad Perdida de San Felipe de Falan (siglo XVIII)",
    "Honda Pueblo Patrimonio y crucero por el Río Magdalena",
    "Guaduas, cuna de Policarpa Salavarrieta"
  ],
  itinerary: [
    "DÍA 1: BOGOTÁ – AEROPUERTO EL DORADO. Recepción en el Aeropuerto Internacional 'El Dorado', traslado al hotel de su elección. Tiempo libre. Alojamiento.",
    "DÍA 2: BOGOTÁ CITY TOUR Y CENA EN MONSERRATE. Tour panorámico por Bogotá: zona centro, La Candelaria, plazas históricas y arte urbano. Ascenso al Cerro de Monserrate (3152 msnm) en funicular y/o teleférico. Cena con la mejor vista de Bogotá. Alojamiento.",
    "DÍA 3: BOGOTÁ – EL ESPINAL – IBAGUÉ, LA CIUDAD MUSICAL. Recorrido gastronómico en El Espinal: historia y degustación de la auténtica Lechona Tolimense, secreto culinario transmitido desde la colonia española. Llegada a Ibagué, la Ciudad Musical de Colombia. Alojamiento.",
    "DÍA 4: IBAGUÉ – CAÑÓN DEL COMBEIMA. Recorrido en Jeep Willys por Villa Restrepo y Juntas. Teleférico por el Cañón del Combeima a más de 300 mts de altura. Visita a la Finca La Rivera, miradores, caminata guiada y posible avistamiento del Nevado del Tolima. Avistamiento de aves endémicas. Alojamiento.",
    "DÍA 5: IBAGUÉ – BOSQUE DE PALMA DE CERA – QUINDÍO. Visita al Bosque de Palma de Cera más grande del mundo en Toche. Recorrido en Jeep Willys por el cráter del Volcán Cerro Machín (2do más activo del mundo): ascenso al domo, termales de aguas azufradas y fumarola. Traslado a Armenia, Quindío. Alojamiento.",
    "DÍA 6: ARMENIA – JARDÍN BOTÁNICO – PIJAO. Visita al Jardín Botánico del Quindío: más de 1400 especies de mariposas, aves y senderos naturales. Tarde en Pijao: recorrido por sus calles, degustación de café de exportación y experiencia de folclor local. Alojamiento.",
    "DÍA 7: SALENTO – COCORA – FILANDIA. Recorrido por Salento: calles empinadas, fachadas coloridas y mirador. Visita al Valle de Cocora en Jeepao: miradores y cabalgata entre vestigios del bosque de Palma de Cera y el Camino Real del Quindío. Tarde en Filandia: café típico en plaza principal y mirador con vista a las 4 cordilleras. Alojamiento.",
    "DÍA 8: MANIZALES – PNN LOS NEVADOS – MURILLO. Ascenso al PNN Los Nevados: avistamiento del Nevado del Cumanday, frailejones a 4000 msnm, nacimientos de agua azufrada y cascadas del río Lagunilla. Visita a Murillo-Tolima: historia colonial y productos orgánicos. Traslado a Líbano-Tolima. Alojamiento.",
    "DÍA 9: LÍBANO – CIUDAD PERDIDA – HONDA. Visita a Armero-Tolima: vestigios de la tragedia de 1985. Recorrido de 7 km por la selva en San Felipe de Falan hasta la Ciudad Perdida del siglo XVIII: cuevas y bodegas de oro de la colonia conectadas con Cartagena y España. Llegada a Honda. Alojamiento.",
    "DÍA 10: HONDA PUEBLO PATRIMONIO. Recorrido por Honda: plaza de mercado, calle de las trampas, iglesia, puentes y calles empedradas coloniales. Visita al primer hotel y primera farmacia de Colombia en los Andes. Tarde cultural con grafiteros locales y Museo del Río. Alojamiento.",
    "DÍA 11: HONDA Y EL RÍO MAGDALENA – GUADUAS. Crucero por el Río Magdalena: fauna, flora y experiencia de pesca artesanal. Tarde en Guaduas Pueblo Patrimonio, cuna de Policarpa Salavarrieta: plaza principal y recorrido por la historia de la independencia de Colombia. Alojamiento.",
    "DÍA 12: GUADUAS – BOGOTÁ AEROPUERTO EL DORADO. Desayuno en el hotel. Traslado al Aeropuerto Internacional El Dorado según hora de vuelo. Fin de nuestros servicios."
  ]
}
];
