/**
 * Sessão simples do painel de administração, baseada em cookie.
 *
 * Antes usávamos HTTP Basic Auth (o popup nativo do browser), mas
 * essa abordagem não tem um "logout" real — o browser guarda a
 * password para sempre. Em vez disso: uma página de login normal
 * (/admin/login) troca utilizador+password por um cookie de sessão,
 * e um botão "Sair" limpa esse cookie.
 *
 * Não há base de dados nem tabela de sessões: o valor do cookie é
 * calculado a partir das próprias `ADMIN_USER`/`ADMIN_PASSWORD`
 * (variáveis de ambiente), por isso muda sozinho sempre que a
 * password é alterada — invalidando sessões antigas automaticamente.
 */

export const ADMIN_SESSION_COOKIE = "portiar_admin_session";

async function sha256Hex(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function verifyCredentials(user: string, password: string) {
  const expectedUser = process.env.ADMIN_USER;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return false;
  }

  return user === expectedUser && password === expectedPassword;
}

export async function computeSessionToken(user: string, password: string) {
  return sha256Hex(`portiar-admin-session:${user}:${password}`);
}

async function expectedSessionToken(): Promise<string | null> {
  const expectedUser = process.env.ADMIN_USER;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return null;
  }

  return computeSessionToken(expectedUser, expectedPassword);
}

export async function isSessionValid(token: string | undefined | null) {
  if (!token) return false;

  const expected = await expectedSessionToken();
  if (!expected) return false;

  return token === expected;
}
