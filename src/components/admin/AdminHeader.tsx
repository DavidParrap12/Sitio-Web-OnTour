import Link from "next/link";
import { ExternalLink, LogOut, Plus } from "lucide-react";
import { signOut } from "@/app/admin/auth-actions";

export function AdminHeader({ email }: { email: string }) {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#16352D] text-xs font-black tracking-tight text-[#D8C49D]">
              OT
            </span>
            <span className="font-heading text-lg font-semibold text-stone-900">
              OnTour CMS
            </span>
          </Link>
          <span className="hidden rounded-full bg-stone-100 px-3 py-1 text-[11px] font-medium text-stone-500 sm:inline">
            {email}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin/crm" className="text-sm font-semibold underline">CRM</Link>
          <Link href="/admin/crm/agencies" className="text-sm font-semibold underline">Agencias</Link>
          <Link href="/admin/security" className="text-sm font-semibold underline">Seguridad</Link>
          <Link
            href="/admin/circuits/new"
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-[#16352D] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#B49A68] hover:text-[#16352D]"
          >
            <Plus className="h-4 w-4" />
            Nuevo producto
          </Link>
          <Link
            href="/es/circuitos"
            target="_blank"
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-[#16352D] hover:text-[#16352D]"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">Ver web</span>
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
