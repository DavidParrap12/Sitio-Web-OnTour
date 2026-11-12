export const CURRENCIES = ["COP","USD","EUR","CHF"] as const;
export interface Tariff {
 label:string; amount:string; currency:string; notes:string;
 audience?:string; valid_from?:string; valid_until?:string;
 min_guests?:number; max_guests?:number; occupancy?:string; weekdays?:number[];
}
export function dateInColombia(now=new Date()) { return new Intl.DateTimeFormat("en-CA",{timeZone:"America/Bogota",year:"numeric",month:"2-digit",day:"2-digit"}).format(now); }
export function validDate(value:string){return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0,10)===value;}
export function formatMoney(amount:number,currency:string,locale:string){
 if(!Number.isFinite(amount)||amount<0||!CURRENCIES.includes(currency as typeof CURRENCIES[number])) return "";
 return new Intl.NumberFormat(locale==="es"?"es-CO":locale,{style:"currency",currency,currencyDisplay:"code",maximumFractionDigits:2}).format(amount);
}
export function applicableTariffs(rows:Tariff[],date=dateInColombia(),guests=2,occupancy="double"){
 const weekday=new Date(date+"T12:00:00Z").getUTCDay();
 return rows.filter(r=>(r.audience??"public")==="public" && r.amount!=="" && Number.isFinite(Number(r.amount)) && Number(r.amount)>=0
 && (!r.valid_from||r.valid_from<=date)&&(!r.valid_until||r.valid_until>=date)
 && guests >= (r.min_guests??1)&&guests <= (r.max_guests??500)
 && (r.occupancy??"double")===occupancy && (!r.weekdays||r.weekdays.includes(weekday)));
}
export function fromPrice(rows:Tariff[],locale:string){
 const valid=applicableTariffs(rows);
 // Never compare amounts in different currencies.
 const currency=valid[0]?.currency;
 const amounts=valid.filter(r=>r.currency===currency).map(r=>Number(r.amount));
 if(!amounts.length) return "";
 const prefix=({es:"Desde",en:"From",de:"Ab",fr:"À partir de"} as Record<string,string>)[locale]??"From";
 return prefix+" "+formatMoney(Math.min(...amounts),currency,locale);
}
export function validateTariffs(rows:Tariff[]){
 if(!Array.isArray(rows)||rows.length>100) throw new Error("Máximo 100 tarifas.");
 return rows.map((r,index)=>{
 if(typeof r.label!=="string" || !r.label.trim() || r.label.length>120 || typeof r.amount!=="string" || !r.amount.trim() || !Number.isFinite(Number(r.amount)) || Number(r.amount)<0) throw new Error("Revisa la categoría y el importe.");
 if(!CURRENCIES.includes(r.currency as typeof CURRENCIES[number])) throw new Error("Moneda no válida.");
 if(!r.valid_from||!r.valid_until||!validDate(r.valid_from)||!validDate(r.valid_until)||r.valid_until<r.valid_from) throw new Error("Revisa la vigencia.");
 if(!["public","agency","internal"].includes(r.audience??"") || !["double","single","child"].includes(r.occupancy??"")) throw new Error("Público u ocupación no válidos.");
 if(!Number.isInteger(r.min_guests)||!Number.isInteger(r.max_guests)||r.min_guests!<1||r.max_guests!>500||r.max_guests!<r.min_guests!) throw new Error("Revisa el tamaño de grupo.");
 if(!Array.isArray(r.weekdays)||!r.weekdays.length||r.weekdays.some(d=>!Number.isInteger(d)||d<0||d>6)) throw new Error("Selecciona los días de operación.");
 return {...r,label:r.label.trim(),amount:Number(r.amount),notes:String(r.notes??"").slice(0,1000),sort_order:index};
 });
}
