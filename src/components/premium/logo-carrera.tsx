import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
}

export function LogoCarrera({ className, variant = "default" }: LogoProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg
        viewBox="0 0 500 200"
        className={cn(
          "w-full h-auto",
          variant === "default" ? "text-white" : "text-foreground"
        )}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Porsche 911 Silhouette - High Fidelity Path approximation */}
        <path 
          d="M80,110 C80,110 120,60 220,55 C320,50 400,90 420,105 C430,112 470,115 480,117 L480,130 L400,130 C380,100 340,95 320,95 C300,95 280,105 260,130 L180,130 C160,100 120,95 100,95 C80,95 60,110 50,130 L20,130 L20,117 C30,115 70,112 80,110 Z" 
          fill="currentColor" 
          className="opacity-90"
        />
        <path 
          d="M450,115 C455,115 465,118 470,122 L455,122 Z" 
          fill="#D4AF37" 
        />
        
        {/* The "Carrera" Script Logotype - Approximate high-end script path */}
        <g transform="translate(40, 105) scale(1.1)">
          <path 
            d="M20,40 C10,40 5,30 5,20 C5,10 15,5 30,5 C45,5 55,15 55,25 C55,40 40,50 20,50 M60,45 C70,45 75,35 75,25 C75,15 70,10 60,10 C50,10 45,15 45,25 C45,35 50,45 60,45 M90,45 L110,10 M120,45 L140,10 M150,45 C160,45 165,35 165,25 M180,45 L200,25 M220,45 L240,25" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round"
            className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          />
          {/* Fallback stylized text if path is too abstract */}
          <text 
            x="5" 
            y="45" 
            className="font-serif italic text-6xl tracking-tighter" 
            fill="currentColor"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Carrera
          </text>
        </g>

        {/* The Golden Divider Bar */}
        <rect x="20" y="165" width="460" height="2" fill="url(#gold-gradient-logo)" />
        <defs>
          <linearGradient id="gold-gradient-logo" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* "IMPORTS" with extreme tracking */}
        <text 
          x="250" 
          y="190" 
          textAnchor="middle" 
          className="text-[22px] font-sans font-bold tracking-[1.2em] uppercase" 
          fill="currentColor"
          style={{ letterSpacing: '1.2em' }}
        >
          IMPORTS
        </text>
      </svg>
    </div>
  );
}
