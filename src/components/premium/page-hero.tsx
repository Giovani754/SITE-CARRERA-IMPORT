"use client";

import React from "react";
import { motion } from "framer-motion";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
}

/** Hero compacto para páginas internas — substitui spacer + SectionTitle repetidos */
export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="pt-32 lg:pt-44 pb-16 lg:pb-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-brand-gold text-[9px] uppercase tracking-[0.8em] font-medium mb-6 block opacity-50">
            {eyebrow}
          </span>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif italic tracking-tight leading-[1.05] text-white/90 max-w-4xl">
            {title}
          </h1>
          {description && (
            <p className="text-white/40 text-sm md:text-base font-light mt-8 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
          <div className="h-[1px] bg-white/5 mt-12 relative overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 w-24 h-full bg-brand-gold origin-left"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
