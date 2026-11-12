"use client";
import {useState,useTransition,type ReactNode} from "react";
export function ActionForm({action,children,label="Guardar"}:{action:(form:FormData)=>Promise<{ok:boolean;error?:string}>;children:ReactNode;label?:string}){
 const [pending,start]=useTransition();const [message,setMessage]=useState("");
 return <form className="space-y-4" onSubmit={e=>{e.preventDefault();const data=new FormData(e.currentTarget);start(async()=>{try{const r=await action(data);setMessage(r.ok?"Guardado.":r.error??"No se pudo guardar.");}catch{setMessage("No se pudo guardar. Revise la conexión y sus permisos.");}});}}>{children}<button className="admin-button" disabled={pending}>{pending?"Guardando…":label}</button><p role="status" className="text-sm">{message}</p></form>;
}
