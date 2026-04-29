import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function LogoCarrera({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Image
        src="/logo-carrera-imports.png"
        alt="Carrera Imports"
        width={240}
        height={64}
        className="h-14 lg:h-16 object-contain"
        style={{ width: "auto", height: "auto", maxHeight: "64px", minHeight: "56px" }}
        priority
      />
    </div>
  );
}
