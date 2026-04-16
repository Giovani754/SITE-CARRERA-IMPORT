import type { Metadata } from "next";
import { Breadcrumb } from "@/components/premium/breadcrumb";
import { PageHero } from "@/components/premium/page-hero";
import { CTASection } from "@/components/premium/cta-section";
import { Shield, Target, Gem, Award, Search, UserCheck, BarChart, Wrench } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/data/constants";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Consultoria automotiva premium, intermediação de venda, curadoria de veículos e apoio estratégico comercial. Conheça os serviços da Carrera Imports em São Paulo.",
  openGraph: {
    title: "Serviços | Carrera Imports",
    description:
      "Consultoria automotiva, intermediação, curadoria de veículos premium e apoio estratégico em São Paulo.",
  },
};

const detailedServices = [
  {
    title: "Consultoria Automotiva",
    description:
      "Assessoria completa para quem deseja comprar ou vender um veículo premium. Analisamos o mercado, definimos o posicionamento correto e conduzimos a estratégia com foco em resultado.",
    icon: Target,
    features: [
      "Análise de mercado personalizada",
      "Definição de preço estratégico",
      "Orientação para compra e venda",
    ],
  },
  {
    title: "Intermediação da Venda",
    description:
      "Intermediação profissional de ponta a ponta. Filtramos curiosos, conduzimos as visitas e garantimos uma negociação segura e discreta.",
    icon: Shield,
    features: [
      "Filtro rigoroso de interessados",
      "Segurança em todas as etapas",
      "Discrição total no processo",
    ],
  },
  {
    title: "Curadoria de Veículos Premium",
    description:
      "Encontramos o veículo ideal para você. Nossa curadoria foca em procedência, estado de conservação e histórico impecável.",
    icon: Gem,
    features: [
      "Busca personalizada",
      "Verificação técnica rigorosa",
      "Acesso a veículos exclusivos",
    ],
  },
  {
    title: "Apoio Estratégico Comercial",
    description:
      "Suporte completo em blindagem, estética automotiva, documentação e revisão, com parceiros de confiança do mercado premium.",
    icon: Award,
    features: [
      "Rede de parceiros qualificados",
      "Blindagem e estética premium",
      "Manutenção especializada",
    ],
  },
];

const complementaryServices = [
  { icon: Search, name: "Vistoria Técnica" },
  { icon: Wrench, name: "Estética Premium" },
  { icon: UserCheck, name: "Assessoria Documental" },
  { icon: BarChart, name: "Análise de Mercado" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nossos Serviços"
        title="Soluções inteligentes para quem valoriza seu patrimônio automotivo."
        description="Da consultoria à intermediação, atuamos com eficácia e profissionalismo em cada etapa."
      />

      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[{ name: "Serviços", href: "/servicos" }]} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {detailedServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-[#080808] border border-white/5 p-10 lg:p-12 relative group h-full flex flex-col rounded-sm hover:border-white/[0.08] transition-colors duration-700"
                >
                  <div className="mb-8 text-brand-gold/50 group-hover:text-brand-gold transition-colors duration-500">
                    <Icon size={36} strokeWidth={1} />
                  </div>

                  <h3 className="text-2xl font-serif italic mb-4 text-white/90">
                    {service.title}
                  </h3>
                  <p className="text-white/40 leading-relaxed mb-8 flex-grow font-sans font-light text-sm">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-white/60"
                      >
                        <div className="w-1 h-1 bg-brand-gold/60 rounded-full shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={SITE_CONFIG.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold/70 hover:text-brand-gold transition-colors flex items-center gap-4 group/btn"
                  >
                    Solicitar Consultoria
                    <div className="h-[1px] w-10 bg-brand-gold/20 group-hover/btn:w-16 group-hover/btn:bg-brand-gold transition-all" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Complementary */}
      <section className="py-24 px-6 lg:px-12 bg-[#050505] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <header className="mb-16 text-center">
            <span className="text-brand-gold text-[9px] uppercase tracking-[0.8em] font-medium mb-6 block opacity-50">
              Complementares
            </span>
            <h2 className="text-2xl md:text-3xl font-serif italic tracking-tight text-white/90">
              Suporte completo em todas as frentes automotivas
            </h2>
          </header>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {complementaryServices.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-14 h-14 border border-white/[0.08] rounded-sm flex items-center justify-center mb-5 text-brand-gold/40 group-hover:text-brand-gold group-hover:border-brand-gold/30 transition-all duration-500">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 group-hover:text-white/60 transition-colors">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        variant="compact"
        headline="Precisa de uma consultoria personalizada?"
        subheadline="Nossa equipe está pronta para entender sua necessidade."
      />
    </>
  );
}
