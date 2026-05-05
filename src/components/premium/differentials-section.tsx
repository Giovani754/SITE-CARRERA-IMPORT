"use client";

import React from "react";
import { motion, Variants, useReducedMotion } from "framer-motion";
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

export function DifferentialsSection() {
  const title = "Por que clientes exigentes não negociam sozinhos";
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const cardHoverVariants: Variants = {
    hover: { 
      y: -6,
      transition: { 
        duration: 0.4, 
        ease: [0.33, 1, 0.68, 1] 
      } 
    }
  };

  return (
    <section className="py-32 md:py-52 px-6 lg:px-12 relative overflow-hidden bg-background">
      {/* Ambient refined glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-gold/[0.01] to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-gold/[0.005] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-brand-gold/[0.02] rounded-full blur-[120px] md:blur-[180px] pointer-events-none translate-x-1/4 translate-y-1/4" />

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-16 md:mb-28 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.5, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-brand-gold text-[10px] md:text-[11px] uppercase font-bold mb-10 block tracking-[0.8em]"
            >
              Por que nos escolher
            </motion.span>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif italic tracking-tight text-white/95 leading-[1.2] flex flex-wrap justify-center gap-x-[0.3em]">
              {title.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    delay: 0.4 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h2>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-24">
          {differentials.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                x: isMobile ? -64 : -120,
                scale: 0.98,
                filter: shouldReduceMotion || isMobile ? "none" : "blur(1.5px)"
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                scale: 1,
                filter: "blur(0px)"
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: isMobile ? 0.7 : 0.85,
                delay: isMobile ? i * 0.11 : i * 0.16,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover="hover"
              className="group flex flex-col items-center text-center md:items-start md:text-left gap-10 cursor-default"
            >
              <motion.div 
                variants={shouldReduceMotion ? {} : cardHoverVariants}
                className="relative"
              >
                {/* Ambient glow on entry */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ 
                    opacity: [0, 0.5, 0.2], 
                    scale: [0.8, 1.1, 1],
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: (isMobile ? i * 0.11 : i * 0.16) + 0.2 }}
                  className="absolute inset-0 bg-brand-gold/10 blur-3xl pointer-events-none"
                />
                
                <div className="shrink-0 w-20 h-20 border border-white/[0.08] rounded-sm flex items-center justify-center text-brand-gold/30 group-hover:text-brand-gold group-hover:border-brand-gold/50 group-hover:bg-brand-gold/[0.12] transition-all duration-700 ease-out z-10 relative overflow-hidden">
                  <motion.div
                    variants={{
                      hover: { scale: 1.1, rotate: 5 }
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <item.icon size={30} strokeWidth={0.75} />
                  </motion.div>
                  
                  {/* Inner flash on entry */}
                  <motion.div 
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "200%" }}
                    viewport={{ once: true }}
                    transition={{ delay: (isMobile ? i * 0.11 : i * 0.16) + 0.5, duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent skew-x-12"
                  />
                </div>
                
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-brand-gold/0 group-hover:border-brand-gold/40 transition-all duration-700" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-brand-gold/0 group-hover:border-brand-gold/40 transition-all duration-700" />
              </motion.div>

              <div className="relative">
                <h3 className="text-xl md:text-2xl font-serif italic text-white/90 tracking-tight group-hover:text-brand-gold transition-all duration-700 mb-5">
                  {item.title}
                </h3>
                
                <p className="text-white/40 text-[15px] md:text-base leading-[1.9] font-sans font-light group-hover:text-white/70 transition-colors duration-700 max-w-[290px]">
                  {item.description}
                </p>
                
                <div className="mt-10 flex items-center gap-4">
                  <div className="h-[1px] w-0 bg-brand-gold/30 group-hover:w-16 transition-all duration-1000 ease-out" />
                  <div className="h-1 w-1 rounded-full bg-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
