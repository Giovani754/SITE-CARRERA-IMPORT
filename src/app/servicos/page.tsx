import type { Metadata } from "next";
import { Breadcrumb } from "@/components/premium/breadcrumb";
import { PageHero } from "@/components/premium/page-hero";
import { CTASection } from "@/components/premium/cta-section";
import { DetailedServicesGrid } from "@/components/premium/detailed-services-grid";
import { ComplementaryServicesGrid } from "@/components/premium/complementary-services-grid";

export const metadata: Metadata = {
  title: "Serviços | Consultoria, Curadoria e Intermediação de Veículos Premium",
  description:
    "Consultoria automotiva, intermediação de venda, curadoria de veículos premium e apoio estratégico para comprar ou vender carros de alto padrão com segurança.",
  openGraph: {
    title: "Serviços | Consultoria, Curadoria e Intermediação de Veículos Premium",
    description:
      "Consultoria automotiva, intermediação de venda, curadoria de veículos premium e apoio estratégico para comprar ou vender carros de alto padrão com segurança.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="NOSSOS SERVIÇOS"
        title="Estrutura completa para comprar, vender e cuidar do seu veículo premium."
        description="Da avaliação inicial ao pós-negócio, conduzimos cada etapa com critério, discrição e leitura prática do mercado automotivo de alto padrão."
        backgroundImage="https://images.unsplash.com/photo-1619405399517-d7fce0f13302?q=80&w=1920&auto=format&fit=crop"
        backgroundAlt="Interior premium de veículo - Carrera Imports"
        accentPosition="center"
      />

      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[{ name: "Serviços", href: "/servicos" }]} />

          <DetailedServicesGrid />
        </div>
      </section>

      {/* Complementares */}
      <section className="py-32 px-6 lg:px-12 bg-[#050505] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.015),transparent)] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <header className="mb-20 text-center">
            <span className="text-brand-gold text-[10px] uppercase tracking-[0.8em] font-bold mb-8 block opacity-50">
              COMPLEMENTARES
            </span>
            <h2 className="text-3xl md:text-4xl font-serif italic tracking-tight text-white/95">
              Tudo que sustenta uma negociação bem conduzida.
            </h2>
          </header>

          <ComplementaryServicesGrid />
        </div>
      </section>

      <CTASection
        variant="compact"
        headline="Precisa de uma condução sob medida?"
        subheadline="Fale com a Carrera Imports e entenda qual serviço faz sentido para o seu momento: compra, venda, curadoria ou suporte estratégico."
      />
    </>
  );
}
