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
    setIsMobile(window.innerWidth < 768);
  }, []);

  const finish = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    setInternalPhase("fading");
    const t = setTimeout(() => {
      setInternalPhase("gone");
      signalIntroComplete();
    }, isMobile ? 600 : 1000);
    return () => clearTimeout(t);
  }, [signalIntroComplete, isMobile]);

  // Preload frames
  useEffect(() => {
    if (!introNeeded) return;

    // Safety timeout: Site must work even if assets fail
    const safetyTimer = setTimeout(() => {
      if (internalPhase === "loading") finish();
    }, isMobile ? 5000 : 8000);

    const frameCount = isMobile ? 25 : 40; // Even fewer for mobile stability
    const imgs: HTMLImageElement[] = new Array(frameCount);
    let loaded = 0;
    let failed = 0;

    const checkDone = () => {
      const totalAttempted = loaded + failed;
      const startThreshold = isMobile ? 5 : 10;
      
      if (totalAttempted >= startThreshold && internalPhase === "loading") {
        imagesRef.current = imgs.filter(Boolean);
        setInternalPhase("playing");
        signalIntroStarted();
      }

      if (totalAttempted >= frameCount) {
        if (loaded < 3) finish(); // Critical failure fallback
      }
    };

    // Sequential but fast loading
    const loadAssets = async () => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const frameIdx = isMobile ? Math.floor((i * 40) / 25) : i;
        const frameNum = Math.min(frameIdx, 40).toString().padStart(3, "0");
        
        img.src = `/animations/intro/ezgif-frame-${frameNum}.jpg`;
        // @ts-ignore
        if (i <= 5) img.fetchPriority = 'high';

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
        
        // Yield to main thread every few images
        if (i % 5 === 0) await new Promise(r => setTimeout(r, 0));
      }
    };

    loadAssets();
    return () => clearTimeout(safetyTimer);
  }, [introNeeded, isMobile, internalPhase, finish, signalIntroStarted]);

  // Canvas playback
  useEffect(() => {
    if (internalPhase !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.5);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) { finish(); return; }

    let frame = 0;
    let rafId: number;
    let lastTime = 0;
    const fps = isMobile ? 15 : 20; 
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
            let dw: number, dh: number, dx: number, dy: number;

            // Logic: On mobile, always CONTAIN the logo to ensure visibility
            if (isMobile) {
              const scale = 0.8;
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
              // Desktop: Cinematic COVER
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

            ctx.fillStyle = "#030303";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, dx, dy, dw, dh);
            frame++;
            lastTime = time - (elapsed % interval);
          } else {
            frame++; // Skip missing frame
          }
        }
      }

      if (frame < images.length) {
        rafId = requestAnimationFrame(animate);
      } else {
        const t = setTimeout(finish, isMobile ? 200 : 400);
        return () => clearTimeout(t);
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
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold">
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
