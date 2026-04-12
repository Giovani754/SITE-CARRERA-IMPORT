"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveRight, Gauge, Calendar, Zap } from "lucide-react";
import { Vehicle } from "@/data/vehicles";
import { cn } from "@/lib/utils";

interface CarCardProps {
  vehicle: Vehicle;
  index: number;
}

export function CarCard({ vehicle, index }: CarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-surface-base border border-white/5 overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-4 py-2 border border-white/10">
          <span className="text-brand-gold text-xs font-bold tracking-widest">{vehicle.price}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-6">
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-brand-gold mb-1 block">
            {vehicle.brand}
          </span>
          <h3 className="text-xl font-serif italic tracking-tight">{vehicle.model}</h3>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar size={14} className="text-white/20" />
            <span className="text-[11px] uppercase tracking-wider">{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Gauge size={14} className="text-white/20" />
            <span className="text-[11px] uppercase tracking-wider">{vehicle.mileage}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Zap size={14} className="text-white/20" />
            <span className="text-[11px] uppercase tracking-wider">{vehicle.transmission}</span>
          </div>
        </div>

        <div className="mt-auto">
          <Link
            href={`/estoque/${vehicle.slug}`}
            className="flex items-center justify-between w-full text-[10px] uppercase tracking-[0.3em] font-bold py-4 border-t border-white/5 group-hover:text-brand-gold transition-colors"
          >
            Ver Detalhes
            <MoveRight size={16} className="transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </div>

      {/* Hover Line */}
      <div className="absolute top-0 left-0 w-[2px] h-0 bg-brand-gold transition-all duration-700 group-hover:h-full" />
    </motion.div>
  );
}
