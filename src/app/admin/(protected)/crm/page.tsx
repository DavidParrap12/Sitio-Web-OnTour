import Link from "next/link";
import {requireAdmin} from "@/lib/adminAuth";
import {STAGES} from "@/lib/crm";
import {OpportunityForm} from "@/components/admin/OpportunityForm";
export default async function CrmPage({searchParams}:{searchParams:Promise<{stage?:string;q?:string}>}){
 const {supabase}=await requireAdmin(["admin","sales"]);const filters=await searchParams;
 let query=supabase.from("opportunities").select("id,contact_name,agency_name,stage,next_task,due_date,created_at").order("created_at",{ascending:false}).limit(100);
 if(filters.stage&&filters.stage in STAGES)query=query.eq("stage",filters.stage);
 if(filters.q)query=query.ilike("contact_name","%"+filters.q.replace(/[%_]/g,"").slice(0,100)+"%");
 const [{data:rows,error},{data:agencies},{data:staff}]=await Promise.all([query,supabase.from("agencies").select("id,name").order("name"),supabase.from("staff").select("user_id,role").eq("active",true)]);
 return <div><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm text-stone-500">OnTour · Gestión comercial</p><h1 className="mt-2 text-3xl font-semibold">Solicitudes y cotizaciones</h1></div><Link className="admin-button" href="/admin/crm/agencies">Agencias</Link></div>
 <form className="my-6 flex flex-wrap gap-3"><label className="admin-label">Contacto<input className="admin-field" name="q" defaultValue={filters.q}/></label><label className="admin-label">Estado<select className="admin-field" name="stage" defaultValue={filters.stage??""}><option value="">Todos</option>{Object.entries(STAGES).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></label><button className="admin-button self-end">Filtrar</button></form>
 {error?<p role="alert">No se pudo leer el CRM. Compruebe la migración y los permisos.</p>:<div className="overflow-x-auto rounded-xl border border-stone-300 bg-white"><table className="w-full text-left text-sm"><thead><tr>{["Contacto / agencia","Estado","Próxima tarea","Seguimiento"].map(x=><th key={x} className="p-4">{x}</th>)}</tr></thead><tbody>{rows?.map(r=><tr key={r.id} className="border-t border-stone-200"><td className="p-4"><Link href={"/admin/crm/"+r.id} className="font-semibold underline">{r.contact_name}</Link><p className="text-stone-500">{r.agency_name}</p></td><td className="p-4">{STAGES[r.stage as keyof typeof STAGES]}</td><td className="p-4">{r.next_task||"Sin tarea"}</td><td className="p-4">{r.due_date||"Sin fecha"}</td></tr>)}</tbody></table>{!rows?.length&&<p className="p-6 text-stone-600">No hay solicitudes para estos filtros. Cree una oportunidad o conecte la recepción de formularios.</p>}</div>}
 <p className="mt-2 text-xs text-stone-500">Se muestran las 100 solicitudes más recientes. Utilice los filtros para localizar un contacto.</p>
 <details className="mt-8 rounded-xl border border-stone-300 p-5"><summary className="cursor-pointer text-lg font-semibold">Crear oportunidad</summary><div className="mt-5"><OpportunityForm agencies={agencies??[]} staff={staff??[]}/></div></details></div>;
}
