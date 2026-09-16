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

## Funcionalidades

- Design responsivo (mobile-first) com a paleta oficial da marca
- SEO configurado: metadata completa, Open Graph, Twitter Card, dados
  estruturados (JSON-LD `HVACBusiness`), `sitemap.xml` e `robots.txt`
  gerados automaticamente
- Botões de contacto diretos para WhatsApp (cabeçalho, hero, secção de
  contacto e rodapé)
- Secções: hero, serviços, parceiro Airwell, porquê escolher a PortiAr,
  chamada final para contacto

## Como correr localmente

\`\`\`bash
npm install
npm run dev
\`\`\`

Abra [http://localhost:3000](http://portiar.pt)

## Build de produção

\`\`\`bash
npm run build
npm run start
\`\`\`

Recomenda-se publicar na [Vercel](https://vercel.com) para o melhor
desempenho e integração nativa com o Next.js.

## Estrutura do projeto

\`\`\`
app/
  layout.tsx      → metadata, SEO, JSON-LD
  page.tsx        → ordem das secções da página
  sitemap.ts       → sitemap.xml automático
  robots.ts        → robots.txt automático
  globals.css      → estilos base e classes utilitárias
components/
  Header.tsx       → cabeçalho com navegação e botão WhatsApp
  Hero.tsx         → secção principal com chamada de ação
  Services.tsx     → grelha de serviços
  AirwellBanner.tsx→ faixa do parceiro Airwell
  WhyUs.tsx        → selos de confiança
  ContactCta.tsx   → chamada final de contacto
  Footer.tsx       → rodapé
  Logo.tsx         → logotipo oficial (public/logo.png)
public/
  logo.png         → logotipo oficial (fundo transparente)
\`\`\`

## Paleta de cores (cores exatas do logotipo oficial)

| Nome         | Hex       | Uso                                |
| ------------ | --------- | ----------------------------------- |
| Navy         | `#004aad` | Títulos, fundo escuro, botões       |
| Navy Dark    | `#00306e` | Gradientes escuros                  |
| Brand Blue   | `#1b92d0` | Destaques, ícones                   |
| Brand Orange | `#d17c28` | Chamadas de ação, acentos           |
| Brand Light  | `#eaf4fb` | Fundos claros, secções alternadas   |

## Contacto usado no site

- WhatsApp: **+351 935 545 270**
- Área de atuação: Portimão e arredores

## Pendências

- [x] Logotipo oficial (`public/logo.png`)
- [ ] Fotografias reais da equipa/serviços (atualmente usa apenas
      formas em CSS/SVG, sem imagens externas)
- [ ] Domínio definitivo (atualizado em `app/layout.tsx`, `app/sitemap.ts`
      e `app/robots.ts`, atualmente `https://www.portiarclimatizacao.pt`)

## Licença

Projeto privado desenvolvido pela [Bridamo](https://github.com/BridamoPt)
para o cliente PortiAr Climatização. Todos os direitos reservados.
