import {cache} from "react";
import {getTranslations} from "next-intl/server";
import {circuitos, type Circuito} from "@/data/circuitos";
import {destinos} from "@/data/destinos";
import {type DestinationTheme} from "@/lib/design-config";
import {getPublicClient} from "./supabase/public";
import {isSupabaseConfigured} from "./supabase/config";
import {fromPrice,type Tariff} from "./pricing";
export interface CircuitVideo {url:string;title:string}
export type CircuitPrice=Tariff;
export interface Activity {nombre:string;destino:string;precio_desde:number|string|null;incluye:string[];duracion?:string;reserva?:string;opera?:string;tipo?:string;operador?:string;outfit?:string;salida?:string}
export interface CircuitEntry extends Circuito {
 name:string;description:string;price:string;highlights:string[];itinerary:string[];
 region:string;videos:CircuitVideo[];prices:Tariff[];kind:"circuit"|"day_trip";
 duration:string;activities:Activity[];included:string;excluded:string;
}
const regions:Record<string,string>={"epoca-precolombina-sur-colombia":"sur","tour-colombia-corazon-andes":"cafetero","tour-colombia-boyaca-colonial":"boyaca","tour-colombia-tres-ciudades":"caribe","tour-colombia-capitales-cafeteras":"cafetero","tour-camino-real":"tolima","tour-tras-leyenda-dorado":"tolima","tour-santander-expedicion-aventurera":"santander"};
const stringArray=(v:unknown):string[]=>Array.isArray(v)?v.filter((x):x is string=>typeof x==="string"):[];
export async function getStarterEntries(locale:string,kind:"circuit"|"day_trip"="circuit"):Promise<CircuitEntry[]>{
 const t=await getTranslations({locale,namespace:kind==="circuit"?"circuitosData":"destinosData"});
 const source=kind==="circuit"?circuitos:destinos.map(d=>({...d,days:1,nights:0,dayImages:(d.gallery??[]).map(image=>({image,location:""}))}));
 return source.map(d=>{
 const read=(key:string)=>t.has(d.id+"."+key)?t(d.id+"."+key):"";
 const raw=(key:string)=>t.has(d.id+"."+key)?t.raw(d.id+"."+key):[];
 return {...d,name:read("name"),description:read("description"),price:read("price"),highlights:stringArray(raw("highlights")),itinerary:stringArray(raw("itinerary")),region:regions[d.id]??"andes",videos:[],prices:[],kind,duration:read("duration"),activities:raw("activities") as Activity[],included:"",excluded:""};
 });
}
export const getCircuitEntries=cache(async(locale:string,kind:"circuit"|"day_trip"="circuit"):Promise<CircuitEntry[]>=>{
 if(!isSupabaseConfigured())return getStarterEntries(locale,kind);
 const db=getPublicClient();
 const result=await db.from("circuits").select("*,circuit_translations(*),circuit_media(*),circuit_prices(*)").eq("kind",kind).eq("published",true).is("archived_at",null).order("sort_order").order("id");
 // Fail closed: never resurrect unpublished bundled prices/products on a database outage.
 if(result.error){console.error("[catalog] read unavailable");throw new Error("El catálogo no está disponible temporalmente.");}
 return (result.data??[]).map(row=>{
 const translations=row.circuit_translations as {locale:string;name:string;description:string;highlights:unknown;itinerary:unknown;duration:string;activities:Activity[];included:string;excluded:string}[];
 const t=translations.find(x=>x.locale===locale)||translations.find(x=>x.locale==="es");
 const media=row.circuit_media as {kind:string;url:string;location:string;sort_order:number}[];
 const rates=(row.circuit_prices as (Omit<Tariff,"amount"> & {amount:number|null})[]).map(r=>({...r,amount:r.amount==null?"":String(r.amount)}));
 const images=media.filter(m=>m.kind==="image").sort((a,b)=>a.sort_order-b.sort_order);
 return {id:row.id,days:row.days,nights:row.nights,image:row.image||"",colorTheme:row.color_theme as DestinationTheme,mapEmbedUrl:row.map_embed_url||"",brochureUrl:row.brochure_url||"",brochurePdfUrl:row.brochure_pdf_url||"",dayImages:images.map(m=>({image:m.url,location:m.location})),name:t?.name||row.id,description:t?.description||"",price:fromPrice(rates,locale),highlights:stringArray(t?.highlights),itinerary:stringArray(t?.itinerary),region:row.region,kind,duration:t?.duration||"",activities:t?.activities??[],included:t?.included||"",excluded:t?.excluded||"",videos:media.filter(m=>m.kind==="video").map(m=>({url:m.url,title:m.location})),prices:rates.filter(r=>r.audience==="public")};
 });
});
export async function getCircuitEntry(locale:string,id:string,kind:"circuit"|"day_trip"="circuit"){return (await getCircuitEntries(locale,kind)).find(c=>c.id===id);}
export async function getPublishedCircuitIds(kind:"circuit"|"day_trip"="circuit"){
 if(!isSupabaseConfigured())return (kind==="circuit"?circuitos:destinos).map(c=>c.id);
 const {data,error}=await getPublicClient().from("circuits").select("id").eq("kind",kind).eq("published",true).is("archived_at",null);
 if(error)throw new Error("No se pudo leer el catálogo publicado.");
 return (data??[]).map((r:{id:string})=>r.id);
}
