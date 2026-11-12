import { getPublicClient } from "./supabase/public";
import { isSupabaseConfigured } from "./supabase/config";
import { dateInColombia } from "./pricing";
export interface Departure { departure_date:string; available:number; }
export async function getDepartures(circuitId:string):Promise<Departure[]> {
 if(!isSupabaseConfigured()) return [];
 const {data,error}=await getPublicClient().from("departures").select("departure_date,available").eq("circuit_id",circuitId).eq("status","scheduled").gt("available",0).gte("departure_date",dateInColombia()).order("departure_date");
 if(error){console.error("[departures] unavailable");return [];}
 return data??[];
}
