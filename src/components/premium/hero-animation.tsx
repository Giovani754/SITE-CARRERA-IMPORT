"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useAnimationSequence } from "@/contexts/animation-sequence";
import { cn } from "@/lib/utils";

interface HeroAnimationProps {
  waitForIntro?: boolean;
}

// ─── Global Cache for Hero Frames ───
const HERO_CACHE_KEY = "carrera_hero_frames";
if (typeof window !== "undefined" && !(window as any)[HERO_CACHE_KEY]) {
  (window as any)[HERO_CACHE_KEY] = [];
}

export function HeroAnimation({ waitForIntro = true }: HeroAnimationProps) {
  const { phase, signalHeroComplete } = useAnimationSequence();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [canvasSized, setCanvasSized] = useState(false);
  const [played, setPlayed] = useState(false);
  
  const currentFrameRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  // Detect mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Global cache access helper
  const getGlobalFrames = useCallback(() => {
    if (typeof window === "undefined") return [];
    return (window as any)[HERO_CACHE_KEY] || [];
  }, []);

  const setGlobalFrames = useCallback((frames: HTMLImageElement[]) => {
    if (typeof window === "undefined") return;
    (window as any)[HERO_CACHE_KEY] = frames;
  }, []);

  // ─── Reset on mount ───
  useEffect(() => {
    const cached = getGlobalFrames();
    setPlayed(false);
    setReady(cached.length > 0);
    setFailed(false);
    currentFrameRef.current = 0;
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [getGlobalFrames]);

  // ─── Draw logic ───
  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    const images = getGlobalFrames();
    if (!canvas || images.length === 0) return;
    
    const img = images[idx] || images[0];
    if (!img || !img.complete || img.naturalWidth === 0) return;
    if (canvas.width === 0 || canvas.height === 0) return;

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
      const mobileScale = isMobile ? 1.4 : 1.05; 
      dh = ch;
      dw = ch * imageAspect * mobileScale;
      dx = (cw - dw) / 2 - (isMobile ? (dw - cw) * 0.15 : 0);
      dy = (ch - dh) / 2;
    }

    ctx.drawImage(img, dx, dy, dw, dh);
    currentFrameRef.current = idx;
  }, [isMobile, getGlobalFrames]);

  // ─── Resize Observer ───
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry || !canvasRef.current) return;
      const { width, height } = entry.contentRect;
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.5);
      canvasRef.current.width = width * dpr;
      canvasRef.current.height = height * dpr;

      setCanvasSized(true);
      drawFrame(currentFrameRef.current);
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [drawFrame, isMobile]);

  // ─── Preload frames logic ───
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const cached = getGlobalFrames();
    if (cached.length > 0) {
      if (!ready) setReady(true);
      if (canvasSized) drawFrame(0);
      return;
    }

    // PRODUCTION FIX: Wait for intro to be FULLY finished before starting hero preloading
    // This prevents thread contention on mobile.
    if (waitForIntro && phase === "intro") return;

    const frameCount = isMobile ? 15 : 40; 
    const imgs: HTMLImageElement[] = new Array(frameCount);
    let loaded = 0;
    let errored = 0;

    const checkDone = () => {
      const threshold = isMobile ? 5 : 12;
      if (loaded >= threshold && !ready) {
        setGlobalFrames(imgs.filter(Boolean));
        setReady(true);
      }
      
      if (loaded + errored >= frameCount) {
        const valid = imgs.filter((i) => i && i.complete && i.naturalWidth > 0);
        if (valid.length > 0) {
          setGlobalFrames(valid);
          setReady(true);
        } else {
          setFailed(true);
        }
      }
    };

    const loadAssets = async () => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const frameIdx = isMobile ? Math.floor((i * 40) / 15) : i;
        const frameNum = Math.min(frameIdx, 40).toString().padStart(3, "0");
        img.src = `/animations/hero/ezgif-frame-${frameNum}.jpg`;
        
        // @ts-ignore
        if (i === 1) img.fetchPriority = 'high';

        img.onload = () => {
          imgs[i-1] = img;
          loaded++;
          checkDone();
        };
        img.onerror = () => {
          errored++;
          checkDone();
        };

        // Aggressive batching for mobile
        if (i % 3 === 0) await new Promise(r => setTimeout(r, 0));
      }
    };

    loadAssets();
  }, [phase, waitForIntro, isMobile, ready, drawFrame, canvasSized, getGlobalFrames, setGlobalFrames]);

  // ─── Animation Loop ───
  useEffect(() => {
    if (!ready || !canvasSized || played) return;
    // Only play when we are in the hero phase
    if (waitForIntro && phase !== "hero") return;

    const images = getGlobalFrames();
    if (images.length === 0) return;

    setPlayed(true);
    let frame = 0;
    let lastTime = performance.now();
    const fps = isMobile ? 15 : 20; 
    const interval = 1000 / fps;

    const animate = (time: number) => {
      const elapsed = time - lastTime;
      if (elapsed >= interval) {
        if (frame < images.length) {
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
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ready, canvasSized, phase, waitForIntro, drawFrame, signalHeroComplete, played, isMobile, getGlobalFrames]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-[#030303]">
      {(!ready || !canvasSized) && !failed && (
        <div className="absolute inset-0">
          <img 
            src="/animations/hero/ezgif-frame-001.jpg" 
            alt="Background"
            className="w-full h-full object-cover opacity-30 grayscale"
          />
        </div>
      )}

      {failed ? (
        <div className="w-full h-full bg-[#030303]" />
      ) : (
        <canvas
          ref={canvasRef}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-1000",
            (ready && canvasSized) ? "opacity-100" : "opacity-0"
          )}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
    </div>
  );
}
