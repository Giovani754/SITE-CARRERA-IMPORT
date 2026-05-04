"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { getAnimationConfig, getFrameUrl } from "@/config/animations";

export function HomeHeroSequence({ canPlay = true }: { canPlay?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const playbackStartedRef = useRef(false);

  const [status, setStatus] = useState<"loading" | "playing" | "finished" | "failed">("loading");
  const [isMobile, setIsMobile] = useState(false);
  const [canvasSized, setCanvasSized] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  // 1. Detect Mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 2. Preload ALL Frames
  useEffect(() => {
    const config = getAnimationConfig("hero", isMobile);
    const { frameCount, basePath, framePattern } = config;
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;
    let failedCount = 0;

    console.log("hero starting load", { frameCount, basePath });

    const checkStatus = () => {
      setLoadedCount(loaded);
      
      if (loaded + failedCount >= frameCount) {
        const valid = imgs.filter((i) => i && i.complete && i.naturalWidth > 0);
        console.log("hero loaded frames", { loaded: valid.length, total: frameCount });
        
        if (valid.length >= frameCount * 0.9) { // High threshold for hero
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
  }, [isMobile]);

  // 3. Draw Frame helper
  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas || images.length === 0) return;

    // Use specific frame. If missing, don't jump to end.
    const img = images[idx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

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
  }, [isMobile]);

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
    console.log("hero playing started");
    
    let frame = 0;
    let lastTime = 0;
    const images = imagesRef.current;
    const totalFrames = images.length;
    if (totalFrames === 0) return;

    const fps = isMobile ? 18 : 22;
    const interval = 1000 / fps;

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const elapsed = time - lastTime;

      if (elapsed >= interval) {
        if (frame < totalFrames) {
          drawFrame(frame);
          console.log("hero frame", frame + 1);
          frame++;
          lastTime = time - (elapsed % interval);
        }
      }

      if (frame < totalFrames) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        console.log("hero complete");
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
  }, [status, canvasSized, isMobile, drawFrame, canPlay]);

  const posterPath = getFrameUrl(
    getAnimationConfig("hero", false).basePath,
    getAnimationConfig("hero", false).framePattern,
    1
  );

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
