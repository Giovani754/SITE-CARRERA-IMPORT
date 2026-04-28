"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/data/constants";

interface CTASectionProps {
  variant?: "full" | "compact";
  headline?: string;
  subheadline?: string;
}

export function CTASection({
  variant = "full",
  headline = "A condução ideal para o seu próximo passo.",
  subheadline,
}: CTASectionProps) {
  const containerRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  if (variant === "compact") {
    return (
      <section 
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className="py-16 md:py-24 px-6 lg:px-12 bg-[#050505] border-y border-white/5"
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h3 className="text-xl md:text-2xl font-serif italic text-white/90 mb-2">
              {headline}
            </h3>
            {subheadline && (
              <p className="text-white/40 text-sm font-light">{subheadline}</p>
            )}
          </div>
          <Link
            href={SITE_CONFIG.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-3 bg-brand-gold text-black px-10 py-5 text-[10px] uppercase tracking-[0.4em] font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(212,175,55,0.1)] hover:bg-[#C5A030] rounded-sm"
          >
            <MessageCircle size={16} />
            Falar com Consultor
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef}
      className="py-32 md:py-64 px-6 lg:px-12 relative overflow-hidden bg-[#030303] border-t border-white/[0.02]"
    >
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y }} className="absolute inset-0 scale-110">
          <Image
            src="/images/final_cta_background.png"
            alt="Carrera Imports Silhouette"
            fill
            className="object-cover grayscale-[0.2] brightness-[0.2] contrast-[1.1] pointer-events-none"
            priority
          />
        </motion.div>
        
        {/* Layered Overlays for Depth and Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_85%)] opacity-80" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-brand-gold/[0.04] via-transparent to-transparent opacity-60" />
        
        {/* Subtle Ambient Glows */}
        <div className="absolute -bottom-24 -right-24 w-[600px] h-[600px] bg-brand-gold/[0.02] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-brand-gold/[0.02] rounded-full blur-[150px] pointer-events-none" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-brand-gold text-[10px] md:text-[11px] uppercase tracking-[1em] font-bold mb-16 block opacity-50">
            A DECISÃO CERTA COMEÇA ANTES DA CHAVE
          </span>
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-serif italic mb-12 tracking-tighter leading-[0.9] text-white/95 max-w-4xl mx-auto drop-shadow-2xl">
            {headline}
          </h2>
          {subheadline && (
            <p className="text-white/60 text-base md:text-xl font-light max-w-3xl mx-auto mb-20 leading-relaxed">
              {subheadline}
            </p>
          )}
          
          <div className="flex flex-col items-center justify-center mt-12">
            <Link
              href={SITE_CONFIG.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-6 bg-brand-gold text-black px-16 py-8 text-[10px] md:text-[11px] uppercase tracking-[0.5em] font-bold transition-all hover:bg-[#C5A030] hover:scale-105 active:scale-95 shadow-[0_40px_100px_rgba(212,175,55,0.2)] rounded-full overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-4">
                <MessageCircle size={20} />
                Falar com um Especialista
              </span>
              <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1, duration: 2 }}
              className="mt-16 flex items-center gap-5 opacity-20"
            >
              <div className="h-[0.5px] w-16 bg-white" />
              <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-white whitespace-nowrap">Disponibilidade Imediata</span>
              <div className="h-[0.5px] w-16 bg-white" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
