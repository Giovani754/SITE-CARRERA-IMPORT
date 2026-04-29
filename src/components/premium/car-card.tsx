"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { cn, formatPrice, formatMileage } from "@/lib/utils";
import { CategoryTag } from "./category-tag";

import { Vehicle } from "@/data/vehicles";

interface CarCardProps {
  vehicle: Vehicle;
  index: number;
}

export function CarCard({ vehicle, index }: CarCardProps) {
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (!vehicle) return null;
  const mainImage = vehicle.images?.[0] || vehicle.image || "";

  // Format price using utility
  const priceDisplay = formatPrice(vehicle.price);
  const isConsultation = priceDisplay === "Sob Consulta";
  
  // Trust Seals
  const trustSeals = vehicle.highlights?.filter((h: string) => 
    h.toLowerCase().includes("laudo") || 
    h.toLowerCase().includes("procedência") || 
    h.toLowerCase().includes("revisões") ||
    h.toLowerCase().includes("único dono") ||
    h.toLowerCase().includes("blindagem") ||
    h.toLowerCase().includes("garantia")
  ).slice(0, 2) || [];

  const finalSeals = trustSeals.length > 0 ? trustSeals : (vehicle.highlights?.slice(0, 2) || ["Procedência verificada", "Laudo aprovado"]);

  return (
    <Link href={`/estoque/${vehicle.slug}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: isMobile ? "-20px" : "-50px" }}
        transition={{
          duration: 0.8,
          delay: isMobile ? 0.05 : index * 0.08,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={cn(
            "relative flex flex-col bg-[#080808] border-[0.5px] border-white/5 overflow-hidden rounded-sm transition-all duration-700 shadow-2xl",
            "hover:border-brand-gold/30 hover:shadow-brand-gold/[0.03]",
            !isMobile && "group-hover:-translate-y-2"
        )}
      >
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {mainImage ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full"
            >
              <Image
                src={mainImage}
                alt={`${vehicle.brand} ${vehicle.model}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                className="object-cover brightness-[0.85] group-hover:brightness-100 transition-all duration-1000"
                quality={75}
              />
            </motion.div>
          ) : (
            <div className="w-full h-full bg-white/5 flex items-center justify-center text-[10px] text-white/10 uppercase tracking-widest">
              Sem Imagem
            </div>
          )}
          
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />

          {/* Top Tag */}
          <div className="absolute top-5 left-5">
            <CategoryTag 
              category={vehicle.category} 
              blindagem={vehicle.blindagem} 
            />
          </div>
          
          {/* Status Overlay (Sold/Reserved) */}
          {vehicle.status !== "available" && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-10">
              <span className="bg-brand-gold text-black px-6 py-2 text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl">
                {vehicle.status === "sold" ? "Vendido" : "Reservado"}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-7 lg:p-10 flex flex-col">
          {/* Price */}
          <div className="mb-5">
            <span className={cn(
              "text-xl lg:text-2xl font-serif italic tracking-tight block transition-colors duration-500",
              isConsultation ? "text-white/30" : "text-brand-gold"
            )}>
              {priceDisplay}
            </span>
          </div>

          {/* Brand & Model */}
          <div className="mb-6">
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/20 mb-2.5 block group-hover:text-brand-gold/40 transition-colors">
              {vehicle.brand.toUpperCase()}
            </span>
            <h3 className="text-xl lg:text-2xl font-serif italic tracking-tight text-white/90 leading-tight group-hover:text-white transition-colors duration-500">
              {vehicle.model}
            </h3>
          </div>

          {/* Info Quick (Year · KM) */}
          <div className="flex items-center gap-4 mb-8 text-white/40 font-sans text-xs font-light">
            <span>{vehicle.year}</span>
            <span className="text-white/10">·</span>
            <span>{formatMileage(vehicle.mileage)}</span>
          </div>


          {/* Trust Seals */}
          <div className="flex flex-col gap-3 mb-10 pt-8 border-t border-white/5">
            {[...new Set(finalSeals as string[])].map((seal, idx) => (
              <div key={`${seal}-${idx}`} className="flex items-center gap-3 text-[10px] text-white/40 group-hover:text-white/60 transition-colors">
                <div className="w-1.5 h-1.5 bg-brand-gold/30 rounded-full" />
                <span className="truncate">{seal}</span>
              </div>
            ))}
          </div>


          {/* CTA */}
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.4em] font-bold text-white/20 group-hover:text-brand-gold transition-all duration-700 mt-auto">
            <span>{isConsultation ? "Consultar Disponibilidade" : "Ver Detalhes"}</span>
            <div className="flex items-center">
              <div className="h-[0.5px] w-0 bg-brand-gold transition-all duration-700 group-hover:w-8 mr-4" />
              <MoveRight
                size={14}
                className="transition-transform duration-700 group-hover:translate-x-1"
              />
            </div>
          </div>
        </div>

        {/* Accent Line */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-brand-gold to-transparent group-hover:w-full transition-all duration-1000" />
      </motion.div>
    </Link>
  );
}
