import { issueSignedToken } from "@vercel/blob";
import {
  type HandleUploadPresignedBody,
  handleUploadPresigned,
} from "@vercel/blob/client";
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isSessionValid } from "@/lib/admin-auth";
import { TRABALHOS_PREFIX, revalidateTrabalhos } from "@/lib/trabalhos";

/**
 * Upload direto do browser para o Vercel Blob (bypassa o limite de
 * 4.5 MB por pedido dos Vercel Functions, que é pequeno demais para
 * muitas fotos tiradas com telemóvel). Ver /docs/vercel-blob/vercel-signed-urls.
 *
 * Esta rota NÃO fica atrás do middleware de autenticação: a Vercel
 * chama-a de volta (tipo "blob.upload-completed") sem o cookie de
 * sessão do cliente, depois de o ficheiro já estar na Blob store. Por
 * isso a verificação da sessão é feita aqui manualmente, e só para o
 * pedido inicial do token (tipo "blob.generate-presigned-url").
 */
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB (fotos de telemóvel)
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadPresignedBody;

  if (body.type === "blob.generate-presigned-url") {
    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    if (!(await isSessionValid(token))) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }
  }

  try {
    const jsonResponse = await handleUploadPresigned({
      body,
      request,
      getSignedToken: async (pathname) => {
        if (!pathname.startsWith(TRABALHOS_PREFIX)) {
          throw new Error("Localização de upload inválida.");
        }

        const token = await issueSignedToken({
          pathname,
          operations: ["put"],
          allowedContentTypes: ALLOWED_TYPES,
          maximumSizeInBytes: MAX_FILE_SIZE,
          validUntil: Date.now() + 10 * 60 * 1000,
        });

        return {
          token,
          urlOptions: {
            allowedContentTypes: ALLOWED_TYPES,
            maximumSizeInBytes: MAX_FILE_SIZE,
            addRandomSuffix: false,
            allowOverwrite: false,
            validUntil: Date.now() + 10 * 60 * 1000,
          },
        };
      },
      onUploadCompleted: async () => {
        revalidateTrabalhos();
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
