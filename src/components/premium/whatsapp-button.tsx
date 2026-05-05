"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/data/constants";

export function WhatsAppButton() {
  return (
    <motion.a
      href={SITE_CONFIG.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ 
        delay: 2.5, 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="fixed z-50 flex items-center justify-center w-[58px] h-[58px] md:w-[64px] md:h-[64px] rounded-[18px] md:rounded-[20px] bg-[#25D366] bg-gradient-to-br from-[#25D366] to-[#12B954] text-white shadow-[0_10px_25px_-5px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(37,211,102,0.5)] transition-shadow duration-300 group overflow-hidden"
      style={{
        bottom: "calc(1.5rem + env(safe-area-inset-bottom))",
        right: "1.5rem"
      }}
    >
      {/* Premium Gloss/Reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 opacity-40" />
      
      <MessageCircle
        size={28}
        strokeWidth={2.2}
        className="relative z-10 transition-transform duration-500 group-hover:rotate-[8deg] drop-shadow-sm"
      />

      {/* Glow highlight */}
      <div className="absolute inset-0 rounded-[inherit] bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
    </motion.a>
  );
}
