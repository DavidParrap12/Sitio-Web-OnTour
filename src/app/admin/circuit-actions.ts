"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import { SUPABASE_STORAGE_BUCKET } from "@/lib/supabase/config";

export interface ActionState {
  ok: boolean;
  error?: string;
}

const LOCALES = ["es", "en", "de", "fr"] as const;

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function integer(formData: FormData, key: string, fallback: number): number {
  const parsed = Number.parseInt(text(formData, key), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function lines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function revalidateSite(circuitId?: string) {
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin");
  if (circuitId) revalidatePath(`/admin/circuits/${circuitId}`);
}

function readCircuitFields(formData: FormData) {
  return {
    kind: text(formData,"kind")==="day_trip"?"day_trip":"circuit",
    days: Math.min(Math.max(integer(formData, "days", 1), 1), 365),
    nights: Math.min(Math.max(integer(formData, "nights", 0), 0), 364),
    image: text(formData, "image"),
    color_theme: text(formData, "color_theme") || "cultura",
    region: text(formData, "region") || "andes",
    map_embed_url: text(formData, "map_embed_url"),
    brochure_url: text(formData, "brochure_url"),
    brochure_pdf_url: text(formData, "brochure_pdf_url"),
    published: formData.get("published") === "on",
    sort_order: integer(formData, "sort_order", 0),
  };
}

function readTranslations(formData: FormData) {
  return LOCALES.map((locale) => ({
    locale,
    name: text(formData, `name_${locale}`),
    description: text(formData, `description_${locale}`),
    price: "",
    duration:text(formData,"duration_"+locale),included:text(formData,"included_"+locale),excluded:text(formData,"excluded_"+locale),
    highlights: lines(text(formData, `highlights_${locale}`)),
    itinerary: lines(text(formData, `itinerary_${locale}`)),
  }));
}

export async function createCircuit(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  void _prev;
  const { supabase } = await requireAdmin();

  const id = slugify(text(formData, "id") || text(formData, "name_es"));
  if (!id) return { ok: false, error: "Escribe un identificador o un nombre en español." };

  const fields = readCircuitFields(formData);
  const translations = readTranslations(formData);
  for(const url of [fields.image,fields.map_embed_url,fields.brochure_url,fields.brochure_pdf_url]){
   if(url && !/^https:\/\//i.test(url) && !/^\/(?!\/)/.test(url))return {ok:false,error:"Use enlaces HTTPS o rutas locales."};
  }
  if(fields.published&&!fields.image)return {ok:false,error:"Añada una imagen antes de publicar."};


  if (!translations[0].name) {
    return { ok: false, error: "El nombre en español es obligatorio." };
  }

  const {error}=await supabase.rpc("save_catalog",{product_id:id,fields,translations,create_new:true});
  if(error)return {ok:false,error:error.code==="23505"?"Este identificador ya existe.":"No se guardó el producto. Revise los datos y la migración."};
  revalidateSite(id);
  redirect(`/admin/circuits/${id}?created=1`);
}

export async function updateCircuit(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id");
  if (!id) return { ok: false, error: "Falta el identificador del circuito." };

  const fields = readCircuitFields(formData);
  const translations = readTranslations(formData);
  for(const url of [fields.image,fields.map_embed_url,fields.brochure_url,fields.brochure_pdf_url]){
   if(url && !/^https:\/\//i.test(url) && !/^\/(?!\/)/.test(url))return {ok:false,error:"Use enlaces HTTPS o rutas locales."};
  }
  if(fields.published&&!fields.image)return {ok:false,error:"Añada una imagen antes de publicar."};


  if (!translations[0].name) {
    return { ok: false, error: "El nombre en español es obligatorio." };
  }

  const {error}=await supabase.rpc("save_catalog",{product_id:id,fields,translations,create_new:false});
  if(error)return {ok:false,error:"No se guardaron cambios. Revise los datos y la migración."};
  revalidateSite(id);
  redirect(`/admin/circuits/${id}?saved=1`);
}

export async function deleteCircuit(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id");
  if (!id) return;

  const {error}=await supabase.from("circuits").update({published:false}).eq("id",id);
  if(error)throw new Error("No se pudo retirar el producto.");
  revalidateSite(); redirect("/admin?deleted=1");
}

export async function setCover(formData: FormData) {
  const { supabase } = await requireAdmin();
  const circuitId = text(formData, "circuit_id");
  const mediaId = text(formData, "media_id");
  if (!circuitId || !mediaId) return;

  const { data: media } = await supabase
    .from("circuit_media")
    .select("url")
    .eq("id", mediaId)
    .eq("circuit_id",circuitId)
    .eq("kind","image")
    .single();

  if (!media?.url) return;

  await supabase
    .from("circuits")
    .update({ image: media.url })
    .eq("id", circuitId);

  revalidateSite(circuitId);
}

export async function deleteMedia(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(formData, "media_id");
  if (!id) return;

  const { data: media } = await supabase
    .from("circuit_media")
    .select("id,circuit_id,url")
    .eq("id", id)
    .single();

  if (!media) return;

  const path = storagePath(media.url);
  if (path) {
    await supabase.storage.from(SUPABASE_STORAGE_BUCKET).remove([path]);
  }

  await supabase.from("circuit_media").delete().eq("id", id);

  const { data: circuit } = await supabase
    .from("circuits")
    .select("image")
    .eq("id", media.circuit_id)
    .single();

  if (circuit?.image === media.url) {
    await supabase
      .from("circuits")
      .update({ image: "" })
      .eq("id", media.circuit_id);
  }

  revalidateSite(media.circuit_id);
}

export async function updateMedia(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(formData, "media_id");
  const location = text(formData, "location");
  if (!id) return;

  const { data: media } = await supabase
    .from("circuit_media")
    .select("circuit_id")
    .eq("id", id)
    .single();

  await supabase.from("circuit_media").update({ location }).eq("id", id);

  if (media?.circuit_id) revalidateSite(media.circuit_id);
}

export async function saveCircuitPrices(circuitId: string, rows: import("@/lib/pricing").Tariff[]) {
 const {supabase}=await requireAdmin();
 try {
 const {validateTariffs}=await import("@/lib/pricing");
 const clean=validateTariffs(rows);
 const {error}=await supabase.rpc("replace_circuit_prices",{product_id:circuitId,rows:clean});
 if(error)return {ok:false,error:"No se guardaron cambios. Revise las vigencias superpuestas, permisos y migración."};
 revalidateSite(circuitId);return {ok:true};
 } catch(error){return {ok:false,error:error instanceof Error?error.message:"Datos no válidos."};}
}

export async function importStarterCircuits(_prev:ActionState):Promise<ActionState>{
 void _prev;
 const {supabase}=await requireAdmin();
 const {getStarterEntries}=await import("@/lib/circuits");
 for(const kind of ["circuit","day_trip"] as const){
 const bundles=await Promise.all(LOCALES.map(locale=>getStarterEntries(locale,kind)));
 for(const [index,product] of bundles[0].entries()){
 const {data:existing,error:readError}=await supabase.from("circuits").select("id").eq("id",product.id).maybeSingle();
 if(readError)return {ok:false,error:"No se pudo comprobar el catálogo."};
 if(existing)continue;
 const fields={kind,days:product.days,nights:product.nights,image:product.image,color_theme:product.colorTheme??"cultura",region:product.region,map_embed_url:product.mapEmbedUrl??"",brochure_url:product.brochureUrl??"",brochure_pdf_url:product.brochurePdfUrl??"",published:false,sort_order:index};
 const translations=LOCALES.map((locale,i)=>{const t=bundles[i].find(p=>p.id===product.id)!;return {locale,name:t.name,description:t.description,highlights:t.highlights,itinerary:t.itinerary,duration:t.duration,included:t.included,excluded:t.excluded,activities:t.activities.map(a=>({...a,precio_desde:null}))};});
 const {error}=await supabase.rpc("save_catalog",{product_id:product.id,fields,translations,create_new:true});
 if(error)return {ok:false,error:"No se completó la importación. Puede reintentar: los productos existentes se conservan."};
 const media=product.dayImages.map((m,i)=>({circuit_id:product.id,kind:"image",url:m.image,location:m.location,sort_order:i}));
 if(media.length){const {error:mediaError}=await supabase.from("circuit_media").insert(media);if(mediaError)return {ok:false,error:"Producto creado como borrador; no se importó su galería. Revise las imágenes antes de publicarlo."};}
 }
 }
 revalidateSite();return {ok:true};
}

function storagePath(url: string): string | null {
  const marker = `/storage/v1/object/public/${SUPABASE_STORAGE_BUCKET}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length));
}
