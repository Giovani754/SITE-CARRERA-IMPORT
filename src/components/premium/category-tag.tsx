"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryTagProps {
  category?: string;
  blindagem?: string;
  className?: string;
}

export function CategoryTag({ category, blindagem, className }: CategoryTagProps) {
  const tagText = blindagem ? "BLINDADO" : (category || "EXCLUSIVO").toUpperCase();
  
  return (
    <motion.div 
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "bg-black/60 backdrop-blur-md px-3 py-1.5 text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-white/70 border border-white/10 rounded-[2px] font-bold shadow-2xl inline-block",
        className
      )}
    >
      {tagText}
    </motion.div>
  );
}
