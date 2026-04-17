"use client";

import { Star, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { updateVehicleStatus, toggleVehicleFeatured } from "./actions";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function StatusQuickAction({ id, currentStatus }: { id: string; currentStatus: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async (newStatus: 'available' | 'sold' | 'reserved') => {
    setIsLoading(true);
    await updateVehicleStatus(id, newStatus);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center gap-1.5 p-1 bg-white/[0.02] border border-white/5 rounded-sm">
      <button
        onClick={() => handleStatusChange('available')}
        className={cn(
          "p-1.5 rounded-[2px] transition-all",
          currentStatus === 'available' ? "bg-green-500/10 text-green-500" : "text-white/10 hover:text-white/40"
        )}
        title="Marcar como Disponível"
      >
        <CheckCircle size={12} />
      </button>
      <button
        onClick={() => handleStatusChange('reserved')}
        className={cn(
          "p-1.5 rounded-[2px] transition-all",
          currentStatus === 'reserved' ? "bg-orange-500/10 text-orange-500" : "text-white/10 hover:text-white/40"
        )}
        title="Marcar como Reservado"
      >
        <Clock size={12} />
      </button>
      <button
        onClick={() => handleStatusChange('sold')}
        className={cn(
          "p-1.5 rounded-[2px] transition-all",
          currentStatus === 'sold' ? "bg-white/10 text-white/60" : "text-white/10 hover:text-white/40"
        )}
        title="Marcar como Vendido"
      >
        <TrendingUp size={12} />
      </button>
    </div>
  );
}

export function FeaturedQuickAction({ id, isFeatured }: { id: string; isFeatured: boolean }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    await toggleVehicleFeatured(id, isFeatured);
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "p-2 rounded-full transition-all",
        isFeatured ? "text-brand-gold bg-brand-gold/10" : "text-white/10 hover:text-white/30"
      )}
      title={isFeatured ? "Remover Destaque" : "Destacar na Home"}
    >
      <Star size={14} fill={isFeatured ? "currentColor" : "none"} />
    </button>
  );
}
