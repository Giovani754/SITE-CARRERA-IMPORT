"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { getAnimationConfig, getFrameUrl, ANIMATION_CONFIG } from "@/config/animations";

export function HomeHeroSequence({ canPlay = true }: { canPlay?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const playbackStartedRef = useRef(false);
  
  // Frozen config for the duration of this component's lifecycle
  const modeRef = useRef<"mobile" | "desktop" | null>(null);
  const configRef = useRef<any>(null);

  const [status, setStatus] = useState<"loading" | "playing" | "finished" | "failed">("loading");
  const [canvasSized, setCanvasSized] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  // 1. Initialize and Freeze Config
  useEffect(() => {
    if (modeRef.current) return;

    const isMobileNow = window.innerWidth < 768;
    const mode = isMobileNow ? "mobile" : "desktop";
    const config = getAnimationConfig("hero", isMobileNow);
    
    modeRef.current = mode;
    configRef.current = config;
    
    console.log("[hero] mode locked:", mode, config.basePath);
  }, []);

  // 2. Preload ALL Frames (using frozen config)
  useEffect(() => {
    if (!configRef.current) return;
    
    const { frameCount, basePath, framePattern } = configRef.current;
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;
    let failedCount = 0;

    const checkStatus = () => {
      setLoadedCount(loaded);
      
      if (loaded + failedCount >= frameCount) {
        const valid = imgs.filter((i) => i && i.complete && i.naturalWidth > 0);
        console.log("[hero] loaded frames", { loaded: valid.length, total: frameCount });
        
        if (valid.length >= frameCount * 0.9) {
          imagesRef.current = imgs;
          setStatus("playing");
        } else {
          setStatus("failed");
        }
      }
    };

    for (let i = 1; i <= frameCount; i++) {
      const img = new window.Image();
      img.src = getFrameUrl(basePath, framePattern, i);
      img.onload = () => {
        imgs[i - 1] = img;
        loaded++;
        checkStatus();
      };
      img.onerror = () => {
        failedCount++;
        checkStatus();
      };
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []); // Only run once to use frozen config

  // 3. Draw Frame helper (Stable Scale)
  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas || images.length === 0) return;

    const img = images[idx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const imageAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = cw / ch;

    let dw: number, dh: number, dx: number, dy: number;

    // Stable Cover Logic
    // We use a fixed scale multiplier to ensure no "flicker" between frames
    const isMobileMode = modeRef.current === "mobile";
    const scaleFactor = isMobileMode ? 1.0 : 1.0; // Use pure cover for stability

    if (canvasAspect > imageAspect) {
      dw = cw * scaleFactor;
      dh = dw / imageAspect;
    } else {
      dh = ch * scaleFactor;
      dw = dh * imageAspect;
    }
    
    dx = (cw - dw) / 2;
    dy = (ch - dh) / 2;

    ctx.drawImage(img, dx, dy, dw, dh);
    currentFrameRef.current = idx;
  }, []);

  // 4. Handle Sizing
  useEffect(() => {
    const updateSize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      setCanvasSized(true);

      if (imagesRef.current.length > 0) {
        drawFrame(currentFrameRef.current);
      }
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(containerRef.current!);
    return () => ro.disconnect();
  }, [drawFrame]);

  // 5. Playback Loop
  useEffect(() => {
    if (status !== "playing" || !canvasSized || !canPlay || playbackStartedRef.current) return;
    
    playbackStartedRef.current = true;
    console.log("[hero] playing started", modeRef.current);
    
    let frame = 0;
    let lastTime = 0;
    const images = imagesRef.current;
    const totalFrames = images.length;
    if (totalFrames === 0) return;

    const fps = modeRef.current === "mobile" ? 20 : 24;
    const interval = 1000 / fps;

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const elapsed = time - lastTime;

      if (elapsed >= interval) {
        if (frame < totalFrames) {
          drawFrame(frame);
          if (process.env.NODE_ENV === "development") {
            // Only log every 10 frames to avoid console flood in prod build
            if (frame % 10 === 0) console.log("[hero] frame", frame + 1, images[frame].src);
          }
          frame++;
          lastTime = time - (elapsed % interval);
        }
      }

      if (frame < totalFrames) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        console.log("[hero] complete");
        setStatus("finished");
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [status, canvasSized, drawFrame, canPlay]);

  // Use frozen config for poster path too
  const posterPath = configRef.current 
    ? getFrameUrl(configRef.current.basePath, configRef.current.framePattern, 1)
    : getFrameUrl(ANIMATION_CONFIG.hero.desktop.basePath, ANIMATION_CONFIG.hero.desktop.framePattern, 1);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-[#030303]">
      {/* Fallback Poster — Only visible during INITIAL loading */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-700 z-10",
          status !== "loading" && canvasSized ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <NextImage
          src={posterPath}
          alt="Carrera Hero"
          fill
          priority
          className="object-cover brightness-[0.3]"
        />
      </div>

      {/* Canvas — Visible as soon as it's not loading */}
      {status !== "failed" && (
        <canvas
          ref={canvasRef}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-1000 z-0",
            status !== "loading" && canvasSized ? "opacity-100" : "opacity-0"
          )}
        />
      )}

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-transparent to-transparent opacity-40 z-20 pointer-events-none" />
    </div>
  );
}
