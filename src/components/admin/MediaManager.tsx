"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Film,
  ImageIcon,
  Loader2,
  Star,
  Trash2,
  UploadCloud,
} from "lucide-react";
import {
  deleteMedia,
  setCover,
  updateMedia,
} from "@/app/admin/circuit-actions";

export interface MediaItem {
  id: string;
  kind: "image" | "video";
  url: string;
  location: string;
}

export function MediaManager({
  circuitId,
  coverImage,
  items,
}: {
  circuitId: string;
  coverImage: string;
  items: MediaItem[];
}) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [kind, setKind] = useState<"image" | "video">("image");
  const [location, setLocation] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string | null>(null);

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError("Selecciona un archivo.");
      return;
    }

    setError(null);
    setUploading(true);
    setProgress(`Subiendo ${file.name}…`);

    try {
      const body = new FormData();
      body.set("file", file);
      body.set("circuitId", circuitId);
      body.set("kind", kind);
      body.set("location", location);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      const result = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(result?.error || "No se pudo subir el archivo.");
      }

      if (fileRef.current) fileRef.current.value = "";
      setLocation("");
      router.refresh();
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "No se pudo subir el archivo."
      );
    } finally {
      setUploading(false);
      setProgress(null);
    }
  }

  return (
    <section className="mt-8 rounded-3xl border border-stone-200 bg-white p-6 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl font-semibold text-stone-900">
            Fotos y vídeos
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            Se muestran en el itinerario y la galería del circuito.
          </p>
        </div>
        <span className="rounded-full bg-stone-100 px-3 py-1 text-[11px] font-medium text-stone-500">
          {items.length} archivos
        </span>
      </div>

      <form
        onSubmit={handleUpload}
        className="mt-5 grid grid-cols-1 gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end"
      >
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600">
            Archivo
          </label>
          <input
            ref={fileRef}
            type="file"
            accept={kind === "image" ? "image/*" : "video/*"}
            required
            className="block w-full cursor-pointer rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#0a3566] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600">
            Tipo
          </label>
          <select
            value={kind}
            onChange={(event) =>
              setKind(event.target.value === "video" ? "video" : "image")
            }
            className="min-h-10 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#0a3566]"
          >
            <option value="image">Foto</option>
            <option value="video">Vídeo</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-600">
            Lugar / título
          </label>
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Cartagena"
            className="min-h-10 w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#0a3566]"
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0a3566] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#B49A68] hover:text-[#0a3566] disabled:cursor-wait disabled:opacity-70"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <UploadCloud className="h-4 w-4" />
          )}
          {uploading ? "Subiendo" : "Subir"}
        </button>
      </form>

      {progress ? (
        <p className="mt-2 text-xs text-stone-500">{progress}</p>
      ) : null}
      {error ? (
        <p className="mt-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
          {error}
        </p>
      ) : null}

      {items.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-stone-300 px-4 py-8 text-center text-sm text-stone-400">
          Todavía no hay fotos ni vídeos. Sube el primero arriba.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const isCover = coverImage === item.url;
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-stone-200 bg-white"
              >
                <div className="relative aspect-[4/3] bg-stone-100">
                  {item.kind === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.url}
                      alt={item.location || "Foto del circuito"}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <video
                      src={item.url}
                      controls
                      preload="metadata"
                      className="h-full w-full bg-black object-contain"
                    />
                  )}
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    {item.kind === "image" ? (
                      <ImageIcon className="h-3 w-3" />
                    ) : (
                      <Film className="h-3 w-3" />
                    )}
                    {item.kind === "image" ? "Foto" : "Vídeo"}
                  </span>
                  {isCover ? (
                    <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-[#B49A68] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0a3566]">
                      <Star className="h-3 w-3" />
                      Portada
                    </span>
                  ) : null}
                </div>

                <div className="space-y-3 p-3">
                  <form action={updateMedia} className="flex gap-2">
                    <input type="hidden" name="media_id" value={item.id} />
                    <input
                      name="location"
                      defaultValue={item.location}
                      placeholder="Lugar o título"
                      className="min-h-9 w-full rounded-lg border border-stone-200 px-2.5 py-1.5 text-xs outline-none focus:border-[#0a3566]"
                    />
                    <button
                      type="submit"
                      className="shrink-0 cursor-pointer rounded-lg border border-stone-300 px-3 py-1.5 text-xs font-semibold text-stone-600 transition hover:border-[#0a3566] hover:text-[#0a3566]"
                    >
                      Guardar
                    </button>
                  </form>

                  <div className="flex items-center gap-2">
                    {item.kind === "image" && !isCover ? (
                      <form action={setCover}>
                        <input type="hidden" name="circuit_id" value={circuitId} />
                        <input type="hidden" name="media_id" value={item.id} />
                        <button
                          type="submit"
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#0a3566]/5 px-3 py-1.5 text-xs font-semibold text-[#0a3566] transition hover:bg-[#0a3566] hover:text-white"
                        >
                          <Star className="h-3.5 w-3.5" />
                          Usar como portada
                        </button>
                      </form>
                    ) : null}

                    <form action={deleteMedia} className="ml-auto">
                      <input type="hidden" name="media_id" value={item.id} />
                      <button
                        type="submit"
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Eliminar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
