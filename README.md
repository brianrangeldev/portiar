# PortiAr Climatização — Landing Page

Landing page em Next.js (App Router) para a PortiAr Climatização, criada com
base no post de Instagram do cliente. Cores, textos e serviços foram
extraídos diretamente desse material.

## Como correr localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## Como publicar (build de produção)

```bash
npm run build
npm run start
```

Recomenda-se publicar na Vercel (criadores do Next.js) para o melhor
desempenho e SEO automático (sitemap, robots.txt, meta tags Open Graph e
dados estruturados já estão configurados em `app/layout.tsx`,
`app/sitemap.ts` e `app/robots.ts`).

## Onde editar

- `app/page.tsx` — ordem das secções da página.
- `components/Hero.tsx` — título principal e chamada de ação.
- `components/Services.tsx` — lista de serviços (instalação, manutenção, etc).
- `components/AirwellBanner.tsx` — faixa do parceiro Airwell.
- `components/WhyUs.tsx` — "porquê a PortiAr" e selos de confiança.
- `components/ContactCta.tsx` — telefone, WhatsApp e chamada final.
- `components/Footer.tsx` e `components/Header.tsx` — cabeçalho/rodapé.
- `components/Logo.tsx` — logotipo oficial (public/logo.png), via next/image.

## Paleta de cores (cores exatas do logotipo oficial)

| Nome          | Hex        | Uso                                  |
|---------------|------------|---------------------------------------|
| Navy          | `#004aad`  | Títulos, fundo escuro, botões         |
| Navy Dark     | `#00306e`  | Gradientes escuros                     |
| Brand Blue    | `#1b92d0`  | Destaques, ícones                      |
| Brand Orange  | `#d17c28`  | Chamadas de ação, acentos              |
| Brand Light   | `#eaf4fb`  | Fundos claros, secções alternadas      |

## Contacto usado no site

- Telefone / WhatsApp: **+351 935 545 270**
- Área: Portimão e arredores

## Pendente

- [x] Logotipo oficial (public/logo.png)
- [ ] Fotografias reais da equipa/serviços (atualmente a página usa apenas
      formas em CSS/SVG, sem imagens externas)
- [ ] Domínio definitivo (atualizado em `app/layout.tsx`, `app/sitemap.ts` e
      `app/robots.ts`, atualmente `https://www.portiarclimatizacao.pt`)
