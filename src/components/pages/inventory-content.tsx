"use client";

import React, { useState, useMemo } from "react";
import { Breadcrumb } from "@/components/premium/breadcrumb";
import { PageHero } from "@/components/premium/page-hero";
import { CarCard } from "@/components/premium/car-card";
import { Search, ChevronDown, X } from "lucide-react";

interface InventoryContentProps {
  vehicles: any[];
}

export default function InventoryContent({ vehicles }: InventoryContentProps) {
  const [activeBrand, setActiveBrand] = useState("Todos");
  const [activeBlindagem, setActiveBlindagem] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("Todos");
  const [activeYear, setActiveYear] = useState("Todos");

  const brands = useMemo(() => {
    if (!vehicles) return ["Todos"];
    const unique = [...new Set(vehicles.map((v) => v.brand))].filter(Boolean);
    return ["Todos", ...unique.sort()];
  }, [vehicles]);

  const armors = useMemo(() => {
    if (!vehicles) return ["Todos"];
    const unique = [...new Set(vehicles.map((v) => v.blindagem))].filter(Boolean);
    return ["Todos", "Blindados", "Não Blindados", ...unique];
  }, [vehicles]);

  const years = useMemo(() => {
    if (!vehicles) return ["Todos"];
    const unique = [...new Set(vehicles.map((v) => v.year))].filter(Boolean);
    return ["Todos", ...unique.sort((a, b) => b - a)];
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    if (!vehicles) return [];
    return vehicles.filter((v) => {
      const matchesBrand = activeBrand === "Todos" || v.brand === activeBrand;
      const matchesYear = activeYear === "Todos" || v.year.toString() === activeYear;
      
      const isBlindado = !!v.blindagem;
      const matchesArmor = 
        activeBlindagem === "Todos" || 
        (activeBlindagem === "Blindados" && isBlindado) || 
        (activeBlindagem === "Não Blindados" && !isBlindado) ||
        v.blindagem === activeBlindagem;

      const matchesSearch =
        searchQuery === "" ||
        `${v.brand} ${v.model}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
          
      // Price range logic (simplified for demonstration)
      let matchesPrice = true;
      if (priceRange !== "Todos") {
        const priceNum = parseInt(v.price.replace(/\D/g, ""));
        if (priceRange === "Abaixo de 500k") matchesPrice = priceNum < 500000;
        else if (priceRange === "500k - 1M") matchesPrice = priceNum >= 500000 && priceNum <= 1000000;
        else if (priceRange === "Acima de 1M") matchesPrice = priceNum > 1000000;
      }

      return matchesBrand && matchesYear && matchesArmor && matchesSearch && matchesPrice;
    });
  }, [activeBrand, activeArmor, activeYear, searchQuery, priceRange, vehicles]);

  const clearFilters = () => {
    setActiveBrand("Todos");
    setActiveBlindagem("Todos");
    setActiveYear("Todos");
    setPriceRange("Todos");
    setSearchQuery("");
  };

  const hasActiveFilters = activeBrand !== "Todos" || activeBlindagem !== "Todos" || activeYear !== "Todos" || priceRange !== "Todos" || searchQuery !== "";

  return (
    <>
      <PageHero
        eyebrow="ACERVO CARRERA IMPORTS"
        title="Veículos premium selecionados antes de chegarem até você."
        description="Cada modelo do acervo passa por análise de histórico, conservação, documentação e coerência de mercado. Aqui, o carro bonito precisa provar que também é uma boa escolha."
        backgroundImage="https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1920&auto=format&fit=crop"
        backgroundAlt="Veículo premium em exposição - Carrera Imports"
        accentPosition="left"
      />

      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ name: "Estoque", href: "/estoque" }]} />

          {/* New Compact Filter Bar */}
          <div className="mt-12 mb-16 relative z-30">
            <div className="flex flex-col lg:flex-row items-center border border-white/5 bg-[#080808] rounded-sm divide-y lg:divide-y-0 lg:divide-x divide-white/5">
              
              {/* Search */}
              <div className="w-full lg:w-1/4 relative group">
                <Search size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-gold transition-colors" />
                <input
                  type="text"
                  placeholder="BUSCAR MODELO..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent py-6 pl-14 pr-6 text-[10px] uppercase tracking-[0.3em] font-bold focus:outline-none focus:bg-white/[0.01] transition-all"
                />
              </div>

              {/* Brand Select */}
              <div className="w-full lg:w-1/6 relative">
                <select
                  value={activeBrand}
                  onChange={(e) => setActiveBrand(e.target.value)}
                  className="w-full bg-transparent py-6 px-8 text-[10px] uppercase tracking-[0.3em] font-bold focus:outline-none appearance-none cursor-pointer hover:bg-white/[0.01]"
                >
                  <option value="Todos">MARCA</option>
                  {brands.filter(b => b !== "Todos").map(b => (
                    <option key={b} value={b} className="bg-[#0a0a0a]">{b}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
              </div>

              {/* Year Select */}
              <div className="w-full lg:w-1/6 relative">
                <select
                  value={activeYear}
                  onChange={(e) => setActiveYear(e.target.value)}
                  className="w-full bg-transparent py-6 px-8 text-[10px] uppercase tracking-[0.3em] font-bold focus:outline-none appearance-none cursor-pointer hover:bg-white/[0.01]"
                >
                  <option value="Todos">ANO</option>
                  {years.filter(y => y !== "Todos").map(y => (
                    <option key={y} value={y.toString()} className="bg-[#0a0a0a]">{y}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
              </div>

              {/* Price Select */}
              <div className="w-full lg:w-1/6 relative">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full bg-transparent py-6 px-8 text-[10px] uppercase tracking-[0.3em] font-bold focus:outline-none appearance-none cursor-pointer hover:bg-white/[0.01]"
                >
                  <option value="Todos">VALOR</option>
                  <option value="Abaixo de 500k" className="bg-[#0a0a0a]">Até 500k</option>
                  <option value="500k - 1M" className="bg-[#0a0a0a]">500k - 1M</option>
                  <option value="Acima de 1M" className="bg-[#0a0a0a]">Acima de 1M</option>
                </select>
                <ChevronDown size={12} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
              </div>

              {/* Armor Select */}
              <div className="w-full lg:w-1/6 relative">
                <select
                  value={activeBlindagem}
                  onChange={(e) => setActiveBlindagem(e.target.value)}
                  className="w-full bg-transparent py-6 px-8 text-[10px] uppercase tracking-[0.3em] font-bold focus:outline-none appearance-none cursor-pointer hover:bg-white/[0.01]"
                >
                  <option value="Todos">BLINDAGEM</option>
                  <option value="Blindados" className="bg-[#0a0a0a]">Blindados</option>
                  <option value="Não Blindados" className="bg-[#0a0a0a]">Sem Blindagem</option>
                </select>
                <ChevronDown size={12} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
              </div>

              {/* Clear Action */}
              <div className="w-full lg:flex-1 flex items-center justify-center p-4">
                {hasActiveFilters ? (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] font-bold text-brand-gold hover:text-white transition-colors py-2 px-4"
                  >
                    <X size={12} />
                    Limpar
                  </button>
                ) : (
                  <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/10">
                    {filteredVehicles.length} un.
                  </span>
                )}
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
