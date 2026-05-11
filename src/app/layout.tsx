import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PublicLayoutElements } from "@/components/layout/public-layout-elements";
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
} from "@/components/seo/json-ld";
import { SITE_CONFIG } from "@/data/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default: "Carrera Imports | Curadoria e Consultoria Automotiva Premium em São Paulo",
    template: "%s | Carrera Imports — São Paulo",
  },
  description:
    "Compre ou venda veículos premium com estratégia, procedência e segurança. A Carrera Imports atua com curadoria, consultoria e intermediação automotiva de alto padrão em São Paulo.",
  alternates: {
    canonical: SITE_CONFIG.domain,
  },
  keywords: [
    "consultoria automotiva São Paulo",
    "venda de veículos premium SP",
    "intermediação de veículos alto padrão",
    "carros premium com procedência",
    "consultoria automotiva premium",
    "boutique automotiva São Paulo",
  ],
  authors: [{ name: "Carrera Imports" }],
  creator: "Carrera Imports",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Carrera Imports",
    title: "Carrera Imports | Curadoria e Consultoria Automotiva Premium em São Paulo",
    description:
      "Compre ou venda veículos premium com estratégia, procedência e segurança. A Carrera Imports atua com curadoria, consultoria e intermediação automotiva de alto padrão em São Paulo.",
    images: [
      {
        url: "/logo-carrera-imports.png",
        width: 800,
        height: 600,
        alt: "Carrera Imports - Consultoria Automotiva Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carrera Imports | Curadoria e Consultoria Automotiva Premium em São Paulo",
    description:
      "Compre ou venda veículos premium com estratégia, procedência e segurança. A Carrera Imports atua com curadoria, consultoria e intermediação automotiva de alto padrão em São Paulo.",
    images: ["/logo-carrera-imports.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-[#030303] text-[#FAFAFA]">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <PublicLayoutElements>
          {children}
        </PublicLayoutElements>
      </body>
    </html>
  );
}
