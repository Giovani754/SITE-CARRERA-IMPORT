"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Target, Shield, Gem, Award } from "lucide-react";
import { SITE_CONFIG } from "@/data/constants";

const detailedServices = [
  {
    title: "Consultoria Automotiva",
    description:
      "Comprar ou vender um veículo premium exige mais do que gosto pessoal. Exige comparação correta, leitura de preço, entendimento de momento e clareza sobre o que realmente vale avançar. A Carrera Imports orienta sua decisão com base em mercado, objective e viabilidade, para que cada movimento tenha fundamento.",
    icon: Target,
    ctaLabel: "SOLICITAR CONSULTORIA",
    features: [
      "Análise comparativa de mercado",
      "Definição de faixa ideal de negociação",
      "Orientação para compra ou venda",
    ],
  },
  {
    title: "Intermediação da Venda",
    description:
      "Colocar um carro premium à venda sem estratégia atrai curioso, proposta baixa e conversa que não leva a lugar nenhum. Nós organizamos a apresentação, filtramos interessados e conduzimos o contato até chegar em quem tem perfil real de compra. Menos exposição. Mais controle. Melhor condução.",
    icon: Shield,
    ctaLabel: "SOLICITAR INTERMEDIAÇÃO",
    features: [
      "Filtro qualificado de interessados",
      "Condução segura das tratativas",
      "Discrição durante todo o processo",
    ],
  },
  {
    title: "Curadoria de Veículos Premium",
    description:
      "Nem toda boa oportunidade aparece em anúncio aberto. Buscamos veículos alinhados ao seu perfil, avaliando histórico, conservação, configuração, preço e coerência com o momento de mercado. Você não perde tempo garimpando. Recebe apenas o que merece ser considerado.",
    icon: Gem,
    ctaLabel: "SOLICITAR CURADORIA",
    features: [
      "Busca direcionada por perfil",
      "Avaliação criteriosa de histórico e estado",
      "Acesso a oportunidades selecionadas",
    ],
  },
  {
    title: "Apoio Estratégico Comercial",
    description:
      "Algumas decisões exigem mais do que opinião. Apoiamos clientes, parceiros e operações automotivas com análise, revisão comercial, precificação e direcionamento para negociações de maior valor. É suporte para quem precisa decidir com mais clareza antes de colocar dinheiro, carro ou reputação em jogo.",
    icon: Award,
    ctaLabel: "SOLICITAR APOIO",
    features: [
      "Rede de parceiros qualificados",
      "Revisão comercial e precificação",
      "Suporte para decisões estratégicas",
    ],
  },
];

export function DetailedServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {detailedServices.map((service, index) => {
        const Icon = service.icon;
        return (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
              duration: 0.65,
              delay: index * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="bg-[#080808] border border-white/5 p-12 lg:p-14 relative group h-full flex flex-col rounded-sm hover:border-white/[0.12] transition-all duration-700 hover:shadow-2xl hover:shadow-brand-gold/[0.02]"
          >
            <div className="mb-10 text-brand-gold/40 group-hover:text-brand-gold transition-colors duration-500">
              <Icon size={42} strokeWidth={1} />
            </div>

            <h3 className="text-2xl lg:text-3xl font-serif italic mb-6 text-white/95">
              {service.title}
            </h3>
            <p className="text-white/60 leading-relaxed mb-10 flex-grow font-sans font-light text-[15px]">
              {service.description}
            </p>

            <ul className="space-y-4 mb-12">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-4 text-sm text-white/80"
                >
                  <div className="w-1.5 h-1.5 bg-brand-gold/40 rounded-full shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href={SITE_CONFIG.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold/60 hover:text-brand-gold transition-all flex items-center gap-5 group/btn border-t border-white/5 pt-8"
            >
              {service.ctaLabel}
              <div className="h-[1px] w-8 bg-brand-gold/10 group-hover/btn:w-16 group-hover/btn:bg-brand-gold transition-all" />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
