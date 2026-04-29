"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimationSequence } from "@/contexts/animation-sequence";

export function IntroAnimation() {
  const { phase, introNeeded, signalIntroStarted, signalIntroComplete } = useAnimationSequence();

  const [internalPhase, setInternalPhase] = useState<
    "loading" | "playing" | "fading" | "gone"
  >("loading");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const hasFinishedRef = useRef(false);

  // Detect mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Finish and signal parent context
  const finish = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    setInternalPhase("fading");
    // Allow fade-out animation to play, then signal context
    setTimeout(() => {
      setInternalPhase("gone");
      signalIntroComplete();
    }, isMobile ? 600 : 1000); // Faster fade on mobile
  }, [signalIntroComplete, isMobile]);

  // Preload frames
  useEffect(() => {
    if (!introNeeded || typeof window === "undefined") return;

    // SAFETY TIMEOUT: force finish after 6 seconds on mobile, 8 on desktop
    const safetyTimer = setTimeout(finish, isMobile ? 6000 : 8000);

    const frameCount = isMobile ? 30 : 40; // Fewer frames on mobile
    const imgs: HTMLImageElement[] = new Array(frameCount);
    let loaded = 0;
    let failed = 0;

    const checkDone = () => {
      const totalAttempted = loaded + failed;
      
      // PROGRESSIVE START: Start playing earlier on mobile
      const startThreshold = isMobile ? 6 : 10;
      if (totalAttempted >= startThreshold && imgs[0]?.complete && internalPhase === "loading") {
        imagesRef.current = imgs.filter(Boolean);
        setInternalPhase("playing");
        signalIntroStarted();
      }

      if (totalAttempted >= frameCount) {
        clearTimeout(safetyTimer);
        if (loaded < 5) finish();
      }
    };

    const loadBatch = async () => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        
        // High priority for startup
        if (i <= 8) {
          // @ts-ignore
          img.fetchPriority = 'high';
        } else {
          // @ts-ignore
          img.fetchPriority = 'low';
        }

        // On mobile, skip some frames to match frameCount
        const frameIdx = isMobile ? Math.floor((i * 40) / 30) : i;
        const frameNum = Math.min(frameIdx, 40).toString().padStart(3, "0");
        
        img.src = `/animations/intro/ezgif-frame-${frameNum}.jpg`;
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
    };

    loadBatch();

    return () => clearTimeout(safetyTimer);
  }, [introNeeded, finish, internalPhase, signalIntroStarted, isMobile]);

  // Canvas playback
  useEffect(() => {
    if (internalPhase !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) {
      finish();
      return;
    }

    // Optimization: Low DPR for mobile to save CPU/GPU
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) {
      finish();
      return;
    }

    let frame = 0;
    let rafId: number;
    let lastTime = 0;
    let isCancelled = false;
    const fps = isMobile ? 18 : 22; // Faster on desktop, slightly throttled on mobile
    const interval = 1000 / fps;

    const animate = (time: number) => {
      if (isCancelled) return;
      if (!lastTime) lastTime = time;
      const elapsed = time - lastTime;

      const images = imagesRef.current;
      
      if (elapsed >= interval) {
        if (frame < images.length && images[frame]?.complete) {
          const img = images[frame];
          
          const cA = canvas.width / canvas.height;
          const iA = img.naturalWidth / img.naturalHeight;
          let dw: number, dh: number, dx: number, dy: number;

          // For the Logo Intro, we want the logo FULLY visible (contain) on mobile
          // and elegantly framed on desktop.
          if (isMobile) {
            // Mobile: Use CONTAIN logic for the logo to avoid any cropping
            const scale = 0.85; // Leave some safe margin
            if (cA > iA) {
              dh = canvas.height * scale;
              dw = dh * iA;
            } else {
              dw = canvas.width * scale;
              dh = dw / iA;
            }
            dx = (canvas.width - dw) / 2;
            dy = (canvas.height - dh) / 2;
          } else {
            // Desktop: Traditional COVER logic for cinematic feel
            if (cA > iA) {
              dw = canvas.width;
              dh = canvas.width / iA;
              dx = 0;
              dy = (canvas.height - dh) / 2;
            } else {
              dh = canvas.height;
              dw = canvas.height * iA;
              dx = (canvas.width - dw) / 2;
              dy = 0;
            }
          }

          ctx.drawImage(img, dx, dy, dw, dh);
          frame++;
          lastTime = time - (elapsed % interval);
        } else if (frame < images.length && !images[frame]?.complete) {
            // Wait
        } else {
            frame = images.length;
        }
      }

      if (frame < images.length) {
        rafId = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          if (!isCancelled) finish();
        }, isMobile ? 150 : 300);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      isCancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [internalPhase, finish, isMobile]);

  // Don't render if intro isn't needed or already gone
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
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold">
                Carrera Imports
              </span>
            </div>
          )}

          {internalPhase === "playing" && (
            <canvas
              ref={canvasRef}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
