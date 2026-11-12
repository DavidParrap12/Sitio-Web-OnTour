import "server-only";
import {createClient} from "@supabase/supabase-js";
import {SUPABASE_URL,isSupabaseConfigured} from "./supabase/config";
export async function captureLead(input:{contact_name:string;email:string;agency_name?:string;phone?:string;country?:string;travelers?:number;travel_dates?:string;destination?:string;notes?:string;source:string}){
 if(!isSupabaseConfigured())return false;
 const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!key)throw new Error("CRM intake is not configured");
 const db=createClient(SUPABASE_URL,key,{auth:{persistSession:false,autoRefreshToken:false}});
 const {error}=await db.from("opportunities").insert(input);
 if(error)throw new Error("CRM intake unavailable");
 return true;
}
