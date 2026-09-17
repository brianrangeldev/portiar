"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { uploadPresigned } from "@vercel/blob/client";
import { Loader2, Trash2, Upload } from "lucide-react";
import { TRABALHOS_PREFIX, type Trabalho } from "@/lib/trabalhos";

const EXTENSION_BY_TYPE: Record<string, string> = {
  "image/png": "png",
  "image/webp": "webp",
  "image/jpeg": "jpg",
};

function uniquePathnameFor(file: File) {
  const extension = EXTENSION_BY_TYPE[file.type] ?? "jpg";
  const uniqueId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${TRABALHOS_PREFIX}${uniqueId}.${extension}`;
}

type AdminTrabalhosProps = {
  initialTrabalhos: Trabalho[];
};

export default function AdminTrabalhos({
  initialTrabalhos,
}: AdminTrabalhosProps) {
  const [trabalhos, setTrabalhos] = useState(initialTrabalhos);
  const [error, setError] = useState<string | null>(null);
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null);
  const [isUploading, startUploadTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function refreshList() {
    const res = await fetch("/api/admin/trabalhos", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setTrabalhos(data.trabalhos);
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    startUploadTransition(async () => {
      try {
        // Upload direto do browser para o Vercel Blob (não passa pelo
        // nosso servidor), para não esbarrar no limite de tamanho de
        // pedido dos Vercel Functions — fotos de telemóvel passam
        // facilmente dos 4.5 MB permitidos aí.
        await uploadPresigned(uniquePathnameFor(file), file, {
          access: "public",
          handleUploadUrl: "/api/admin/upload-presigned",
        });

        await refreshList();
        if (fileInputRef.current) fileInputRef.current.value = "";
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Não foi possível enviar a foto."
        );
      }
    });
  }

  async function handleDelete(url: string) {
    setError(null);
    setDeletingUrl(url);
    try {
      const res = await fetch("/api/admin/trabalhos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Não foi possível remover a foto.");
        return;
      }

      await refreshList();
    } finally {
      setDeletingUrl(null);
    }
  }

  return (
    <div>
      <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-navy/30 bg-white px-6 py-10 text-center transition-colors hover:border-brand-blue">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        {isUploading ? (
          <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
        ) : (
          <Upload className="h-8 w-8 text-brand-blue" />
        )}
        <span className="font-bold text-navy">
          {isUploading ? "A enviar foto..." : "Clica para escolher uma foto"}
        </span>
        <span className="text-sm text-slate-500">
          JPG, PNG ou WEBP · máximo 20 MB
        </span>
      </label>

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {trabalhos.map((trabalho) => (
          <div
            key={trabalho.url}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-card"
          >
            <Image
              src={trabalho.url}
              alt="Foto de trabalho realizado"
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 45vw"
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => handleDelete(trabalho.url)}
              disabled={deletingUrl === trabalho.url}
              className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-card transition-transform hover:scale-105 disabled:opacity-50"
              aria-label="Remover foto"
            >
              {deletingUrl === trabalho.url ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </button>
          </div>
        ))}

        {trabalhos.length === 0 && (
          <p className="col-span-full py-6 text-center text-slate-500">
            Ainda não há fotos adicionadas por aqui. As fotos originais do
            site continuam visíveis até adicionares as primeiras.
          </p>
        )}
      </div>
    </div>
  );
}
