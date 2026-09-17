import { NextRequest, NextResponse } from "next/server";
import { del } from "@vercel/blob";
import {
  TRABALHOS_PREFIX,
  isBlobConfigured,
  listTrabalhosUncached,
  revalidateTrabalhos,
} from "@/lib/trabalhos";

// Esta rota corre sempre no servidor (nunca em cache estática),
// porque lida com remoções em tempo real. O upload de novas fotos vai
// direto do browser para o Vercel Blob em /api/admin/upload-presigned
// (ver esse ficheiro) — evita o limite de 4.5 MB por pedido dos
// Vercel Functions, pequeno demais para muitas fotos de telemóvel.
export const dynamic = "force-dynamic";

export async function GET() {
  // Sem cache de propósito: o painel precisa de ver logo o estado
  // real (ex.: a foto que o próprio cliente acabou de enviar).
  const trabalhos = await listTrabalhosUncached();
  return NextResponse.json({ trabalhos });
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
