"use client";

import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Diagnóstico da compra ou venda",
    description:
      "Entendemos o objetivo real antes de colocar qualquer carro na mesa: comprar melhor, vender com mais valor ou sair de um ativo sem se expor ao mercado errado.",
  },
  {
    number: "02",
    title: "Leitura de mercado",
    description:
      "Analisamos preço, histórico, demanda, condição do veículo e margem de negociação para separar oportunidade real de anúncio bem maquiado.",
  },
  {
    number: "03",
    title: "Curadoria criteriosa",
    description:
      "Você não recebe uma lista de opções. Recebe apenas o que passou pelo filtro: procedência, conservação, coerência de preço e potencial de negociação.",
  },
  {
    number: "04",
    title: "Fechamento protegido",
    description:
      "Conduzimos negociação, documentação e alinhamentos finais com discrição para que nada dependa de improviso, pressão ou promessa verbal.",
  },
];

export function ProcessSteps() {
  return (
    <div className="relative">
      {/* Central Line (Desktop) */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-white/5 hidden lg:block" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-x-0 gap-y-px bg-white/5 border border-white/5 overflow-hidden rounded-sm">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.5,
              delay: index * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewport={{ once: true, margin: "-100px" }}
            className={`group relative bg-[#080808] p-12 lg:p-24 overflow-hidden transition-all duration-1000 hover:bg-[#0A0A0A] ${
              index % 2 === 1 ? "lg:border-l-[0.5px] lg:border-white/5" : ""
            }`}
          >
            {/* High-end Glow Overlay */}
            <div className="absolute inset-0 bg-radial-gradient from-brand-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-8 mb-12">
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="text-5xl lg:text-7xl font-serif italic text-brand-gold/20 group-hover:text-brand-gold group-hover:scale-110 transition-all duration-1000 select-none"
                >
                  {step.number}
                </motion.span>
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 1.5 }}
                  className="h-[0.5px] bg-white/5 group-hover:bg-brand-gold/20 transition-all" 
                />
              </div>

              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 1 }}
                className="text-2xl lg:text-3xl font-serif italic mb-8 text-white/90 group-hover:text-white transition-colors tracking-tight"
              >
                {step.title}
              </motion.h3>

              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-white/60 text-[14px] lg:text-[15px] leading-[1.8] font-sans font-light max-w-sm group-hover:text-white transition-colors duration-700"
              >
                {step.description}
              </motion.p>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 border-t-[0.5px] border-r-[0.5px] border-white/0 group-hover:border-brand-gold/10 transition-all duration-1000" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
