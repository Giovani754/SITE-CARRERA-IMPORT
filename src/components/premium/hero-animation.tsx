"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useAnimationSequence } from "@/contexts/animation-sequence";

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

    const isMobile = cw < 768 * (window.devicePixelRatio || 1);

    if (canvasAspect > imageAspect) {
      dw = cw;
      dh = cw / imageAspect;
      dx = 0;
      dy = (ch - dh) / 2;
    } else {
      // Improved Mobile Framing: Center the car which is usually in the middle-right
      // instead of just cropping the left side.
      const mobileScale = isMobile ? 1.2 : 1.05; // Slightly more scale for impact
      dh = ch;
      dw = ch * imageAspect * mobileScale;
      // Offset slightly to the right to keep the car (subject) in view
      dx = (cw - dw) / 2 + (isMobile ? (dw - cw) * 0.1 : 0);
      dy = (ch - dh) / 2;
    }

    ctx.drawImage(img, dx, dy, dw, dh);
    currentFrameRef.current = idx;
  }, []);

  // ─── Resize Observer (Fix for Pixelation & Scale) ───
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry || !canvasRef.current) return;

      const { width, height } = entry.contentRect;
      if (width === 0 || height === 0) return;

      // PERFORMANCE: Cap DPR at 1.5 for mobile, 2.0 for desktop
      const dpr = Math.min(window.devicePixelRatio || 1, width < 768 ? 1.2 : 2);
      canvasRef.current.width = width * dpr;
      canvasRef.current.height = height * dpr;

      drawFrame(currentFrameRef.current);
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [drawFrame]);

  // ─── Reset on route change ───
  useEffect(() => {
    setPlayed(false);
    setFailed(false);
    currentFrameRef.current = 0;
    if (imagesRef.current.length > 0) setReady(true);
  }, [pathname]);

  // ─── Preload frames with Staggered Priority ───
  useEffect(() => {
    if (typeof window === "undefined" || imagesRef.current.length > 0) return;
    
    // STAGGERED LOADING: Wait for intro to start playing before competing for bandwidth
    if (waitForIntro && !introStarted) return;

    const frameCount = 40;
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;
    let errored = 0;

    const checkDone = () => {
      if (loaded >= 8 && !ready) { // Snappier ready state
        imagesRef.current = imgs;
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
      // @ts-ignore - Low priority as hero is secondary to logo intro
      img.fetchPriority = 'low';
      
      img.src = `/animations/hero/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;
      img.onload = () => { loaded++; checkDone(); };
      img.onerror = () => { errored++; checkDone(); };
      imgs.push(img);
    }
  }, [ready, introStarted, waitForIntro]);

  // ─── Animation Sequence ───
  useEffect(() => {
    let isCancelled = false;

    if (!ready) return;
    if (waitForIntro && (phase === "intro" || phase === "transition")) return;
    if (played && phase === "complete") return;

    const images = imagesRef.current;
    if (images.length === 0) return;

    setPlayed(true);

    let frame = 0;
    let lastTime = 0;
    const fps = 18; // Smoother and faster for premium feel
    const interval = 1000 / fps;

    const animate = (time: number) => {
      if (isCancelled) return;

      if (!lastTime) lastTime = time;
      const elapsed = time - lastTime;

      if (elapsed >= interval) {
        if (frame < 40 && images[frame]?.complete) {
          drawFrame(frame);
          frame++;
          lastTime = time - (elapsed % interval);
        } else if (frame >= 40) {
            frame = 40;
        }
      }

      if (frame < 40) {
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
  }, [ready, phase, waitForIntro, drawFrame, signalHeroComplete, played]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden bg-[#030303]"
    >
      {failed ? (
        <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] via-[#030303] to-[#080808]" />
      ) : (
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover brightness-75 contrast-125"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-transparent to-transparent opacity-60" />
    </div>
  );
}
