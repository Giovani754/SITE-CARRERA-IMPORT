"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Background image URL for the cinematic hero */
  backgroundImage?: string;
  /** Alt text for the background image */
  backgroundAlt?: string;
  /** Optional accent position for visual variation: 'left' | 'center' | 'right' */
  accentPosition?: "left" | "center" | "right";
}

// Smooth cinematic easing
const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Cinematic hero for inner pages — immersive, full-viewport reveal
 * with background imagery, layered overlays, and staggered text entrance.
 * Uses pathname as key for fresh animation on every route change.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  backgroundImage,
  backgroundAlt = "Carrera Imports",
  accentPosition = "left",
}: PageHeroProps) {
  const pathname = usePathname();

  const accentClasses = {
    left: "left-0 top-1/3",
    center: "left-1/2 -translate-x-1/2 top-1/4",
    right: "right-0 top-1/4",
  };

  return (
    <section className="relative min-h-[70vh] md:min-h-[60vh] w-full flex items-end overflow-hidden bg-[#030303]">
      {/* ─── Background Image Layer ─── */}
      <motion.div
        key={`bg-${pathname}`}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, ease }}
        className="absolute inset-0 z-0"
      >
        {backgroundImage ? (
          <Image
            src={backgroundImage}
            alt={backgroundAlt}
            fill
            priority
            className="object-cover grayscale brightness-[0.25] contrast-125"
            sizes="100vw"
          />
        ) : (
          /* Fallback: elegant dark gradient when no image */
          <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] via-[#030303] to-[#080808]" />
        )}
      </motion.div>

      {/* ─── Cinematic Overlays ─── */}
      <div className="absolute inset-0 z-[1]">
        {/* Bottom fade for content readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-transparent" />
        {/* Side fade for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/70 via-transparent to-transparent" />
        {/* Top vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/50 via-transparent to-transparent" />
      </div>

      {/* ─── Accent Glow (varies per page) ─── */}
      <motion.div
        key={`glow-${pathname}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 0.5, ease }}
        className={`absolute z-[2] w-80 h-80 bg-brand-gold/[0.03] rounded-full blur-[100px] pointer-events-none ${accentClasses[accentPosition]}`}
      />

      {/* ─── Decorative Line (left edge) ─── */}
      <motion.div
        key={`line-${pathname}`}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease }}
        className="absolute left-6 lg:left-12 top-32 bottom-20 w-px bg-gradient-to-b from-brand-gold/10 via-brand-gold/5 to-transparent origin-top z-[3] hidden lg:block"
      />

      {/* ─── Content Layer ─── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 pb-16 lg:pb-24 pt-40 lg:pt-48">
        <motion.div
          key={`content-${pathname}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease }}
        >
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.5, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease }}
            className="flex items-center gap-5 text-brand-gold text-[9px] uppercase tracking-[0.8em] font-medium mb-8"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease }}
              className="h-[0.5px] w-12 bg-brand-gold/40 origin-left"
            />
            {eyebrow}
          </motion.span>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease }}
            className="text-2xl md:text-4xl lg:text-[3.2rem] font-serif italic tracking-tight leading-[1.06] text-white/95 max-w-3xl mb-8"
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.7, ease }}
              className="text-white/35 text-sm md:text-[15px] font-light max-w-xl leading-[1.9]"
            >
              {description}
            </motion.p>
          )}

          {/* Animated divider */}
          <div className="h-[1px] bg-white/[0.04] mt-14 relative overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, delay: 0.8, ease }}
              className="absolute top-0 left-0 w-28 h-full bg-brand-gold/60 origin-left"
            />
          </div>
        </motion.div>
      </div>

      {/* ─── Bottom Scroll Hint ─── */}
      <motion.div
        key={`scroll-${pathname}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5, ease }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-brand-gold/15 to-transparent"
        />
      </motion.div>
    </section>
  );
}
