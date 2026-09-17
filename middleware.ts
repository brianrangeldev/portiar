import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isSessionValid } from "@/lib/admin-auth";

/**
 * Protege o painel de administração (/admin) e a listagem/remoção de
 * fotos (/api/admin/trabalhos) com uma sessão de cookie simples.
 *
 * A página /admin/login fica sempre acessível (é preciso conseguir
 * chegar lá para iniciar sessão). /api/admin/login e
 * /api/admin/logout ficam fora do matcher abaixo, de propósito.
 *
 * /api/admin/upload-presigned também fica fora do matcher: a Vercel
 * chama essa rota diretamente (callback de "upload concluído") sem
 * o cookie de sessão do cliente. Essa rota faz a sua própria
 * verificação, só no pedido inicial do token (ver o ficheiro).
 *
 * Configurar em Vercel > Project Settings > Environment Variables:
 *   ADMIN_USER      → nome de utilizador (ex.: "portiar")
 *   ADMIN_PASSWORD  → palavra-passe à escolha do cliente
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (await isSessionValid(token)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/trabalhos/:path*"],
};
