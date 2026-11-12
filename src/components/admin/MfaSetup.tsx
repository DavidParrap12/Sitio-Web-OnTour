"use client";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {getBrowserClient} from "@/lib/supabase/browser";
export function MfaSetup(){
 const router=useRouter();
 const [factor,setFactor]=useState("");const [qr,setQr]=useState("");const [code,setCode]=useState("");const [message,setMessage]=useState("");const [busy,setBusy]=useState(false);
 async function begin(){setBusy(true);try{const db=getBrowserClient();const {data,error}=await db.auth.mfa.listFactors();if(error)throw error;const existing=data.totp.find(f=>f.status==="verified");if(existing){setFactor(existing.id);return;}for(const f of data.all.filter(f=>f.status==="unverified"&&f.factor_type==="totp"))await db.auth.mfa.unenroll({factorId:f.id});const result=await db.auth.mfa.enroll({factorType:"totp",friendlyName:"OnTour"});if(result.error)throw result.error;setFactor(result.data.id);setQr(result.data.totp.qr_code);}catch{setMessage("No se pudo iniciar la verificación.");}finally{setBusy(false);}}
 async function verify(){setBusy(true);try{const {error}=await getBrowserClient().auth.mfa.challengeAndVerify({factorId:factor,code});if(error)throw error;router.replace("/admin");router.refresh();}catch{setMessage("Código no válido. Inténtalo de nuevo.");}finally{setBusy(false);}}
 return <div className="space-y-4">{!factor?<button className="admin-button" disabled={busy} onClick={begin}>Continuar con autenticador</button>:<>{qr&&<div><Image unoptimized src={qr} alt="Código QR para configurar su autenticador" width={220} height={220}/><p className="text-sm">Escanee este código con su aplicación autenticadora.</p></div>}<label className="admin-label">Código de seis dígitos<input className="admin-field" autoComplete="one-time-code" inputMode="numeric" maxLength={6} value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,""))}/></label><button className="admin-button" disabled={busy||code.length!==6} onClick={verify}>Verificar</button></>}<p role="status">{message}</p></div>;
}
