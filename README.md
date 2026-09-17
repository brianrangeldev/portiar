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
public/
  logo.png         → logotipo oficial (fundo transparente)
  og-image.png     → imagem de partilha do link (1200×630)
  trabalhos/       → fotos reais de instalações concluídas
```

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
- [x] Domínio definitivo: **portiar.com** (configurado em `app/layout.tsx`,
      `app/sitemap.ts` e `app/robots.ts`)
- [ ] Apontar o DNS do domínio para a Vercel após o deploy
- [ ] Fotografias reais da equipa/mais serviços, além das já adicionadas
      na secção "Trabalhos realizados"

## Licença

Projeto privado desenvolvido pela [Bridamo](https://github.com/BridamoPt)
para o cliente PortiAr Climatização. Todos os direitos reservados.
