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
      "Comprar ou vender um veículo premium exige mais do que gosto pessoal. Exige comparação correta, leitura de preço, entendimento de momento e clareza sobre o que realmente vale avançar. A Carrera Imports orienta sua decisão com base em mercado, objetivo e viabilidade, para que cada movimento tenha fundamento.",
    icon: Target,
    ctaLabel: "SOLICITAR CONSULTORIA",
    features: [
      "Análise comparativa de mercado",
      "Definição de faixa ideal de negociação",
      "Orientação para compra ou venda",
    ],
  },
  {
    title: "Intermediação da Venda",
    description:
      "Colocar um carro premium à venda sem estratégia atrai curioso, proposta baixa e conversa que não leva a lugar nenhum. Nós organizamos a apresentação, filtramos interessados e conduzimos o contato até chegar em quem tem perfil real de compra. Menos exposição. Mais controle. Melhor condução.",
    icon: Shield,
    ctaLabel: "SOLICITAR INTERMEDIAÇÃO",
    features: [
      "Filtro qualificado de interessados",
      "Condução segura das tratativas",
      "Discrição durante todo o processo",
    ],
  },
  {
    title: "Curadoria de Veículos Premium",
    description:
      "Nem toda boa oportunidade aparece em anúncio aberto. Buscamos veículos alinhados ao seu perfil, avaliando histórico, conservação, configuração, preço e coerência com o momento de mercado. Você não perde tempo garimpando. Recebe apenas o que merece ser considerado.",
    icon: Gem,
    ctaLabel: "SOLICITAR CURADORIA",
    features: [
      "Busca direcionada por perfil",
      "Avaliação criteriosa de histórico e estado",
      "Acesso a oportunidades selecionadas",
    ],
  },
  {
    title: "Apoio Estratégico Comercial",
    description:
      "Algumas decisões exigem mais do que opinião. Apoiamos clientes, parceiros e operações automotivas com análise, revisão comercial, precificação e direcionamento para negociações de maior valor. É suporte para quem precisa decidir com mais clareza antes de colocar dinheiro, carro ou reputação em jogo.",
    icon: Award,
    ctaLabel: "SOLICITAR APOIO",
    features: [
      "Rede de parceiros qualificados",
      "Revisão comercial e precificação",
      "Suporte para decisões estratégicas",
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {detailedServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-[#080808] border border-white/5 p-12 lg:p-14 relative group h-full flex flex-col rounded-sm hover:border-white/[0.12] transition-all duration-700 hover:shadow-2xl hover:shadow-brand-gold/[0.02]"
                >
                  <div className="mb-10 text-brand-gold/40 group-hover:text-brand-gold transition-colors duration-500">
                    <Icon size={42} strokeWidth={1} />
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-serif italic mb-6 text-white/95">
                    {service.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed mb-10 flex-grow font-sans font-light text-[15px]">
                    {service.description}
                  </p>

                  <ul className="space-y-4 mb-12">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-4 text-sm text-white/80"
                      >
                        <div className="w-1.5 h-1.5 bg-brand-gold/40 rounded-full shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={SITE_CONFIG.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold/60 hover:text-brand-gold transition-all flex items-center gap-5 group/btn border-t border-white/5 pt-8"
                  >
                    {service.ctaLabel}
                    <div className="h-[1px] w-8 bg-brand-gold/10 group-hover/btn:w-16 group-hover/btn:bg-brand-gold transition-all" />
                  </Link>
                </div>
              );
            })}
          </div>
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

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {complementaryServices.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 border border-white/[0.08] rounded-sm flex items-center justify-center mb-6 text-brand-gold/30 group-hover:text-brand-gold group-hover:border-brand-gold/30 group-hover:bg-brand-gold/[0.02] transition-all duration-700">
                    <Icon size={24} strokeWidth={1} />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 group-hover:text-white/80 transition-colors">
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
        headline="Precisa de uma condução sob medida?"
        subheadline="Fale com a Carrera Imports e entenda qual serviço faz sentido para o seu momento: compra, venda, curadoria ou suporte estratégico."
      />
    </>
  );
}
