"use client";
import {useState,useTransition} from "react";
import {saveDeparture} from "@/app/admin/operations-actions";
type Row={departure_date:string;capacity:number;available:number;status:string};
export function DepartureManager({circuitId,initial}:{circuitId:string;initial:Row[]}){
 const [row,setRow]=useState<Row>({departure_date:"",capacity:20,available:20,status:"scheduled"});
 const [message,setMessage]=useState("");const [pending,start]=useTransition();
 return <section className="mt-8 border-t border-stone-300 pt-8"><h2 className="text-2xl font-semibold">Salidas y cupos</h2><p className="mt-2 text-sm text-stone-600">Publique únicamente fechas confirmadas. Los cupos se actualizan manualmente; las solicitudes no descuentan plazas.</p>
 <ul className="my-5 divide-y divide-stone-200">{initial.map(d=><li key={d.departure_date} className="flex flex-wrap items-center justify-between gap-3 py-3"><span>{d.departure_date} · {d.available}/{d.capacity} plazas · {d.status}</span><button className="min-h-11 underline" onClick={()=>setRow(d)}>Editar</button></li>)}</ul>
 <form onSubmit={e=>{e.preventDefault();const form=new FormData(e.currentTarget);start(async()=>{try{const r=await saveDeparture(form);setMessage(r.ok?"Salida guardada.":r.error??"Error");}catch{setMessage("No se pudo guardar.");}});}} className="grid gap-4 sm:grid-cols-4"><input type="hidden" name="circuit_id" value={circuitId}/>
 <label className="admin-label">Fecha<input required className="admin-field" name="departure_date" type="date" value={row.departure_date} onChange={e=>setRow({...row,departure_date:e.target.value})}/></label>
 <label className="admin-label">Capacidad<input required className="admin-field" name="capacity" type="number" min="1" max="500" value={row.capacity} onChange={e=>setRow({...row,capacity:Number(e.target.value)})}/></label>
 <label className="admin-label">Plazas disponibles<input required className="admin-field" name="available" type="number" min="0" max={row.capacity} value={row.available} onChange={e=>setRow({...row,available:Number(e.target.value)})}/></label>
 <label className="admin-label">Estado<select name="status" className="admin-field" value={row.status} onChange={e=>setRow({...row,status:e.target.value})}><option value="scheduled">Programada</option><option value="closed">Cerrada</option><option value="cancelled">Cancelada</option></select></label>
 <button className="admin-button" disabled={pending}>Guardar salida</button><p role="status" className="text-sm sm:col-span-3">{message}</p></form></section>;
}
