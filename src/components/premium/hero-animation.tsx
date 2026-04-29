"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useAnimationSequence } from "@/contexts/animation-sequence";
import { cn } from "@/lib/utils";

interface HeroAnimationProps {
  waitForIntro?: boolean;
}

export function HeroAnimation({ waitForIntro = true }: HeroAnimationProps) {
  const { phase, introStarted, signalHeroComplete } = useAnimationSequence();
  const pathname = usePathname();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [played, setPlayed] = useState(false);
  
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  // ─── Detect Mobile ───
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ─── Reset on mount ───
  useEffect(() => {
    // HARD RESET everything on mount to avoid stale states
    setPlayed(false);
    setReady(false);
    setFailed(false);
    currentFrameRef.current = 0;
    
    // Cleanup function to clear canvas and stop any ongoing animation
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, []);

  // ─── Draw logic with Cover + DPR + Mobile Focus ───
  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas || imagesRef.current.length === 0) return;
    
    const img = imagesRef.current[idx] || imagesRef.current[imagesRef.current.length - 1];
    if (!img || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const { width: cw, height: ch } = canvas;
    const { naturalWidth: iw, naturalHeight: ih } = img;
    
    const canvasAspect = cw / ch;
    const imageAspect = iw / ih;

    let dw: number, dh: number, dx: number, dy: number;

    if (canvasAspect > imageAspect) {
      dw = cw;
      dh = cw / imageAspect;
      dx = 0;
      dy = (ch - dh) / 2;
    } else {
      // Improved Mobile Framing
      const mobileScale = isMobile ? 1.4 : 1.05; 
      dh = ch;
      dw = ch * imageAspect * mobileScale;
      dx = (cw - dw) / 2 - (isMobile ? (dw - cw) * 0.15 : 0);
      dy = (ch - dh) / 2;
    }

    ctx.drawImage(img, dx, dy, dw, dh);
    currentFrameRef.current = idx;
  }, [isMobile]);

  // ─── Resize Observer ───
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry || !canvasRef.current) return;

      const { width, height } = entry.contentRect;
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.2 : 2);
      canvasRef.current.width = width * dpr;
      canvasRef.current.height = height * dpr;

      // Draw immediately on resize to prevent flicker
      drawFrame(currentFrameRef.current);
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [drawFrame, isMobile]);

  // ─── Preload frames with Staggered Priority ───
  useEffect(() => {
    if (typeof window === "undefined" || imagesRef.current.length > 0) return;
    
    // We only wait for introStarted if waitForIntro is true
    // If introStarted is false, it might mean we just navigated home and context is resetting
    if (waitForIntro && !introStarted) return;

    const frameCount = isMobile ? 20 : 40;
    const imgs: HTMLImageElement[] = new Array(frameCount);
    let loaded = 0;
    let errored = 0;

    const checkDone = () => {
      const threshold = isMobile ? 8 : 12;
      if (loaded >= threshold && !ready) {
        imagesRef.current = imgs.filter(Boolean);
        setReady(true);
        // DRAW FIRST FRAME IMMEDIATELY when ready to avoid black screen
        setTimeout(() => drawFrame(0), 10);
      }
      
      if (loaded + errored >= frameCount) {
        const valid = imgs.filter((i) => i && i.complete && i.naturalWidth > 0);
        if (valid.length > 0) {
          imagesRef.current = valid;
          setReady(true);
        } else {
          setFailed(true);
        }
      }
    };

    const loadFrames = async () => {
      const batchSize = isMobile ? 3 : 5;
      for (let i = 1; i <= frameCount; i += batchSize) {
        const batch = [];
        for (let j = i; j < i + batchSize && j <= frameCount; j++) {
          const img = new Image();
          // @ts-ignore
          img.fetchPriority = (j === 1) ? 'high' : 'low';
          
          const frameIdx = isMobile ? (j * 2) - 1 : j;
          const frameNum = Math.min(frameIdx, 40).toString().padStart(3, "0");
          img.src = `/animations/hero/ezgif-frame-${frameNum}.jpg`;
          
          const promise = img.decode()
            .then(() => {
              imgs[j - 1] = img;
              loaded++;
              checkDone();
            })
            .catch(() => {
              errored++;
              checkDone();
            });
          batch.push(promise);
        }
        await Promise.all(batch);
        await new Promise(resolve => setTimeout(resolve, isMobile ? 100 : 50));
      }
    };

    loadFrames();
  }, [introStarted, waitForIntro, isMobile, ready, drawFrame]);

  // ─── Animation Sequence ───
  useEffect(() => {
    let isCancelled = false;
    
    // Critical: only start if we are in the correct phase or intro is complete
    if (!ready) return;
    if (waitForIntro && (phase === "intro" || phase === "transition")) return;
    if (played && (phase === "complete" || phase === "intro")) return;

    const images = imagesRef.current;
    if (images.length === 0) return;

    setPlayed(true);
    let frame = 0;
    let lastTime = 0;
    const fps = isMobile ? 15 : 22; 
    const interval = 1000 / fps;

    const animate = (time: number) => {
      if (isCancelled) return;
      if (!lastTime) lastTime = time;
      const elapsed = time - lastTime;

      if (elapsed >= interval) {
        if (frame < images.length && images[frame]?.complete) {
          drawFrame(frame);
          frame++;
          lastTime = time - (elapsed % interval);
        }
      }

      if (frame < images.length) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        signalHeroComplete();
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      isCancelled = true;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [ready, phase, waitForIntro, drawFrame, signalHeroComplete, played, isMobile]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden bg-[#030303]"
    >
      {/* STATIC FALLBACK: Display a static image while loading to avoid black screen and "lag" feel */}
      {!ready && !failed && (
        <div className="absolute inset-0 transition-opacity duration-1000">
          <img 
            src="/animations/hero/ezgif-frame-001.jpg" 
            alt="Hero Background"
            className="w-full h-full object-cover brightness-[0.3] contrast-125 grayscale"
          />
        </div>
      )}

      {failed ? (
        <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] via-[#030303] to-[#080808]" />
      ) : (
        <canvas
          ref={canvasRef}
          className={cn(
            "w-full h-full object-cover brightness-75 contrast-125 transition-opacity duration-1000",
            ready ? "opacity-100" : "opacity-0"
          )}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-transparent to-transparent opacity-60" />
    </div>
  );
}
