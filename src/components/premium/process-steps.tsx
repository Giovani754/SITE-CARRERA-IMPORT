"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Análise Consultiva",
    description: "Iniciamos com uma análise profunda do seu perfil ou do veículo a ser posicionado no mercado."
  },
  {
    number: "02",
    title: "Posicionamento Estratégico",
    description: "Definimos o valor ideal e os canais de exposição para garantir a máxima valorização do ativo."
  },
  {
    number: "03",
    title: "Curadoria e Apresentação",
    description: "Cada veículo é tratado como uma joia, com apresentação premium para clientes selecionados."
  },
  {
    number: "04",
    title: "Negociação e Fechamento",
    description: "Conduzimos todo o processo de negociação com discrição, segurança e fluidez documental."
  }
];

export function ProcessSteps() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
      {steps.map((step, index) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.2, duration: 1 }}
          viewport={{ once: true }}
          className="bg-background p-12 relative group overflow-hidden"
        >
          <span className="text-6xl font-serif italic text-white/5 absolute -top-4 -left-4 select-none transition-all duration-700 group-hover:text-brand-gold/10 group-hover:scale-125">
            {step.number}
          </span>
          
          <div className="relative z-10">
            <span className="text-brand-gold text-xs font-bold tracking-widest mb-6 block">
              PASSO {step.number}
            </span>
            <h3 className="text-xl font-serif italic mb-4">
              {step.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
          
          {/* Border accent animation */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
        </motion.div>
      ))}
    </div>
  );
}
