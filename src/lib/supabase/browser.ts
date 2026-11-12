"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config";

let client: SupabaseClient | null = null;

/**
 * Browser Supabase client used by the login form. Only the anon key is exposed,
 * which is safe because every table is protected by row-level security.
 */
export function getBrowserClient() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured");
  }

  if (!client) {
    client = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  return client;
}
