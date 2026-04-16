"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/data/constants";

interface HeroProps {
  headline: string;
  subheadline: string;
}

export function HeroSection({
  headline = "Consultoria Premium para Veículos Extraordinários",
  subheadline = "Intermediação inteligente, procedência garantida e atendimento personalizado para quem valoriza tempo e confiança.",
}: HeroProps) {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-start overflow-hidden bg-[#030303]">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/30 to-[#030303] z-10" />
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/hero_car.png"
            alt="Veículo premium em ambiente sofisticado"
            fill
            priority
            className="object-cover object-right lg:object-center brightness-[0.8]"
          />
        </motion.div>
      </div>

      {/* Content Layer */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-28 lg:pt-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          >
            <span className="flex items-center gap-6 text-brand-gold text-[9px] uppercase tracking-[0.7em] font-medium mb-10 font-sans opacity-60">
              <span className="h-[0.5px] w-10 bg-brand-gold/30" />
              Boutique Automotiva de Alto Padrão
            </span>

            <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-serif italic text-foreground/90 leading-[1.08] mb-10 tracking-tight">
              {headline}
            </h1>

            <p className="text-white/45 text-[15px] md:text-base max-w-xl leading-[1.8] mb-14 font-sans font-light border-l-[0.5px] border-brand-gold/20 pl-8">
              {subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link
                href={SITE_CONFIG.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-brand-gold text-black px-12 py-6 text-[10px] uppercase tracking-[0.4em] font-bold transition-all hover:bg-[#C5A030] shadow-2xl shadow-brand-gold/10 overflow-hidden rounded-sm"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <MessageCircle size={14} />
                  Falar com Consultor
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>

              <Link
                href="/estoque"
                className="text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/50 hover:text-brand-gold transition-all flex items-center gap-6 group"
              >
                Ver Estoque
                <div className="flex items-center">
                  <div className="h-[0.5px] w-8 bg-white/20 group-hover:bg-brand-gold transition-all group-hover:w-16" />
                  <div className="w-1 h-1 rounded-full bg-brand-gold scale-0 group-hover:scale-100 transition-transform delay-100 ml-1" />
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 text-white/15"
      >
        <span className="text-[9px] uppercase tracking-[0.5em] font-bold">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-brand-gold/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
