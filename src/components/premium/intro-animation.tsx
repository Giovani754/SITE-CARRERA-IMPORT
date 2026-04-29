"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimationSequence } from "@/contexts/animation-sequence";

export function IntroAnimation() {
  const { introNeeded, signalIntroStarted, signalIntroComplete } = useAnimationSequence();

  const [internalPhase, setInternalPhase] = useState<"loading" | "playing" | "fading" | "gone">("loading");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const hasFinishedRef = useRef(false);

  // Detect mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const finish = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    setInternalPhase("fading");
    const t = setTimeout(() => {
      setInternalPhase("gone");
      signalIntroComplete();
    }, 1000);
    return () => clearTimeout(t);
  }, [signalIntroComplete]);

  // Preload frames
  useEffect(() => {
    if (!introNeeded) return;

    // Safety timeout
    const safetyTimer = setTimeout(() => {
      if (internalPhase === "loading") finish();
    }, 10000);

    const frameCount = 40; 
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;
    let failed = 0;

    const checkDone = () => {
      const total = loaded + failed;
      if (total >= frameCount) {
        const valid = imgs.filter((i) => i.complete && i.naturalWidth > 0);
        if (valid.length > 5) {
          imagesRef.current = valid;
          setInternalPhase("playing");
          signalIntroStarted();
        } else {
          finish();
        }
      }
    };

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/animations/intro/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;
      img.onload = () => {
        imgs[i-1] = img;
        loaded++;
        setProgress(Math.round(((loaded + failed) / frameCount) * 100));
        checkDone();
      };
      img.onerror = () => {
        failed++;
        setProgress(Math.round(((loaded + failed) / frameCount) * 100));
        checkDone();
      };
    }

    return () => clearTimeout(safetyTimer);
  }, [introNeeded, finish, signalIntroStarted, internalPhase]);

  // Canvas playback
  useEffect(() => {
    if (internalPhase !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) { finish(); return; }

    let frame = 0;
    let rafId: number;
    let lastTime = 0;
    const fps = isMobile ? 18 : 22; 
    const interval = 1000 / fps;

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const elapsed = time - lastTime;
      const images = imagesRef.current;
      
      if (elapsed >= interval) {
        if (frame < images.length) {
          const img = images[frame];
          if (img && img.complete) {
            const cA = canvas.width / canvas.height;
            const iA = img.naturalWidth / img.naturalHeight;
            let dw: number, dh: number;

            // CONTAIN logic for the Logo Intro
            if (cA > iA) {
              dh = canvas.height * 0.85;
              dw = dh * iA;
            } else {
              dw = canvas.width * 0.85;
              dh = dw / iA;
            }
            const dx = (canvas.width - dw) / 2;
            const dy = (canvas.height - dh) / 2;

            ctx.fillStyle = "#030303";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, dx, dy, dw, dh);
            frame++;
            lastTime = time - (elapsed % interval);
          } else {
            frame++; 
          }
        }
      }

      if (frame < images.length) {
        rafId = requestAnimationFrame(animate);
      } else {
        setTimeout(finish, 300);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [internalPhase, isMobile, finish]);

  if (!introNeeded || internalPhase === "gone") return null;

  return (
    <AnimatePresence>
      {(internalPhase === "loading" || internalPhase === "playing") && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#030303] flex items-center justify-center overflow-hidden"
        >
          {internalPhase === "loading" && (
            <div className="flex flex-col items-center gap-6">
              <div className="w-48 h-[1px] bg-white/5 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-brand-gold"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold font-sans">
                Carrera Imports
              </span>
            </div>
          )}

          {internalPhase === "playing" && (
            <canvas ref={canvasRef} className="w-full h-full object-cover" />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
