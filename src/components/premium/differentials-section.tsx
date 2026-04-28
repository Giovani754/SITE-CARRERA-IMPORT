"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  UserCheck,
  Zap,
  Clock,
  Target,
  ShieldCheck,
  Gem,
} from "lucide-react";

const differentials = [
  {
    icon: Target,
    title: "Atendimento preciso",
    description:
      "Você não perde tempo com opções desalinhadas ao seu perfil. A busca começa pelo carro certo — não pelo que o mercado tenta empurrar.",
  },
  {
    icon: Zap,
    title: "Filtro de oportunidade",
    description:
      "Antes de chegar até você, cada veículo passa por uma análise criteriosa de histórico, preço, estado de conservação e nível de risco.",
  },
  {
    icon: Clock,
    title: "Agilidade real",
    description:
      "Respondemos com rapidez porque sabemos distinguir oportunidade de perda de tempo. Sem pressa irresponsável. Sem enrolação.",
  },
  {
    icon: UserCheck,
    title: "Negociação inteligente",
    description:
      "Conduzimos cada conversa com leitura de mercado e estratégia, protegendo seu dinheiro antes, durante e depois da proposta.",
  },
  {
    icon: ShieldCheck,
    title: "Procedência verificada",
    description:
      "Analisamos documentação, histórico e condição real do veículo para que você não compre um problema disfarçado de oportunidade.",
  },
  {
    icon: Gem,
    title: "Curadoria de alto padrão",
    description:
      "Selecionamos veículos que unem exclusividade, coerência de preço e segurança patrimonial para clientes que não aceitam escolhas medianas.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.6,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.3 + i * 0.04,
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  }),
};

export function DifferentialsSection() {
  const title = "Por que clientes exigentes não negociam sozinhos";
  // Split title into letters for cinematic reveal, preserving spaces
  const letters = Array.from(title);

  return (
    <section className="py-32 md:py-52 px-6 lg:px-12 relative overflow-hidden bg-background">
      {/* Ambient refined glow - Enhanced for depth */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-gold/[0.01] to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-gold/[0.005] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-gold/[0.02] rounded-full blur-[180px] pointer-events-none translate-x-1/4 translate-y-1/4" />

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-16 md:mb-28 text-center">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.2em", filter: "blur(4px)" }}
            whileInView={{ opacity: 0.5, letterSpacing: "0.8em", filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-brand-gold text-[10px] md:text-[11px] uppercase font-bold mb-10 block"
          >
            Por que nos escolher
          </motion.span>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif italic tracking-tight text-white/95 leading-[1.2] flex flex-wrap justify-center gap-x-[0.3em] gap-y-1 overflow-hidden py-2">
            {title.split(" ").map((word, wordIdx) => (
              <span key={wordIdx} className="inline-block whitespace-nowrap overflow-hidden">
                {Array.from(word).map((char, charIdx) => {
                  // Calculate absolute index for correct stagger
                  const absoluteIdx = title.split(" ").slice(0, wordIdx).join(" ").length + (wordIdx > 0 ? 1 : 0) + charIdx;
                  return (
                    <motion.span
                      key={charIdx}
                      custom={absoluteIdx}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={letterVariants}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h2>
        </header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-24"
        >
          {differentials.map((item, idx) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="group flex flex-col items-center text-center md:items-start md:text-left gap-10"
            >
              <div className="relative">
                {/* Secondary glow behind icon */}
                <div className="absolute inset-0 bg-brand-gold/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + idx * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="shrink-0 w-20 h-20 border border-white/[0.06] rounded-sm flex items-center justify-center text-brand-gold/40 group-hover:text-brand-gold group-hover:border-brand-gold/30 group-hover:bg-brand-gold/[0.05] transition-all duration-1000 ease-out z-10 relative"
                >
                  <item.icon size={30} strokeWidth={0.75} />
                </motion.div>
                
                {/* Decorative corner accents on hover */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-brand-gold/0 group-hover:border-brand-gold/40 transition-all duration-700" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-brand-gold/0 group-hover:border-brand-gold/40 transition-all duration-700" />
              </div>

              <div className="relative">
                <div className="overflow-hidden mb-5">
                  <motion.h3 
                    whileInView={{ y: [20, 0], opacity: [0, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + idx * 0.1, duration: 1 }}
                    className="text-xl md:text-2xl font-serif italic text-white/90 tracking-tight group-hover:text-brand-gold transition-all duration-700"
                  >
                    {item.title}
                  </motion.h3>
                </div>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2 + idx * 0.1, duration: 1 }}
                  className="text-white/40 text-[15px] md:text-base leading-[1.9] font-sans font-light group-hover:text-white/70 transition-colors duration-700 max-w-[290px]"
                >
                  {item.description}
                </motion.p>
                
                {/* Sophisticated accent line */}
                <div className="mt-10 flex items-center gap-4">
                  <div className="h-[1px] w-0 bg-brand-gold/30 group-hover:w-16 transition-all duration-1000 ease-out" />
                  <div className="h-1 w-1 rounded-full bg-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
