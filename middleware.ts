import { NextRequest, NextResponse } from "next/server";

/**
 * Protege o painel de administração (/admin) e a respetiva API
 * (/api/admin/*) com autenticação HTTP Basic simples.
 *
 * Configurar em Vercel > Project Settings > Environment Variables:
 *   ADMIN_USER      → nome de utilizador (ex.: "portiar")
 *   ADMIN_PASSWORD  → palavra-passe à escolha do cliente
 */
function isAuthorized(request: NextRequest) {
  const expectedUser = process.env.ADMIN_USER;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  // Sem variáveis de ambiente configuradas, o painel fica bloqueado
  // por omissão (falha de forma segura, nunca aberto).
  if (!expectedUser || !expectedPassword) {
    return false;
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return false;
  }

  const base64Credentials = authHeader.slice("Basic ".length);
  let decoded: string;
  try {
    decoded = atob(base64Credentials);
  } catch {
    return false;
  }

  const separatorIndex = decoded.indexOf(":");
  if (separatorIndex === -1) return false;

  const user = decoded.slice(0, separatorIndex);
  const password = decoded.slice(separatorIndex + 1);

  return user === expectedUser && password === expectedPassword;
}

export function middleware(request: NextRequest) {
  if (isAuthorized(request)) {
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
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
