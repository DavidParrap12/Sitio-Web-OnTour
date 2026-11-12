import "server-only";
import {createHash} from "node:crypto";
import {createClient} from "@supabase/supabase-js";
import {isSupabaseConfigured,SUPABASE_URL} from "./supabase/config";
import {checkRateLimit,type RateLimitRule} from "./rateLimit";
export async function checkIntakeLimit(key:string,rules:RateLimitRule[]){
 if(!isSupabaseConfigured())return checkRateLimit(key,rules);
 const secret=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!secret)return {allowed:false,retryAfter:60,remaining:0};
 const db=createClient(SUPABASE_URL,secret,{auth:{persistSession:false,autoRefreshToken:false}});
 for(const rule of rules){
 const key_hash=createHash("sha256").update(secret+":"+key+":"+rule.windowMs).digest("hex");
 const {data,error}=await db.rpc("consume_intake_limit",{key_hash,max_hits:rule.limit,seconds:Math.ceil(rule.windowMs/1000)});
 if(error||!data)return {allowed:false,retryAfter:Math.ceil(rule.windowMs/1000),remaining:0};
 }
 return {allowed:true,retryAfter:0,remaining:0};
}
