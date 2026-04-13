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
      <section className="py-32 md:py-56 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-base/20 -z-10 translate-x-1/4 skew-x-6" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="relative editorial-shadow"
              >
                <div className="aspect-[3.5/5] relative overflow-hidden">
                  <Image 
                    src="/images/about_detail.png" 
                    alt="Carrera Imports Excellence" 
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40" />
                </div>
                <div className="absolute -bottom-10 -left-10 bg-brand-gold p-12 hidden xl:block cinematic-glow">
                   <div className="flex flex-col gap-2">
                      <span className="text-black text-5xl font-serif italic leading-none">11</span>
                      <span className="text-black text-[10px] uppercase tracking-[0.4em] font-bold">Anos de Expertise</span>
                   </div>
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <span className="text-brand-gold text-[10px] lg:text-[11px] uppercase tracking-[0.6em] font-bold mb-10 block opacity-80">
                Nossa Essência
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif italic mb-12 leading-[1.1] tracking-tight">
                Discrição que valoriza. <br /> Estratégia que acelera.
              </h2>
              <div className="space-y-10 max-w-xl">
                <p className="text-muted-foreground leading-[1.8] text-lg font-sans font-light opacity-90">
                  A Carrera Imports não é uma concessionária. Somos uma <span className="text-foreground font-medium">boutique de consultoria estratégica</span> focada no mercado de alto padrão. Atuamos nos bastidores para garantir que seu capital automotivo seja potencializado.
                </p>
                <p className="text-muted-foreground leading-[1.8] text-lg font-sans font-light opacity-90">
                  Nossa rede de relacionamento e inteligência de mercado permitem acessos exclusivos e negociações que o mercado comum não enxerga.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-16 pt-20 mt-20 border-t-[0.5px] border-white/10">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold/60 mb-4 font-bold">Veículos Posicionados</span>
                  <span className="text-4xl lg:text-5xl font-serif italic">+400</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold/60 mb-4 font-bold">Volume Transacionado</span>
                  <span className="text-4xl lg:text-5xl font-serif italic">+R$ 200M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - REFINED GRID */}
      <section className="py-32 md:py-56 px-6 lg:px-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <header className="mb-32 flex flex-col items-center text-center">
             <span className="text-brand-gold text-[10px] uppercase tracking-[0.6em] font-bold mb-8 opacity-80">Expertise</span>
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
      <section className="py-32 md:py-56 px-6 lg:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-32">
            <div className="max-w-2xl">
              <span className="text-brand-gold text-[10px] uppercase tracking-[0.6em] font-bold mb-8 block opacity-80">
                Curadoria Carrera
              </span>
              <h2 className="text-4xl md:text-6xl font-serif italic mb-6 leading-[1.1] tracking-tight">
                Seleção de Ativos
              </h2>
            </div>
            <Link 
              href="/estoque"
              className="group flex items-center gap-8 text-[11px] uppercase tracking-[0.5em] font-bold text-foreground/70 hover:text-brand-gold transition-all"
            >
              Ver Catálogo Completo
              <div className="flex items-center">
                <div className="h-[0.5px] w-12 bg-white/10 group-hover:bg-brand-gold group-hover:w-28 transition-all" />
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-6 group-hover:translate-x-0 transition-all" />
              </div>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            {featuredVehicles.map((vehicle, idx) => (
              <CarCard key={vehicle.id} vehicle={vehicle} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final - DRAMATIC REBUILD */}
      <section className="py-48 md:py-64 px-6 lg:px-12 relative overflow-hidden bg-[#050505]">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent opacity-30" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <span className="text-brand-gold text-[10px] uppercase tracking-[0.6em] font-bold mb-10 block opacity-80">Contato</span>
            <h2 className="text-5xl md:text-8xl font-serif italic mb-20 tracking-tighter leading-tight">
              A condução ideal para <br className="hidden md:block" /> o seu próximo passo.
            </h2>
            <Link
              href="https://wa.me/YOUR_NUMBER"
              className="inline-block bg-brand-gold text-black px-16 py-8 text-[11px] uppercase tracking-[0.4em] font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_25px_60px_rgba(212,175,55,0.15)] hover:bg-[#C5A030] rounded-sm"
            >
              Falar com um Estrategista
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-brand-gold/5 blur-[150px] -z-10 translate-x-1/2 translate-y-1/2" />
      </section>

      <PremiumFooter />
    </main>
  );
}
