"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAnimationConfig, getFrameUrl } from "@/config/animations";

export function HomeIntroSequence({ 
  onComplete, 
  onSkip 
}: { 
  onComplete?: () => void; 
  onSkip?: () => void;
}) {
  const [shouldPlay, setShouldPlay] = useState<boolean | null>(null);
  const [internalPhase, setInternalPhase] = useState<"loading" | "playing" | "fading" | "gone">("loading");
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const hasFinishedRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Initial Session Check
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    try {
      const hasSeen = sessionStorage.getItem("carrera-intro-seen");
      if (hasSeen === "true") {
        setShouldPlay(false);
        setInternalPhase("gone");
        onSkip?.();
      } else {
        setShouldPlay(true);
      }
    } catch (e) {
      setShouldPlay(false);
      setInternalPhase("gone");
      onSkip?.();
    }

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [onSkip]);

  const finish = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    try {
      sessionStorage.setItem("carrera-intro-seen", "true");
    } catch (e) {}

    setInternalPhase("fading");
    setTimeout(() => {
      setInternalPhase("gone");
      onComplete?.();
    }, 800);
  }, [onComplete]);

  // 2. Preload Frames
  useEffect(() => {
    if (shouldPlay !== true || internalPhase !== "loading") return;

    const safetyTimer = setTimeout(() => {
      if (internalPhase === "loading") finish();
    }, 8000);

    const config = getAnimationConfig("logo", isMobile);
    const { frameCount, basePath, framePattern } = config;
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;
    let failed = 0;

    let hasStartedPlaying = false;

    const checkDone = () => {
      const total = loaded + failed;
      if (total >= frameCount) {
        const valid = imgs.filter((i) => i && i.complete && i.naturalWidth > 0);
        if (valid.length > 5) {
          imagesRef.current = valid;
          if (!hasStartedPlaying) {
            hasStartedPlaying = true;
            setInternalPhase("playing");
          }
        } else {
          finish();
        }
      }
    };

    for (let i = 1; i <= frameCount; i++) {
      const img = new window.Image();
      img.src = getFrameUrl(basePath, framePattern, i);
      img.onload = () => {
        imgs[i - 1] = img;
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
  }, [shouldPlay, isMobile, finish]); // Removed internalPhase to prevent restart

  // 3. Canvas Animation Loop
  useEffect(() => {
    if (internalPhase !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
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
    const fps = isMobile ? 20 : 24;
    const interval = 1000 / fps;

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const elapsed = time - lastTime;
      const images = imagesRef.current;

      if (elapsed >= interval) {
        if (frame < images.length) {
          const img = images[frame];
          if (img) {
            const cA = canvas.width / canvas.height;
            const iA = img.naturalWidth / img.naturalHeight;
            let dw: number, dh: number;

            // Cover logic for Intro
            if (cA > iA) {
              dw = canvas.width;
              dh = dw / iA;
            } else {
              dh = canvas.height;
              dw = dh * iA;
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
        setTimeout(finish, 200);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [internalPhase, isMobile, finish]);

  if (shouldPlay === false || internalPhase === "gone") return null;

  return (
    <AnimatePresence>
      {(internalPhase === "loading" || internalPhase === "playing" || internalPhase === "fading") && (
        <motion.div
          key="home-intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] bg-[#030303] flex items-center justify-center overflow-hidden"
        >
          {internalPhase === "loading" && (
            <div className="flex flex-col items-center gap-6">
              <div className="w-48 h-[1px] bg-white/5 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-brand-gold"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold">
                Carrera Imports
              </span>
            </div>
          )}

          {(internalPhase === "playing" || internalPhase === "fading") && (
            <canvas
              ref={canvasRef}
              className="w-full h-full object-cover"
              style={{ opacity: internalPhase === "fading" ? 0 : 1, transition: "opacity 0.6s ease" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
