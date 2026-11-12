"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { getBrowserClient } from "@/lib/supabase/browser";

export function LoginForm({ notice }: { notice?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = getBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        setError(
          signInError.message.toLowerCase().includes("invalid")
            ? "Correo o contraseña incorrectos."
            : signInError.message
        );
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("No se pudo conectar con Supabase. Revisa la configuración.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {notice ? (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {notice}
        </p>
      ) : null}

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600"
        >
          Correo electrónico
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="equipo@agenciaontour.com"
            className="min-h-12 w-full rounded-xl border border-stone-300 bg-white pl-11 pr-4 py-3 text-sm outline-none transition focus:border-[#16352D] focus:ring-2 focus:ring-[#16352D]/15"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600"
        >
          Contraseña
        </label>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            className="min-h-12 w-full rounded-xl border border-stone-300 bg-white pl-11 pr-4 py-3 text-sm outline-none transition focus:border-[#16352D] focus:ring-2 focus:ring-[#16352D]/15"
          />
        </div>
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#16352D] px-6 py-3 text-sm font-bold tracking-wide text-white transition hover:bg-[#B49A68] hover:text-[#16352D] disabled:cursor-wait disabled:opacity-70"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {loading ? "Entrando..." : "Entrar al panel"}
      </button>
    </form>
  );
}
