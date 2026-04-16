"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
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
  if (variant === "compact") {
    return (
      <section className="py-16 md:py-24 px-6 lg:px-12 bg-[#050505] border-y border-white/5">
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
    <section className="py-32 md:py-48 px-6 lg:px-12 relative overflow-hidden bg-[#030303] border-t border-white/5">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-brand-gold text-[9px] uppercase tracking-[0.8em] font-medium mb-12 block opacity-50">
            Parceria
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif italic mb-8 tracking-tighter leading-[0.95] text-white/90">
            {headline}
          </h2>
          {subheadline && (
            <p className="text-white/40 text-sm md:text-base font-light max-w-xl mx-auto mb-14 leading-relaxed">
              {subheadline}
            </p>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
            <Link
              href={SITE_CONFIG.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-4 bg-brand-gold text-black px-14 py-7 text-[10px] uppercase tracking-[0.5em] font-bold transition-all hover:bg-[#C5A030] shadow-[0_30px_60px_rgba(212,175,55,0.1)] rounded-sm overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-4">
                <MessageCircle size={16} />
                Falar com um Consultor
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
            <Link
              href="/contato"
              className="text-[10px] uppercase tracking-[0.5em] font-bold text-foreground/40 hover:text-brand-gold transition-all flex items-center gap-4 group"
            >
              Enviar Mensagem
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-2"
              />
            </Link>
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-gold/5 to-transparent blur-[120px] -z-10" />
    </section>
  );
}
