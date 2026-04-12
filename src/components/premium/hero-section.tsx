"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

interface HeroProps {
  headline: string;
  subheadline: string;
}

export function HeroSection({ 
  headline = "Venda ou encontre seu veículo premium com estratégia, discrição e máxima valorização.",
  subheadline = "A Carrera Imports conduz todo o processo com inteligência de mercado, curadoria e negociação profissional para clientes que exigem segurança, eficiência e exclusividade."
}: HeroProps) {
  return (
    <section className="relative h-[90vh] lg:h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background z-10" />
        {/* Placeholder for cinematic image/video */}
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-[10s] scale-110 motion-safe:hover:scale-100"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=2000&auto=format&fit=crop')" 
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-brand-gold text-[10px] lg:text-xs uppercase tracking-[0.5em] font-bold mb-6 block motion-safe:animate-pulse">
            Boutique Automotiva de Alto Padrão
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-foreground leading-[1.1] mb-8 tracking-tight">
            {headline.split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-3">
                {word}
              </span>
            ))}
          </h1>

          <p className="text-muted-foreground text-sm md:text-lg max-w-3xl mx-auto leading-relaxed mb-12 font-sans tracking-wide">
            {subheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="https://wa.me/YOUR_NUMBER"
              className="group relative bg-brand-gold text-black px-10 py-5 text-sm uppercase tracking-widest font-bold transition-all hover:pr-14 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Falar com um Consultor
              </span>
              <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0" />
            </Link>

            <Link
              href="/estoque"
              className="text-xs uppercase tracking-[0.3em] font-medium text-foreground hover:text-brand-gold transition-colors flex items-center gap-4 group"
            >
              Conhecer Estoque Curado
              <div className="h-[1px] w-12 bg-white/20 group-hover:bg-brand-gold transition-all group-hover:w-20" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
