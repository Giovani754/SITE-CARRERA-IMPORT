"use client";

import { PremiumHeader } from "@/components/premium/premium-header";
import { HeroSection } from "@/components/premium/hero-section";
import { SectionTitle } from "@/components/premium/section-title";
import { ServiceCard } from "@/components/premium/service-card";
import { ProcessSteps } from "@/components/premium/process-steps";
import { CarCard } from "@/components/premium/car-card";
import { PremiumFooter } from "@/components/premium/premium-footer";
import { vehicles } from "@/data/vehicles";
import { Shield, Target, Award, Gem, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const mainServices = [
  {
    title: "Consultoria Estratégica",
    description: "Assessoria especializada para vender seu veículo com posicionamento correto e máxima valorização.",
    iconName: "Target"
  },
  {
    title: "Venda e Intermediação",
    description: "Cuidamos de todo o processo, da divulgação à negociação final, com total discrição e profissionalismo.",
    iconName: "Shield"
  },
  {
    title: "Curadoria de Oportunidades",
    description: "Encontramos o veículo ideal que atenda às suas exigências de performance, história e exclusividade.",
    iconName: "Gem"
  },
  {
    title: "Serviços Automotivos",
    description: "Apoio completo: blindagem, estética, funilaria e revisão executados por especialistas parceiros.",
    iconName: "Award"
  }
];

export default function Home() {
  const featuredVehicles = vehicles.filter(v => v.featured);

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <PremiumHeader />
      
      {/* Hero Section */}
      <HeroSection 
        headline="Intermediação Inteligente para Veículos Extraordinários" 
        subheadline="Consultoria automotiva premium focada em discrição, valorização estratégica e curadoria de ativos para clientes que não podem perder tempo."
      />

      {/* Value Proposition / Institutional - EDITORIAL REDESIGN */}
      <section className="py-24 md:py-40 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-surface-base/30 -z-10 translate-x-1/4 skew-x-12" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative editorial-shadow"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image 
                    src="/images/about_detail.png" 
                    alt="Carrera Imports Excellence" 
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-brand-gold p-10 hidden xl:block cinemative-glow">
                   <div className="flex flex-col gap-1">
                      <span className="text-black text-4xl font-serif italic leading-none">11</span>
                      <span className="text-black text-[10px] uppercase tracking-[0.3em] font-bold">Anos de Expertise</span>
                   </div>
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2">
              <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-8 block">
                Nossa Essência
              </span>
              <h2 className="text-5xl md:text-7xl font-serif italic mb-10 leading-[1.1] tracking-tight">
                Discrição que valoriza. <br /> Estratégia que acelera.
              </h2>
              <div className="space-y-8 max-w-xl">
                <p className="text-muted-foreground leading-relaxed text-lg font-sans font-light">
                  A Carrera Imports não é uma concessionária. Somos uma <span className="text-foreground font-medium">boutique de consultoria estratégica</span> focada no mercado de alto padrão. Atuamos nos bastidores para garantir que seu capital automotivo seja potencializado.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg font-sans font-light">
                  Nossa rede de relacionamento e inteligência de mercado permitem acessos exclusivos e negociações que o mercado comum não enxerga.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-12 pt-16 mt-16 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-brand-gold/60 mb-3 font-bold">Veículos Posicionados</span>
                  <span className="text-4xl font-serif italic">+400</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-brand-gold/60 mb-3 font-bold">Volume em Transações</span>
                  <span className="text-4xl font-serif italic">+R$ 200M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - REFINED GRID */}
      <section className="py-32 px-6 lg:px-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <header className="mb-24 flex flex-col items-center text-center">
             <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-6">Expertise</span>
             <h2 className="text-4xl md:text-6xl font-serif italic tracking-tight">Especialidades High-End</h2>
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

      {/* Featured Inventory Section */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24">
            <div className="max-w-2xl">
              <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-6 block">
                Curadoria Carrera
              </span>
              <h2 className="text-4xl md:text-6xl font-serif italic mb-6 leading-[1.1] tracking-tight">
                Destaques da Temporada
              </h2>
            </div>
            <Link 
              href="/estoque"
              className="group flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-bold text-foreground hover:text-brand-gold transition-all"
            >
              Ver Catálogo Completo
              <div className="flex items-center">
                <div className="h-[1px] w-12 bg-white/10 group-hover:bg-brand-gold group-hover:w-24 transition-all" />
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
              </div>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {featuredVehicles.map((vehicle, idx) => (
              <CarCard key={vehicle.id} vehicle={vehicle} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final - DRAMATIC REBUILD */}
      <section className="py-40 px-6 lg:px-12 relative overflow-hidden bg-[#050505]">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl md:text-8xl font-serif italic mb-16 tracking-tighter leading-tight">
              A condução ideal para <br className="hidden md:block" /> o seu próximo passo.
            </h2>
            <Link
              href="https://wa.me/YOUR_NUMBER"
              className="inline-block bg-brand-gold text-black px-16 py-8 text-xs uppercase tracking-[0.4em] font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(212,175,55,0.2)] hover:bg-[#C5A030]"
            >
              Falar com um Estrategista
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-brand-gold/5 blur-[120px] -z-10 translate-x-1/2 translate-y-1/2" />
      </section>

      <PremiumFooter />
    </main>
  );
}
