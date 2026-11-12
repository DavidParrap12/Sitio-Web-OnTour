import Link from "next/link";
import {notFound} from "next/navigation";
import {requireAdmin} from "@/lib/adminAuth";
import {OpportunityForm} from "@/components/admin/OpportunityForm";
import {QuoteBuilder} from "@/components/admin/QuoteBuilder";
import type {Opportunity} from "@/lib/crm";
import {formatMoney} from "@/lib/pricing";
export default async function OpportunityPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params;const {supabase}=await requireAdmin(["admin","sales"]);
 const [{data:row,error},{data:agencies},{data:staff},{data:quotes}]=await Promise.all([supabase.from("opportunities").select("*").eq("id",id).maybeSingle(),supabase.from("agencies").select("id,name").order("name"),supabase.from("staff").select("user_id,role").eq("active",true),supabase.from("quote_versions").select("id,version,total,currency,valid_until,created_at").eq("opportunity_id",id).order("version",{ascending:false})]);
 if(error)throw new Error("No se pudo leer la oportunidad.");if(!row)notFound();
 return <div><Link href="/admin/crm" className="underline">Volver a solicitudes</Link><h1 className="my-6 text-3xl font-semibold">{row.agency_name||row.contact_name}</h1><OpportunityForm row={row as Opportunity} agencies={agencies??[]} staff={staff??[]}/><section className="mt-10 border-t border-stone-300 pt-7"><h2 className="text-2xl font-semibold">Historial de propuestas</h2><ul className="my-5 divide-y divide-stone-200">{quotes?.map(q=><li key={q.id} className="py-3"><Link className="underline" href={"/admin/crm/quotes/"+q.id}>Versión {q.version} · {formatMoney(Number(q.total),q.currency,"es")} · Válida hasta {q.valid_until}</Link></li>)}</ul><details><summary className="cursor-pointer font-semibold">Preparar nueva propuesta</summary><div className="mt-5"><QuoteBuilder opportunityId={id}/></div></details></section></div>;
}
