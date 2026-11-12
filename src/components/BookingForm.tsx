"use client";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import type { Departure } from "@/lib/departures";
import { applicableTariffs, formatMoney, type Tariff, dateInColombia } from "@/lib/pricing";
const copy:Record<string,string[]> = {
 es:["Fechas y disponibilidad","Salidas confirmadas","Fecha a medida","No hay salidas programadas publicadas. Solicite una fecha a medida.","Viajeros","Consultar disponibilidad","La solicitud no confirma una reserva. Verificaremos cupos y tarifa para su grupo.","Fecha de salida","Seleccionar fecha","Cotizar como agencia"],
 en:["Dates and availability","Scheduled departures","Custom date","No scheduled departures are published. Request a custom date.","Travellers","Check availability","An enquiry does not confirm a booking. We will verify availability and pricing for your group.","Departure date","Select a date","Request an agency quote"],
 fr:["Dates et disponibilités","Départs programmés","Date sur mesure","Aucun départ programmé publié. Demandez une date sur mesure.","Voyageurs","Vérifier la disponibilité","Cette demande ne confirme pas une réservation. Nous vérifierons les places et le tarif.","Date de départ","Choisir une date","Devis pour agence"],
 de:["Termine und Verfügbarkeit","Geplante Abreisen","Wunschtermin","Keine geplanten Abreisen veröffentlicht. Fragen Sie einen Wunschtermin an.","Reisende","Verfügbarkeit anfragen","Eine Anfrage ist keine Buchung. Wir prüfen Verfügbarkeit und Preis für Ihre Gruppe.","Abreisedatum","Datum wählen","Angebot für Reisebüros"]};
export function BookingForm({locale,departureDates,circuitName,circuitId,tariffs=[]}:{tariffs?:Tariff[];locale:string;departureDates:Departure[];circuitName:string;circuitId:string}){
 const c=copy[locale]??copy.en;
 const [custom,setCustom]=useState(departureDates.length===0);
 const [date,setDate]=useState(""); const [guests,setGuests]=useState(2);
 const rates=date?applicableTariffs(tariffs,date,guests):[];
 const departures=departureDates.filter(d=>d.available>=guests);
 const valid=Boolean(date && date>=dateInColombia() && (custom||departures.some(d=>d.departure_date===date)));
 function request(){if(!valid)return;const msg=[c[5],circuitName+" ("+circuitId+")",c[7]+": "+date,c[4]+": "+guests,custom?c[2]:c[1]].join("\n");window.open("https://wa.me/573143415177?text="+encodeURIComponent(msg),"_blank","noopener,noreferrer");}
 return <section aria-label={c[0]} className="relative rounded-2xl border border-editorial-border bg-editorial-warm p-5 sm:p-8 shadow-editorial-md">
 <h2 className="font-heading text-3xl text-editorial-accent">{c[0]}</h2>
 <div className="mt-4 flex flex-wrap gap-3"><button type="button" aria-pressed={!custom} disabled={!departureDates.length} onClick={()=>{setCustom(false);setDate("");}} className="min-h-11 rounded-lg border border-stone-300 px-4 text-sm disabled:opacity-50">{c[1]}</button><button type="button" aria-pressed={custom} onClick={()=>{setCustom(true);setDate("");}} className="min-h-11 rounded-lg border border-stone-300 px-4 text-sm">{c[2]}</button></div>
 {!departureDates.length&&<p className="mt-4 text-sm text-stone-600">{c[3]}</p>}
 <div className="mt-5 grid gap-4 sm:grid-cols-[minmax(0,1fr)_140px_auto] sm:items-end">
 <label className="admin-label">{c[7]}{custom?<input className="admin-field" type="date" min={dateInColombia()} value={date} onChange={e=>setDate(e.target.value)}/>:<select className="admin-field" value={date} onChange={e=>setDate(e.target.value)}><option value="">{c[8]}</option>{departures.map(d=><option key={d.departure_date} value={d.departure_date}>{d.departure_date} · {d.available}</option>)}</select>}</label>
 <label className="admin-label">{c[4]}<input className="admin-field" type="number" min={1} max={500} value={guests} onChange={e=>setGuests(Math.min(500,Math.max(1,Number(e.target.value))))}/></label>
 <button type="button" className="admin-button" disabled={!valid} onClick={request}>{c[5]}</button></div>
 {rates.length>0&&<ul className="mt-5 space-y-2 text-sm">{rates.map((r,i)=><li key={i}><strong>{r.label}: {formatMoney(Number(r.amount),r.currency,locale)}</strong> · {r.notes}</li>)}</ul>}
 <p className="mt-4 text-sm leading-relaxed text-stone-600">{c[6]}</p><Link href={{pathname:"/contacto",hash:"agencias"}} className="mt-3 inline-block font-semibold text-editorial-accent underline underline-offset-4">{c[9]}</Link>
 </section>;
}
