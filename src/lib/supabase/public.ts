import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config";

let client: SupabaseClient | null = null;

/**
 * Read-only client for public pages. It does not touch cookies, so home, the
 * circuit list and circuit details can still be statically rendered.
 */
export function getPublicClient() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured");
  }

  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return client;
}
