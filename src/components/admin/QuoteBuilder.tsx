"use client";
import {useState} from "react";
import {ActionForm} from "./ActionForm";
import {saveQuote} from "@/app/admin/crm-actions";
import {dateInColombia} from "@/lib/pricing";
export function QuoteBuilder({opportunityId}:{opportunityId:string}){
 const [items,setItems]=useState([{description:"",quantity:1,unit_price:0}]);
 return <ActionForm action={saveQuote} label="Guardar nueva versión"><input type="hidden" name="opportunity_id" value={opportunityId}/><input type="hidden" name="items" value={JSON.stringify(items)}/>
 <div className="grid gap-4 sm:grid-cols-2"><label className="admin-label">Moneda<select className="admin-field" name="currency">{["USD","COP","EUR","CHF"].map(c=><option key={c}>{c}</option>)}</select></label><label className="admin-label">Válida hasta<input className="admin-field" name="valid_until" type="date" min={dateInColombia()} required/></label></div>
 {items.map((item,i)=><fieldset className="grid gap-3 rounded-lg border border-stone-300 p-4 sm:grid-cols-[1fr_100px_140px_auto]" key={i}><legend className="px-2 text-sm">Partida {i+1}</legend><label className="admin-label">Concepto<input className="admin-field" required value={item.description} onChange={e=>setItems(items.map((x,n)=>n===i?{...x,description:e.target.value}:x))}/></label><label className="admin-label">Cantidad<input className="admin-field" required type="number" min="1" value={item.quantity} onChange={e=>setItems(items.map((x,n)=>n===i?{...x,quantity:Number(e.target.value)}:x))}/></label><label className="admin-label">Precio unitario<input className="admin-field" required type="number" min="0" step="0.01" value={item.unit_price} onChange={e=>setItems(items.map((x,n)=>n===i?{...x,unit_price:Number(e.target.value)}:x))}/></label><button type="button" className="self-end min-h-11 text-rose-700" disabled={items.length===1} onClick={()=>setItems(items.filter((_,n)=>n!==i))}>Quitar</button></fieldset>)}
 <button type="button" className="min-h-11 underline" disabled={items.length>=50} onClick={()=>setItems([...items,{description:"",quantity:1,unit_price:0}])}>Añadir partida</button><p className="font-semibold tabular-nums">Subtotal: {items.reduce((sum,i)=>sum+i.quantity*i.unit_price,0).toFixed(2)}</p>
 <label className="admin-label">Condiciones, incluidos, excluidos y forma de pago<textarea className="admin-field" required name="terms" rows={4} maxLength={5000}/></label><p className="text-sm text-stone-600">La versión guardada no se modifica ni se envía automáticamente. Puede imprimirla y compartirla después de revisarla.</p></ActionForm>;
}
