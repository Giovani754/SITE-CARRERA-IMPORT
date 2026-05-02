"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import NextImage from "next/image";
import { useAnimationSequence } from "@/contexts/animation-sequence";
import { cn } from "@/lib/utils";
import { getAnimationConfig, getFrameUrl } from "@/config/animations";

export function HeroAnimation() {
  const { phase, introStarted, signalHeroComplete, debugHome, introNeeded } = useAnimationSequence();
  const pathname = usePathname();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const prevPhaseRef = useRef<string | null>(null);

  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [canvasSized, setCanvasSized] = useState(false);
  const [played, setPlayed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loadedFramesCount, setLoadedFramesCount] = useState(0);

  // ─── Detect Mobile ───
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ─── Reset on New Animation Cycle ───
  useEffect(() => {
    const prev = prevPhaseRef.current;
    prevPhaseRef.current = phase;

    // Detect a fresh animation cycle:
    // complete → hero (return visit) or null → intro/hero (first mount)
    const isNewCycle =
      (phase === "intro" || phase === "hero") &&
      (prev === null || prev === "complete");

    if (isNewCycle) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      setPlayed(false);
      setReady(false);
      setFailed(false);
      imagesRef.current = [];
      currentFrameRef.current = 0;
      setLoadedFramesCount(0);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase]);

  // ─── Draw a Single Frame to Canvas ───
  const drawFrame = useCallback(
    (idx: number) => {
      const canvas = canvasRef.current;
      const images = imagesRef.current;
      if (!canvas || images.length === 0) return;

      const img = images[idx] || images[images.length - 1];
      if (!img?.complete || img.naturalWidth === 0) return;
      if (canvas.width === 0 || canvas.height === 0) return;

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const imageAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = cw / ch;

      let dw: number, dh: number, dx: number, dy: number;

      if (canvasAspect > imageAspect) {
        dw = cw;
        dh = cw / imageAspect;
        dx = 0;
        dy = (ch - dh) / 2;
      } else {
        const scale = isMobile ? 1.4 : 1.05;
        dh = ch;
        dw = ch * imageAspect * scale;
        dx = (cw - dw) / 2 - (isMobile ? (dw - cw) * 0.15 : 0);
        dy = (ch - dh) / 2;
      }

      ctx.drawImage(img, dx, dy, dw, dh);
      currentFrameRef.current = idx;
    },
    [isMobile]
  );

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

  // ─── Preload Frames ───
  useEffect(() => {
    if (typeof window === "undefined" || !introStarted || ready) return;

    const { frameCount, basePath, framePattern } = getAnimationConfig("hero", isMobile);
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;
    let errored = 0;

    const checkDone = () => {
      const threshold = isMobile ? 10 : 15;
      if (loaded >= threshold && !ready) {
        imagesRef.current = imgs.filter(Boolean);
        setReady(true);
      }

      setLoadedFramesCount(loaded);
      
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
      const img = new window.Image();
      img.src = getFrameUrl(basePath, framePattern, i);
      img.onload = () => {
        imgs[i - 1] = img;
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

  // ─── Fallback poster path from config ───
  const posterPath = getFrameUrl(
    getAnimationConfig("hero", false).basePath,
    getAnimationConfig("hero", false).framePattern,
    1
  );

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-[#030303]">
      {/* Fallback Poster — first frame via NextImage for SSR/priority */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          ready && canvasSized ? "opacity-0" : "opacity-100"
        )}
      >
        <NextImage
          src={posterPath}
          alt="Hero Backdrop"
          fill
          priority
          className="object-cover brightness-[0.35]"
        />
      </div>

      {/* Canvas — frame sequence playback */}
      {!failed && (
        <canvas
          ref={canvasRef}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-1000",
            ready && canvasSized ? "opacity-100" : "opacity-0"
          )}
        />
      )}

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-transparent to-transparent opacity-60" />

      {/* TEMPORARY DEBUG PANEL */}
      {debugHome && (
        <div className="fixed bottom-10 left-10 z-[10000] bg-black/90 border border-brand-gold/50 p-6 font-mono text-[10px] text-white shadow-2xl min-w-[280px] backdrop-blur-md">
          <div className="text-brand-gold font-bold mb-4 border-b border-brand-gold/20 pb-2 uppercase tracking-widest">
            Home Debug Mode
          </div>
          <div className="space-y-2">
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white/40">Pathname:</span>
              <span className="text-white/80">{pathname}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white/40">Debug active:</span>
              <span className="text-green-500 font-bold">TRUE</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white/40">Phase:</span>
              <span className="text-brand-gold uppercase">{phase}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white/40">Intro Needed:</span>
              <span className={introNeeded ? "text-white" : "text-white/20"}>{String(introNeeded)}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white/40">Intro Started:</span>
              <span className={introStarted ? "text-green-500" : "text-white/20"}>{String(introStarted)}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white/40">Hero Mounted:</span>
              <span className="text-green-500">TRUE</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white/40">Ready:</span>
              <span className={ready ? "text-green-500" : "text-white/20"}>{String(ready)}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white/40">Played:</span>
              <span className={played ? "text-green-500" : "text-white/20"}>{String(played)}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white/40">Failed:</span>
              <span className={failed ? "text-red-500" : "text-white/20"}>{String(failed)}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white/40">Canvas Sized:</span>
              <span className={canvasSized ? "text-green-500" : "text-white/20"}>{String(canvasSized)}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white/40">Loaded Frames:</span>
              <span className="text-brand-gold">{loadedFramesCount} / 40</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white/40">Current Frame:</span>
              <span className="text-brand-gold font-bold">{currentFrameRef.current + 1}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white/40">Canvas Visible:</span>
              <span className={(ready && canvasSized) ? "text-green-500" : "text-white/20"}>{String(ready && canvasSized)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
