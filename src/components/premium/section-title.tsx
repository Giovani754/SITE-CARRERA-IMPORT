import React from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
  className?: string;
}

export function SectionTitle({ 
  title, 
  subtitle, 
  alignment = "center",
  className 
}: SectionTitleProps) {
  return (
    <div className={cn(
      "mb-16 lg:mb-24",
      alignment === "center" ? "text-center" : "text-left",
      className
    )}>
      {subtitle && (
        <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif italic tracking-tight leading-tight">
        {title}
      </h2>
      <div className={cn(
        "h-[1px] bg-white/10 mt-8 relative overflow-hidden",
        alignment === "center" ? "mx-auto w-32" : "w-16"
      )}>
        <div className="absolute top-0 left-0 w-1/3 h-full bg-brand-gold" />
      </div>
    </div>
  );
}
