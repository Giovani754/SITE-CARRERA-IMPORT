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
  headline = "Venda ou encontre seu veículo premium com estratégia, discrição e máxima valorização.",
  subheadline = "Intermediação inteligente para veículos que exigem posicionamento, curadoria e confiança absoluta."
}: HeroProps) {
  return (
    <section className="relative h-screen w-full flex items-center justify-start overflow-hidden bg-[#050505]">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/20 to-[#050505] z-10" />
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
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
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="flex items-center gap-4 text-brand-gold text-[10px] lg:text-xs uppercase tracking-[0.5em] font-bold mb-8 block font-sans">
              <span className="h-[1px] w-8 bg-brand-gold/50" />
              Boutique Automotiva de Alto Padrão
            </span>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-foreground leading-[1] mb-10 tracking-tight">
              {headline}
            </h1>

            <p className="text-muted-foreground text-base md:text-xl max-w-2xl leading-relaxed mb-12 font-sans font-light tracking-wide border-l border-brand-gold/20 pl-8">
              {subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-8">
              <Link
                href="https://wa.me/YOUR_NUMBER"
                className="group relative bg-brand-gold text-black px-12 py-6 text-xs uppercase tracking-[0.3em] font-bold transition-all hover:bg-[#C5A030] shadow-2xl shadow-brand-gold/10 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Consultoria Exclusiva
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>

              <Link
                href="/estoque"
                className="text-[10px] lg:text-xs uppercase tracking-[0.4em] font-bold text-foreground/70 hover:text-brand-gold transition-all flex items-center gap-6 group"
              >
                Conhecer Curadoria
                <div className="flex items-center">
                  <div className="h-[1px] w-8 bg-white/20 group-hover:bg-brand-gold transition-all group-hover:w-16" />
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
