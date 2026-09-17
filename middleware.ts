import { NextRequest, NextResponse } from "next/server";
import { isRequestAuthorized } from "@/lib/admin-auth";

/**
 * Protege o painel de administração (/admin) e a listagem/remoção de
 * fotos (/api/admin/trabalhos) com autenticação HTTP Basic simples.
 *
 * Nota: /api/admin/upload-presigned fica de fora deste middleware de
 * propósito — a Vercel chama essa rota diretamente (callback de
 * "upload concluído") sem a password do painel. Essa rota faz a sua
 * própria verificação, só no pedido inicial do token (ver o ficheiro).
 *
 * Configurar em Vercel > Project Settings > Environment Variables:
 *   ADMIN_USER      → nome de utilizador (ex.: "portiar")
 *   ADMIN_PASSWORD  → palavra-passe à escolha do cliente
 */
export function middleware(request: NextRequest) {
  if (isRequestAuthorized(request)) {
    return NextResponse.next();
  }

  return new NextResponse("Autenticação necessária.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Painel PortiAr", charset="UTF-8"',
    },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/trabalhos/:path*"],
};
