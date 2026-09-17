import { NextRequest, NextResponse } from "next/server";
import { put, del } from "@vercel/blob";
import {
  TRABALHOS_PREFIX,
  getTrabalhos,
  isBlobConfigured,
  revalidateTrabalhos,
} from "@/lib/trabalhos";

// Esta rota corre sempre no servidor (nunca em cache estática),
// porque lida com uploads e remoções em tempo real.
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function GET() {
  const trabalhos = await getTrabalhos();
  return NextResponse.json({ trabalhos });
}

export async function POST(request: NextRequest) {
  if (!isBlobConfigured()) {
    return NextResponse.json(
      {
        error:
          "O armazenamento de imagens (Vercel Blob) ainda não está configurado neste projeto.",
      },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Nenhum ficheiro foi enviado." },
      { status: 400 }
    );
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Formato não suportado. Envia uma foto em JPG, PNG ou WEBP." },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "A foto é demasiado grande (máximo 8 MB)." },
      { status: 400 }
    );
  }

  const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const uniqueName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const blob = await put(`${TRABALHOS_PREFIX}${uniqueName}`, file, {
    access: "public",
    contentType: file.type,
  });

  revalidateTrabalhos();

  return NextResponse.json({ trabalho: blob });
}

export async function DELETE(request: NextRequest) {
  if (!isBlobConfigured()) {
    return NextResponse.json(
      {
        error:
          "O armazenamento de imagens (Vercel Blob) ainda não está configurado neste projeto.",
      },
      { status: 500 }
    );
  }

  const { url } = await request.json();

  if (typeof url !== "string" || !url.includes(TRABALHOS_PREFIX)) {
    return NextResponse.json({ error: "Foto inválida." }, { status: 400 });
  }

  await del(url);
  revalidateTrabalhos();

  return NextResponse.json({ ok: true });
}
