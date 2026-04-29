"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function AboutCinematicBanner() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  const saturate = useTransform(scrollYProgress, [0.1, 0.4], [0, 0.8]);
  const filter = useTransform(saturate, (s) => `brightness(0.35) contrast(1.15) saturate(${s})`);

  return (
    <section 
      ref={containerRef}
      className="h-[60vh] md:h-[70vh] relative overflow-hidden bg-[#030303]"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y, filter }} 
        className="absolute inset-0 z-0 scale-110"
      >
        <Image
          src="/images/about_banner_v2.png"
          alt="Curadoria automotiva premium e confiança Carrera Imports"
          fill
          sizes="100vw"
          quality={85}
          className="object-cover"
        />
      </motion.div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_95%)] opacity-90" />
      <div className="absolute inset-0 z-10 bg-brand-gold/[0.02] pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-4xl md:text-6xl lg:text-[5.5rem] font-serif italic tracking-tighter leading-[1.05] max-w-5xl mx-auto">
            <span className="text-white/40 block md:inline mb-2 md:mb-0">Procedência.</span>{" "}
            <span className="text-white/85 block md:inline mb-2 md:mb-0">Confiança.</span>{" "}
            <br className="hidden lg:block" />
            <span className="text-brand-gold block md:inline">Resultado.</span>
          </p>
          
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "100px", opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="h-[1px] bg-brand-gold/40 mt-16 mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}
