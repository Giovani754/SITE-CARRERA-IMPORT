"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useAnimationSequence } from "@/contexts/animation-sequence";
import { cn } from "@/lib/utils";

// ─── Global Singleton Cache ───
const HERO_CACHE_KEY = "carrera_hero_frames_v2";
if (typeof window !== "undefined" && !(window as any)[HERO_CACHE_KEY]) {
  (window as any)[HERO_CACHE_KEY] = [];
}

export function HeroAnimation() {
  const { phase, introStarted, signalHeroComplete } = useAnimationSequence();

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
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getGlobalFrames = useCallback((): HTMLImageElement[] => {
    if (typeof window === "undefined") return [];
    return (window as any)[HERO_CACHE_KEY] || [];
  }, []);

  const setGlobalFrames = useCallback((frames: HTMLImageElement[]) => {
    if (typeof window === "undefined") return;
    (window as any)[HERO_CACHE_KEY] = frames;
  }, []);

  // ─── Reset / Initialization ───
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

  // ─── Core Drawing Engine ───
  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    const images = getGlobalFrames();
    if (!canvas || images.length === 0) return;
    
    const img = images[idx] || images[images.length - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Safety: ensure canvas has non-zero dimensions
    if (canvas.width === 0 || canvas.height === 0) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const { width: cw, height: ch } = canvas;
    const { naturalWidth: iw, naturalHeight: ih } = img;
    const canvasAspect = cw / ch;
    const imageAspect = iw / ih;

    let dw: number, dh: number, dx: number, dy: number;

    // COVER logic for cinematic feel
    if (canvasAspect > imageAspect) {
      dw = cw;
      dh = cw / imageAspect;
      dx = 0;
      dy = (ch - dh) / 2;
    } else {
      // On mobile, we zoom slightly more to focus on the car
      const mobileScale = isMobile ? 1.35 : 1.05; 
      dh = ch;
      dw = ch * imageAspect * mobileScale;
      dx = (cw - dw) / 2 - (isMobile ? (dw - cw) * 0.12 : 0);
      dy = (ch - dh) / 2;
    }

    ctx.drawImage(img, dx, dy, dw, dh);
    currentFrameRef.current = idx;
  }, [isMobile, getGlobalFrames]);

  // ─── Responsive Canvas Sizing ───
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      setCanvasSized(true);
      
      // Force redraw if we have frames
      const currentIdx = currentFrameRef.current;
      if (getGlobalFrames().length > 0) {
        drawFrame(currentIdx);
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [drawFrame, isMobile, getGlobalFrames]);

  // ─── Sequential Preloading ───
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const cached = getGlobalFrames();
    if (cached.length > 0) {
      if (!ready) setReady(true);
      return;
    }

    // IMPORTANT: Wait for Intro to be active before preloading
    // but wait for Intro to FINISH for the actual drift to be fluid
    if (!introStarted) return;

    const frameCount = isMobile ? 25 : 40; 
    const imgs: HTMLImageElement[] = new Array(frameCount);
    let loaded = 0;
    let errored = 0;

    const checkDone = () => {
      const threshold = isMobile ? 10 : 20;
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

    const loadSequence = async () => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const frameIdx = isMobile ? Math.floor((i * 40) / 25) : i;
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

        // Yield to main thread
        if (i % 4 === 0) await new Promise(r => setTimeout(r, 0));
      }
    };

    loadSequence();
  }, [introStarted, isMobile, ready, getGlobalFrames, setGlobalFrames]);

  // ─── Playback Loop ───
  useEffect(() => {
    // Requirements for playback:
    // 1. Ready frames
    // 2. Sized canvas
    // 3. Phase is either 'hero' or 'complete' (for returning users)
    if (!ready || !canvasSized || played) return;
    if (phase !== "hero" && phase !== "complete") return;

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
  }, [ready, canvasSized, phase, drawFrame, signalHeroComplete, played, isMobile, getGlobalFrames]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-[#030303]">
      {/* Fallback Poster (First Frame) */}
      <div className={cn(
        "absolute inset-0 transition-opacity duration-1000",
        (ready && canvasSized) ? "opacity-0" : "opacity-100"
      )}>
        <img 
          src="/animations/hero/ezgif-frame-001.jpg" 
          alt="Hero Backdrop"
          className="w-full h-full object-cover brightness-[0.35]"
        />
      </div>

      {!failed && (
        <canvas
          ref={canvasRef}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-1000",
            (ready && canvasSized) ? "opacity-100" : "opacity-0"
          )}
        />
      )}
      
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-transparent to-transparent opacity-60" />
    </div>
  );
}
