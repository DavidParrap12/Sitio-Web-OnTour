"use client";
import {useEffect,useState} from "react";
import Script from "next/script";
import {usePathname} from "next/navigation";
const raw=process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim()??"";
const ID=/^G-[A-Z0-9]+$/.test(raw)?raw:"";
const copy:Record<string,string[]>={es:["Privacidad","Con su permiso medimos el uso del sitio. Puede rechazar la analítica y seguir navegando.","Aceptar analítica","Solo necesarias","Preferencias de privacidad"],en:["Privacy","With your permission we measure site usage. You can decline analytics and continue browsing.","Accept analytics","Necessary only","Privacy preferences"],fr:["Confidentialité","Avec votre accord, nous mesurons l’utilisation du site. Vous pouvez refuser et continuer à naviguer.","Accepter les statistiques","Nécessaires uniquement","Préférences de confidentialité"],de:["Datenschutz","Mit Ihrer Zustimmung messen wir die Nutzung der Website. Sie können ablehnen und weiter surfen.","Analyse erlauben","Nur notwendige","Datenschutzeinstellungen"]};
export function GoogleAnalytics({locale="es",nonce}:{locale?:string;nonce?:string}){
 const [choice,setChoice]=useState<string|null>(null);const [open,setOpen]=useState(false);const [ready,setReady]=useState(false);
 const path=usePathname();const c=copy[locale]??copy.en;
 useEffect(()=>{const read=()=>{let v=null;try{v=localStorage.getItem("ontour-analytics");}catch{}setChoice(v);setOpen(!v);};read();},[]);
 useEffect(()=>{if(choice==="accepted"&&ready&&window.gtag){window.gtag("event","page_view",{page_path:path,page_location:window.location.origin+path});}},[choice,ready,path]);
 function choose(v:string){try{localStorage.setItem("ontour-analytics",v);}catch{}setChoice(v);setOpen(false);(window as unknown as Record<string,unknown>)["ga-disable-"+ID]=v!=="accepted";if(v!=="accepted"){window.gtag?.("consent","update",{analytics_storage:"denied"});for(const entry of document.cookie.split(";")){const name=entry.split("=")[0].trim();if(name.startsWith("_ga")){document.cookie=name+"=; Max-Age=0; Path=/";document.cookie=name+"=; Max-Age=0; Path=/; Domain=."+location.hostname;}}}else window.gtag?.("consent","update",{analytics_storage:"granted"});}
 if(!ID)return null;
 return <>{choice==="accepted"&&<Script nonce={nonce} src={"https://www.googletagmanager.com/gtag/js?id="+ID} strategy="afterInteractive" onReady={()=>{window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(...args:unknown[]){window.dataLayer.push(args as unknown as Record<string,unknown>);};window.gtag("consent","default",{analytics_storage:"granted",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});window.gtag("js",new Date());window.gtag("config",ID,{send_page_view:false,page_location:location.origin+path});setReady(true);}}/>}
 <button className="fixed bottom-2 left-3 z-40 rounded bg-white px-3 py-2 text-xs text-stone-700 shadow-sm" onClick={()=>setOpen(true)}>{c[4]}</button>
 {open&&<section aria-label={c[0]} className="fixed bottom-4 left-4 right-4 z-[80] max-w-lg rounded-xl border border-stone-300 bg-white p-5 shadow-xl"><h2 className="font-semibold">{c[0]}</h2><p className="my-3 text-sm leading-relaxed">{c[1]}</p><div className="flex flex-wrap gap-3"><button className="admin-button" onClick={()=>choose("accepted")}>{c[2]}</button><button className="min-h-11 rounded-lg border border-stone-400 px-4 font-semibold" onClick={()=>choose("rejected")}>{c[3]}</button></div></section>}</>;
}
