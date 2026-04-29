"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useAnimationSequence } from "@/contexts/animation-sequence";
import { cn } from "@/lib/utils";

export function HeroAnimation() {
  const { phase, introStarted, signalHeroComplete } = useAnimationSequence();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [canvasSized, setCanvasSized] = useState(false);
  const [played, setPlayed] = useState(false);
  
  const imagesRef = useRef<HTMLImageElement[]>([]);
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

  // ─── Reset / Initialization ───
  useEffect(() => {
    // HARD RESET on mount to ensure fresh state
    setPlayed(false);
    setReady(false);
    setFailed(false);
    imagesRef.current = [];
    currentFrameRef.current = 0;
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ─── Core Drawing Engine ───
  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas || imagesRef.current.length === 0) return;
    
    const img = imagesRef.current[idx] || imagesRef.current[imagesRef.current.length - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    if (canvas.width === 0 || canvas.height === 0) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const { width: cw, height: ch } = canvas;
    const { naturalWidth: iw, naturalHeight: ih } = img;
    const canvasAspect = cw / ch;
    const imageAspect = iw / ih;

    let dw: number, dh: number, dx: number, dy: number;

    // COVER logic with Mobile-specific framing
    if (canvasAspect > imageAspect) {
      dw = cw;
      dh = cw / imageAspect;
      dx = 0;
      dy = (ch - dh) / 2;
    } else {
      // Zoom on car for mobile
      const mobileScale = isMobile ? 1.4 : 1.05; 
      dh = ch;
      dw = ch * imageAspect * mobileScale;
      dx = (cw - dw) / 2 - (isMobile ? (dw - cw) * 0.15 : 0);
      dy = (ch - dh) / 2;
    }

    ctx.drawImage(img, dx, dy, dw, dh);
    currentFrameRef.current = idx;
  }, [isMobile]);

  // ─── Responsive Canvas Sizing ───
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.2 : 2.0);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      setCanvasSized(true);
      
      if (imagesRef.current.length > 0) {
        drawFrame(currentFrameRef.current);
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [drawFrame, isMobile]);

  // ─── Simple Preloading ───
  useEffect(() => {
    if (typeof window === "undefined" || !introStarted || ready) return;

    const frameCount = 40; 
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;
    let errored = 0;

    const checkDone = () => {
      // Allow partial ready to show something faster
      const threshold = isMobile ? 10 : 15;
      if (loaded >= threshold && !ready) {
        imagesRef.current = imgs.filter(Boolean);
        setReady(true);
      }
      
      if (loaded + errored >= frameCount) {
        const valid = imgs.filter((i) => i.complete && i.naturalWidth > 0);
        if (valid.length > 0) {
          imagesRef.current = valid;
          setReady(true);
        } else {
          setFailed(true);
        }
      }
    };

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/animations/hero/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;
      img.onload = () => {
        imgs[i-1] = img;
        loaded++;
        checkDone();
      };
      img.onerror = () => {
        errored++;
        checkDone();
      };
    }
  }, [introStarted, isMobile, ready]);

  // ─── Playback Loop ───
  useEffect(() => {
    if (!ready || !canvasSized || played) return;
    if (phase !== "hero" && phase !== "complete") return;

    const images = imagesRef.current;
    if (images.length === 0) return;

    setPlayed(true);
    let frame = 0;
    let lastTime = 0;
    const fps = isMobile ? 15 : 22; 
    const interval = 1000 / fps;

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
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
  }, [ready, canvasSized, phase, drawFrame, signalHeroComplete, played, isMobile]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-[#030303]">
      {/* Fallback Poster (First Frame) */}
      <div className={cn(
        "absolute inset-0 transition-opacity duration-1000",
        (ready && canvasSized) ? "opacity-0" : "opacity-100"
      )}>
        <Image 
          src="/animations/hero/ezgif-frame-001.jpg" 
          alt="Hero Backdrop"
          fill
          priority
          className="object-cover brightness-[0.35]"
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
