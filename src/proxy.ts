import createMiddleware from "next-intl/middleware";
import {NextResponse,type NextRequest} from "next/server";
import {routing} from "./i18n/routing";
import {updateSupabaseSession} from "./lib/supabase/proxy";
import {contentSecurityPolicy} from "./lib/csp";
const intlMiddleware=createMiddleware(routing);
export default async function proxy(request:NextRequest){
 const nonce=Buffer.from(crypto.randomUUID()).toString("base64");
 const csp=contentSecurityPolicy(nonce,process.env.NODE_ENV!=="production");
 request.headers.set("x-nonce",nonce);
 request.headers.set("Content-Security-Policy",csp);
 const path=request.nextUrl.pathname;
 const response=path==="/admin"||path.startsWith("/admin/")?await updateSupabaseSession(request):intlMiddleware(request);
 // Merge request overrides with next-intl's locale header and Supabase cookies.
 const headers=new Headers(request.headers);
 const existing=(response.headers.get("x-middleware-override-headers")??"").split(",").filter(Boolean);
 for(const key of existing){const value=response.headers.get("x-middleware-request-"+key);if(value!==null)headers.set(key,value);}
 headers.set("x-nonce",nonce);headers.set("Content-Security-Policy",csp);
 const forwarded=NextResponse.next({request:{headers}});
 forwarded.headers.forEach((value,key)=>{if(key==="x-middleware-override-headers"||key.startsWith("x-middleware-request-"))response.headers.set(key,value);});
 response.headers.set("Content-Security-Policy",csp);
 response.headers.set("Cache-Control","private, no-store");
 return response;
}
export const config={matcher:["/((?!_next|_vercel|api|.*\\..*).*)"]};
