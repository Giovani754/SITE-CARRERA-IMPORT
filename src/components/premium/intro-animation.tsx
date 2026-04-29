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

  // Finish and signal parent context
  const finish = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    setInternalPhase("fading");
    // Allow fade-out animation to play, then signal context
    setTimeout(() => {
      setInternalPhase("gone");
      signalIntroComplete();
    }, 1000);
  }, [signalIntroComplete]);

  // Preload frames
  useEffect(() => {
    if (!introNeeded || typeof window === "undefined") return;

    // SAFETY TIMEOUT: force finish after 8 seconds (reduced from 10)
    const safetyTimer = setTimeout(finish, 8000);

    const frameCount = 40;
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;
    let failed = 0;

    const checkDone = () => {
      const totalAttempted = loaded + failed;
      
      // PROGRESSIVE START: Start playing as soon as we have 8 frames (reduced from 15)
      // to give a snappier feel while the rest loads in background.
      if (totalAttempted >= 8 && imgs[0]?.complete && internalPhase === "loading") {
        imagesRef.current = imgs;
        setInternalPhase("playing");
        signalIntroStarted();
      }

      if (totalAttempted >= frameCount) {
        clearTimeout(safetyTimer);
        // Ensure we have a minimum set to show anything
        if (loaded < 5) finish();
      }
    };

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      
      // HIGH PRIORITY for the first 10 frames to ensure rapid startup
      if (i <= 10) {
        // @ts-ignore
        img.fetchPriority = 'high';
      } else {
        // @ts-ignore
        img.fetchPriority = 'low';
      }

      img.src = `/animations/intro/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;
      img.onload = () => {
        loaded++;
        setProgress(Math.round(((loaded + failed) / frameCount) * 100));
        checkDone();
      };
      img.onerror = () => {
        failed++;
        setProgress(Math.round(((loaded + failed) / frameCount) * 100));
        checkDone();
      };
      imgs.push(img);
    }

    return () => clearTimeout(safetyTimer);
  }, [introNeeded, finish, internalPhase, signalIntroStarted]);

  // Canvas playback
  useEffect(() => {
    if (internalPhase !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) {
      finish();
      return;
    }

    // Optimization: Cap DPR at 2 for performance, lower for mobile
    const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    const ctx = canvas.getContext("2d", { alpha: false }); // Alpha false for performance
    if (!ctx) {
      finish();
      return;
    }

    let frame = 0;
    let rafId: number;
    let lastTime = 0;
    let isCancelled = false;
    const fps = 20; // Faster playback for more impact
    const interval = 1000 / fps;

    const animate = (time: number) => {
      if (isCancelled) return;
      if (!lastTime) lastTime = time;
      const elapsed = time - lastTime;

      const images = imagesRef.current;
      
      if (elapsed >= interval) {
        // Only draw if the image is actually loaded (progressive buffer)
        if (frame < 40 && images[frame]?.complete) {
          const img = images[frame];
          
          // Cover-fit drawing with slight mobile adjustment
          const cA = canvas.width / canvas.height;
          const iA = img.naturalWidth / img.naturalHeight;
          let dw: number, dh: number, dx: number, dy: number;

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

          ctx.drawImage(img, dx, dy, dw, dh);
          frame++;
          lastTime = time - (elapsed % interval);
        } else if (frame < 40 && !images[frame]?.complete) {
            // Buffer stall - wait for image
        } else {
            // End of sequence
            frame = 40; 
        }
      }

      if (frame < 40) {
        rafId = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          if (!isCancelled) finish();
        }, 300); // Shorter hold for faster flow
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      isCancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [internalPhase, finish]);

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
