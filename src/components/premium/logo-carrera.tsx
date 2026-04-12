import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function LogoCarrera({ className }: LogoProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg
        viewBox="0 0 400 120"
        className="h-10 w-auto text-brand-gold fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Porsche Silhouette - Minimalist Luxury Style */}
        <path d="M50,90 C50,90 100,50 200,50 C300,50 350,85 350,85 L350,90 L50,90 Z" 
              className="opacity-20" />
        <path d="M60,85 C90,60 180,45 280,55 C340,62 360,85 360,85" 
              fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M300,56 C315,58 335,68 345,82" 
              fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
        <circle cx="95" cy="85" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="310" cy="85" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      
      {/* Brand Text */}
      <div className="flex flex-col items-center -mt-2">
        <span className="font-serif text-3xl tracking-widest italic leading-none">
          Carrera
        </span>
        <span className="text-[10px] tracking-[0.4em] font-sans font-medium opacity-80 mt-1 uppercase">
          Imports
        </span>
      </div>
    </div>
  );
}
