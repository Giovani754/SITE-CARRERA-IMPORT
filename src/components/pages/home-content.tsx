"use client";

import { HeroSection } from "@/components/premium/hero-section";
import { ServiceCard } from "@/components/premium/service-card";
import { ProcessSteps } from "@/components/premium/process-steps";
import { CarCard } from "@/components/premium/car-card";
import { DifferentialsSection } from "@/components/premium/differentials-section";
import { TestimonialsSection } from "@/components/premium/testimonials-section";
import { CTASection } from "@/components/premium/cta-section";
import { FeaturedVehiclesShowcase } from "@/components/premium/featured-vehicles-showcase";
import { SITE_CONFIG } from "@/data/constants";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const mainServices = [
  {
    title: "Consultoria Automotiva",
    description:
      "Você não precisa sair garimpando anúncio, ouvindo promessa e tentando adivinhar se o carro vale o que estão pedindo. Nós analisamos mercado, histórico, estado real e margem de negociação antes de qualquer decisão chegar na sua mão.",
    iconName: "Target",
  },
  {
    title: "Intermediação da Venda",
    description:
      "Vender carro premium para curioso é abrir espaço para proposta ridícula, exposição desnecessária e perda de valor. Conduzimos a negociação com discrição, filtramos compradores reais e protegemos o valor do seu ativo até o fechamento.",
    iconName: "Shield",
  },
  {
    title: "Curadoria de Veículos Premium",
    description:
      "Nem todo carro caro merece estar na sua garagem. Selecionamos veículos com procedência, conservação, coerência de preço e padrão compatível com quem não compra problema maquiado de oportunidade.",
    iconName: "Gem",
  },
  {
    title: "Apoio Estratégico Comercial",
    description:
      "Na hora de negociar, o detalhe que você ignora pode virar prejuízo. Entramos com análise, leitura de mercado e rede de confiança para apoiar decisões que exigem mais do que opinião de vendedor.",
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
        headline="Carro premium não se compra no escuro."
        subheadline="A Carrera Imports filtra oportunidades, analisa procedência e conduz negociações para quem não aceita arriscar patrimônio em conversa de vendedor."
      />

      {/* ============ 2. SEÇÃO INSTITUCIONAL / ESSÊNCIA DA MARCA ============ */}
      <section className="py-28 md:py-48 px-6 lg:px-16 relative overflow-hidden bg-background">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-brand-gold/[0.015] -z-10 translate-x-1/4 skew-x-3" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            {/* Image Column */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative editorial-shadow"
              >
                <motion.div
                  className="aspect-[4/5] relative overflow-hidden rounded-sm"
                  initial={{ filter: "grayscale(100%)" }}
                  whileInView={{ filter: "grayscale(0%)" }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src="/images/about_detail.png"
                    alt="Consultoria automotiva premium Carrera Imports — curadoria de veículos de alto padrão em São Paulo"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    priority
                    className="object-cover brightness-[0.8] transition-transform duration-[2s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
                </motion.div>
                {/* Decorative Frame */}
                <motion.div
                  initial={{ opacity: 0, x: 8, y: 8 }}
                  whileInView={{ opacity: 1, x: 3, y: 3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -inset-4 border border-brand-gold/10 -z-10"
                />
              </motion.div>
            </div>

            {/* Text Column */}
            <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-brand-gold text-[10px] uppercase tracking-[0.8em] font-bold mb-10 block opacity-50">
                  A Carrera Imports
                </span>
                <h2 className="text-3xl md:text-[2.5rem] lg:text-[2.8rem] font-serif italic mb-12 leading-[1.1] tracking-tight max-w-xl text-white/95">
                  Carro de alto padrão não perdoa uma <span className="text-brand-gold/80">escolha mal conduzida.</span>
                </h2>
                
                <div className="space-y-10 max-w-lg">
                  <div className="space-y-6">
                    <p className="text-white/60 leading-[1.8] text-[15px] lg:text-base font-sans font-light">
                      Um erro na compra pode custar mais do que dinheiro. Pode custar tempo, confiança, tranquilidade — e a sensação amarga de ter entrado em um mercado onde nem tudo é o que parece.
                    </p>
                    <p className="text-white/85 leading-[1.8] text-base lg:text-lg font-sans font-medium">
                      A Carrera Imports existe para eliminar esse risco.
                    </p>
                    <p className="text-white/50 leading-[1.8] text-[14px] lg:text-[15px] font-sans font-light">
                      Selecionamos oportunidades reais, analisamos procedência, negociamos com critério e protegemos o seu patrimônio antes que ele se transforme em problema.
                    </p>
                  </div>
                  
                  <div className="pt-10 border-t border-white/10">
                    <p className="text-white/35 leading-[1.8] text-base lg:text-xl font-serif italic relative">
                      <span className="absolute -left-6 -top-2 text-4xl text-brand-gold/20 font-serif">“</span>
                      Quem construiu patrimônio não compra no escuro. Compra com alguém capaz de enxergar o que o mercado tenta esconder.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-12 pt-14 mt-16 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-white/25 mb-4 font-bold">
                      Ativos Intermediados
                    </span>
                    <span className="text-4xl lg:text-5xl font-serif italic text-brand-gold/70">
                      +400
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-white/25 mb-4 font-bold">
                      Índice de Confiança
                    </span>
                    <span className="text-4xl lg:text-5xl font-serif italic text-brand-gold/70">
                      100%
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ================ 3. SEÇÃO DE DIFERENCIAIS ================ */}
      <DifferentialsSection />

      {/* ================= 4. SEÇÃO DE SERVIÇOS / EXPERTISE ================= */}
      <section className="py-28 md:py-48 px-6 lg:px-16 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <header className="mb-24 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-16">
            <div className="max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 0.5, x: 0 }}
                viewport={{ once: true }}
                className="text-brand-gold text-[10px] uppercase tracking-[0.8em] font-bold mb-8 block"
              >
                Expertise Estratégica
              </motion.span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif italic tracking-tight text-white/95 leading-[1.05]">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  Onde a negociação deixa de ser aposta
                </motion.span>
              </h2>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.3 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-white text-xs md:text-sm font-sans font-light max-w-xs md:text-right italic"
            >
              Inteligência de mercado e curadoria de elite para negociações de alto desempenho.
            </motion.p>
          </header>

          <div className="flex flex-col">
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
      <section className="py-12 md:py-24 px-6 lg:px-12 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20 md:mb-28">
            <div className="max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 0.5, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-brand-gold text-[10px] uppercase tracking-[0.8em] font-bold mb-8 block"
              >
                Curadoria Carrera
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl lg:text-7xl font-serif italic mb-8 leading-[1] tracking-tight text-white/95"
              >
                Veículos Selecionados
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.4, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-white text-base lg:text-xl font-light max-w-xl leading-relaxed"
              >
                Cada veículo em nosso acervo é rigorosamente avaliado quanto a
                procedência, histórico e estado de conservação.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Link
                href="/estoque"
                className="group flex items-center gap-8 text-[11px] uppercase tracking-[0.5em] font-bold text-white/40 hover:text-brand-gold transition-all"
              >
                Catálogo Completo
                <div className="flex items-center">
                  <div className="h-[0.5px] w-12 bg-white/10 group-hover:bg-brand-gold group-hover:w-24 transition-all duration-700" />
                  <ArrowRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 -translate-x-6 group-hover:translate-x-0 transition-all ml-4"
                  />
                </div>
              </Link>
            </motion.div>
          </div>

          <FeaturedVehiclesShowcase vehicles={featuredVehicles.slice(0, 5)} />
        </div>
      </section>

      {/* ============= 6. METODOLOGIA / COMO FUNCIONA ============= */}
      <section className="py-24 md:py-48 px-6 lg:px-12 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <header className="mb-24 text-center">
            <span className="text-brand-gold text-[10px] uppercase tracking-[0.8em] font-bold mb-8 block opacity-50">
              METODOLOGIA
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif italic tracking-tight text-white/90 leading-[1.05]">
              Da análise ao fechamento, nada fica no achismo
            </h2>
          </header>
          <ProcessSteps />
        </div>
      </section>

      {/* ================ 7. PROVA SOCIAL ================ */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5 }}
      >
        <TestimonialsSection />
      </motion.div>

      {/* ================ 8. CTA FINAL ================ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <CTASection
          headline="Não coloque seu patrimônio na mão de qualquer vendedor."
          subheadline="Fale com a Carrera Imports e entre em uma negociação filtrada, segura e conduzida por quem sabe separar oportunidade real de promessa bonita."
        />
      </motion.div>
    </>
  );
}
