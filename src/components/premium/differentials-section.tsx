"use client";

import React from "react";
import { motion } from "framer-motion";
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
    icon: UserCheck,
    title: "Atendimento Personalizado",
    description:
      "Cada cliente recebe um consultor dedicado que entende suas necessidades e preferências.",
  },
  {
    icon: Zap,
    title: "Praticidade",
    description:
      "Cuidamos de todo o processo para que você não precise se preocupar com burocracias.",
  },
  {
    icon: Clock,
    title: "Rapidez",
    description:
      "Processos ágeis e eficientes, respeitando seu tempo com respostas e soluções rápidas.",
  },
  {
    icon: Target,
    title: "Eficácia",
    description:
      "Estratégia orientada a resultados, com posicionamento preciso para cada negociação.",
  },
  {
    icon: ShieldCheck,
    title: "Procedência",
    description:
      "Verificação rigorosa de histórico, documentação e estado de conservação de cada veículo.",
  },
  {
    icon: Gem,
    title: "Curadoria Premium",
    description:
      "Seleção criteriosa de veículos que atendem aos mais altos padrões de qualidade e exclusividade.",
  },
];

export function DifferentialsSection() {
  return (
    <section className="py-24 md:py-40 px-6 lg:px-12 relative overflow-hidden">
      {/* Ambient light */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-20 text-center">
          <span className="text-brand-gold text-[9px] uppercase tracking-[0.8em] font-medium mb-8 block opacity-50">
            Por que nos escolher
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif italic tracking-tight text-white/90 leading-[1.05]">
            Diferenciais que fazem sentido
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {differentials.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: idx * 0.08,
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex gap-6"
            >
              <div className="shrink-0 w-12 h-12 border border-white/[0.08] rounded-sm flex items-center justify-center text-brand-gold/50 group-hover:text-brand-gold group-hover:border-brand-gold/30 transition-all duration-700">
                <item.icon size={22} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-base font-medium text-white/90 mb-2 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm leading-[1.7] font-light group-hover:text-white/55 transition-colors duration-500">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
