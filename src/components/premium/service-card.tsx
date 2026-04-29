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

/**
 * Editorial Expertise Item - Optimized with pronounced horizontal "entrance" animation.
 * Abandons the "card" concept for a clean, horizontal/editorial list layout.
 */
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
      initial={{ opacity: 0, x: -120 }} // More pronounced horizontal offset
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }} // Triggers when 15% into viewport
      transition={{
        duration: 1.6, // Slower, more cinematic entrance
        delay: index * 0.15, // Better stagger
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex flex-col md:flex-row items-start md:items-center py-14 md:py-20 border-b border-white/[0.05] last:border-0 transition-all duration-700"
    >
      {/* 01. Number & Icon Section */}
      <div className="flex items-center gap-10 md:w-1/3 mb-8 md:mb-0">
        <motion.span 
          initial={{ opacity: 0, scale: 0.7, x: -20 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.15 + 0.4 }}
          className="text-5xl md:text-6xl font-serif italic text-white/[0.05] group-hover:text-brand-gold/20 transition-colors duration-1000 select-none"
        >
          {displayNumber}
        </motion.span>
        <motion.div 
          initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
          whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.15 + 0.6 }}
          className="text-brand-gold/20 group-hover:text-brand-gold group-hover:scale-110 transition-all duration-1000"
        >
          <Icon size={28} strokeWidth={1} />
        </motion.div>
      </div>

      {/* 02. Title & Description Section */}
      <div className="flex flex-col md:w-2/3">
        <div className="overflow-hidden">
          <motion.h3 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: index * 0.15 + 0.5 }}
            className="text-2xl md:text-4xl font-serif italic mb-5 text-white/95 group-hover:text-brand-gold transition-colors duration-1000 tracking-tight"
          >
            {title}
          </motion.h3>
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.15 + 0.8 }}
          className="text-white/40 text-sm md:text-lg leading-[1.9] font-sans font-light max-w-2xl group-hover:text-white/70 transition-colors duration-1000"
        >
          {description}
        </motion.p>
      </div>

      {/* 03. Hover Accent (Subtle Line) */}
      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-brand-gold/40 via-brand-gold/10 to-transparent transition-all duration-1000 group-hover:w-full" />
      
      {/* 04. Minimalist Glow (Desktop Only) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-48 bg-brand-gold/[0.03] blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none hidden md:block" />
    </motion.div>
  );
}
