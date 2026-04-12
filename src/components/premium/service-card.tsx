"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

export function ServiceCard({ title, description, icon: Icon, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      viewport={{ once: true }}
      className="group relative bg-surface-base border border-white/5 p-8 lg:p-12 transition-all duration-500 hover:bg-surface-elevated overflow-hidden"
    >
      {/* Hover Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative z-10">
        <div className="mb-10 text-brand-gold bg-brand-gold/5 w-16 h-16 flex items-center justify-center rounded-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
          <Icon size={32} strokeWidth={1.5} />
        </div>
        
        <h3 className="text-2xl font-serif italic mb-6 group-hover:text-brand-gold transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-10 group-hover:text-foreground transition-colors">
          {description}
        </p>

        <div className="h-[1px] w-full bg-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-0 h-full bg-brand-gold transition-all duration-700 group-hover:w-full" />
        </div>
      </div>
    </motion.div>
  );
}
