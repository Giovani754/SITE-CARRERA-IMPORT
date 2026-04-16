import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PremiumHeader } from "@/components/premium/premium-header";
import { PremiumFooter } from "@/components/premium/premium-footer";
import { WhatsAppButton } from "@/components/premium/whatsapp-button";
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
} from "@/components/seo/json-ld";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://carreraimports.com.br"),
  title: {
    default: "Carrera Imports | Consultoria Automotiva Premium em São Paulo",
    template: "%s | Carrera Imports — São Paulo",
  },
  description:
    "Intermediação estratégica e consultoria de veículos de alto padrão em São Paulo, SP. Procedência garantida, atendimento personalizado e eficácia na compra e venda de carros premium.",
  alternates: {
    canonical: "https://carreraimports.com.br",
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
    title: "Carrera Imports | Consultoria Automotiva Premium",
    description:
      "Intermediação estratégica e consultoria de veículos de alto padrão em São Paulo. Procedência, atendimento personalizado e eficácia.",
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
    title: "Carrera Imports | Consultoria Automotiva Premium",
    description:
      "Intermediação estratégica e consultoria de veículos de alto padrão em São Paulo.",
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
    >
      <body className="min-h-full flex flex-col font-sans bg-[#030303] text-[#FAFAFA]">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <PremiumHeader />
        <main className="flex-1">{children}</main>
        <PremiumFooter />
        <WhatsAppButton />
      </body>
    </html>
  );
}
