import Link from "next/link";
import { signOut } from "../auth-actions";
export default function AccessPage(){return <main className="max-w-xl mx-auto py-24 px-6"><h1 className="text-3xl font-semibold">Acceso restringido</h1><p className="my-6">Tu cuenta no tiene permiso para esta sección. Un administrador debe asignarte un rol activo.</p><Link href="/admin/crm" className="underline">Ir al CRM</Link><form action={signOut} className="mt-6"><button className="admin-button">Cerrar sesión</button></form></main>;}
