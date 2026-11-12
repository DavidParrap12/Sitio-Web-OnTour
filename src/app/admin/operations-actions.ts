"use server";
import {requireAdmin} from "@/lib/adminAuth";
import {revalidatePath} from "next/cache";
import {validDate} from "@/lib/pricing";
export async function saveDeparture(form:FormData){
 const {supabase}=await requireAdmin();
 const circuit_id=String(form.get("circuit_id")??"");const departure_date=String(form.get("departure_date")??"");
 const capacity=Number(form.get("capacity")),available=Number(form.get("available")),status=String(form.get("status"));
 if(!validDate(departure_date)||!Number.isInteger(capacity)||capacity<1||capacity>500||!Number.isInteger(available)||available<0||available>capacity||!["scheduled","closed","cancelled"].includes(status))return {ok:false,error:"Revisa fecha, cupos y estado."};
 const {error}=await supabase.from("departures").upsert({circuit_id,departure_date,capacity,available,status},{onConflict:"circuit_id,departure_date"});
 if(error)return {ok:false,error:"No se pudo guardar la salida. Comprueba la migración y tus permisos."};
 revalidatePath("/","layout");return {ok:true};
}
