"use server";
import {requireAdmin} from "@/lib/adminAuth";
import {revalidatePath} from "next/cache";
import {validDate,CURRENCIES} from "@/lib/pricing";
const text=(f:FormData,k:string,n=200)=>String(f.get(k)??"").trim().slice(0,n);
const emailValid=(v:string)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export async function saveAgency(form:FormData){
 const {supabase}=await requireAdmin(["admin","sales"]);
 const name=text(form,"name"),email=text(form,"email",254);
 if(!name||!emailValid(email))return {ok:false,error:"Nombre y correo válidos son obligatorios."};
 const row={name,email,contact_name:text(form,"contact_name"),country:text(form,"country"),phone:text(form,"phone",40),language:text(form,"language",5),agreement:text(form,"agreement",3000)};
 const id=text(form,"id");
 const result=id?await supabase.from("agencies").update(row).eq("id",id):await supabase.from("agencies").insert(row);
 if(result.error)return {ok:false,error:"No se pudo guardar la agencia."};
 revalidatePath("/admin/crm/agencies");return {ok:true};
}
export async function saveOpportunity(form:FormData){
 const {supabase}=await requireAdmin(["admin","sales"]);
 const contact_name=text(form,"contact_name"),email=text(form,"email",254),travelers=Number(form.get("travelers"));
 const stage=text(form,"stage"),due_date=text(form,"due_date");
 if(!contact_name||!emailValid(email)||!Number.isInteger(travelers)||travelers<1||travelers>500||!["new","qualified","preparing","sent","negotiating","won","lost"].includes(stage)||(due_date&&!validDate(due_date)))return {ok:false,error:"Revise contacto, viajeros, estado y fecha."};
 const row={contact_name,email,travelers,stage,agency_id:text(form,"agency_id")||null,agency_name:text(form,"agency_name"),country:text(form,"country"),phone:text(form,"phone",40),travel_dates:text(form,"travel_dates"),destination:text(form,"destination",400),notes:text(form,"notes",3000),next_task:text(form,"next_task",500),due_date:due_date||null,owner_id:text(form,"owner_id")||null,updated_at:new Date().toISOString()};
 const id=text(form,"id");
 const result=id?await supabase.from("opportunities").update(row).eq("id",id):await supabase.from("opportunities").insert(row);
 if(result.error)return {ok:false,error:"No se pudo guardar. Verifique responsable y agencia."};
 revalidatePath("/admin/crm","layout");return {ok:true};
}
export async function saveQuote(form:FormData){
 const {supabase}=await requireAdmin(["admin","sales"]);
 try{
 const lines=JSON.parse(text(form,"items",16000)) as {description:string;quantity:number;unit_price:number}[];
 if(!Array.isArray(lines)||lines.length<1||lines.length>50||lines.some(l=>typeof l.description!=="string"||!l.description.trim()||l.description.length>500||!Number.isFinite(l.quantity)||l.quantity<=0||l.quantity>10000||!Number.isFinite(l.unit_price)||l.unit_price<0||l.unit_price>1e10))throw new Error();
 const expiry=text(form,"valid_until");const currency=text(form,"currency");
 if(!validDate(expiry)||!CURRENCIES.includes(currency as typeof CURRENCIES[number]))throw new Error();
 const {error}=await supabase.rpc("create_quote",{opportunity:text(form,"opportunity_id"),currency_code:currency,expiry,conditions:text(form,"terms",5000),lines});
 if(error)return {ok:false,error:"No se pudo crear la versión. Revise la vigencia y sus permisos."};
 revalidatePath("/admin/crm","layout");return {ok:true};
 }catch{return {ok:false,error:"Revise las partidas, cantidades e importes."};}
}
