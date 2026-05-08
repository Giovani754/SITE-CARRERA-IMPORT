"use client";

import React from "react";
import { motion } from "framer-motion";

export function AboutPillars() {
  return (
    <section className="py-32 px-6 lg:px-12 bg-[#050505] border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.02),transparent)] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold block opacity-60">
              POSICIONAMENTO
            </span>
            <h3 className="text-2xl font-serif italic text-white/95">
              Atendimento sob medida
            </h3>
            <p className="text-white/50 text-[15px] leading-relaxed font-light">
              Cada cliente chega com um objetivo diferente. Alguns querem comprar melhor. Outros querem vender sem se expor. Outros precisam sair de um ativo com segurança, sem abrir espaço para curioso ou negociação mal conduzida.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold block opacity-60">
              ABORDAGEM
            </span>
            <h3 className="text-2xl font-serif italic text-white/95">
              Consultoria estratégica
            </h3>
            <p className="text-white/50 text-[15px] leading-relaxed font-light">
              Não somos vendedores tentando empurrar o carro da vez. Analisamos mercado, histórico, preço, conservação e margem de negociação para posicionar cada decisão com clareza, revelando o que o mercado tenta esconder.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold block opacity-60">
              COMPROMISSO
            </span>
            <h3 className="text-2xl font-serif italic text-white/95">
              Procedência verificada
            </h3>
            <p className="text-white/50 text-[15px] leading-relaxed font-light">
              Foto bonita não prova nada. Anúncio bem escrito não garante nada. Por isso, avaliamos histórico e estado real do veículo antes de qualquer avanço, impedindo que um patrimônio entre em um risco disfarçado de oportunidade.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
