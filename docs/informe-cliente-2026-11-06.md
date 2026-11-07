# Informe de estado del sitio web

**OnTour DMC Colombia — www.ontourdmc.com**

| | |
|---|---|
| **Fecha** | 6 de noviembre de 2026 |
| **Preparado para** | Dirección de OnTour DMC Colombia |
| **Alcance** | Auditoría, correcciones técnicas, analítica y captación de agencias |
| **Estado** | Versión verificada y lista para publicar |

> **Cómo leer este documento.** Las secciones 1 a 3 están escritas en lenguaje llano, para explicar el valor del trabajo sin tecnicismos. La sección 4 contiene la verificación con datos concretos. El anexo técnico (sección 8) es para quien mantenga el sitio. La sección 7 es un guion para la reunión.

---

## 1. Resumen ejecutivo

El sitio ya no tiene problemas técnicos que impidan crecer. Está en cuatro idiomas, es seguro, carga con imágenes optimizadas, se puede leer bien en móvil y **mide las visitas y las solicitudes de cotización**. La página de contacto ahora atiende a dos públicos en el mismo lugar: viajeros que quieren comprar un viaje y agencias que quieren vender Colombia con OnTour.

Lo que cambia para el negocio:

- **Ya se sabe qué pasa en la web.** Antes no había forma de saber cuántas personas entraban ni qué pedían. Ahora hay una analítica profesional instalada y comprobada.
- **Las agencias tienen una puerta de entrada.** Antes un agente extranjero no encontraba dónde pedir tarifas netas. Ahora hay una pestaña B2B con formulario propio y respuesta prometida en 24 horas.
- **La web transmite confianza.** Página 404 propia, avisos legales, registro de turismo, datos estructurados para Google y formularios protegidos contra spam.
- **La base está preparada para crecer.** El sitio está en un repositorio con pruebas automáticas; cada cambio futuro se puede validar antes de publicarlo.

**Estado de publicación:** los cambios están verificados en local y en el repositorio. La publicación en el hosting se hace en la próxima subida; hasta entonces, la versión pública puede no incluirlos todavía.

---

## 2. Qué se ha hecho, explicado sin tecnicismos

| El problema, en simple | Lo que se hizo | Lo que gana OnTour |
|---|---|---|
| La web no decía a Google en qué idioma estaba cada página ni cuál era la versión oficial. | Se declaró el idioma de cada página, su versión canónica y sus equivalentes en español, inglés, alemán y francés. | Menos páginas duplicadas y más probabilidad de aparecer en el idioma correcto. |
| No existía un mapa del sitio para los buscadores. | Se generó un mapa con las **112 páginas publicables** y sus equivalencias en los cuatro idiomas. | Google puede descubrir y entender todo el catálogo. |
| Las imágenes pesaban demasiado y el sitio podía ir lento. | El servidor entrega las fotos en formatos modernos (AVIF/WebP), en el tamaño adecuado a cada pantalla y con carga diferida. | La web abre antes, sobre todo con datos móviles. |
| Los formularios podían recibir spam o envíos abusivos. | Se validan los datos, se limitan los envíos por persona y se añadió una trampa para bots. | Menos correos basura y menos riesgo de bloqueos del proveedor de correo. |
| No había medición real de visitas. | Se instaló Google Analytics 4, se comprobó que registra una visita por página y se añadieron eventos de conversión. | Se puede saber qué páginas funcionan y cuántas personas piden cotización. |
| Las agencias no tenían un lugar claro para pedir tarifas. | La página de contacto ahora separa «Viajeros» y «Agencias & B2B», con formulario específico para agencias. | Un canal comercial nuevo, sin construir una web aparte. |
| La página 404 era genérica. | Hay una página de error con la identidad de la marca y salidas claras. | Menos fugas cuando alguien llega a un enlace roto. |
| Faltaban señales de confianza para Google. | Se añadieron datos estructurados de agencia de viajes, recorridos y migas de pan. | Google entiende mejor quién es OnTour y qué vende. |

---

## 3. Entregables

### 3.1 Base técnica y seguridad

- Sitio construido con **Next.js 16** y **React 19**, servido como páginas estáticas siempre que es posible (rápido y barato de alojar).
- **HTTPS obligatorio** y cabeceras de seguridad activas: política de contenido (CSP), HSTS, protección contra incrustación en otras webs, política de referencia y permisos de cámara/micrófono/ubicación desactivados.
- **Redirecciones permanentes** de las direcciones antiguas (`/en/circuitos`, `/en/circuits`, `/flights`) hacia las nuevas, para no perder lo que Google ya conocía.
- **404 propio** y página de error global, con la identidad de la marca.
- Formularios con **validación en servidor**, límite de tamaño, límite de frecuencia y campo trampa para bots.

### 3.2 Contenido y estructura

- **4 idiomas completos:** español, inglés, alemán y francés, con direcciones propias en cada uno (por ejemplo `/es/contacto` y `/de/kontakt`).
- **9 circuitos** de varios días y **7 pasadías**, además de servicios, bienestar, galería, nosotros y páginas legales.
- Navegación con menús por perfil (destinos, experiencias, turismo médico, agencias, nosotros) y versión móvil.
- Textos legales, registro de turismo (RNT 62212), preguntas frecuentes y política de privacidad.

### 3.3 Velocidad y experiencia

- Imágenes responsive servidas por el optimizador de Next.js en AVIF/WebP.
- Componentes pesados (mapas, formularios, generadores de folletos) cargados solo cuando se necesitan.
- Fuentes con intercambio controlado para que el texto no desaparezca mientras carga.
- Animaciones respetuosas con la preferencia de «reducir movimiento».

### 3.4 Visibilidad en Google

- Título y descripción únicos por página e idioma.
- Dirección canónica y etiquetas `hreflang` en las 112 URLs del mapa del sitio (560 equivalencias de idioma).
- Datos estructurados: agencia de viajes y sitio web en la portada; recorrido turístico y migas de pan en cada circuito.
- Imagen de vista previa (Open Graph) de 1200 × 630 para compartir en WhatsApp, LinkedIn o correo.
- Redirecciones 301/308 para conservar el histórico.

### 3.5 Medición

- **Google Analytics 4** instalado directamente (sin contenedores intermedios vacíos) y verificado en un navegador real: una visita registrada por carga de página, una por cambio de página interno, sin duplicados.
- Eventos de conversión:
  - `click_request_quote` — clic en «Cotizar viaje».
  - `quote_form_submit` — formulario de cotización enviado.
  - `click_whatsapp` — clic en WhatsApp.
  - `trade_form_submit` — solicitud de agencia enviada.
  - `contact_tab_switch` — elección de la pestaña Viajeros o Agencias.
- Los eventos se envían también directamente a Google Analytics, no solo a una capa intermedia, para que no se pierdan.

### 3.6 Captación: la nueva página de contacto

La página de contacto se reorganizó en dos pestañas:

**Viajeros.** El formulario de siempre, con teléfono, correo, dirección y horario visibles y clicables.

**Agencias & B2B.** Un formulario pensado para agencias y tour operadores:

- Nombre de la agencia, persona de contacto, correo corporativo, teléfono, país y sitio web.
- Tipo de empresa (tour operador, agencia de viajes, DMC, MICE/corporativo, otro).
- Pasajeros anuales hacia Colombia y destinos o circuitos de interés.
- Mensaje libre para describir el proyecto.

El mensaje que recibe la agencia: tarifas netas, comisiones protegidas, flota propia, guías licenciados y one-pagers por circuito en 24 horas.

El enlace «Alianzas y Tarifarios B2B» del menú abre directamente la pestaña de agencias. Cada solicitud llega al correo de OnTour con asunto identificable (`Solicitud B2B: [agencia] — [persona]`), separada de las cotizaciones de viajeros.

---

## 4. Verificación realizada

Todo lo siguiente se comprobó el **6 de noviembre de 2026** sobre la compilación de producción, no sobre el entorno de desarrollo.

| Comprobación | Resultado |
|---|---|
| Revisión de estilo (lint) | 0 errores, 0 avisos |
| Comprobación de tipos (TypeScript) | 0 errores |
| Pruebas automáticas | **18 de 18** correctas (9 nuevas para el formulario de agencias) |
| Compilación de producción | Correcta: **116 páginas** generadas |
| Mapa del sitio | **112 URLs**, **560 etiquetas hreflang** |
| Cabeceras de seguridad | CSP, HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` presentes |
| Redirección antigua | `/en/circuitos` → **308** → `/en/journeys` |
| Página inexistente | Responde **404** con página de marca |
| Portada (datos estructurados) | `TravelAgency`, `LocalBusiness`, `WebSite` |
| Circuito (datos estructurados) | `TouristTrip` + `BreadcrumbList` |
| Analítica | Etiqueta de Google correcta; 1 `page_view` por carga y por navegación interna; respuesta **204** de Google Analytics |
| Página de contacto | Pestaña de viajeros por defecto; `#agencias` abre la de agencias; menú B2B enlaza correctamente |
| Formulario de agencias | Envío correcto; estado de éxito; campos y datos recibidos según lo previsto |
| API del formulario | 415 (formato no permitido) · 400 (datos inválidos) · 200 (bot simulado) · 429 (límite) · 502 (fallo de entrega) |
| Idiomas | ES, EN, DE y FR cargan con sus textos y pestañas; 0 errores de consola |
| Auditoría Lighthouse (portada y contacto) | SEO **100/100**, buenas prácticas **100/100**, accesibilidad **96/100** y **97/100**; los 3 avisos concretos están en la sección 9 |

**Lo que no se puede verificar desde aquí:** la entrega real del correo de una solicitud de agencia, porque las pruebas se hicieron con la API simulada para no llenar el buzón. Conviene hacer **un envío real de prueba** después de publicar.

---

## 5. Lo que falta y depende de OnTour

| Tarea | Quién | Para qué |
|---|---|---|
| Publicar la versión verificada | Equipo técnico | Que los cambios lleguen a los visitantes |
| Revisar Google Search Console | OnTour (o dar acceso) | La verificación ya está publicada; falta revisar cobertura, consultas y errores |
| Crear el perfil de Google Business de Ibagué | OnTour | Aparecer en búsquedas locales y en Maps con reseñas |
| Marcar las conversiones en Google Analytics | OnTour / equipo técnico | Que los informes distingan visitas de solicitudes |
| Decidir política de cookies para visitantes de la UE | OnTour | Cumplir el RGPD antes de captar tráfico europeo |
| Publicar en Civitatis, GetYourGuide, Viator o TourRadar | OnTour | Primeras reservas sin depender del SEO |
| Preparar la lista de agencias y los one-pagers | OnTour + equipo técnico | Abrir el canal B2B |
| Aportar fotos y textos nuevos | OnTour | Alimentar el contenido que posiciona |

---

## 6. Recomendación para los próximos 90 días

| Plazo | Acción | Resultado esperado |
|---|---|---|
| Semana 1–2 | Publicar, Search Console, Google Business, primeras reseñas | Datos reales y presencia local |
| Semana 2–4 | Fichas en OTAs de los 7 pasadías | Primeras reservas con riesgo cero |
| Mes 1–2 | Lista de 200–300 agencias + one-pagers + contacto directo | Primeras conversaciones B2B |
| Mes 1–3 | 20–25 guías de contenido, prioridad alemán y francés | Tráfico orgánico que empieza a componer |
| Mes 3 | Captura de correo y guía descargable | Lista propia para reactivar |
| Mes 3+ | Publicidad de pago con presupuesto pequeño | Coste por solicitud medido |

**Expectativa honesta:** el posicionamiento orgánico tarda entre 3 y 6 meses en dar señales claras. Las OTAs pueden dar reservas en semanas. La web ya no es el cuello de botella; ahora el trabajo es de distribución y constancia.

---

## 7. Guion para la reunión

### Los tres mensajes que deben quedar

1. **«La casa ya está en orden.»** El sitio es seguro, rápido, está en cuatro idiomas y Google puede entenderlo. Eso ya no hay que tocarlo.
2. **«Ahora hay que traer gente.»** La web sola no genera visitas. Hay que publicar en las plataformas donde ya hay viajeros y hablar con agencias.
3. **«Vamos a medir para decidir.»** Desde ahora sabemos cuántas personas entran y cuántas piden cotización. Las decisiones se toman con datos, no con intuición.

### Preguntas previsibles y respuestas breves

**¿Ya aparecemos primeros en Google?**
No, y no se promete. La base técnica está lista, pero posicionar lleva meses de contenido y enlaces. Lo que sí se puede medir es si vamos mejorando.

**¿Por qué no se puede reservar y pagar online?**
Porque es una fase distinta: hay que definir precios, política de cancelación y quién atiende incidencias. Se puede hacer con Stripe, pero es un proyecto aparte.

**¿Qué pasa con las agencias?**
Ya tienen su propia pestaña y su formulario. La siguiente pieza es la lista de agencias y los one-pagers por circuito.

**¿Es seguro para los datos de los clientes?**
Sí: el sitio va por HTTPS, los formularios validan y limitan los envíos, y no se guardan datos de tarjetas porque no hay pagos en la web. Los mensajes llegan al correo de OnTour.

**¿Cuánto cuesta mantenerlo?**
El coste es el alojamiento y el dominio. No hay licencias de CMS ni plugins de pago. El código está versionado, así que cualquier cambio se puede revisar antes de publicar.

**¿Y el RGPD si llegan europeos?**
Es el punto pendiente más importante. Google Analytics usa cookies; para tráfico de la UE hace falta un aviso de cookies con consentimiento previo. Está identificado y se puede implementar cuando se decida.

**¿Vamos a salir en ChatGPT o en los buscadores con IA?**
La estructura y los datos estructurados ayudan a que los sistemas entiendan la web, pero ningún proveedor garantiza aparecer. Es un canal emergente, no una certeza.

**¿Qué mejoraríais ahora?**
Tres cosas de bajo coste: accesibilidad al 100 %, datos de preguntas frecuentes para Google y conectar los formularios a un CRM con respuesta automática. Después, consentimiento de cookies y reserva online. El detalle y el orden están en la sección 9.

**¿Qué necesitáis de nosotros?**
Acceso para revisar Search Console, el perfil de Google, fotos y textos actualizados, y decisión sobre cookies y reservas online.

---

## 8. Anexo técnico

### Stack

- Next.js 16.4.3 (App Router, Turbopack), React 19.2, TypeScript 5.
- next-intl 4.14 con rutas localizadas y `hreflang`.
- Tailwind CSS 4 + sistema editorial propio.
- Framer Motion para animaciones, Embla para carruseles, Leaflet para mapas.
- Formspree para entrega de formularios; Google Analytics 4 (gtag.js) para medición.
- `docx`, `jspdf` y `file-saver` para la generación de folletos y programas.

### Puntos de entrada

- `src/app/[locale]` — páginas por idioma.
- `src/app/api/quote` — cotizaciones de viajeros (validación, límite, honeypot).
- `src/app/api/trade` — solicitudes de agencias (mismas protecciones, campos propios).
- `src/app/sitemap.ts` — mapa del sitio y `hreflang`.
- `src/lib/seo.ts` — canónicas, Open Graph y Twitter.
- `src/lib/schema.ts` — datos estructurados.
- `src/components/GoogleAnalytics.tsx` — carga de GA4 y visita por navegación.
- `src/lib/analytics.ts` — eventos de conversión.
- `messages/{es,en,de,fr}.json` — textos de los cuatro idiomas.

### Cómo reproducir la verificación

```bash
npm ci
npm run lint
npm run typecheck
npm run test
npm run build
npx next start -p 3100
```

Comprobaciones manuales:

```bash
curl -I http://localhost:3100/es                      # cabeceras de seguridad
curl -I http://localhost:3100/en/circuitos            # 308 a /en/journeys
curl -s http://localhost:3100/sitemap.xml | grep -c "<url>"   # 112
curl -s -o /dev/null -w "%{http_code}" http://localhost:3100/es/no-existe  # 404
curl -X POST -H "Content-Type: text/plain" --data x http://localhost:3100/api/trade  # 415
```

### Riesgos conocidos y límites

- **RGPD/cookies:** GA4 se carga sin consentimiento previo. Aceptable para tráfico colombiano; a revisar antes de campañas en Europa.
- **Límite de frecuencia en memoria:** protege por instancia. En un despliegue con varias instancias conviene complementarlo con el cortafuegos del hosting.
- **Formspree como dependencia externa:** si el servicio falla, el formulario devuelve error 502 y el usuario ve un mensaje para reintentar o escribir por correo.
- **Contenido:** el sitio conserva los originales de imagen en el repositorio para campañas; los visitantes reciben versiones optimizadas, no los originales.
- **Search Console sin revisar:** la verificación ya está publicada (meta y archivo), pero sin revisar cobertura y consultas no se pueden corregir incidencias de indexación.

### Variables de entorno

| Variable | Uso | Obligatoria |
|---|---|---|
| `FORMSPREE_ENDPOINT` | Destino de los formularios | No (hay valor por defecto) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Sustituir la propiedad de GA4 | No (hay valor por defecto) |
| `NEXT_PUBLIC_GTM_ID` | Activar Google Tag Manager | No (desactivado a propósito) |
| `SHEETS_ID` | Integración con hojas de cálculo | Solo si se usa |

---

## 9. Auditoría de mejoras futuras

**Cómo se ha hecho.** Revisión del repositorio y de la compilación de producción, más dos auditorías Lighthouse (portada y página de contacto) el **6 de noviembre de 2026**. No sustituye a una auditoría de negocio ni a pruebas con usuarios reales: sirve para ordenar el trabajo técnico con criterio.

### 9.1 Punto de partida

| Área | Resultado | Lectura |
|---|---|---|
| SEO técnico | **100/100** en portada y contacto | Títulos, canónicas, `hreflang` y rastreo correctos |
| Buenas prácticas | **100/100** | Sin errores de seguridad ni de consola en la auditoría |
| Accesibilidad | **96/100** portada · **97/100** contacto | 3 avisos concretos, corregibles en horas |
| Rendimiento | No medido en esta pasada | El sitio ya optimiza imágenes; faltan datos reales de Core Web Vitals |

Una puntuación de 100 en SEO **no significa salir primero en Google**. Mide que la página sea rastreable y comprensible, no su autoridad ni su contenido.

### 9.2 Mejoras priorizadas

#### Prioridad 1 — hacer ya (horas o 1–2 días)

| Mejora | Por qué importa | Esfuerzo |
|---|---|---|
| **Accesibilidad: 3 correcciones concretas.** Contraste de «Avales y coberturas» en `HomeEditorial.tsx` (3,45:1), texto gris del pie en `Footer.tsx` (2,53:1) y nombre accesible del selector de idioma en `Navbar.tsx` (el botón muestra «ES» pero solo se anuncia «Seleccionar idioma»). | Debería eliminar los 3 avisos de Lighthouse y acercar la nota a 100. Mejora la lectura con poca visión y el uso con lector de pantalla. | 2–4 h |
| **Activar FAQPage en `/legal/faq`.** El generador `buildFaqSchema` ya existe y no se usa; hay 8 preguntas traducidas. | Permite que Google muestre las preguntas directamente en los resultados y ayuda a los buscadores con IA a citar respuestas. | 2–4 h |
| **Marcar conversiones en GA4 y crear un informe de leads.** Solicitudes por idioma, por circuito y B2B, además de los eventos ya enviados. | Hoy se recogen los eventos, pero sin marcarlos como clave ni agruparlos no se pueden comparar canales ni priorizar contenido. | 2–3 h |
| **Revisar Search Console.** La verificación ya está publicada (meta y archivo); falta revisar cobertura, consultas y errores. | Es la única fuente que dice qué búsquedas reales traen visitas y qué páginas no se indexan. | 2 h |

#### Prioridad 2 — 1 a 3 meses

| Mejora | Por qué importa | Esfuerzo |
|---|---|---|
| **Consentimiento de cookies + Consent Mode v2** para visitantes de la UE. | Es el requisito legal más claro antes de captar tráfico europeo y de lanzar publicidad. | 1–2 días |
| **CRM + autorespuesta.** Conectar los formularios a HubSpot, Notion o Airtable, con acuse automático y aviso interno. | Ningún lead se queda sin respuesta; hoy todo depende de que alguien revise el correo. | 2–4 días |
| **Rendimiento real y presupuesto en CI.** Core Web Vitals de usuarios reales y Lighthouse CI que falle si empeora. | Evita que una foto o un componente nuevo degrade la velocidad sin que nadie lo note. | 1–2 días |
| **Monitorización de errores y disponibilidad.** Sentry (o equivalente) y comprobación externa cada minuto. | Hoy un fallo solo se detecta si un cliente avisa. | 1 día |
| **Higiene de imágenes.** 220 imágenes originales ocupan **61,8 MB** dentro de `public`; mover los originales fuera y dejar solo los derivados optimizados. | El visitante ya recibe AVIF/WebP, pero el repositorio y el despliegue cargan originales y quedan accesibles por URL directa. | 1–2 días |
| **Identidad móvil completa.** `manifest`, iconos de 192 y 512 px, `theme-color` y `apple-touch-icon`. | Mejora cómo se guarda la web en el móvil y cómo se ve al compartirla; hoy solo hay un `.ico`. | 2–4 h |

#### Prioridad 3 — 3 a 6 meses o proyecto aparte

| Mejora | Por qué importa | Esfuerzo |
|---|---|---|
| **Reserva y pago online** (Stripe) con política de cancelación y atención de incidencias. | Convierte la web en canal de venta directa, no solo de captación. | 3–6 semanas |
| **Hub de contenidos**: 20–25 guías en español, inglés, alemán y francés, con enlazado interno. | Es lo que construye autoridad y tráfico orgánico sostenido; los circuitos solos no cubren las búsquedas informativas. | Continuo |
| **Reseñas reales y datos de precio.** Integrar reseñas verificadas de Google o TripAdvisor y valorar `Offer` en circuitos con precios públicos y estables. | Aumenta la confianza en los resultados de búsqueda. Nunca se deben inventar reseñas ni precios: es motivo de penalización. | 1–2 semanas |
| **Pruebas de extremo a extremo y límite distribuido.** Playwright para navegación, formularios y accesibilidad; Redis/Upstash si hay varias instancias. | Protege cada cambio futuro y evita que el límite de formularios se pueda saltar entre servidores. | 3–5 días |

### 9.3 Qué no recomiendo ahora

- **Rediseñar la web.** No hay evidencia de que el diseño sea el cuello de botella; el problema es distribución.
- **Añadir más idiomas.** Los cuatro actuales cubren el mercado objetivo; primero hay que posicionarlos y medir.
- **Lanzar publicidad antes de cookies, medición y fichas en OTAs.** Se pagaría por tráfico sin saber qué convierte.
- **Crear una app móvil.** La web responsive ya cubre el uso real y una app añade mantenimiento y coste.
- **Inventar reseñas, precios o valoraciones en los datos estructurados.** El riesgo de penalización supera cualquier beneficio a corto plazo.

### 9.4 Cómo sabremos si funciona

| Indicador | Objetivo a 90 días | Dónde se mide |
|---|---|---|
| Solicitudes de cotización | Primer dato real y +30 % sobre la línea base | GA4 (`quote_form_submit`) |
| Solicitudes B2B | 10–15 contactos · 3–5 conversaciones | GA4 (`trade_form_submit`) y correo |
| Accesibilidad | 100/100 en portada y contacto | Lighthouse |
| Velocidad móvil (LCP, p75) | Menos de 2,5 s | Core Web Vitals / Search Console |
| Páginas indexadas | Al menos el 90 % de las 112 | Search Console |
| Respuesta a un lead | Menos de 24 h | CRM / correo |

### 9.5 Orden recomendado

1. Publicar esta versión y hacer **un envío real** del formulario de agencias.
2. Ejecutar la **prioridad 1** completa (accesibilidad, FAQ, GA4 y Search Console).
3. Decidir **cookies + CRM**; son la base para captar y atender leads con garantías.
4. Alimentar **contenido, OTAs y agencias**; es lo que genera volumen.
5. Abordar **reserva online** cuando haya tráfico y solicitudes suficientes para justificarla.

**Inversión:** la prioridad 1 no requiere licencias, solo horas. La prioridad 2 puede empezar con planes gratuitos de CRM y monitorización. La prioridad 3 (pago online) sí requiere presupuesto de desarrollo y una decisión de negocio.

---

## 10. Glosario breve

- **Canónica:** la dirección oficial de una página, para que Google no la cuente dos veces.
- **hreflang:** la etiqueta que dice «esta página también existe en estos idiomas».
- **Sitemap:** el índice de páginas que se entrega a los buscadores.
- **Datos estructurados:** información legible por máquinas (tipo de negocio, recorridos, precios) que Google puede mostrar enriquecida.
- **CSP / HSTS:** reglas de seguridad que limitan qué puede cargar la web y obligan a usar HTTPS.
- **GA4:** Google Analytics 4, la herramienta de medición de visitas y conversiones.
- **DMC:** Destination Management Company, el operador local que atiende a agencias internacionales.
- **One-pager:** ficha de una página por circuito, con recorrido, inclusiones y tarifas, para enviar a una agencia.
- **OTA:** plataforma de venta de experiencias (Civitatis, GetYourGuide, Viator, TourRadar).

---

*Documento preparado a partir de la verificación técnica del 6 de noviembre de 2026. Las cifras corresponden a esa compilación y deben revisarse tras cada publicación.*
