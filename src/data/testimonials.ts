export interface Testimonial {
  id: string;
  name: string;
  /** Location or country of the reviewer */
  location: string;
  /** Flag emoji + country name, e.g. "🇨🇴 Colombia" */
  country: string;
  /** Rating out of 5 */
  rating: number;
  /** Maps to an i18n key under testimonials.reviews.{reviewKey} */
  reviewKey: string;
  /** Maps to i18n key for the trip name */
  tripKey: string;
  /** Readable trip name — shown on the review card */
  tripName?: string;
  /** ISO date string (approximate — based on "hace X" from Google) */
  date: string;
}

/**
 * Real Google Reviews for On Tour Agencia de Viajes y Turismo
 * Source: https://maps.google.com — On Tour Agencia de Viajes y Turismo, Ibagué
 *
 * Only reviews with 5-star ratings AND text are included.
 * To add more: copy them here and add the i18n keys in messages/{locale}.json
 */
export const testimonials: Testimonial[] = [
  {
    id: "review-yamel",
    name: "Yamel Pardo Rico",
    location: "Colombia",
    country: "Colombia",
    rating: 5,
    reviewKey: "yamel",
    tripKey: "yamel",
    tripName: "Coffee Region & Tolima Journey",
    date: "2025-04-01",
  },
  {
    id: "review-angie",
    name: "Angie Catalina Camargo",
    location: "Colombia",
    country: "Colombia",
    rating: 5,
    reviewKey: "angie",
    tripKey: "angie",
    tripName: "Colonial Boyacá Journey",
    date: "2025-04-01",
  },
  {
    id: "review-samsung",
    name: "Samsung Éxito",
    location: "Colombia",
    country: "Colombia",
    rating: 5,
    reviewKey: "samsung",
    tripKey: "samsung",
    tripName: "Corporate Travel Services",
    date: "2025-04-01",
  },
  {
    id: "review-sandra",
    name: "Sandra Perdomo",
    location: "Colombia",
    country: "Colombia",
    rating: 5,
    reviewKey: "sandra",
    tripKey: "sandra",
    tripName: "Cocora Valley Day Trip",
    date: "2025-04-01",
  },
  {
    id: "review-david-parra",
    name: "David Fernando Parra Pardo",
    location: "Colombia",
    country: "Colombia",
    rating: 5,
    reviewKey: "davidParra",
    tripKey: "davidParra",
    tripName: "Heart of the Andes Journey",
    date: "2026-07-30",
  },
  {
    id: "review-jenny-hernandez",
    name: "Jenny Hernandez",
    location: "Colombia",
    country: "Colombia",
    rating: 4,
    reviewKey: "jennyHernandez",
    tripKey: "jennyHernandez",
    tripName: "Ibagué City Tour",
    date: "2026-06-01",
  },
  {
    id: "review-micilene",
    name: "Micilene Larrañaga Candido",
    location: "Brazil",
    country: "Brazil",
    rating: 5,
    reviewKey: "micilene",
    tripKey: "micilene",
    tripName: "Pre-Columbian Era, Southern Colombia",
    date: "2026-09-20",
  },
  {
    id: "review-ruth-ahumada",
    name: "Ruth Ahumada",
    location: "Colombia",
    country: "Colombia",
    rating: 5,
    reviewKey: "ruthAhumada",
    tripKey: "ruthAhumada",
    tripName: "Tatacoa Desert Day Trip",
    date: "2026-09-22",
  },
  {
    id: "review-maria-antonia",
    name: "María Antonia Arteaga Acero",
    location: "Colombia",
    country: "Colombia",
    rating: 5,
    reviewKey: "mariaAntonia",
    tripKey: "mariaAntonia",
    tripName: "San Agustín Archaeological Journey",
    date: "2026-09-25",
  },
];
