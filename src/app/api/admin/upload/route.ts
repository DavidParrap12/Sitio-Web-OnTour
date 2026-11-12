import {NextResponse} from "next/server";
import {revalidatePath} from "next/cache";
import {getAdminUser} from "@/lib/adminAuth";
import {SUPABASE_STORAGE_BUCKET} from "@/lib/supabase/config";
import {getServerClient} from "@/lib/supabase/server";
import {MAX_MEDIA_BYTES,MEDIA_EXTENSIONS,matchesMediaType,limitedBody} from "@/lib/mediaValidation";
export const runtime="nodejs";
export const dynamic="force-dynamic";
const json=(body:unknown,status=200)=>NextResponse.json(body,{status,headers:{"Cache-Control":"no-store"}});
export async function POST(request:Request){
 if(request.headers.get("origin")!==new URL(request.url).origin)return json({error:"Origen no permitido."},403);
 if(!await getAdminUser())return json({error:"No autorizado."},401);
 let form:FormData;
 try{
 const bytes=await limitedBody(request,MAX_MEDIA_BYTES+65536);
 form=await new Response(bytes,{headers:{"content-type":request.headers.get("content-type")??""}}).formData();
 }catch{return json({error:"Archivo inválido o demasiado grande (máximo 12 MB)."},413);}
 const file=form.get("file"),circuitId=String(form.get("circuitId")??"");
 const kind=form.get("kind")==="video"?"video":"image";
 if(!(file instanceof File)||!circuitId||circuitId.length>180)return json({error:"Falta el archivo o producto."},400);
 if(file.size>MAX_MEDIA_BYTES)return json({error:"Máximo 12 MB por archivo."},413);
 const extension=MEDIA_EXTENSIONS[file.type];
 if(!extension||!file.type.startsWith(kind+"/")||!matchesMediaType(new Uint8Array(await file.slice(0,64).arrayBuffer()),file.type))return json({error:"Formato o contenido no compatible. Use JPG, PNG, WebP, AVIF, MP4 o WebM."},415);
 const db=await getServerClient();
 const {data:product}=await db.from("circuits").select("id").eq("id",circuitId).maybeSingle();
 if(!product)return json({error:"Producto no encontrado."},404);
 const path=circuitId+"/"+crypto.randomUUID()+"."+extension;
 const {error}=await db.storage.from(SUPABASE_STORAGE_BUCKET).upload(path,file,{contentType:file.type,cacheControl:"31536000",upsert:false});
 if(error)return json({error:"No se pudo subir el archivo."},500);
 const {data:publicUrl}=db.storage.from(SUPABASE_STORAGE_BUCKET).getPublicUrl(path);
 const {data:media,error:insertError}=await db.from("circuit_media").insert({circuit_id:circuitId,kind,url:publicUrl.publicUrl,location:String(form.get("location")??"").slice(0,300)}).select("id,kind,url,location").single();
 if(insertError){await db.storage.from(SUPABASE_STORAGE_BUCKET).remove([path]);return json({error:"No se pudo guardar el archivo en el catálogo."},500);}
 revalidatePath("/","layout");return json({ok:true,media});
}
