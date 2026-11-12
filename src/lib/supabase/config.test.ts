import {afterEach, expect, it, vi} from "vitest";
afterEach(() => { vi.unstubAllEnvs(); vi.resetModules(); });
it("keeps the catalog and CRM offline until explicitly enabled, even with credentials", async () => {
 vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
 vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-public-key");
 vi.stubEnv("NEXT_PUBLIC_SUPABASE_ENABLED", undefined);
 const {isSupabaseConfigured} = await import("./config");
 expect(isSupabaseConfigured()).toBe(false);
 vi.stubEnv("NEXT_PUBLIC_SUPABASE_ENABLED", "false");
 expect(isSupabaseConfigured()).toBe(false);
 vi.stubEnv("NEXT_PUBLIC_SUPABASE_ENABLED", "true");
 expect(isSupabaseConfigured()).toBe(true);
});
it("does not activate an incomplete configuration", async () => {
 vi.stubEnv("NEXT_PUBLIC_SUPABASE_ENABLED", "true");
 vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
 vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "");
 const {isSupabaseConfigured} = await import("./config");
 expect(isSupabaseConfigured()).toBe(false);
});
