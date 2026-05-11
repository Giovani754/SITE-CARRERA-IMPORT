import type { Metadata } from "next";
import { PageHero } from "@/components/premium/page-hero";
import { LocalBusinessJsonLd } from "@/components/seo/json-ld";
import { ContactContent } from "@/components/premium/contact-content";

export const metadata: Metadata = {
  title: "Contato | Fale com a Carrera Imports",
  description:
    "Fale com a Carrera Imports para comprar, vender ou avaliar veículos premium com atendimento consultivo, discreto e estratégico em São Paulo.",
  openGraph: {
    title: "Contato | Fale com a Carrera Imports",
    description:
      "Fale com a Carrera Imports para comprar, vender ou avaliar veículos premium com atendimento consultivo, discreto e estratégico em São Paulo.",
  },
};

export default function ContactPage() {
  return (
    <>
      <LocalBusinessJsonLd />

      <PageHero
        eyebrow="CONSULTORIA EM SÃO PAULO"
        title="Antes de negociar, fale com quem entende o mercado."
        description="Entre em contato com a Carrera Imports e receba uma condução discreta, criteriosa e alinhada ao seu objetivo: comprar, vender ou encontrar o veículo certo."
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop"
        backgroundAlt="Arquitetura urbana premium - São Paulo"
        accentPosition="right"
      />

      <ContactContent />
    </>
  );
}
