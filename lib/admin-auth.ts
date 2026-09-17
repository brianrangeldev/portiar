/**
 * Verificação de autenticação HTTP Basic partilhada entre o
 * middleware (que protege /admin e /api/admin/trabalhos) e a rota de
 * upload direto (/api/admin/upload-presigned), que não pode ficar
 * atrás do middleware porque a Vercel chama-a de volta (callback de
 * "upload concluído") sem a password do painel.
 */
export function isRequestAuthorized(request: Request) {
  const expectedUser = process.env.ADMIN_USER;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  // Sem variáveis de ambiente configuradas, fica bloqueado por omissão.
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
