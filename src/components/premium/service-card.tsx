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

export function ServiceCard({ title, description, iconName, index }: ServiceCardProps) {
  // @ts-ignore
  const Icon = Icons[iconName] || Icons.HelpCircle;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay: index * 0.1 }}
      className="group relative bg-[#080808] border-[0.5px] border-white/5 p-12 lg:p-14 transition-all duration-700 hover:bg-[#0A0A0A] overflow-hidden"
    >
      {/* Subtle Hover Gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/[0.02] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      <div className="relative z-10">
        <div className="mb-12 text-brand-gold/40 group-hover:text-brand-gold transition-colors duration-700">
          <Icon size={28} strokeWidth={1} />
        </div>
        
        <h3 className="text-xl font-serif italic mb-6 text-white/90 group-hover:text-white transition-colors duration-500">
          {title}
        </h3>
        
        <p className="text-white/40 text-sm leading-[1.8] font-sans font-light mb-12 group-hover:text-white/60 transition-colors duration-500">
          {description}
        </p>

        <div className="h-[0.5px] w-8 bg-brand-gold/20 relative overflow-hidden transition-all duration-700 group-hover:w-16 group-hover:bg-brand-gold">
          <div className="absolute top-0 left-0 w-0 h-full bg-brand-gold transition-all duration-700 group-hover:w-full" />
        </div>
      </div>
    </motion.div>
  );
}
