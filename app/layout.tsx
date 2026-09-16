import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://www.portiar.pt";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PortiAr Climatização | Ar Condicionado em Portimão e Arredores",
    template: "%s | PortiAr Climatização",
  },
  description:
    "Instalação, manutenção e assistência técnica de ar condicionado em Portimão e arredores. Sistemas de climatização frio e calor com a qualidade Airwell. Peça já o seu orçamento.",
  keywords: [
    "ar condicionado Portimão",
    "instalação ar condicionado Algarve",
    "manutenção ar condicionado",
    "climatização Portimão",
    "assistência técnica ar condicionado",
    "Airwell Portugal",
    "PortiAr Climatização",
  ],
  authors: [{ name: "PortiAr Climatização" }],
  creator: "PortiAr Climatização",
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: siteUrl,
    siteName: "PortiAr Climatização",
    title: "PortiAr Climatização | Conforto em Todas as Estações",
    description:
      "Instalação, manutenção e assistência técnica de ar condicionado para a sua casa ou negócio. Resposta rápida em Portimão e arredores.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PortiAr Climatização - Ar condicionado para a sua casa ou negócio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PortiAr Climatização | Conforto em Todas as Estações",
    description:
      "Instalação, manutenção e assistência técnica de ar condicionado em Portimão e arredores.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#004aad",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: "PortiAr Climatização",
  slogan: "Conforto em todas as estações",
  description:
    "Instalação, manutenção e assistência técnica de ar condicionado e sistemas de climatização para casas e negócios.",
  telephone: "+351935545270",
  url: siteUrl,
  areaServed: {
    "@type": "City",
    name: "Portimão",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Portimão",
    addressRegion: "Algarve",
    addressCountry: "PT",
  },
  priceRange: "€€",
  brand: {
    "@type": "Brand",
    name: "Airwell",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT">
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
