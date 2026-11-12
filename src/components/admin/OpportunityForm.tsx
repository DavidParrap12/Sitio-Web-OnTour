import {ActionForm} from "./ActionForm";
import {saveOpportunity} from "@/app/admin/crm-actions";
import {STAGES,type Opportunity} from "@/lib/crm";
export function OpportunityForm({row,agencies,staff}:{row?:Opportunity;agencies:{id:string;name:string}[];staff:{user_id:string;role:string}[]}){
 return <ActionForm action={saveOpportunity}><input type="hidden" name="id" value={row?.id??""}/><div className="grid gap-4 sm:grid-cols-2">
 {([["contact_name","Persona de contacto"],["email","Correo"],["agency_name","Agencia / empresa"],["country","País"],["phone","Teléfono"],["travel_dates","Fechas del viaje"],["destination","Circuitos o destinos"],["next_task","Siguiente tarea"]] as const).map(([key,label])=><label className="admin-label" key={key}>{label}<input className="admin-field" name={key} type={key==="email"?"email":"text"} required={key==="contact_name"||key==="email"} defaultValue={row?.[key]??""}/></label>)}
 <label className="admin-label">Viajeros<input className="admin-field" name="travelers" required type="number" min="1" max="500" defaultValue={row?.travelers??2}/></label>
 <label className="admin-label">Estado<select className="admin-field" name="stage" defaultValue={row?.stage??"new"}>{Object.entries(STAGES).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label>
 <label className="admin-label">Agencia registrada<select name="agency_id" defaultValue={row?.agency_id??""} className="admin-field"><option value="">Sin vincular</option>{agencies.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}</select></label>
 <label className="admin-label">Responsable<select name="owner_id" defaultValue={row?.owner_id??""} className="admin-field"><option value="">Sin asignar</option>{staff.map(s=><option key={s.user_id} value={s.user_id}>{s.role} · {s.user_id.slice(0,8)}</option>)}</select></label>
 <label className="admin-label">Fecha de seguimiento<input className="admin-field" name="due_date" type="date" defaultValue={row?.due_date??""}/></label>
 </div><label className="admin-label">Notas comerciales · sin datos médicos<textarea className="admin-field" name="notes" rows={4} maxLength={3000} defaultValue={row?.notes??""}/></label></ActionForm>;
}
