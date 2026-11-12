import {getServerClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {MfaSetup} from "@/components/admin/MfaSetup";
export default async function SecurityPage(){const db=await getServerClient();const {data:{user}}=await db.auth.getUser();if(!user)redirect("/admin/login");return <main className="max-w-lg mx-auto px-6 py-20"><h1 className="text-3xl font-semibold">Verificación en dos pasos</h1><p className="my-4 text-stone-600">Proteja el acceso al catálogo y los datos comerciales con su aplicación autenticadora.</p><MfaSetup/></main>;}
