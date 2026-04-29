"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimationSequence } from "@/contexts/animation-sequence";
import Image from "next/image";

export function IntroAnimation() {
  const { introNeeded, signalIntroComplete } = useAnimationSequence();
  const [phase, setPhase] = useState<"hidden" | "logo" | "outro">("hidden");

  useEffect(() => {
    if (!introNeeded) return;

    // Sequence timing
    const t1 = setTimeout(() => setPhase("logo"), 500);
    const t2 = setTimeout(() => setPhase("outro"), 3500);
    const t3 = setTimeout(() => signalIntroComplete(), 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [introNeeded, signalIntroComplete]);

  if (!introNeeded) return null;

  return (
    <AnimatePresence>
      {phase !== "outro" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#030303] flex items-center justify-center overflow-hidden"
        >
          <div className="relative">
            {/* Logo Entrance */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
              animate={phase === "logo" ? { 
                opacity: 1, 
                scale: 1, 
                filter: "blur(0px)" 
              } : {}}
              transition={{ 
                duration: 2, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="relative z-10"
            >
              <Image
                src="/logo-carrera-imports.png"
                alt="Carrera Imports"
                width={320}
                height={80}
                className="w-[240px] md:w-[320px] h-auto object-contain brightness-110"
                priority
              />
            </motion.div>

            {/* Cinematic Glow Effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={phase === "logo" ? { 
                opacity: [0, 0.4, 0.2],
                scale: [0.8, 1.2, 1.1],
              } : {}}
              transition={{ 
                duration: 4, 
                ease: "easeOut",
                times: [0, 0.5, 1]
              }}
              className="absolute inset-0 bg-brand-gold/20 blur-[80px] rounded-full -z-10"
            />
          </div>

          {/* Bottom Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={phase === "logo" ? { opacity: 0.2, y: 0 } : {}}
            transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <span className="text-[10px] uppercase tracking-[0.8em] text-white font-bold">
              Boutique Automotiva
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
