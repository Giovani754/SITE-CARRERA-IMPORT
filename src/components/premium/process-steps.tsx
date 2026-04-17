"use client";

import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Análise Consultiva",
    description:
      "Mergulhamos em seus objetivos para definir a estratégia ideal de aquisição ou liquidação de ativos.",
  },
  {
    number: "02",
    title: "Posicionamento de Mercado",
    description:
      "Utilizamos inteligência de dados para precificar e posicionar o veículo com precisão cirúrgica.",
  },
  {
    number: "03",
    title: "Curadoria Digital",
    description:
      "Apresentação editorial de altíssimo nível, destacando cada detalhe que torna o veículo único.",
  },
  {
    number: "04",
    title: "Fechamento Exclusivo",
    description:
      "Gestão completa da transação com discrição absoluta e segurança jurídica inquestionável.",
  },
];

export function ProcessSteps() {
  return (
    <div className="relative">
      {/* Central Line (Desktop) */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-white/5 hidden lg:block" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-x-0 gap-y-px bg-white/5 border border-white/5 overflow-hidden">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1.5,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewport={{ once: true }}
            className={`group relative bg-[#080808] p-12 lg:p-20 overflow-hidden transition-all duration-700 hover:bg-[#0A0A0A] ${
              index % 2 === 1 ? "lg:border-l-[0.5px] lg:border-white/5" : ""
            }`}
          >
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-gold/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-10">
                <span className="text-4xl lg:text-5xl font-serif italic text-brand-gold/20 group-hover:text-brand-gold transition-colors duration-700">
                  {step.number}
                </span>
                <div className="h-[0.5px] flex-1 bg-white/10 group-hover:bg-brand-gold/30 transition-colors" />
              </div>

              <h3 className="text-xl lg:text-2xl font-serif italic mb-6 text-white/90 group-hover:text-white transition-colors">
                {step.title}
              </h3>

              <p className="text-white/40 text-[13px] leading-[1.8] font-sans font-light max-w-sm group-hover:text-white/60 transition-colors duration-500">
                {step.description}
              </p>
            </div>

            {/* Micro-detail */}
            <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/30" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
