/**
 * Feature Flags — Editorial Design System
 *
 * Controls which pages render the new editorial layout vs legacy.
 * All default to `false` → legacy is always safe.
 *
 * To enable a page, set the env variable in .env.local:
 *   NEXT_PUBLIC_NEW_GALERIA=true
 */

export const DESIGN_FLAGS = {
  home:           process.env.NEXT_PUBLIC_NEW_HOME === 'true',
  pasadias:       process.env.NEXT_PUBLIC_NEW_PASADIAS === 'true',
  circuitos:      process.env.NEXT_PUBLIC_NEW_CIRCUITOS === 'true',
  nosotros:       process.env.NEXT_PUBLIC_NEW_NOSOTROS === 'true',
  galeria:        process.env.NEXT_PUBLIC_NEW_GALERIA === 'true',
  contacto:       process.env.NEXT_PUBLIC_NEW_CONTACTO === 'true',
  pasadiaDetail:  process.env.NEXT_PUBLIC_NEW_PASADIA_DETAIL === 'true',
  circuitoDetail: process.env.NEXT_PUBLIC_NEW_CIRCUITO_DETAIL === 'true',
} as const;

export type DesignFlagKey = keyof typeof DESIGN_FLAGS;
