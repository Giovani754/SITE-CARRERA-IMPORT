"use client";

import React, { useState, useMemo } from "react";
import { Breadcrumb } from "@/components/premium/breadcrumb";
import { PageHero } from "@/components/premium/page-hero";
import { CarCard } from "@/components/premium/car-card";
import { SITE_CONFIG } from "@/data/constants";
import { Search, MessageCircle } from "lucide-react";
import Link from "next/link";

interface InventoryContentProps {
  vehicles: any[];
}

export default function InventoryContent({ vehicles }: InventoryContentProps) {
  const [activeBrand, setActiveBrand] = useState("Todos");
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");

  const brands = useMemo(() => {
    if (!vehicles) return ["Todos"];
    const unique = [...new Set(vehicles.map((v) => v.brand))].filter(Boolean);
    return ["Todos", ...unique];
  }, [vehicles]);

  const allCategories = useMemo(() => {
    if (!vehicles) return ["Todas"];
    const cats = new Set<string>();
    vehicles.forEach((v) => {
      if (v.category) cats.add(v.category);
    });
    return ["Todas", ...Array.from(cats)];
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    if (!vehicles) return [];
    return vehicles.filter((v) => {
      const matchesBrand =
        activeBrand === "Todos" || v.brand === activeBrand;
      const matchesCategory =
        activeCategory === "Todas" || v.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        `${v.brand} ${v.model}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      return matchesBrand && matchesCategory && matchesSearch;
    });
  }, [activeBrand, activeCategory, searchQuery, vehicles]);

  return (
    <>
      <PageHero
        eyebrow="Acervo Carrera Imports"
        title="O mercado premium de São Paulo em sua melhor curadoria."
        description="Nossa consultoria em São Paulo seleciona apenas veículos com procedência rigorosa, histórico verificado e laudo aprovado. Explore um estoque de elite."
      />

      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb items={[{ name: "Estoque", href: "/estoque" }]} />

          <div className="mt-10 mb-20">
            <h2 className="text-xl md:text-2xl font-serif italic text-white/90 mb-4">
              Curadoria de Veículos em São Paulo
            </h2>
            <p className="text-white/40 text-sm font-sans font-light max-w-2xl leading-relaxed">
              Diferente de marketplaces comuns, a Carrera Imports foca na
              intermediação de ativos de alto padrão. Cada unidade apresentada
              reflete nosso compromisso com a excelência técnica e estética exigida
              pelo mercado premium paulistano.
            </p>
          </div>

          {/* Filtering System */}
          <div className="space-y-8 mb-16 px-8 py-10 bg-[#080808] border border-white/5 rounded-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="space-y-6 flex-grow">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/20 mb-4 block">
                    Marcas
                  </span>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                    {brands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => setActiveBrand(brand)}
                        className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${
                          activeBrand === brand
                            ? "text-brand-gold"
                            : "text-white/30 hover:text-white/60"
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/[0.03]">
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/20 mb-4 block">
                    Categorias
                  </span>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                    {allCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${
                          activeCategory === cat
                            ? "text-brand-gold"
                            : "text-white/30 hover:text-white/60"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:w-64 space-y-4">
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/20 mb-4 block">
                  Busca Direta
                </span>
                <div className="relative">
                  <Search
                    size={14}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20"
                  />
                  <input
                    type="text"
                    placeholder="POR MODELO..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-b border-white/10 text-[10px] tracking-[0.3em] uppercase font-bold pl-8 pb-3 focus:ring-0 focus:outline-none w-full placeholder:text-white/15 text-white/60 focus:border-brand-gold/50 transition-colors"
                  />
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
            <div className="text-center py-32 border border-dashed border-white/5 rounded-sm">
              <p className="text-white/30 text-xs font-light mb-6 uppercase tracking-widest">
                Nenhum veículo encontrado para os filtros selecionados.
              </p>
              <button
                onClick={() => {
                  setActiveBrand("Todos");
                  setActiveCategory("Todas");
                  setSearchQuery("");
                }}
                className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold hover:text-white transition-colors underline underline-offset-8"
              >
                Limpar Todos os Filtros
              </button>
            </div>
          )}

          <div className="mt-24 text-center">
            <p className="text-white/20 text-[9px] uppercase tracking-[0.6em] mb-4">
              Apresentando {filteredVehicles.length} un. no mercado paulista
            </p>
            <div className="w-12 h-[1px] bg-brand-gold/20 mx-auto" />
          </div>
        </div>
      </section>

      {/* Local SEO Text Section */}
      <section className="py-24 px-6 lg:px-12 bg-[#050505] border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <span className="text-brand-gold text-[9px] uppercase tracking-[0.6em] font-bold mb-8 block opacity-40">
              Presença São Paulo
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif italic mb-8 leading-tight tracking-tight text-white/90">
              Venda seu veículo premium com intermediação profissional.
            </h2>
            <div className="space-y-6 text-white/40 text-sm font-light leading-relaxed max-w-xl">
              <p>
                O mercado automotivo de alto padrão em São Paulo exige agilidade, 
                discrição e profundo conhecimento de mercado. Na Carrera Imports, 
                assumimos toda a jornada de venda — da avaliação técnica ao 
                posicionamento estratégico nos canais mais seletos da capital.
              </p>
              <p>
                Nossa intermediação garante que seu ativo seja apresentado apenas 
                a compradores qualificados, eliminando riscos e maximizando a 
                valorização através de uma curadoria ativa e técnica.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Veículos", value: "Curados" },
                { label: "Mercado", value: "São Paulo" },
                { label: "Intermediação", value: "Estratégica" },
                { label: "Procedência", value: "Garantida" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-8 border border-white/5 bg-[#080808] rounded-sm group hover:border-brand-gold/20 transition-colors"
                >
                  <span className="text-brand-gold/40 text-[9px] uppercase tracking-[0.4em] font-bold block mb-2">
                    {item.label}
                  </span>
                  <span className="text-white/70 text-sm font-serif italic">
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
