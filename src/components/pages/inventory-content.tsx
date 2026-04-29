"use client";

import React, { useState, useMemo } from "react";
import { Breadcrumb } from "@/components/premium/breadcrumb";
import { PageHero } from "@/components/premium/page-hero";
import { CarCard } from "@/components/premium/car-card";
import { Search, ChevronDown, X } from "lucide-react";
import { cn, parsePrice } from "@/lib/utils";

import { Vehicle } from "@/data/vehicles";

interface InventoryContentProps {
  vehicles: Vehicle[];
}

export default function InventoryContent({ vehicles }: InventoryContentProps) {
  const [activeBrand, setActiveBrand] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  
  // New range-based filters
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [armorStatus, setArmorStatus] = useState("Todos"); // "Todos", "Com Blindagem", "Sem Blindagem"

  const brands = useMemo(() => {
    if (!vehicles) return ["Todos"];
    const unique = [...new Set(vehicles.map((v) => v.brand?.trim().toUpperCase()))].filter(Boolean);
    return ["Todos", ...unique.sort((a, b) => a.localeCompare(b))];
  }, [vehicles]);


  const filteredVehicles = useMemo(() => {
    if (!vehicles) return [];
    return vehicles.filter((v) => {
      // 1. Brand Filter
      const matchesBrand = activeBrand === "Todos" || v.brand?.trim().toUpperCase() === activeBrand;
      
      // 2. Year Range Filter
      const year = Number(v.year);
      const minYearNum = minYear ? Number(minYear) : 0;
      const maxYearNum = maxYear ? Number(maxYear) : 9999;
      const matchesYear = year >= minYearNum && year <= maxYearNum;

      // 3. Armor Filter (Simplified)
      const isBlindado = !!v.blindagem && v.blindagem !== "Nao" && v.blindagem !== "Não" && v.blindagem.toLowerCase() !== "sem blindagem";
      const matchesArmor = 
        armorStatus === "Todos" || 
        (armorStatus === "Com Blindagem" && isBlindado) || 
        (armorStatus === "Sem Blindagem" && !isBlindado);

      // 4. Search Filter
      const matchesSearch =
        searchQuery === "" ||
        [
          v.brand,
          v.model,
          v.version,
          v.category,
          v.city,
          v.blindagem,
          v.status,
          String(v.price),
          String(v.year)
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
          
      // 5. Price Range Filter
      const priceNum = parsePrice(v.price);
      const minPriceNum = minPrice ? Number(minPrice.replace(/\D/g, "")) : 0;
      const maxPriceNum = maxPrice ? Number(maxPrice.replace(/\D/g, "")) : Infinity;
      const matchesPrice = priceNum >= minPriceNum && priceNum <= (maxPriceNum || Infinity);

      return matchesBrand && matchesYear && matchesArmor && matchesSearch && matchesPrice;
    });
  }, [activeBrand, armorStatus, minYear, maxYear, searchQuery, minPrice, maxPrice, vehicles]);

  const clearFilters = () => {
    setActiveBrand("Todos");
    setArmorStatus("Todos");
    setMinYear("");
    setMaxYear("");
    setMinPrice("");
    setMaxPrice("");
    setSearchQuery("");
  };

  const hasActiveFilters = 
    activeBrand !== "Todos" || 
    armorStatus !== "Todos" || 
    minYear !== "" || 
    maxYear !== "" || 
    minPrice !== "" || 
    maxPrice !== "" || 
    searchQuery !== "";

  return (
    <>
      <PageHero
        eyebrow="ACERVO CARRERA IMPORTS"
        title="Curadoria de veículos premium selecionados para quem exige o extraordinário."
        description="Cada ativo do nosso acervo passa por uma rigorosa análise de procedência, histórico e conservação. Aqui, a exclusividade não é um detalhe, é a nossa premissa fundamental."
        backgroundImage="https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1920&auto=format&fit=crop"
        backgroundAlt="Veículo premium em exposição - Carrera Imports"
        accentPosition="left"
      />

      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ name: "Estoque", href: "/estoque" }]} />

          {/* Premium Boutique Filter Interface */}
          <div className="mt-16 mb-20 relative z-30">
            <div className="flex flex-col gap-6">
              
              {/* Main Control Bar */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/5 bg-[#0a0a0a] rounded-sm overflow-hidden shadow-2xl">
                
                {/* Search - 5 cols */}
                <div className="lg:col-span-5 relative group border-b lg:border-b-0 lg:border-r border-white/5">
                  <Search size={16} className="absolute left-8 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-gold transition-all duration-500" />
                  <input
                    type="text"
                    placeholder="BUSCAR NO ACERVO... (MARCA, MODELO, ANO)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent py-8 pl-16 pr-8 text-[11px] uppercase tracking-[0.4em] font-bold text-white placeholder:text-white/10 focus:outline-none focus:bg-white/[0.01] transition-all"
                  />
                </div>

                {/* Brand - 4 cols */}
                <div className="lg:col-span-4 relative border-b lg:border-b-0 lg:border-r border-white/5">
                  <select
                    value={activeBrand}
                    onChange={(e) => setActiveBrand(e.target.value)}
                    className="w-full bg-transparent py-8 px-10 text-[11px] uppercase tracking-[0.4em] font-bold text-white/70 appearance-none cursor-pointer hover:text-white transition-all focus:outline-none"
                  >
                    <option value="Todos">MARCAS (TODAS)</option>
                    {brands.filter(b => b !== "Todos").map(b => (
                      <option key={b} value={b} className="bg-[#0a0a0a]">{b.toUpperCase()}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-8 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                </div>

                {/* Armor Toggle - 3 cols */}
                <div className="lg:col-span-3 flex items-center justify-center p-2 bg-white/[0.02]">
                  <div className="flex bg-black p-1 rounded-sm border border-white/5 w-full max-w-[240px]">
                    {[
                      { id: "Todos", label: "TUDO" },
                      { id: "Com Blindagem", label: "BLINDADOS" },
                      { id: "Sem Blindagem", label: "SEM" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setArmorStatus(opt.id)}
                        className={cn(
                          "flex-1 py-3 text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-500",
                          armorStatus === opt.id 
                            ? "bg-brand-gold text-black shadow-lg" 
                            : "text-white/30 hover:text-white/60"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Advanced Range Bar */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Year Range */}
                <div className="lg:col-span-3 flex items-center gap-4 bg-[#0a0a0a] border border-white/5 rounded-sm px-6 py-2">
                  <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/20 whitespace-nowrap">ANO:</span>
                  <input
                    type="number"
                    placeholder="DE"
                    value={minYear}
                    onChange={(e) => setMinYear(e.target.value)}
                    className="w-full bg-transparent py-3 text-[10px] font-bold text-white focus:outline-none text-center border-b border-transparent focus:border-brand-gold/30 transition-all"
                  />
                  <div className="w-4 h-[1px] bg-white/10 shrink-0" />
                  <input
                    type="number"
                    placeholder="ATÉ"
                    value={maxYear}
                    onChange={(e) => setMaxYear(e.target.value)}
                    className="w-full bg-transparent py-3 text-[10px] font-bold text-white focus:outline-none text-center border-b border-transparent focus:border-brand-gold/30 transition-all"
                  />
                </div>

                {/* Price Range */}
                <div className="lg:col-span-5 flex items-center gap-4 bg-[#0a0a0a] border border-white/5 rounded-sm px-8 py-2">
                  <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/20 whitespace-nowrap">INVESTIMENTO (R$):</span>
                  <input
                    type="text"
                    placeholder="MÍNIMO"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full bg-transparent py-3 text-[10px] font-bold text-white focus:outline-none text-center border-b border-transparent focus:border-brand-gold/30 transition-all"
                  />
                  <div className="w-4 h-[1px] bg-white/10 shrink-0" />
                  <input
                    type="text"
                    placeholder="MÁXIMO"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full bg-transparent py-3 text-[10px] font-bold text-white focus:outline-none text-center border-b border-transparent focus:border-brand-gold/30 transition-all"
                  />
                </div>

                {/* Info & Clear - 4 cols */}
                <div className="lg:col-span-4 flex items-center justify-between lg:justify-end gap-10">
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/10">Catálogo Atualizado</span>
                    <span className="text-[12px] font-serif italic text-white/50">{filteredVehicles.length} veículos encontrados</span>
                  </div>
                  
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="group flex items-center gap-3 text-[9px] uppercase tracking-[0.4em] font-bold text-brand-gold hover:text-white transition-all duration-500 py-4 px-8 border border-brand-gold/20 rounded-sm hover:bg-brand-gold/5"
                    >
                      <X size={12} className="group-hover:rotate-90 transition-transform duration-500" />
                      LIMPAR
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>



          {/* Inventory Grid */}
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
              {filteredVehicles.map((vehicle, idx) => (
                <CarCard key={vehicle.id} vehicle={vehicle} index={idx} />
              ))}
            </div>
          ) : (
            <div className="text-center py-40 bg-[#080808] border border-white/5 rounded-sm">
              <span className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold mb-8 block">
                Nenhum ativo encontrado
              </span>
              <button
                onClick={clearFilters}
                className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold hover:text-white transition-colors underline underline-offset-8"
              >
                Resetar Filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Local SEO Text Section */}
      <section className="py-32 px-6 lg:px-12 bg-[#050505] border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center text-center lg:text-left">
          <div className="lg:w-1/2">
            <span className="text-brand-gold text-[10px] uppercase tracking-[0.8em] font-bold mb-10 block opacity-50">
              PRESENÇA SÃO PAULO
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif italic mb-10 leading-[1.1] tracking-tight text-white/95">
              O estoque certo não começa na vitrine.
            </h2>
            <p className="text-white/60 text-[15px] lg:text-base font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              Antes de um veículo entrar no acervo, ele passa por análise, validação e posicionamento. Trabalhamos com uma rede selecionada em São Paulo para apresentar carros com origem clara, preço coerente e negociação conduzida sem ruído.
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              {[
                { label: "PROCEDÊNCIA", value: "Histórico verificado" },
                { label: "MERCADO", value: "Preço com leitura real" },
                { label: "NEGOCIAÇÃO", value: "Tratativa conduzida com critério" },
                { label: "POSICIONAMENTO", value: "Seleção por perfil e oportunidade" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-10 border border-white/5 bg-[#080808] rounded-sm group hover:border-brand-gold/20 transition-all duration-700 hover:shadow-2xl hover:shadow-brand-gold/[0.01]"
                >
                  <span className="text-brand-gold text-[9px] uppercase tracking-[0.5em] font-bold block mb-4 opacity-40 group-hover:opacity-100 transition-opacity">
                    {item.label}
                  </span>
                  <span className="text-white/80 text-sm md:text-base font-serif italic group-hover:text-white transition-colors leading-tight block">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
