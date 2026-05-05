"use client";

import React from "react";
import { motion, Variants, useReducedMotion } from "framer-motion";
import * as Icons from "lucide-react";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (Icons as any)[iconName] || Icons.HelpCircle;
  const displayNumber = (index + 1).toString().padStart(2, "0");
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const hoverVariants: Variants = {
    hover: { 
      y: -6,
      backgroundColor: "rgba(255, 255, 255, 0.02)",
      transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] }
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: shouldReduceMotion ? 0 : (isMobile ? 96 : 180),
        scale: shouldReduceMotion ? 1 : (isMobile ? 0.98 : 0.96),
        filter: shouldReduceMotion || isMobile ? "none" : "blur(1px)"
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "blur(0px)"
      }}
      viewport={{ once: true, amount: 0.55 }}
      transition={{
        duration: isMobile ? 0.7 : 0.85,
        delay: isMobile ? index * 0.1 : index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={shouldReduceMotion ? {} : "hover"}
      variants={hoverVariants}
      className="group relative py-12 md:py-20 border-b border-white/[0.03] flex flex-col md:flex-row items-start md:items-center transition-colors duration-1000"
    >
      {/* Ambient glow on entry */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ 
          opacity: [0, 0.4, 0], 
          scale: [0.8, 1.1, 1],
        }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, delay: (isMobile ? index * 0.1 : index * 0.15) + 0.2 }}
        className="absolute inset-0 bg-brand-gold/[0.03] blur-3xl pointer-events-none"
      />

      {/* 01. Number & Icon Section */}
      <div className="flex items-center gap-10 md:w-1/3 mb-8 md:mb-0 relative z-10">
        <span className="text-5xl md:text-6xl font-serif italic text-white/[0.05] group-hover:text-brand-gold/20 transition-colors duration-1000 select-none">
          {displayNumber}
        </span>
        <div className="relative shrink-0 w-16 h-16 border border-white/[0.05] group-hover:border-brand-gold/40 rounded-sm flex items-center justify-center text-brand-gold/20 group-hover:text-brand-gold group-hover:bg-brand-gold/[0.05] transition-all duration-1000 overflow-hidden">
          <Icon size={28} strokeWidth={1} />
          
          {/* Inner flash on entry */}
          <motion.div 
            initial={{ x: "-100%" }}
            whileInView={{ x: "200%" }}
            viewport={{ once: true }}
            transition={{ 
              delay: (isMobile ? index * 0.1 : index * 0.15) + 0.4, 
              duration: 1.5, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent skew-x-12"
          />
        </div>
      </div>

      {/* 02. Title & Description Section */}
      <div className="flex flex-col md:w-2/3 relative z-10">
        <h3 className="text-2xl md:text-4xl font-serif italic mb-5 text-white/95 group-hover:text-brand-gold transition-colors duration-1000 tracking-tight">
          {title}
        </h3>
        <p className="text-white/40 text-sm md:text-lg leading-[1.9] font-sans font-light max-w-2xl group-hover:text-white/70 transition-colors duration-1000">
          {description}
        </p>
      </div>

      {/* 03. Hover Accent */}
      <div className="absolute left-0 bottom-0 w-0 h-[1px] bg-brand-gold/30 group-hover:w-full transition-all duration-1000 ease-in-out" />
    </motion.div>
  );
}
