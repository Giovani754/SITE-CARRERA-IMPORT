"use client";

import { usePathname } from "next/navigation";
import { User, Bell, Search } from "lucide-react";

export function AdminHeader({ userEmail }: { userEmail?: string | null }) {
  const pathname = usePathname();
  
  // Get page title from pathname
  const getTitle = (path: string) => {
    if (path.includes("/veiculos")) return "Gestão de Veículos";
    if (path.includes("/usuarios")) return "Gestão de Equipe";
    if (path.includes("/dashboard")) return "Dashboard Executivo";
    return "Administrativo";
  };

  return (
    <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#030303] sticky top-0 z-40">
      <div>
        <h1 className="text-sm uppercase tracking-[0.4em] font-bold text-white/90">
          {getTitle(pathname)}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center bg-white/5 border border-white/5 rounded-sm px-4 py-2 gap-3 group focus-within:border-brand-gold/30 transition-all">
          <Search size={14} className="text-white/20 group-focus-within:text-brand-gold/50" />
          <input 
            type="text" 
            placeholder="Pesquisar..." 
            className="bg-transparent border-none outline-none text-xs text-white/60 placeholder:text-white/10 w-40"
          />
        </div>

        <button className="w-10 h-10 flex items-center justify-center text-white/20 hover:text-white transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-brand-gold rounded-full"></span>
        </button>

        <div className="h-8 w-[1px] bg-white/5 mx-2"></div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/80">Admin</p>
            <p className="text-[9px] text-white/30 truncate max-w-[120px]">{userEmail}</p>
          </div>
          <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold/60">
            <User size={18} />
          </div>
        </div>
      </div>
    </header>
  );
}
