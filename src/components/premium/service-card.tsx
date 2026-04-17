"use client";

import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  iconName: string;
  index: number;
}

export function ServiceCard({
  title,
  description,
  iconName,
  index,
}: ServiceCardProps) {
  // @ts-ignore
  const Icon = Icons[iconName] || Icons.HelpCircle;
  const displayNumber = (index + 1).toString().padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 1.2,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative bg-[#080808] p-10 lg:p-14 border-[0.5px] border-white/5 overflow-hidden transition-all duration-700 hover:bg-[#0A0A0A]"
    >
      {/* Background Number (Editorial style) */}
      <span className="absolute -top-6 -right-2 text-[120px] font-serif italic text-white/[0.02] select-none transition-all duration-1000 group-hover:text-brand-gold/[0.05] group-hover:-translate-y-4">
        {displayNumber}
      </span>

      {/* Decorative Light Spot */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-gold/[0.03] blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-10 w-12 h-12 flex items-center justify-center rounded-full border border-white/5 bg-white/[0.02] text-brand-gold/40 group-hover:text-brand-gold group-hover:border-brand-gold/20 transition-all duration-700">
          <Icon size={20} strokeWidth={1} />
        </div>

        <h3 className="text-xl font-serif italic mb-6 text-white/90 group-hover:text-white transition-colors duration-500">
          {title}
        </h3>

        <p className="text-white/40 text-[13px] leading-[1.8] font-sans font-light mb-auto group-hover:text-white/60 transition-colors duration-500">
          {description}
        </p>

        {/* Learn More Link (Subtle) */}
        <div className="mt-12 flex items-center gap-4 group/link">
          <div className="h-[1px] w-6 bg-brand-gold/20 group-hover/link:w-12 group-hover/link:bg-brand-gold transition-all duration-700" />
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 group-hover/link:text-white/50 font-bold transition-colors">
            Descobrir Detalhes
          </span>
        </div>
      </div>

      {/* Edge accent */}
      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-brand-gold/50 to-transparent transition-all duration-1000 group-hover:w-full" />
    </motion.div>
  );
}
