# PortiAr Climatização — Landing Page

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss)

Landing page oficial da **PortiAr Climatização**, empresa de instalação,
manutenção e assistência técnica de ar condicionado em Portimão e
arredores. Construída em Next.js (App Router) com foco em performance e
SEO, usando a identidade visual e cores exatas do logotipo da marca.

## Tecnologias

- [Next.js 14](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- [lucide-react](https://lucide.dev/) para ícones
- [framer-motion](https://www.framer.com/motion/) para as animações de
  entrada/saída ao fazer scroll
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) para
  armazenar as fotos que o cliente adiciona pelo painel `/admin`

## Funcionalidades

- Design responsivo (mobile-first) com a paleta oficial da marca
- SEO configurado: metadata completa, Open Graph, Twitter Card, dados
  estruturados (JSON-LD `HVACBusiness`), `sitemap.xml` e `robots.txt`
  gerados automaticamente
- Imagem de partilha (Open Graph) e favicon com a marca, para quando o
  link é partilhado no WhatsApp, iMessage, redes sociais, etc.
- Animações suaves de fade-in/fade-out ao rolar a página (via
  `components/Reveal.tsx`), otimizadas para mobile e respeitando a
  preferência "reduzir movimento" do sistema
- Botões de contacto diretos para WhatsApp (cabeçalho, hero, secção de
  contacto e rodapé)
- Secções: hero (com animação de ar condicionado a soprar), serviços,
  trabalhos realizados (galeria de fotos), parceiro Airwell, porquê
  escolher a PortiAr, chamada final para contacto
- Painel `/admin` para o cliente adicionar ou remover fotos da secção
  "Trabalhos realizados" sozinho, sem mexer em código nem publicar
  nada (ver secção [Painel de fotos do cliente](#painel-de-fotos-do-cliente-admin))

## Como correr localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000)

## Build de produção

```bash
npm run build
npm run start
```

Recomenda-se publicar na [Vercel](https://vercel.com) para o melhor
desempenho e integração nativa com o Next.js. O domínio definitivo do
projeto é **portiar.com** — depois do deploy, basta apontar o domínio
para a Vercel (registo `A`/`CNAME` conforme as instruções que a Vercel
mostra ao adicionar o domínio nas definições do projeto).

## Estrutura do projeto

```
app/
  layout.tsx       → metadata, SEO, JSON-LD, Open Graph
  page.tsx         → ordem das secções da página
  sitemap.ts       → sitemap.xml automático
  robots.ts        → robots.txt automático
  globals.css      → estilos base e classes utilitárias
  icon.png         → favicon (gerado a partir do símbolo do logotipo)
  apple-icon.png   → ícone para iOS/Safari
  admin/page.tsx   → painel para o cliente gerir as fotos de trabalhos
  api/admin/trabalhos/route.ts → API que faz upload/remoção no Vercel Blob
components/
  Header.tsx       → cabeçalho com navegação e botão WhatsApp
  Hero.tsx         → secção principal, com animação de ar a soprar
  Services.tsx     → grelha de serviços
  Works.tsx        → galeria "Trabalhos realizados"
  AirwellBanner.tsx→ faixa do parceiro Airwell
  WhyUs.tsx        → selos de confiança
  ContactCta.tsx   → chamada final de contacto
  Footer.tsx       → rodapé
  Logo.tsx         → logotipo oficial (public/logo.png)
  Reveal.tsx       → wrapper de animação fade-in/fade-out ao rolar
  admin/AdminTrabalhos.tsx → interface de upload/remoção do painel
lib/
  trabalhos.ts     → lê a lista de fotos guardadas no Vercel Blob
middleware.ts      → protege /admin e /api/admin com autenticação
public/
  logo.png         → logotipo oficial (fundo transparente)
  og-image.png     → imagem de partilha do link (1200×630)
  trabalhos/       → fotos originais de instalações concluídas
```

## Paleta de cores (cores exatas do logotipo oficial)

| Nome         | Hex       | Uso                                |
| ------------ | --------- | ----------------------------------- |
| Navy         | `#004aad` | Títulos, fundo escuro, botões       |
| Navy Dark    | `#00306e` | Gradientes escuros                  |
| Brand Blue   | `#1b92d0` | Destaques, ícones                   |
| Brand Orange | `#d17c28` | Chamadas de ação, acentos           |
| Brand Light  | `#eaf4fb` | Fundos claros, secções alternadas   |

## Painel de fotos do cliente (`/admin`)

O cliente pode adicionar ou remover fotos da secção "Trabalhos
realizados" sozinho, em `https://www.portiar.com/admin`, sem precisar
de mexer em código nem pedir um novo deploy — a foto aparece no site
assim que é enviada.

### Configuração necessária (feita uma única vez)

1. **Ativar o armazenamento de imagens (Vercel Blob):**
   No painel da Vercel, dentro do projeto → separador **Storage** →
   **Create Database** → escolher **Blob** → ligar ("Connect") ao
   projeto `portiar`. A Vercel liga a store por **OIDC** e cria
   automaticamente as variáveis `BLOB_STORE_ID` e `BLOB_WEBHOOK_PUBLIC_KEY`
   (visíveis em Environment Variables) — não é preciso copiar nem
   configurar nenhum token à mão. A variável `VERCEL_OIDC_TOKEN`, que
   trata da autenticação em si, é gerida pela própria Vercel e não
   aparece na lista de variáveis do projeto.
   Mantém a opção **"Enable access to System Environment Variables"**
   ativada (é o que permite o site usar essa autenticação).

2. **Definir a palavra-passe do painel:**
   Em Project Settings → **Environment Variables**, adicionar:

   | Nome             | Valor                          |
   | ---------------- | ------------------------------- |
   | `ADMIN_USER`     | ex.: `portiar`                  |
   | `ADMIN_PASSWORD` | uma palavra-passe à tua escolha |

   Sem estas duas variáveis definidas, o painel `/admin` fica
   bloqueado por omissão (nunca fica acessível sem password).

3. Fazer um novo deploy (ou "Redeploy") para as variáveis passarem a
   valer.

### Como o cliente usa

1. Abrir `https://www.portiar.com/admin` no telemóvel ou computador.
2. Introduzir o utilizador/palavra-passe combinados (fica guardado no
   browser, não pede sempre).
3. Clicar na área "Clica para escolher uma foto" para adicionar uma
   foto nova, ou no ícone do caixote do lixo para remover uma foto
   existente.
4. Pronto — a alteração já aparece no site, sem precisar de avisar
   ninguém.

- WhatsApp: **+351 935 545 270**
- Área de atuação: Portimão e arredores

## Pendências

- [x] Logotipo oficial (`public/logo.png`)
- [x] Domínio definitivo: **portiar.com** (configurado em `app/layout.tsx`,
      `app/sitemap.ts` e `app/robots.ts`)
- [ ] Apontar o DNS do domínio para a Vercel após o deploy
- [ ] Ativar o Vercel Blob e definir `ADMIN_USER`/`ADMIN_PASSWORD`
      para o painel `/admin` funcionar (ver secção acima)
- [ ] Fotografias reais da equipa/mais serviços — o cliente já pode
      adicioná-las sozinho pelo painel `/admin`

## Licença

Projeto privado desenvolvido pela [Bridamo](https://github.com/BridamoPt)
para o cliente PortiAr Climatização. Todos os direitos reservados.
