"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimationSequence } from "@/contexts/animation-sequence";

export function IntroAnimation() {
  const { phase, introNeeded, signalIntroComplete } = useAnimationSequence();

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

    // SAFETY TIMEOUT: force finish after 8 seconds no matter what
    const safetyTimer = setTimeout(finish, 8000);

    const frameCount = 40;
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;
    let failed = 0;

    const checkDone = () => {
      if (loaded + failed >= frameCount) {
        clearTimeout(safetyTimer);
        const valid = imgs.filter(
          (img) => img.complete && img.naturalWidth > 0
        );
        if (valid.length > 5) {
          imagesRef.current = valid;
          setInternalPhase("playing");
        } else {
          // Not enough frames — skip intro
          finish();
        }
      }
    };

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/animations/intro/ezgif-frame-${i
        .toString()
        .padStart(3, "0")}.jpg`;
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
  }, [introNeeded, finish]);

  // Canvas playback
  useEffect(() => {
    if (internalPhase !== "playing") return;

    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas || images.length === 0) {
      finish();
      return;
    }

    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      finish();
      return;
    }

    let frame = 0;
    let rafId: number;
    let lastTime = 0;
    let isCancelled = false;
    const fps = 15; // Slightly slower for better transition to slow-motion hero
    const interval = 1000 / fps;

    const animate = (time: number) => {
      if (isCancelled) return;
      if (!lastTime) lastTime = time;
      const elapsed = time - lastTime;

      if (elapsed >= interval) {
        if (frame < images.length) {
          const img = images[frame];
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Cover-fit drawing
          const cA = canvas.width / canvas.height;
          const iA = img.width / img.height;
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
        }
      }

      if (frame < images.length) {
        rafId = requestAnimationFrame(animate);
      } else {
        // Sequence done — hold last frame briefly, then finish
        setTimeout(() => {
          if (!isCancelled) finish();
        }, 600);
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
