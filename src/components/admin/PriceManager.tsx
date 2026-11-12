"use client";
import {useState,useTransition} from "react";
import {saveCircuitPrices} from "@/app/admin/circuit-actions";
import {type Tariff,dateInColombia} from "@/lib/pricing";
export type PriceRow=Tariff;
export function PriceManager({circuitId,initial}:{circuitId:string;initial:PriceRow[]}){
 const [rows,setRows]=useState(initial);const [pending,start]=useTransition();const [message,setMessage]=useState("");
 const patch=(i:number,key:string,value:unknown)=>setRows(rows.map((r,n)=>n===i?{...r,[key]:value}:r));
 return <section className="mt-8 border-t border-stone-300 pt-8"><h2 className="text-2xl font-semibold">Tarifas y temporadas</h2><p className="mt-2 text-sm text-stone-600">Solo las tarifas públicas vigentes se muestran en la web. Las tarifas netas y los costos internos requieren acceso del equipo.</p>
 <div className="mt-6 space-y-6">{rows.map((r,i)=><fieldset key={i} className="rounded-xl border border-stone-300 bg-white p-5"><legend className="px-2 font-semibold">Tarifa {i+1}</legend>
 <div className="grid gap-4 sm:grid-cols-3">
 <label className="admin-label">Categoría<input className="admin-field" value={r.label} onChange={e=>patch(i,"label",e.target.value)}/></label>
 <label className="admin-label">Importe por persona<input className="admin-field" type="number" min="0" step="0.01" value={r.amount} onChange={e=>patch(i,"amount",e.target.value)}/></label>
 <label className="admin-label">Moneda<select className="admin-field" value={r.currency} onChange={e=>patch(i,"currency",e.target.value)}>{["USD","COP","EUR","CHF"].map(x=><option key={x}>{x}</option>)}</select></label>
 <label className="admin-label">Visible para<select className="admin-field" value={r.audience??"public"} onChange={e=>patch(i,"audience",e.target.value)}><option value="public">Público</option><option value="agency">Tarifa neta · equipo comercial</option><option value="internal">Costo interno · equipo</option></select></label>
 <label className="admin-label">Desde<input className="admin-field" type="date" value={r.valid_from??""} onChange={e=>patch(i,"valid_from",e.target.value)}/></label>
 <label className="admin-label">Hasta<input className="admin-field" type="date" value={r.valid_until??""} onChange={e=>patch(i,"valid_until",e.target.value)}/></label>
 <label className="admin-label">Grupo mínimo<input className="admin-field" type="number" min="1" max="500" value={r.min_guests??1} onChange={e=>patch(i,"min_guests",Number(e.target.value))}/></label>
 <label className="admin-label">Grupo máximo<input className="admin-field" type="number" min="1" max="500" value={r.max_guests??500} onChange={e=>patch(i,"max_guests",Number(e.target.value))}/></label>
 <label className="admin-label">Ocupación<select className="admin-field" value={r.occupancy??"double"} onChange={e=>patch(i,"occupancy",e.target.value)}><option value="double">Doble / adulto</option><option value="single">Individual</option><option value="child">Niño</option></select></label>
 </div><div className="mt-4 flex flex-wrap gap-4">{["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"].map((day,n)=><label key={day} className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" checked={(r.weekdays??[]).includes(n)} onChange={e=>patch(i,"weekdays",e.target.checked?[...(r.weekdays??[]),n]:(r.weekdays??[]).filter(d=>d!==n))}/>{day}</label>)}</div>
 <label className="admin-label mt-3">Condiciones y suplementos<textarea className="admin-field" value={r.notes} onChange={e=>patch(i,"notes",e.target.value)}/></label>
 <button type="button" disabled={pending} onClick={()=>setRows(rows.filter((_,n)=>n!==i))} className="mt-3 min-h-11 text-sm text-rose-700 underline">Quitar tarifa</button></fieldset>)}</div>
 <div className="mt-5 flex flex-wrap gap-3"><button type="button" className="admin-button" disabled={pending} onClick={()=>setRows([...rows,{label:"",amount:"",currency:"USD",notes:"",audience:"public",valid_from:dateInColombia(),valid_until:dateInColombia(),min_guests:1,max_guests:500,occupancy:"double",weekdays:[0,1,2,3,4,5,6]}])}>Añadir tarifa</button><button className="admin-button" disabled={pending} onClick={()=>start(async()=>{try{const result=await saveCircuitPrices(circuitId,rows);setMessage(result.ok?"Tarifas guardadas.":result.error??"No se pudo guardar.");}catch{setMessage("No se pudo guardar. Comprueba tus permisos y la conexión.");}})}>{pending?"Guardando…":"Guardar tarifas"}</button></div><p role="status" className="mt-3 text-sm">{message}</p>
 </section>;
}
