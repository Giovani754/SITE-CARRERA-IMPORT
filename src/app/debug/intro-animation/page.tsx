"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { getAnimationConfig, getFrameUrl } from "@/config/animations";

export default function IntroAnimationDebugPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const [status, setStatus] = useState<"loading" | "playing" | "complete" | "error">("loading");
  const [frameCount, setFrameCount] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [firstPath, setFirstPath] = useState("");
  const [lastPath, setLastPath] = useState("");
  const [errorUrl, setErrorUrl] = useState("");
  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });
  const [avgTimePerFrame, setAvgTimePerFrame] = useState(0);

  const config = getAnimationConfig("logo", false); // Force desktop for debug
  const { frameCount: totalFrames, basePath, framePattern } = config;

  // ─── Setup and Load ───
  useEffect(() => {
    setFrameCount(totalFrames);
    setFirstPath(getFrameUrl(basePath, framePattern, 1));
    setLastPath(getFrameUrl(basePath, framePattern, totalFrames));

    let loaded = 0;
    const imgs: HTMLImageElement[] = [];

    const checkDone = () => {
      if (loaded === totalFrames) {
        imagesRef.current = imgs;
        setStatus("playing");
        startAnimation();
      }
    };

    for (let i = 1; i <= totalFrames; i++) {
      const img = new window.Image();
      const url = getFrameUrl(basePath, framePattern, i);
      img.src = url;
      img.onload = () => {
        imgs[i - 1] = img;
        loaded++;
        setLoadedCount(loaded);
        checkDone();
      };
      img.onerror = () => {
        setStatus("error");
        setErrorUrl(url);
      };
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ─── Animation Logic ───
  const startAnimation = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    
    let frame = 0;
    let lastTime = 0;
    let frameTimes: number[] = [];
    const fps = 22;
    const interval = 1000 / fps;

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const elapsed = time - lastTime;

      if (elapsed >= interval) {
        const frameStart = performance.now();
        draw(frame);
        const frameEnd = performance.now();
        frameTimes.push(frameEnd - frameStart);
        
        setCurrentFrame(frame + 1);
        frame++;
        lastTime = time - (elapsed % interval);
        
        // Update avg time every 5 frames
        if (frame % 5 === 0) {
          const avg = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
          setAvgTimePerFrame(Number(avg.toFixed(2)));
        }
      }

      if (frame < imagesRef.current.length) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setStatus("complete");
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const draw = (idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas || imagesRef.current.length === 0) return;

    const img = imagesRef.current[idx];
    if (!img) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Sizing logic (CONTAIN for logo)
    const { width: cw, height: ch } = canvas;
    const { naturalWidth: iw, naturalHeight: ih } = img;
    const canvasAspect = cw / ch;
    const imageAspect = iw / ih;

    let dw: number, dh: number, dx: number, dy: number;

    if (canvasAspect > imageAspect) {
      dh = ch * 0.85; // 85% of screen height
      dw = dh * imageAspect;
    } else {
      dw = cw * 0.85; // 85% of screen width
      dh = dw / imageAspect;
    }
    dx = (cw - dw) / 2;
    dy = (ch - dh) / 2;

    ctx.fillStyle = "#030303";
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  // ─── Responsive Resize ───
  useEffect(() => {
    const updateSize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      setCanvasSize({ w: Math.round(canvas.width), h: Math.round(canvas.height) });
      
      if (imagesRef.current.length > 0 && status !== "loading") {
        draw(currentFrame === 0 ? 0 : currentFrame - 1);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [currentFrame, status]);

  const handleRestart = () => {
    setCurrentFrame(0);
    setStatus("playing");
    setAvgTimePerFrame(0);
    startAnimation();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-white font-sans p-8">
      <div className="mb-8 border-b border-white/10 pb-4">
        <h1 className="text-2xl font-serif italic text-brand-gold mb-2">Intro Animation Debug (Logo)</h1>
        <p className="text-white/40 text-sm">Testing: public/animations/logo/desktop/</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        {/* Debug Panel */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-6 h-fit">
          <div className="space-y-4">
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">Status Info</h2>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <span className="text-white/40">Status:</span>
              <span className={status === "error" ? "text-red-500" : "text-brand-gold uppercase tracking-widest"}>
                {status}
              </span>
              
              <span className="text-white/40">Total Config:</span>
              <span>{frameCount}</span>
              
              <span className="text-white/40">Loaded:</span>
              <span className={loadedCount === frameCount ? "text-green-500" : "text-white"}>
                {loadedCount} / {frameCount}
              </span>
              
              <span className="text-white/40">Current Frame:</span>
              <span className="text-xl font-serif italic text-brand-gold">{currentFrame}</span>

              <span className="text-white/40">Canvas Size:</span>
              <span className="text-[10px]">{canvasSize.w} x {canvasSize.h}</span>

              <span className="text-white/40">Avg Draw Time:</span>
              <span className="text-brand-gold">{avgTimePerFrame} ms</span>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">Path Debug</h2>
            <div className="space-y-2 text-[10px] break-all font-mono">
              <div>
                <span className="text-white/20 block mb-1 uppercase tracking-tighter text-[8px]">First Path:</span>
                <span className="text-white/60">{firstPath}</span>
              </div>
              <div>
                <span className="text-white/20 block mb-1 uppercase tracking-tighter text-[8px]">Last Path:</span>
                <span className="text-white/60">{lastPath}</span>
              </div>
              {status === "error" && (
                <div className="bg-red-500/10 border border-red-500/20 p-2 mt-2">
                  <span className="text-red-500 block mb-1 font-bold">Error URL:</span>
                  <span className="text-red-400">{errorUrl}</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleRestart}
            disabled={status === "loading"}
            className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] uppercase tracking-[0.3em] font-bold transition-all disabled:opacity-50"
          >
            Reiniciar Intro
          </button>
        </div>

        {/* Canvas Area */}
        <div 
          ref={containerRef} 
          className="lg:col-span-2 relative aspect-video bg-black border border-white/5 overflow-hidden flex items-center justify-center"
        >
          {status === "loading" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-black">
              <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden rounded-full">
                <div 
                  className="absolute top-0 left-0 h-full bg-brand-gold transition-all duration-300"
                  style={{ width: `${(loadedCount / frameCount) * 100}%` }}
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/20">Carregando Intro...</span>
            </div>
          )}
          <canvas ref={canvasRef} className="max-w-full max-h-full object-contain" />
        </div>
      </div>
    </div>
  );
}
