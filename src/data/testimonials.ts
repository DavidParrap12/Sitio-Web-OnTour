export interface Testimonial {
  id: string;
  name: string;
  /** Optional avatar URL — shows initials if missing */
  avatar?: string;
  /** Location or country of the reviewer */
  location: string;
  /** Rating out of 5 */
  rating: number;
  /** Maps to an i18n key under testimonials.reviews.{reviewKey} */
  reviewKey: string;
  /** Maps to i18n key for the trip name */
  tripKey: string;
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
    rating: 5,
    reviewKey: "yamel",
    tripKey: "yamel",
    date: "2025-04-01",
  },
  {
    id: "review-angie",
    name: "Angie Catalina Camargo",
    location: "Colombia",
    rating: 5,
    reviewKey: "angie",
    tripKey: "angie",
    date: "2025-04-01",
  },
  {
    id: "review-samsung",
    name: "Samsung Éxito",
    location: "Colombia",
    rating: 5,
    reviewKey: "samsung",
    tripKey: "samsung",
    date: "2025-04-01",
  },
  {
    id: "review-sandra",
    name: "Sandra Perdomo",
    location: "Colombia",
    rating: 5,
    reviewKey: "sandra",
    tripKey: "sandra",
    date: "2025-04-01",
  },
];
