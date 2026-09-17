import { list } from "@vercel/blob";
import { unstable_cache, revalidateTag } from "next/cache";

/**
 * Camada de dados da galeria "Trabalhos realizados".
 *
 * As fotos ficam guardadas no Vercel Blob, dentro da pasta
 * `trabalhos/`. O cliente adiciona/remove fotos através do painel
 * em /admin, sem precisar de mexer em código nem publicar (deploy)
 * nada — a página principal mostra sempre a lista atual.
 */

export const TRABALHOS_PREFIX = "trabalhos/";
export const TRABALHOS_CACHE_TAG = "trabalhos";

export type Trabalho = {
  url: string;
  pathname: string;
  uploadedAt: string;
};

/**
 * Uma Blob store ligada ao projeto na Vercel autentica-se por omissão
 * via OIDC (variável `BLOB_STORE_ID` + `VERCEL_OIDC_TOKEN`, este último
 * gerido automaticamente pela Vercel e nunca visível nas Environment
 * Variables). Só em código a correr fora da Vercel (ou tokens gerados
 * à mão) é que existe a variável estática `BLOB_READ_WRITE_TOKEN`.
 * Por isso verificamos as duas.
 */
export function isBlobConfigured() {
  return Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN);
}

async function listTrabalhosFromBlob(): Promise<Trabalho[]> {
  // Sem a Blob store ligada (ex.: ambiente local), devolve lista vazia
  // em vez de rebentar o build.
  if (!isBlobConfigured()) {
    return [];
  }

  try {
    const { blobs } = await list({ prefix: TRABALHOS_PREFIX });
    return blobs
      .filter((blob) => blob.pathname !== TRABALHOS_PREFIX)
      .sort(
        (a, b) =>
          new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
      )
      .map((blob) => ({
        url: blob.url,
        pathname: blob.pathname,
        uploadedAt:
          blob.uploadedAt instanceof Date
            ? blob.uploadedAt.toISOString()
            : String(blob.uploadedAt),
      }));
  } catch (error) {
    console.error("Erro ao listar trabalhos do Vercel Blob:", error);
    return [];
  }
}

// Cache com tag: a página principal não precisa de consultar o Blob
// a cada visita — só volta a fazê-lo quando o painel /admin invalida
// a tag "trabalhos" a seguir a um upload ou remoção.
export const getTrabalhos = unstable_cache(
  listTrabalhosFromBlob,
  ["trabalhos-list"],
  { tags: [TRABALHOS_CACHE_TAG] }
);

export function revalidateTrabalhos() {
  revalidateTag(TRABALHOS_CACHE_TAG);
}
