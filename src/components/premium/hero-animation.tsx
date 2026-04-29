"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function HeroAnimation() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#030303]">
      {/* Cinematic Ken Burns Image */}
      <motion.div
        initial={{ scale: 1.1, x: "-1%", y: "-1%" }}
        animate={{ 
          scale: 1.0,
          x: "0%",
          y: "0%"
        }}
        transition={{ 
          duration: 20, 
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="relative w-full h-full"
      >
        <Image
          src="/animations/hero/ezgif-frame-001.jpg"
          alt="Cinematic Porsche"
          fill
          className="object-cover brightness-[0.4] contrast-[1.1] grayscale-[0.2]"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Ambient Light Sweep Effect */}
      <motion.div
        animate={{ 
          opacity: [0, 0.1, 0],
          x: ["-100%", "100%"]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent skew-x-12 -z-10"
      />

      {/* Deep Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-transparent to-transparent opacity-60" />
      
      {/* Bottom Refined Glow */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-brand-gold/[0.03] to-transparent pointer-events-none" />
    </div>
  );
}
