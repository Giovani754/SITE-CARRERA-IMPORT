"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { HeroAnimation } from "./hero-animation";

interface HeroProps {
  headline: string;
  subheadline: string;
}

export function HeroSection({
  headline = "Consultoria Premium para Veículos Extraordinários",
  subheadline = "Intermediação inteligente, procedência garantida e atendimento personalizado para quem valoriza tempo e confiança.",
}: HeroProps) {
  const pathname = usePathname();

  return (
    <section className="relative min-h-screen w-full flex items-end overflow-hidden bg-[#030303]">
      {/* Cinematic Background Layer - Keyed to force restart on home return */}
      <HeroAnimation key={`hero-anim-${pathname}`} />

      {/* Content Layer — key forces re-animation on route change */}
      <motion.div
        key={`hero-content-${pathname}`}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-32 md:pb-40"
      >
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.5, x: 0 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 text-brand-gold text-[9px] uppercase tracking-[0.7em] font-medium mb-8 font-sans"
          >
            <span className="h-[0.5px] w-12 bg-brand-gold/40" />
            Boutique Automotiva de Alto Padrão
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[1.75rem] sm:text-3xl md:text-5xl lg:text-[3.8rem] font-serif italic text-white/95 leading-[1.1] md:leading-[1.06] mb-8 tracking-tight max-w-sm md:max-w-none"
          >
            {headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/35 text-[15px] md:text-base max-w-lg leading-[1.9] font-sans font-light"
          >
            {subheadline}
          </motion.p>
        </div>
      </motion.div>

      {/* ─── Scroll Indicator ─── */}
      <motion.div
        key={`scroll-${pathname}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-10 right-8 md:right-auto md:left-1/2 md:-translate-x-1/2 z-20 flex flex-col items-end md:items-center gap-3 md:gap-4"
      >
        {/* Mouse icon - hidden on small mobile to stay clean */}
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[18px] h-[28px] rounded-full border border-white/15 hidden md:flex items-start justify-center pt-[5px]"
        >
          <motion.div
            animate={{ y: [0, 6, 0], opacity: [0.6, 0.15, 0.6] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[2px] h-[6px] bg-brand-gold/50 rounded-full"
          />
        </motion.div>

        {/* Label */}
        <div className="flex items-center gap-3 md:gap-4">
          <motion.div
            animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-[0.5px] bg-brand-gold/60 md:hidden"
          />
          <span className="text-[8px] md:text-[9px] uppercase tracking-[0.6em] text-white/30 md:text-white/15 font-bold select-none">
            <span className="md:inline hidden">Role para explorar</span>
            <span className="md:hidden inline">Explorar</span>
          </span>
        </div>

        {/* Drop line - visible on md+ */}
        <motion.div
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.1, 0.3, 0.1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-brand-gold/20 to-transparent origin-top hidden md:block"
        />
      </motion.div>
    </section>
  );
}
