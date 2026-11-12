import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Database, KeyRound, TerminalSquare } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getServerClient } from "@/lib/supabase/server";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

function SetupNotice() {
  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-stone-200 bg-white p-7 shadow-sm sm:p-10">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0a3566]/5">
          <Database className="h-5 w-5 text-[#0a3566]" />
        </span>
        <div>
          <h1 className="font-heading text-xl font-semibold text-stone-900">
            Administrador desactivado
          </h1>
          <p className="text-sm text-stone-500">
            El panel se activa en tres pasos.
          </p>
        </div>
      </div>

      <ol className="list-decimal space-y-4 pl-5 text-sm leading-relaxed text-stone-700">
        <li>Crea el proyecto de Supabase. Ejecuta <code>supabase/schema.sql</code> y después todos los archivos de <code>supabase/migrations/</code> en orden de nombre. No vuelvas a ejecutar el esquema antiguo después.</li>
        <li>Configura la URL y la clave pública según <code>.env.example</code>. Añade <code>SUPABASE_SERVICE_ROLE_KEY</code> solo en el servidor para recibir solicitudes y limitar el spam. Tras completar la instalación, activa <code>NEXT_PUBLIC_SUPABASE_ENABLED=true</code> en staging y recompila la aplicación.</li>
        <li>Desactiva el registro público, crea el primer usuario y asigna su UUID a <code>public.staff</code> con rol admin. Inicia sesión y configura el autenticador de segundo factor. Sigue la guía <code>docs/admin-cms.md</code>.</li>
      </ol>

      <div className="mt-6 flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
        <TerminalSquare className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          Mientras el administrador permanezca desactivado, la web pública sigue funcionando con los
          circuitos actuales. No se pierde ningún contenido.
        </span>
      </div>

      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0a3566] hover:text-[#B49A68]"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a la web
      </Link>
    </div>
  );
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ setup?: string }>;
}) {
  const { setup } = await searchParams;

  if (!isSupabaseConfigured()) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-12">
        <SetupNotice />
      </main>
    );
  }

  const supabase = await getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const {data: member}=await supabase.from("staff").select("role,active").eq("user_id",user.id).maybeSingle();
    redirect(member?.active ? (member.role === "sales" ? "/admin/crm" : "/admin") : "/admin/access");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#B49A68]/40 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0a3566]">
            <KeyRound className="h-3.5 w-3.5 text-[#B49A68]" />
            OnTour CMS
          </span>
          <h1 className="font-heading text-3xl font-light text-stone-900">
            Panel de contenidos
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-stone-500">
            Gestiona circuitos, fotografías, vídeos y precios publicados en la web.
          </p>
        </div>

        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <LoginForm
            notice={
              setup === "1"
                ? "Inicia sesión para continuar con la gestión de circuitos."
                : undefined
            }
          />
        </div>

        <Link
          href="/"
          className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-stone-500 hover:text-[#0a3566]"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a la web pública
        </Link>
      </div>
    </main>
  );
}
