export type Locale = "es" | "en" | "fr" | "de";

export type GalleryCategoryKey =
  | "tolima"
  | "bogota"
  | "caribe"
  | "ejeCafetero"
  | "boyaca"
  | "sanGil"
  | "nuqui"
  | "experiencias";

export interface GalleryItemRaw {
  src: string;
  categoryKey: GalleryCategoryKey;
  alt: Record<Locale, string>;
  author?: Record<Locale, string> | string;
}

export interface GalleryImageData {
  src: string;
  alt: string;
  category: string;
  categoryKey: GalleryCategoryKey;
  author?: string;
}

export const galleryCategoriesConfig: { key: GalleryCategoryKey; labels: Record<Locale, string> }[] = [
  {
    key: "tolima",
    labels: { es: "Tolima", en: "Tolima", fr: "Tolima", de: "Tolima" },
  },
  {
    key: "bogota",
    labels: { es: "Bogotá", en: "Bogotá", fr: "Bogotá", de: "Bogotá" },
  },
  {
    key: "caribe",
    labels: { es: "Caribe", en: "Caribbean", fr: "Caraïbes", de: "Karibik" },
  },
  {
    key: "ejeCafetero",
    labels: { es: "Eje Cafetero", en: "Coffee Region", fr: "Région du Café", de: "Kaffeeregion" },
  },
  {
    key: "boyaca",
    labels: { es: "Boyacá", en: "Boyacá", fr: "Boyacá", de: "Boyacá" },
  },
  {
    key: "sanGil",
    labels: { es: "San Gil", en: "San Gil", fr: "San Gil", de: "San Gil" },
  },
  {
    key: "nuqui",
    labels: { es: "Nuquí", en: "Nuquí", fr: "Nuquí", de: "Nuquí" },
  },
  {
    key: "experiencias",
    labels: { es: "Experiencias", en: "Experiences", fr: "Expériences", de: "Erlebnisse" },
  },
];

export const galleryItems: GalleryItemRaw[] = [
  // Tolima
  {
    src: "/image/Tolima-fotos/tolima_nevado-ruiz-emision-ceniza-vista-aerea.jpeg",
    categoryKey: "tolima",
    alt: {
      es: "Vista aérea del Nevado del Tolima con cumbre nevada y al fondo el volcán Nevado del Ruiz emitiendo una columna de ceniza sobre las montañas de Colombia.",
      en: "Aerial view of Nevado del Tolima with snow-capped summit and Nevado del Ruiz volcano in the background emitting an ash plume over the Colombian mountains.",
      fr: "Vue aérienne du Nevado del Tolima avec son sommet enneigé et le volcan Nevado del Ruiz en arrière-plan émettant une colonne de cendres au-dessus des montagnes colombiennes.",
      de: "Luftaufnahme des Nevado del Tolima mit schneebedecktem Gipfel und dem Vulkan Nevado del Ruiz im Hintergrund, der eine Aschesäule über den Bergen Kolumbiens ausstößt.",
    },
  },
  {
    src: "/image/Tolima-fotos/ibague_cañon-combeima-senalizacion-turistica.jpeg",
    categoryKey: "tolima",
    alt: {
      es: "Señalización turística en el Cañón del Combeima, Tolima",
      en: "Tourist signage in the Combeima Canyon, Tolima",
      fr: "Signalisation touristique dans le canyon de Combeima, Tolima",
      de: "Touristisches Hinweisschild im Combeima-Canyon, Tolima",
    },
  },
  {
    src: "/image/Tolima-fotos/ibague_vista-aerea-guayacanes-en-flor.jpeg",
    categoryKey: "tolima",
    alt: {
      es: "Ocobos en floración e infraestructura urbana en Ibagué, Tolima",
      en: "Blooming ocobo pink trumpet trees and urban scenery in Ibagué, Tolima",
      fr: "Floraison des ocobos et paysage urbain à Ibagué, Tolima",
      de: "Blühende Guayacán-Bäume und Stadtansicht in Ibagué, Tolima",
    },
  },
  {
    src: "/image/Tolima-fotos/tolima_paramo-frailejones-paisaje.jpeg",
    categoryKey: "tolima",
    alt: {
      es: "Primer plano de frailejones con flores amarillas en un paisaje de páramo andino colombiano, con montañas y cielo azul con nubes al fondo.",
      en: "Close-up of frailejones with yellow blossoms in a Colombian Andean paramo landscape, with mountains and blue sky with clouds in the background.",
      fr: "Gros plan de frailejones aux fleurs jaunes dans un paysage de paramo andin colombien, avec des montagnes et un ciel bleu nuageux en arrière-plan.",
      de: "Nahaufnahme von Frailejones mit gelben Blüten in einer kolumbianischen Anden-Páramo-Landschaft, mit Bergen und blauem Himmel im Hintergrund.",
    },
  },
  {
    src: "/image/Tolima-fotos/tolima_sendero-piedra-vegetacion-tropical.jpeg",
    categoryKey: "tolima",
    alt: {
      es: "Camino de piedra rodeado de frondosa vegetación verde, plantas de platanillo y flores de jengibre rojo en un entorno de naturaleza tropical.",
      en: "Stone path surrounded by lush green vegetation, heliconia plants, and red ginger blossoms in a tropical natural setting.",
      fr: "Sentier de pierre entouré d'une végétation luxuriante, de bananiers sauvages et de fleurs de gingembre rouge dans un cadre tropical.",
      de: "Steinpfad umgeben von üppiger grüner Vegetation, Helikonien und roten Ingwerblüten in tropischer Natur.",
    },
  },
  {
    src: "/image/Tolima-fotos/ibague_catedral-nocturna-luna-llena.jpeg",
    categoryKey: "tolima",
    alt: {
      es: "Fachada iluminada de la Catedral de la Inmaculada Concepción en Ibagué de noche, con su torre del campanario y la luna llena en el cielo.",
      en: "Illuminated facade of the Cathedral of the Immaculate Conception in Ibagué at night, featuring its bell tower and the full moon in the sky.",
      fr: "Façade illuminée de la cathédrale de l'Immaculée Conception à Ibagué de nuit, avec son clocher et la pleine lune dans le ciel.",
      de: "Beleuchtete Fassade der Kathedrale der Unbefleckten Empfängnis in Ibagué bei Nacht, mit Glockenturm und Vollmond am Himmel.",
    },
  },
  {
    src: "/image/Tolima-fotos/tolima_edificio-colonial-arcos-patio.jpeg",
    categoryKey: "tolima",
    alt: {
      es: "Jardines y plazoleta de ladrillo frente a la arquitectura colonial blanca del Complejo Cultural Panóptico de Ibagué bajo un cielo azul despejado.",
      en: "Brick plaza and gardens in front of the white colonial architecture of the Panóptico Cultural Complex of Ibagué under a clear blue sky.",
      fr: "Jardins et esplanade en briques devant l'architecture coloniale blanche du complexe culturel Panóptico d'Ibagué sous un ciel bleu dégagé.",
      de: "Ziegelplatz und Gärten vor der weißen Kolonialarchitektur des Kulturkomplexes Panóptico in Ibagué unter klarem blauen Himmel.",
    },
  },
  {
    src: "/image/Tolima-fotos/tolima_hibisco-rojo-palmera-tropical.jpeg",
    categoryKey: "tolima",
    alt: {
      es: "Primer plano de una flor rosa de cayeno o san joaquín con vista en contrapicado hacia el tronco de un árbol majestuoso y el cielo azul.",
      en: "Close-up of a pink hibiscus flower with a low-angle view toward the trunk of a majestic tree and clear blue sky.",
      fr: "Gros plan d'une fleur rose d'hibiscus avec vue en contre-plongée sur le tronc d'un arbre majestueux et le ciel bleu.",
      de: "Nahaufnahme einer rosa Hibiskusblüte mit Untersicht auf den Stamm eines majestätischen Baumes und blauen Himmel.",
    },
  },
  {
    src: "/image/Tolima-fotos/tolima_escultura-musico-guitarrista-plaza.jpeg",
    categoryKey: "tolima",
    alt: {
      es: "Escultura metálica de un músico tocando la guitarra tiple en una plazoleta al aire libre, con palmeras y cielo azul al fondo.",
      en: "Metallic sculpture of a musician playing the Colombian tiple guitar in an open-air plaza, with palm trees and blue sky in the background.",
      fr: "Sculpture métallique d'un musicien jouant du tiple colombien sur une place en plein air, avec des palmiers et un ciel bleu en arrière-plan.",
      de: "Metallskulptur eines Musikers, der die kolumbianische Tiple-Gitarre auf einem offenen Platz spielt, mit Palmen und blauem Himmel im Hintergrund.",
    },
  },
  {
    src: "/image/Tolima-fotos/tolima_palmas-cera-niebla-montana-mistico.jpeg",
    categoryKey: "tolima",
    alt: {
      es: "Altas palmas de cera emergiendo de un denso bosque tropical cubierto por la niebla con una imponente montaña al fondo.",
      en: "Towering wax palms emerging from a dense cloud forest with an imposing mountain in the misty background.",
      fr: "Hauts palmiers de cire émergeant d'une forêt tropicale dense enveloppée de brume avec une montagne majestueuse en arrière-plan.",
      de: "Hohe Wachspalmen, die aus einem dichten, nebelverhangenen Nebelwald mit einem imposanten Berg im Hintergrund emporragen.",
    },
  },
  {
    src: "/image/Tolima-fotos/tolima_alpinista-bandera-colombia-nevado-cumbre.jpeg",
    categoryKey: "tolima",
    alt: {
      es: "Montañista con la bandera de Colombia en la cumbre nevada del Volcán Nevado del Ruiz, rodeado de hielo, rocas y cielo azul con nubes.",
      en: "Mountaineer holding the Colombian flag on the snow-covered summit of Nevado del Ruiz volcano, surrounded by ice, rocks, and cloudy blue sky.",
      fr: "Alpiniste tenant le drapeau colombien au sommet enneigé du volcan Nevado del Ruiz, entouré de glace, de rochers et d'un ciel bleu nuageux.",
      de: "Bergsteiger mit kolumbianischer Flagge auf dem schneebedeckten Gipfel des Vulkans Nevado del Ruiz, umgeben von Eis, Felsen und blauem Himmel.",
    },
  },
  {
    src: "/image/Tolima-fotos/tolima_palmas-cera-valle-cielo-nublado.jpeg",
    categoryKey: "tolima",
    alt: {
      es: "Vista en contrapicado de esbeltas palmas de cera sobre colinas verdes de montañas andinas bajo un cielo azul con nubes.",
      en: "Low-angle view of slender wax palms across rolling green Andean hills under a blue sky with soft clouds.",
      fr: "Vue en contre-plongée de palmiers de cire élancés sur les collines verdoyantes des Andes sous un ciel bleu parsemé de nuages.",
      de: "Froschperspektive schlanker Wachspalmen auf grünen Andenhügeln unter blauem Himmel mit weißen Wolken.",
    },
  },
  {
    src: "/image/Tolima-fotos/ibague_guayacan-rosado-florecido-detalle.jpeg",
    categoryKey: "tolima",
    alt: {
      es: "Flores de guayacán rosado brillante con fondo desenfocado de ramas y cielo, capturado en un día soleado con luz natural.",
      en: "Vibrant pink trumpet tree flowers with a soft-focus background of branches and sunny sky in natural daylight.",
      fr: "Fleurs roses éclatantes de guayacán avec arrière-plan estompé de branches et de ciel ensoleillé à la lumière naturelle.",
      de: "Leuchtend rosa Guayacán-Blüten mit unscharfem Hintergrund aus Ästen und sonnigem Himmel bei natürlichem Licht.",
    },
  },
  {
    src: "/image/Tolima-fotos/tolima_sendero-ecologico-pinos-barandal.jpeg",
    categoryKey: "tolima",
    alt: {
      es: "Camino de tablones de madera rodeado de densa vegetación verde y pinos con barandales de madera rústica, en un entorno de naturaleza tranquila.",
      en: "Wooden plank pathway surrounded by dense green vegetation and pine trees with rustic railings in a peaceful natural environment.",
      fr: "Passerelle en bois entourée d'une végétation dense et de pins avec des rambardes rustiques dans un cadre naturel serein.",
      de: "Holzbohlenweg umgeben von dichter grüner Vegetation und Kiefern mit rustikalem Holzgeländer in ruhiger Natur.",
    },
  },
  {
    src: "/image/Tolima-fotos/ibague_torre-iglesia-guayacan-rosado.jpeg",
    categoryKey: "tolima",
    alt: {
      es: "Arbol de ocobo repleto de flores rosadas en primer plano junto a la cúpula dorada y la torre del reloj de la Catedral de Ibagué.",
      en: "Ocobo tree full of pink blossoms in the foreground alongside the golden dome and clock tower of the Cathedral of Ibagué.",
      fr: "Arbre ocobo fleuri de rose au premier plan avec la coupole dorée et le clocher de la cathédrale d'Ibagué.",
      de: "Blühender Ocobo-Baum im Vordergrund neben der goldenen Kuppel und dem Glockenturm der Kathedrale von Ibagué.",
    },
  },
  {
    src: "/image/Tolima-fotos/ibague_guayacan-rosado-copa-vista-inferior.jpeg",
    categoryKey: "tolima",
    alt: {
      es: "Bella vista en contrapicado de la amplia copa de un árbol de guayacán rosado en plena floración, con flores vibrantes y cielo azul.",
      en: "Beautiful low-angle view of the expansive canopy of a pink trumpet tree in full bloom, with vivid flowers against the blue sky.",
      fr: "Superbe vue en contre-plongée de la cime d'un guayacán rose en pleine floraison avec ses fleurs éclatantes et ciel bleu.",
      de: "Wunderschöne Untersicht der ausladenden Krone eines rosa Guayacán-Baumes in voller Blüte vor blauem Himmel.",
    },
  },
  {
    src: "/image/Tolima-fotos/tolima_cabana-rural-montana-niebla-campesino.jpeg",
    categoryKey: "tolima",
    alt: {
      es: "Cabaña rústica de madera con humo saliendo de la chimenea, situada en un prado verde frente a montañas envueltas en densa niebla y bosque nativo.",
      en: "Rustic wooden cabin with smoke rising from the chimney, set in a green meadow against mountains shrouded in mist and native forest.",
      fr: "Chalet rustique en bois avec de la fumée s'échappant de la cheminée, situé dans un pré verdoyant face aux montagnes embrumées.",
      de: "Rustikale Holzhütte mit rauchendem Schornstein auf einer grünen Wiese vor nebelverhangenen Bergen und einheimischem Wald.",
    },
  },
  {
    src: "/image/Tolima-fotos/ibague_collage-guayacan-ciudad-iglesia-estatua.jpeg",
    categoryKey: "tolima",
    alt: {
      es: "Collage de cuatro fotografías que muestra la temporada de ocobos florecidos en Ibagué: vista aérea de la ciudad con árboles rosados, detalle de flores bajo el cielo azul, estatua en la plaza y la cúpula de la Catedral entre flores.",
      en: "Four-photo collage highlighting the blooming ocobo season in Ibagué: aerial city view with pink trees, close-up blossoms, plaza statue, and cathedral dome.",
      fr: "Collage de quatre photos montrant la saison des ocobos en fleurs à Ibagué : vue aérienne avec arbres roses, détail des fleurs, statue et coupole de la cathédrale.",
      de: "Vierteilige Fotocollage der Ocobo-Blütezeit in Ibagué: Luftaufnahme mit rosa Bäumen, Blütendetails, Statue und Kathedralenkuppel.",
    },
  },
  {
    src: "/image/Tolima-fotos/ibague_catedral-torre-reloj-cupula-guayacan.jpeg",
    categoryKey: "tolima",
    alt: {
      es: "Torre blanca del reloj y cúpula dorada de la Catedral de Ibagué sobresaliendo entre frondosos ocobos rosados bajo un cielo azul brillante.",
      en: "White clock tower and golden dome of the Cathedral of Ibagué rising among lush pink ocobos under a brilliant blue sky.",
      fr: "Clocher blanc et coupole dorée de la cathédrale d'Ibagué émergeant parmi de magnifiques ocobos roses sous un ciel bleu éclatant.",
      de: "Weißer Uhrenturm und goldene Kuppel der Kathedrale von Ibagué, die zwischen blühenden rosa Ocobos unter strahlend blauem Himmel hervorragen.",
    },
  },
  {
    src: "/image/Tolima-fotos/tolima_bosque-palmas-cera-vista-aerea-drone.jpeg",
    categoryKey: "tolima",
    alt: {
      es: "Fotografía cenital con dron que muestra la densa cubierta superior y copas en estrella de un bosque de palmas de cera.",
      en: "Overhead drone shot displaying the dense canopy and star-shaped crowns of a Colombian wax palm forest.",
      fr: "Prise de vue zénithale par drone montrant la canopée dense et les couronnes étoilées d'une forêt de palmiers de cire.",
      de: "Drohnen-Draufsicht auf das dichte Blätterdach und die sternförmigen Kronen eines kolumbianischen Wachspalmenwaldes.",
    },
  },
  {
    src: "/image/Tolima-fotos/tolima_loros-periquitos-pelea-rama-fauna.jpg",
    categoryKey: "tolima",
    alt: {
      es: "Dos loros orejiamarillos de plumaje verde y amarillo interactuando con las alas abiertas posados en una rama seca frente a un fondo de montaña verde desenfocado.",
      en: "Two yellow-eared parrots with green and yellow plumage interacting with open wings on a dry branch against blurred green mountains.",
      fr: "Deux perroquets à joues d'or au plumage vert et jaune interagissant ailes déployées sur une branche avec les montagnes en fond.",
      de: "Zwei Gelbohrsittiche mit grün-gelbem Gefieder, die mit ausgebreiteten Flügeln auf einem Ast vor grünem Berghintergrund interagieren.",
    },
  },
  {
    src: "/image/Tolima-fotos/tolima_bandada-loros-vuelo-bosque-fauna.jpg",
    categoryKey: "tolima",
    alt: {
      es: "Grupo de loros orejiamarillos volando en formación con sus alas verdes extendidas sobre el fondo oscuro de la vegetación del bosque.",
      en: "Flock of yellow-eared parrots flying in formation with green wings spread over the deep forest foliage background.",
      fr: "Groupe de perroquets à joues d'or volant en formation ailes déployées au-dessus du feuillage profond de la forêt.",
      de: "Schwarm von Gelbohrsittichen im Formationsflug mit ausgebreiteten grünen Flügeln über der tiefen Waldvegetation.",
    },
  },
  {
    src: "/image/Tolima-fotos/tolima_campesino-paraguas-palmas-cera-lluvia-niebla.jpg",
    categoryKey: "tolima",
    alt: {
      es: "Caminante con sombrilla amarilla observando osos de anteojos y tapires en un paisaje místico de palmas de cera cubierto por la niebla.",
      en: "Hiker with a yellow umbrella observing spectacled bears and tapirs in a mystical misty landscape of wax palms.",
      fr: "Randonneur au parapluie jaune observant des ours à lunettes et des tapirs dans un paysage mystique de palmiers de cire enveloppé de brume.",
      de: "Wanderer mit gelbem Regenschirm beobachtet Brillenbären und Tapire in einer mystischen Wachspalmenlandschaft im Nebel.",
    },
  },
  {
    src: "/image/Tolima-fotos/tolima_palmas-cera-ladera-verde-cielo-azul.jpg",
    categoryKey: "tolima",
    alt: {
      es: "Grupo de palmas de cera de gran altura sobre colinas verdes en un día soleado con niebla baja sobre las montañas al fondo.",
      en: "Grove of towering wax palms on rolling green hills on a sunny day with low mist drifting over mountains in the background.",
      fr: "Groupe de hauts palmiers de cire sur des collines verdoyantes par temps ensoleillé avec brume basse sur les montagnes.",
      de: "Gruppe hochgewachsener Wachspalmen auf grünen Hügeln an einem sonnigen Tag mit tiefhängendem Nebel über den Bergen.",
    },
  },

  // Bogotá
  {
    src: "/image/imagenes-pasadias/bogota-zipaquira.jpg",
    categoryKey: "bogota",
    alt: {
      es: "Interior de la Catedral de Sal de Zipaquirá - Patrimonio Arqueológico y Turístico de Colombia",
      en: "Interior of the Salt Cathedral of Zipaquirá - Archaeological and Tourist Heritage of Colombia",
      fr: "Intérieur de la Cathédrale de Sel de Zipaquirá - Patrimoine archéologique et touristique de la Colombie",
      de: "Innenraum der Salzkathedrale von Zipaquirá - Archäologisches und touristisches Erbe Kolumbiens",
    },
  },
  {
    src: "/image/legado-ancestral/Aeropuerto-Internacional-El-Dorado-Bogota-Colombia-5.jpg",
    categoryKey: "bogota",
    alt: {
      es: "El Aeropuerto Internacional El Dorado de Bogotá, Colombia, visto desde el aire con sus múltiples terminales, pistas, hangares y moderna infraestructura aeroportuaria.",
      en: "Aerial view of El Dorado International Airport in Bogotá, Colombia, showcasing its multiple terminals, runways, hangars, and modern airport infrastructure.",
      fr: "Vue aérienne de l'aéroport international El Dorado de Bogotá, Colombie, avec ses multiples terminaux, pistes, hangars et infrastructures modernes.",
      de: "Luftaufnahme des internationalen Flughafens El Dorado in Bogotá, Kolumbien, mit seinen Terminals, Pisten, Hangars und moderner Flughafen-Infrastruktur.",
    },
  },
  {
    src: "/image/legado-ancestral/iglesia-monserrate-1.jpg",
    categoryKey: "bogota",
    alt: {
      es: "La Iglesia de la Virgen de Monserrate en Bogotá, Colombia, con su arquitectura imponente y la imagen de Cristo en lo alto.",
      en: "The Sanctuary of Monserrate in Bogotá, Colombia, with its imposing mountaintop architecture and revered hilltop sanctuary.",
      fr: "L'église du sanctuaire de Monserrate à Bogotá, Colombie, avec son architecture remarquable au sommet surplombant la ville.",
      de: "Die Wallfahrtskirche von Monserrate in Bogotá, Kolumbien, mit ihrer beeindruckenden Bergarchitektur und dem Schrein auf der Anhöhe.",
    },
  },
  {
    src: "/image/legado-ancestral/catedral-1.jpg",
    categoryKey: "bogota",
    alt: {
      es: "La Catedral de Sal de Zipaquirá, Colombia, con su fachada neoclásica y escalinatas iluminadas, destacando la arquitectura y el entorno histórico de la Plaza de los Comuneros.",
      en: "The Cathedral of Zipaquirá, Colombia, with its neoclassical facade and illuminated steps in the historic Plaza de los Comuneros.",
      fr: "La cathédrale de Zipaquirá, Colombie, avec sa façade néoclassique et son parvis illuminé sur la place historique des Comuneros.",
      de: "Die Kathedrale von Zipaquirá, Kolumbien, mit ihrer neoklassizistischen Fassade und beleuchteten Stufen an der historischen Plaza de los Comuneros.",
    },
  },

  // Caribe
  {
    src: "/image/cuidad-amurallada.jpg",
    categoryKey: "caribe",
    alt: {
      es: "Vista de la emblemática Torre del Reloj de color amarillo sobre las murallas de piedra colonial en Cartagena de Indias bajo un cielo azul.",
      en: "View of the iconic yellow Clock Tower above the colonial stone ramparts in Cartagena de Indias under a blue sky.",
      fr: "Vue de l'emblématique Tour de l'Horloge jaune sur les remparts coloniaux de Carthagène des Indes sous un ciel bleu.",
      de: "Blick auf den ikonischen gelben Uhrenturm über den kolonialen Steinmauern in Cartagena de Indias unter blauem Himmel.",
    },
  },

  // Eje Cafetero
  {
    src: "/image/guatape.jpg",
    categoryKey: "ejeCafetero",
    alt: {
      es: "Paisaje del Peñón de Guatapé desde una vista panorámica, destacando la imponente roca y la extensión del embalse rodeado de montañas verdes.",
      en: "Panoramic landscape of the Rock of Guatapé, highlighting the monumental monolith and the sprawling reservoir surrounded by green hills.",
      fr: "Vue panoramique du Rocher de Guatapé, mettant en valeur l'imposant monolithe et l'immense lac artificiel cerné de collines verdoyantes.",
      de: "Panoramablick auf den Felsen von Guatapé mit dem monumentalen Felsmonolithen und dem weitläufigen Stausee inmitten grüner Berge.",
    },
  },
  {
    src: "/image/makalu-colombia-3631740.jpg",
    categoryKey: "ejeCafetero",
    alt: {
      es: "Imponente paisaje cafetalero colombiano, con montañas cubiertas de vegetación verde, cafetos en terrazas y cielo azul con nubes. En primer plano, senderos y vegetación variada que resaltan la belleza natural de la región cafetera.",
      en: "Breathtaking Colombian coffee cultural landscape featuring lush green terraced hills, coffee plants, paths, and dynamic skies.",
      fr: "Magnifique paysage caféier colombien avec montagnes verdoyantes en terrasses, caféiers et sentiers naturels typiques de la région du café.",
      de: "Beeindruckende kolumbianische Kaffeelandschaft mit terrassierten Berghängen, Kaffeesträuchern und Naturpfaden unter blauem Himmel.",
    },
  },

  // Boyacá
  {
    src: "/image/villa de leyva.jpg",
    categoryKey: "boyaca",
    alt: {
      es: "Villa de Leyva, Boyacá, Colombia. Fachada de casas coloniales con paredes blancas y balcones de madera, dispuestas alrededor de una amplia plaza adoquinada con adoquines irregulares y un pozo de agua en el centro.",
      en: "Villa de Leyva, Boyacá, Colombia. Whitewashed colonial houses with wooden balconies around the vast cobblestone plaza with its central stone fountain.",
      fr: "Villa de Leyva, Boyacá, Colombie. Façades coloniales blanchies à la chaux et balcons en bois autour de l'immense place pavée et son puits central.",
      de: "Villa de Leyva, Boyacá, Kolumbien. Weiß getünchte Kolonialhäuser mit Holzbalkonen rund um den riesigen Kopfsteinpflasterplatz mit Brunnen.",
    },
  },

  // San Gil
  {
    src: "/image/Canotaje_Rio_Fonce_10_8337700f9c.jpg",
    categoryKey: "sanGil",
    alt: {
      es: "Río Fonce, San Gil, Colombia. Vista panorámica del río con aguas turbulentas y rápidos, rodeado de densa vegetación verde de bosque tropical. En primer plano, una embarcación de rafting con personas remando.",
      en: "Fonce River, San Gil, Colombia. Rafting boat navigating turbulent whitewater rapids surrounded by dense tropical rainforest.",
      fr: "Rivière Fonce, San Gil, Colombie. Bateau de rafting affrontant des rapides tumultueux au cœur d'une forêt tropicale dense.",
      de: "Río Fonce, San Gil, Kolumbien. Rafting-Boot auf turbulenten Stromschnellen inmitten dichter tropischer Regenwaldvegetation.",
    },
  },
  {
    src: "/image/cascade-juan-curi-colombie.jpg",
    categoryKey: "sanGil",
    alt: {
      es: "Cascada del Juan Curí, Santander, Colombia. Impresionante caída de agua que desciende en cascada por una pared rocosa cubierta de vegetación exuberante y musgo, formando pozas de agua cristalina en la base. El entorno está rodeado de un denso bosque tropical húmedo con árboles altos y abundante follaje verde.",
      en: "Juan Curí Waterfalls, Santander, Colombia. Majestic waterfall cascading down a lush mossy rock face into crystal-clear pools surrounded by dense rainforest.",
      fr: "Cascades de Juan Curí, Santander, Colombie. Chute d'eau spectaculaire dévalant une paroi rocheuse tapissée de mousse dans un écrin de forêt tropicale humide.",
      de: "Juan-Curí-Wasserfälle, Santander, Kolumbien. Spektakulärer Wasserfall über moosbewachsene Felswände in kristallklare Naturbecken im dichten Regenwald.",
    },
  },
  {
    src: "/image/parque-el-gallineral-san-gil-4.jpg",
    categoryKey: "sanGil",
    alt: {
      es: "Parque El Gallineral, San Gil, Colombia. Bosque exuberante con árboles altos y vegetación densa, caracterizado por sus emblemáticas palmas de sombrero de palma de cera que se extienden hacia el cielo. Caminos serpenteantes atraviesan el parque, bordeados por vegetación nativa y senderos naturales.",
      en: "El Gallineral Park, San Gil, Colombia. Enchanting nature reserve with ancient trees draped in Spanish moss and winding paths along the river.",
      fr: "Parc El Gallineral, San Gil, Colombie. Forêt féerique aux arbres centenaires drapés de mousse espagnole et sentiers paisibles au bord de la rivière.",
      de: "Naturpark El Gallineral, San Gil, Kolumbien. Zauberhafter Park mit jahrhundertealten Bäumen, spanischem Moos und gewundenen Naturpfaden.",
    },
  },

  // Nuquí
  {
    src: "/image/Nuquí-entre-ballenas–1.jpg",
    categoryKey: "nuqui",
    alt: {
      es: "Bahía de Nuquí, Chocó, Colombia. Vista panorámica de la bahía con aguas tranquilas de color turquesa, bordeada por una extensa playa de arena gris y oscura. En el horizonte, montañas cubiertas de vegetación densa se elevan majestuosamente bajo un cielo azul claro con nubes blancas dispersas.",
      en: "Nuquí Bay, Chocó, Colombia. Turquoise Pacific waters along volcanic dark sand beaches backed by dense jungle-clad mountains.",
      fr: "Baie de Nuquí, Chocó, Colombie. Eaux turquoise du Pacifique bordées de plages de sable volcanique et de montagnes couvertes de jungle.",
      de: "Bucht von Nuquí, Chocó, Kolumbien. Türkisblaues Pazifikwasser an dunklen Sandstränden vor dicht bewaldeten Regenwaldbergen.",
    },
  },

  // Experiencias de clientes (fotos de viajeros)
  {
    src: "/image/fotos-turistas/WhatsApp%20Image%202026-08-18%20at%201.15.21%20PM.jpeg",
    categoryKey: "experiencias",
    alt: {
      es: "Turistas disfrutando Colombia con OnTour",
      en: "Travelers enjoying Colombia with OnTour",
      fr: "Voyageurs profitant de la Colombie avec OnTour",
      de: "Reisende genießen Kolumbien mit OnTour",
    },
    author: {
      es: "OnTour Viajeros",
      en: "OnTour Travelers",
      fr: "Voyageurs OnTour",
      de: "OnTour Reisende",
    },
  },
  {
    src: "/image/fotos-turistas/WhatsApp%20Image%202026-08-18%20at%201.15.29%20PM.jpeg",
    categoryKey: "experiencias",
    alt: {
      es: "Momentos únicos en Colombia",
      en: "Unique moments exploring Colombia",
      fr: "Moments inoubliables en Colombie",
      de: "Einzigartige Momente in Kolumbien",
    },
    author: {
      es: "OnTour Viajeros",
      en: "OnTour Travelers",
      fr: "Voyageurs OnTour",
      de: "OnTour Reisende",
    },
  },
  {
    src: "/image/fotos-turistas/WhatsApp%20Image%202026-08-18%20at%201.15.30%20PM.jpeg",
    categoryKey: "experiencias",
    alt: {
      es: "Explorando Colombia con OnTour",
      en: "Exploring Colombia with OnTour",
      fr: "À la découverte de la Colombie avec OnTour",
      de: "Kolumbien entdecken mit OnTour",
    },
    author: {
      es: "OnTour Viajeros",
      en: "OnTour Travelers",
      fr: "Voyageurs OnTour",
      de: "OnTour Reisende",
    },
  },
  {
    src: "/image/fotos-turistas/WhatsApp%20Image%202026-08-18%20at%201.15.31%20PM%20(1).jpeg",
    categoryKey: "experiencias",
    alt: {
      es: "Aventura en tierras colombianas",
      en: "Adventure across Colombian landscapes",
      fr: "Aventure en terres colombiennes",
      de: "Abenteuer in Kolumbien",
    },
    author: {
      es: "OnTour Viajeros",
      en: "OnTour Travelers",
      fr: "Voyageurs OnTour",
      de: "OnTour Reisende",
    },
  },
  {
    src: "/image/fotos-turistas/WhatsApp%20Image%202026-08-18%20at%201.15.31%20PM.jpeg",
    categoryKey: "experiencias",
    alt: {
      es: "Paisajes y recuerdos de Colombia",
      en: "Landscapes and lasting memories of Colombia",
      fr: "Paysages et souvenirs mémorables de Colombie",
      de: "Landschaften und Erinnerungen an Kolumbien",
    },
    author: {
      es: "OnTour Viajeros",
      en: "OnTour Travelers",
      fr: "Voyageurs OnTour",
      de: "OnTour Reisende",
    },
  },
  {
    src: "/image/fotos-turistas/WhatsApp%20Image%202026-08-18%20at%201.15.32%20PM%20(1).jpeg",
    categoryKey: "experiencias",
    alt: {
      es: "Viajeros felices en Colombia",
      en: "Happy travelers across Colombia",
      fr: "Voyageurs heureux en Colombie",
      de: "Glückliche Reisende in Kolumbien",
    },
    author: {
      es: "OnTour Viajeros",
      en: "OnTour Travelers",
      fr: "Voyageurs OnTour",
      de: "OnTour Reisende",
    },
  },
  {
    src: "/image/fotos-turistas/WhatsApp%20Image%202026-08-18%20at%201.15.32%20PM%20(2).jpeg",
    categoryKey: "experiencias",
    alt: {
      es: "Recuerdos del viaje a Colombia",
      en: "Memories from the journey through Colombia",
      fr: "Souvenirs de voyage à travers la Colombie",
      de: "Erinnerungen an die Reise durch Kolumbien",
    },
    author: {
      es: "OnTour Viajeros",
      en: "OnTour Travelers",
      fr: "Voyageurs OnTour",
      de: "OnTour Reisende",
    },
  },
  {
    src: "/image/fotos-turistas/WhatsApp%20Image%202026-08-18%20at%201.15.32%20PM%20(3).jpeg",
    categoryKey: "experiencias",
    alt: {
      es: "Experiencia OnTour en Colombia",
      en: "The OnTour experience in Colombia",
      fr: "L'expérience OnTour en Colombie",
      de: "Das OnTour-Erlebnis in Kolumbien",
    },
    author: {
      es: "OnTour Viajeros",
      en: "OnTour Travelers",
      fr: "Voyageurs OnTour",
      de: "OnTour Reisende",
    },
  },
  {
    src: "/image/fotos-turistas/WhatsApp%20Image%202026-08-18%20at%201.15.32%20PM.jpeg",
    categoryKey: "experiencias",
    alt: {
      es: "Turistas explorando destinos colombianos",
      en: "Travelers exploring Colombian destinations",
      fr: "Touristes explorant les destinations colombiennes",
      de: "Reisende beim Entdecken kolumbianischer Reiseziele",
    },
    author: {
      es: "OnTour Viajeros",
      en: "OnTour Travelers",
      fr: "Voyageurs OnTour",
      de: "OnTour Reisende",
    },
  },
  {
    src: "/image/fotos-turistas/WhatsApp%20Image%202026-08-18%20at%201.15.33%20PM%20(1).jpeg",
    categoryKey: "experiencias",
    alt: {
      es: "Momentos inolvidables en Colombia",
      en: "Unforgettable moments in Colombia",
      fr: "Moments inoubliables en Colombie",
      de: "Unvergessliche Momente in Kolumbien",
    },
    author: {
      es: "OnTour Viajeros",
      en: "OnTour Travelers",
      fr: "Voyageurs OnTour",
      de: "OnTour Reisende",
    },
  },
  {
    src: "/image/fotos-turistas/WhatsApp%20Image%202026-08-18%20at%201.15.33%20PM.jpeg",
    categoryKey: "experiencias",
    alt: {
      es: "Colombia a través de los ojos del viajero",
      en: "Colombia through the eyes of the traveler",
      fr: "La Colombie à travers les yeux du voyageur",
      de: "Kolumbien mit den Augen der Reisenden",
    },
    author: {
      es: "OnTour Viajeros",
      en: "OnTour Travelers",
      fr: "Voyageurs OnTour",
      de: "OnTour Reisende",
    },
  },
];

export function getGalleryCategories(locale: string): string[] {
  const loc = (["es", "en", "fr", "de"].includes(locale) ? locale : "es") as Locale;
  return galleryCategoriesConfig.map((c) => c.labels[loc] || c.labels.es);
}

export function getGalleryImages(locale: string): GalleryImageData[] {
  const loc = (["es", "en", "fr", "de"].includes(locale) ? locale : "es") as Locale;
  return galleryItems.map((item) => {
    const categoryConfig = galleryCategoriesConfig.find((c) => c.key === item.categoryKey);
    const categoryLabel = categoryConfig ? categoryConfig.labels[loc] || categoryConfig.labels.es : item.categoryKey;
    
    let authorLabel: string | undefined = undefined;
    if (typeof item.author === "string") {
      authorLabel = item.author;
    } else if (item.author) {
      authorLabel = item.author[loc] || item.author.es;
    }

    return {
      src: item.src,
      alt: item.alt[loc] || item.alt.es,
      category: categoryLabel,
      categoryKey: item.categoryKey,
      author: authorLabel,
    };
  });
}
