/**
 * Supabase configuration shared by the browser, the public site and the admin.
 *
 * The site is designed to keep working without Supabase: until explicitly enabled and the two public
 * variables are present, circuit pages read the static data in
 * `src/data/circuitos.ts` and the admin shows setup instructions.
 */
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/$/, "") ?? "";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

export const SUPABASE_STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET?.trim() || "circuit-media";

export function isSupabaseConfigured(): boolean {
  return process.env.NEXT_PUBLIC_SUPABASE_ENABLED === "true" && Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}
