"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Wrench, UserCheck, BarChart } from "lucide-react";

const complementaryServices = [
  { icon: Search, name: "Vistoria Técnica" },
  { icon: Wrench, name: "Estética Premium" },
  { icon: UserCheck, name: "Assessoria Documental" },
  { icon: BarChart, name: "Análise de Mercado" },
];

export function ComplementaryServicesGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
      {complementaryServices.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.7,
              delay: index * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col items-center text-center group cursor-default"
          >
            <div className="w-16 h-16 border border-white/[0.08] rounded-sm flex items-center justify-center mb-6 text-brand-gold/30 group-hover:text-brand-gold group-hover:border-brand-gold/30 group-hover:bg-brand-gold/[0.02] group-hover:-translate-y-1 transition-all duration-700">
              <Icon size={24} strokeWidth={1} />
            </div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 group-hover:text-white/80 transition-colors">
              {item.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
