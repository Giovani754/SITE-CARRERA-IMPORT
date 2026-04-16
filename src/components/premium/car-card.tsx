"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveRight, Gauge, Calendar, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarCardProps {
  vehicle: any;
  index: number;
}

export function CarCard({ vehicle, index }: CarCardProps) {
  if (!vehicle) return null;
  const mainImage = vehicle.images?.[0] || vehicle.image || "";
  const displayTags = vehicle.category ? [vehicle.category] : (vehicle.tags || []);

  return (
    <Link href={`/estoque/${vehicle.slug}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.1,
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
        viewport={{ once: true }}
        className="relative flex flex-col bg-[#080808] border-[0.5px] border-white/5 overflow-hidden rounded-sm hover:border-white/10 transition-colors duration-500"
      >
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={`${vehicle.brand} ${vehicle.model}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-white/5 flex items-center justify-center text-[10px] text-white/10 uppercase tracking-widest">
              Sem Imagem
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

          {/* Tags / Badges */}
          <div className="absolute top-6 left-6 flex flex-wrap gap-2">
            {vehicle.status !== "available" && (
              <span className="bg-white/10 backdrop-blur-md px-3 py-1 text-[8px] uppercase tracking-widest text-white/90 border border-white/10 rounded-[2px] font-bold">
                {vehicle.status === "sold" ? "Vendido" : "Reservado"}
              </span>
            )}
            {displayTags.slice(0, 2).map((tag: string) => (
              <span
                key={tag}
                className="bg-black/60 backdrop-blur-md px-3 py-1 text-[8px] uppercase tracking-widest text-white/70 border border-white/10 rounded-[2px]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Price Overlay */}
          <div className="absolute bottom-6 left-6">
            <span className="text-brand-gold text-lg font-sans font-medium tracking-tight">
              {vehicle.price}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 lg:p-10 flex flex-col">
          <div className="mb-6">
            <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/30 mb-2 block">
              {vehicle.brand}
            </span>
            <h3 className="text-xl font-serif italic tracking-tight text-white/90">
              {vehicle.model}
            </h3>
          </div>

          {/* Specs */}
          <div className="flex items-center gap-6 mb-8 pt-6 border-t border-white/5">
            <div className="flex items-center gap-2.5 text-white/30">
              <Calendar size={13} strokeWidth={1.5} />
              <span className="text-[10px] uppercase tracking-widest font-medium">
                {vehicle.year}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-white/30">
              <Gauge size={13} strokeWidth={1.5} />
              <span className="text-[10px] uppercase tracking-widest font-medium">
                {vehicle.mileage}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.4em] font-bold text-white/20 group-hover:text-brand-gold transition-all duration-500">
            Explorar Ativo
            <MoveRight
              size={14}
              className="transition-transform duration-500 group-hover:translate-x-2"
            />
          </div>
        </div>

        {/* Accent Line */}
        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-brand-gold group-hover:w-full transition-all duration-700" />
      </motion.div>
    </Link>
  );
}
