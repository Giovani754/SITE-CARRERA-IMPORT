"use client";

import { HeroSection } from "@/components/premium/hero-section";
import { ServiceCard } from "@/components/premium/service-card";
import { ProcessSteps } from "@/components/premium/process-steps";
import { CarCard } from "@/components/premium/car-card";
import { DifferentialsSection } from "@/components/premium/differentials-section";
import { TestimonialsSection } from "@/components/premium/testimonials-section";
import { CTASection } from "@/components/premium/cta-section";
import { getFeaturedVehicles } from "@/data/vehicles";
import { SITE_CONFIG } from "@/data/constants";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const mainServices = [
  {
    title: "Consultoria Automotiva",
    description:
      "Assessoria especializada para compra e venda de veículos premium com posicionamento correto e máxima valorização.",
    iconName: "Target",
  },
  {
    title: "Intermediação da Venda",
    description:
      "Cuidamos de todo o processo com discrição e profissionalismo, da divulgação à negociação final.",
    iconName: "Shield",
  },
  {
    title: "Curadoria de Veículos Premium",
    description:
      "Encontramos o veículo ideal que atenda às suas exigências de procedência, performance e exclusividade.",
    iconName: "Gem",
  },
  {
    title: "Apoio Estratégico Comercial",
    description:
      "Suporte completo em blindagem, estética, documentação e revisão com parceiros de confiança.",
    iconName: "Award",
  },
];

interface HomeContentProps {
  featuredVehicles: any[];
}

export default function HomeContent({ featuredVehicles }: HomeContentProps) {
  return (
    <>
      {/* ======================== 1. HERO PREMIUM ======================== */}
      <HeroSection
        headline="Consultoria Automotiva Premium em São Paulo"
        subheadline="Intermediação inteligente, procedência garantida e atendimento personalizado no mercado de veículos de alto padrão de São Paulo."
      />

      {/* ============ 2. SEÇÃO INSTITUCIONAL / ESSÊNCIA DA MARCA ============ */}
      <section className="py-24 md:py-40 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-surface-base/5 -z-10 translate-x-1/4 skew-x-3" />
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative editorial-shadow"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image
                    src="/images/about_detail.png"
                    alt="Consultoria automotiva premium Carrera Imports"
                    fill
                    className="object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-30" />
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <span className="text-brand-gold text-[9px] uppercase tracking-[0.8em] font-medium mb-10 block opacity-50">
                A Carrera Imports
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif italic mb-10 leading-[1.1] tracking-tight">
                Intermediação de elite no <br />
                mercado premium de São Paulo.
              </h2>
              <div className="space-y-6 max-w-xl">
                <p className="text-white/60 leading-[1.8] text-sm md:text-base font-sans font-light">
                  A Carrera Imports atua como uma{" "}
                  <span className="text-white/90 font-medium">
                    boutique de consultoria automotiva em São Paulo
                  </span>{" "}
                  focada na intermediação de veículos de alto padrão. Unimos paulistanos exigentes aos melhores exemplares com procedência, oferecendo um serviço que transcende a venda comum.
                </p>
                <p className="text-white/60 leading-[1.8] text-sm md:text-base font-sans font-light">
                  Nossa metodologia combina inteligência de mercado, rede de
                  relacionamento e curadoria rigorosa para garantir as melhores
                  negociações com total segurança e discrição.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-12 pt-12 mt-14 border-t-[0.5px] border-white/5">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-[0.5em] text-white/30 mb-3 font-bold">
                    Veículos Negociados
                  </span>
                  <span className="text-3xl lg:text-4xl font-serif italic text-white/90">
                    +400
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-[0.5em] text-white/30 mb-3 font-bold">
                    Volume Transacionado
                  </span>
                  <span className="text-3xl lg:text-4xl font-serif italic text-white/90">
                    +R$ 200M
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================ 3. SEÇÃO DE DIFERENCIAIS ================ */}
      <DifferentialsSection />

      {/* ================= 4. SEÇÃO DE SERVIÇOS ================= */}
      <section className="py-24 md:py-40 px-6 lg:px-12 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <header className="mb-20 flex flex-col items-center text-center">
            <span className="text-brand-gold text-[9px] uppercase tracking-[0.8em] font-medium mb-8 opacity-50">
              Expertise
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif italic tracking-tight text-white/90 leading-[1.05]">
              Nossas Especialidades
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 overflow-hidden border border-white/5 rounded-sm">
            {mainServices.map((service, idx) => (
              <ServiceCard
                key={service.title}
                index={idx}
                title={service.title}
                description={service.description}
                iconName={service.iconName}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============= 5. ESTOQUE / VEÍCULOS EM DESTAQUE ============= */}
      <section className="py-24 md:py-40 px-6 lg:px-12 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-20">
            <div className="max-w-2xl">
              <span className="text-brand-gold text-[9px] uppercase tracking-[0.8em] font-medium mb-8 block opacity-50">
                Curadoria Carrera
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif italic mb-4 leading-[1.05] tracking-tight text-white/90">
                Veículos Selecionados
              </h2>
              <p className="text-white/40 text-sm font-light max-w-lg">
                Cada veículo em nosso acervo é rigorosamente avaliado quanto a
                procedência, estado de conservação e histórico de manutenção.
              </p>
            </div>
            <Link
              href="/estoque"
              className="group flex items-center gap-8 text-[10px] uppercase tracking-[0.5em] font-bold text-white/40 hover:text-brand-gold transition-all"
            >
              Ver Catálogo Completo
              <div className="flex items-center">
                <div className="h-[0.5px] w-12 bg-white/5 group-hover:bg-brand-gold group-hover:w-24 transition-all" />
                <ArrowRight
                  size={12}
                  className="opacity-0 group-hover:opacity-100 -translate-x-6 group-hover:translate-x-0 transition-all ml-4"
                />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {featuredVehicles.slice(0, 3).map((vehicle, idx) => (
              <CarCard key={vehicle.id} vehicle={vehicle} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ============= 6. METODOLOGIA / COMO FUNCIONA ============= */}
      <section className="py-24 md:py-40 px-6 lg:px-12 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <header className="mb-20 text-center">
            <span className="text-brand-gold text-[9px] uppercase tracking-[0.8em] font-medium mb-8 block opacity-50">
              Metodologia
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif italic tracking-tight text-white/90 leading-[1.05]">
              Como trabalhamos
            </h2>
          </header>
          <ProcessSteps />
        </div>
      </section>

      {/* ================ 7. PROVA SOCIAL ================ */}
      <TestimonialsSection />

      {/* ================ 8. CTA FINAL ================ */}
      <CTASection
        headline="Pronto para dar o próximo passo?"
        subheadline="Fale com um consultor e descubra como podemos ajudar na compra ou venda do seu veículo premium."
      />
    </>
  );
}
