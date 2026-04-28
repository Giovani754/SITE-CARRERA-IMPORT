"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Vehicle } from "@/data/vehicles";
import { ArrowRight, ArrowLeft, Calendar, Gauge, Shield, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface FeaturedVehiclesShowcaseProps {
  vehicles: Vehicle[];
}

export function FeaturedVehiclesShowcase({ vehicles }: FeaturedVehiclesShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  const nextVehicle = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % vehicles.length);
  }, [vehicles.length]);

  const prevVehicle = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + vehicles.length) % vehicles.length);
  }, [vehicles.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextVehicle();
      if (e.key === "ArrowLeft") prevVehicle();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextVehicle, prevVehicle]);

  const activeVehicle = vehicles[activeIndex];

  return (
    <div className="relative w-full overflow-hidden py-6 md:py-8">
      {/* 1. Visual Showcase (Images) */}
      <div className="relative h-[260px] md:h-[420px] flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Ambient light effect */}
          <div className="w-[800px] h-[400px] bg-brand-gold/5 blur-[120px] rounded-full opacity-50" />
        </div>

        <div className="relative w-full max-w-7xl px-6 flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            {/* Previous Side Car (Partial) */}
            <motion.div
              key={`prev-${activeIndex}`}
              className="absolute left-0 w-[180px] md:w-[240px] h-[140px] md:h-[180px] opacity-10 md:opacity-20 filter grayscale blur-[4px] md:blur-[2px] scale-[0.6] md:scale-75 cursor-pointer z-10"
              onClick={prevVehicle}
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 0.2 }}
              exit={{ x: -60, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5">
                <Image
                  src={vehicles[(activeIndex - 1 + vehicles.length) % vehicles.length].images[0]}
                  alt="Previous vehicle"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Main Focused Car */}
            <motion.div
              key={activeVehicle.id}
              custom={direction}
              initial={{ x: direction > 0 ? 300 : -300, opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ x: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ x: direction > 0 ? -300 : 300, opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 50) prevVehicle();
                else if (info.offset.x < -50) nextVehicle();
              }}
              className="relative w-full max-w-2xl h-[200px] md:h-[380px] z-20 touch-none"
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-white/10 group">
                <Image
                  src={activeVehicle.images[0]}
                  alt={`${activeVehicle.brand} ${activeVehicle.model}`}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
                {/* Overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                
                {/* Category Tag */}
                <div className="absolute top-6 left-6 md:top-10 md:left-10">
                  <motion.span 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="px-4 py-1.5 bg-brand-gold/10 backdrop-blur-md border border-brand-gold/20 text-brand-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full"
                  >
                    {activeVehicle.category || "Premium Choice"}
                  </motion.span>
                </div>
              </div>
            </motion.div>

            {/* Next Side Car (Partial) */}
            <motion.div
              key={`next-${activeIndex}`}
              className="absolute right-0 w-[180px] md:w-[240px] h-[140px] md:h-[180px] opacity-10 md:opacity-20 filter grayscale blur-[4px] md:blur-[2px] scale-[0.6] md:scale-75 cursor-pointer z-10"
              onClick={nextVehicle}
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 0.2 }}
              exit={{ x: 60, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5">
                <Image
                  src={vehicles[(activeIndex + 1) % vehicles.length].images[0]}
                  alt="Next vehicle"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 2. Information Panel (Details) */}
      <div className="max-w-7xl mx-auto px-6 relative z-30 -mt-12 md:-mt-24">
        <div className="bg-black/40 backdrop-blur-3xl border border-white/5 p-5 md:p-8 rounded-[40px] shadow-2xl overflow-hidden">
          {/* Animated Background Text (Subtle Model Name) */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-[0.02] select-none pointer-events-none">
            <span className="text-[120px] md:text-[200px] font-bold uppercase italic leading-none">
              {activeVehicle.brand}
            </span>
          </div>

          <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
            <div className="flex-1 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeVehicle.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-brand-gold/60 text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] mb-3 block">
                    {activeVehicle.brand}
                  </span>
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif italic text-white leading-tight mb-3 tracking-tighter">
                    {activeVehicle.model}
                    <span className="block text-base md:text-lg text-white/40 font-sans not-italic mt-1 tracking-normal font-light">
                      {activeVehicle.version}
                    </span>
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 md:gap-8 mt-6">
                    <div className="flex items-center gap-3 text-white/30">
                      <Calendar size={18} className="text-brand-gold/40" />
                      <span className="text-sm md:text-base font-light tracking-wide">{activeVehicle.year}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/30">
                      <Gauge size={18} className="text-brand-gold/40" />
                      <span className="text-sm md:text-base font-light tracking-wide">{activeVehicle.mileage}</span>
                    </div>
                    {activeVehicle.power && (
                      <div className="flex items-center gap-3 text-white/30">
                        <Zap size={18} className="text-brand-gold/40" />
                        <span className="text-sm md:text-base font-light tracking-wide">{activeVehicle.power}</span>
                      </div>
                    )}
                    {activeVehicle.blindagem && (
                      <div className="flex items-center gap-3 text-white/30">
                        <Shield size={18} className="text-brand-gold/40" />
                        <span className="text-sm md:text-base font-light tracking-wide">{activeVehicle.blindagem}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-end w-full lg:w-auto gap-6 lg:gap-8 pt-6 lg:pt-0 border-t lg:border-t-0 border-white/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`price-${activeVehicle.id}`}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                >
                  <div className="text-left lg:text-right">
                    <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/30 font-bold mb-1 block">Investimento</span>
                    <div className="text-xl md:text-3xl font-serif italic text-brand-gold leading-none">
                      {activeVehicle.price}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <Link
                href={`/estoque/${activeVehicle.slug}`}
                className="group relative flex items-center justify-center px-8 md:px-10 py-3.5 md:py-5 bg-white text-black text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-brand-gold rounded-full md:hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] md:hover:-translate-y-1 active:scale-95"
              >
                <span className="relative z-10">Conhecer Veículo</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Navigation Controls */}
        <div className="flex justify-between items-center mt-12 md:mt-16">
          <div className="flex items-center gap-4">
            <button
              onClick={prevVehicle}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/5 bg-white/5 backdrop-blur-xl flex items-center justify-center text-white/30 hover:text-brand-gold hover:border-brand-gold/20 hover:scale-110 transition-all shadow-2xl"
              aria-label="Previous Vehicle"
            >
              <ArrowLeft size={24} className="md:w-6 md:h-6 w-5 h-5" />
            </button>
            <button
              onClick={nextVehicle}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/5 bg-white/5 backdrop-blur-xl flex items-center justify-center text-white/30 hover:text-brand-gold hover:border-brand-gold/20 hover:scale-110 transition-all shadow-2xl"
              aria-label="Next Vehicle"
            >
              <ArrowRight size={24} className="md:w-6 md:h-6 w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col items-end">
            <div className="text-2xl md:text-4xl font-serif italic text-white/10 select-none">
              <span className="text-white/60">{(activeIndex + 1).toString().padStart(2, '0')}</span>
              <span className="mx-4">/</span>
              <span>{vehicles.length.toString().padStart(2, '0')}</span>
            </div>
            <div className="w-32 md:w-48 h-[1px] bg-white/5 mt-4 overflow-hidden">
              <motion.div 
                className="h-full bg-brand-gold"
                initial={{ width: 0 }}
                animate={{ width: `${((activeIndex + 1) / vehicles.length) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
