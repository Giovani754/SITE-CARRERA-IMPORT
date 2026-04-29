"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
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
  const Icon = (Icons as any)[iconName] || Icons.HelpCircle;
  const displayNumber = (index + 1).toString().padStart(2, "0");
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 15 : 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: isMobile ? "0px" : "-50px" }}
      className="group relative py-12 md:py-20 border-b border-white/[0.03] flex flex-col md:flex-row items-start md:items-center hover:bg-white/[0.01] transition-colors duration-1000"
    >
      {/* 01. Number & Icon Section */}
      <div className="flex items-center gap-10 md:w-1/3 mb-8 md:mb-0">
        <span className="text-5xl md:text-6xl font-serif italic text-white/[0.05] group-hover:text-brand-gold/20 transition-colors duration-1000 select-none">
          {displayNumber}
        </span>
        <div className="text-brand-gold/20 group-hover:text-brand-gold group-hover:scale-110 transition-all duration-1000">
          <Icon size={28} strokeWidth={1} />
        </div>
      </div>

      {/* 02. Title & Description Section */}
      <div className="flex flex-col md:w-2/3">
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
