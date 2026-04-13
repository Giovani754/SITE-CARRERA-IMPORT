"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  headline: string;
  subheadline: string;
}

export function HeroSection({ 
  headline = "Intermediação Inteligente para Veículos Extraordinários", 
  subheadline = "Consultoria automotiva premium focada em discrição, valorização estratégica e curadoria de ativos para clientes que não podem perder tempo."
}: HeroProps) {
  return (
    <section className="relative h-screen w-full flex items-center justify-start overflow-hidden bg-[#050505] pt-20 lg:pt-0">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/20 to-[#050505] z-10" />
        <motion.div 
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/hero_car.png"
            alt="Premium Automotive Experience"
            fill
            priority
            className="object-cover object-right lg:object-center"
          />
        </motion.div>
      </div>

      {/* Content Layer */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 mt-12 lg:mt-0">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          >
            <span className="flex items-center gap-6 text-brand-gold text-[10px] lg:text-[11px] uppercase tracking-[0.6em] font-bold mb-10 block font-sans opacity-80">
              <span className="h-[1px] w-12 bg-brand-gold/40" />
              Boutique Automotiva de Alto Padrão
            </span>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-foreground leading-[1.1] mb-12 tracking-tight max-w-4xl">
              {headline}
            </h1>

            <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-[1.8] mb-16 font-sans font-light tracking-wide border-l-[0.5px] border-brand-gold/30 pl-10 opacity-90">
              {subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-10">
              <Link
                href="https://wa.me/YOUR_NUMBER"
                className="group relative bg-brand-gold text-black px-14 py-7 text-[11px] uppercase tracking-[0.4em] font-bold transition-all hover:bg-[#C5A030] shadow-2xl shadow-brand-gold/10 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-4">
                  Consultoria Exclusiva
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-2" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>

              <Link
                href="/estoque"
                className="text-[10px] uppercase tracking-[0.5em] font-bold text-foreground/60 hover:text-brand-gold transition-all flex items-center gap-8 group"
              >
                Curadoria Carrera
                <div className="flex items-center">
                  <div className="h-[0.5px] w-10 bg-white/20 group-hover:bg-brand-gold transition-all group-hover:w-20" />
                  <div className="w-1 h-1 rounded-full bg-brand-gold scale-0 group-hover:scale-100 transition-transform delay-100" />
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Side HUD element */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col items-end gap-12 pointer-events-none">
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-white/20 uppercase tracking-[0.5em] mb-2 font-bold">Posicionamento</span>
          <span className="text-brand-gold/40 font-serif italic text-2xl">Estratégico</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-white/20 uppercase tracking-[0.5em] mb-2 font-bold">Curadoria</span>
          <span className="text-brand-gold/40 font-serif italic text-2xl">Premium</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 text-white/20"
      >
        <span className="text-[10px] uppercase tracking-[0.6em] font-bold">Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-brand-gold/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
