"use client";

import { upsertVehicle } from "./actions";
import { ChevronLeft, Info, Image as ImageIcon, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface VehicleFormProps {
  initialData?: any;
  title: string;
  buttonText: string;
}

export function VehicleForm({ initialData, title, buttonText }: VehicleFormProps) {
  const [brand, setBrand] = useState(initialData?.brand || "");
  const [model, setModel] = useState(initialData?.model || "");
  const [year, setYear] = useState(initialData?.year || "");
  const [slug, setSlug] = useState(initialData?.slug || "");

  // Auto-generate slug suggestion for NEW vehicles or if explicitly requested
  useEffect(() => {
    if (!initialData && (brand || model || year)) {
      const suggested = `${brand}-${model}-${year}`
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(suggested);
    }
  }, [brand, model, year, initialData]);

  return (
    <form action={upsertVehicle} className="space-y-12">
      {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}
      
      {/* Basic Info */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 pb-4 border-b border-white/5">
          <Info size={16} className="text-brand-gold/60" />
          <h2 className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/70">Informações Básicas</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Marca</label>
            <input 
              name="brand" 
              required 
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" 
              placeholder="Ex: Porsche" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Modelo</label>
            <input 
              name="model" 
              required 
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" 
              placeholder="Ex: 911 Carrera S" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Ano</label>
            <input 
              name="year" 
              type="number" 
              required 
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" 
              placeholder="2023" 
            />
          </div>
        </div>

        <div className="space-y-2 pt-4">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Link Amigável (Slug)</label>
          <div className="flex items-center gap-3">
            <input 
              name="slug" 
              required 
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="flex-1 bg-[#050505] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-brand-gold/50 font-mono" 
              placeholder="marca-modelo-ano" 
            />
            {!initialData && (
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/10 font-bold whitespace-nowrap">
                Sugestão Automática Ativa
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Technical Info */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 pb-4 border-b border-white/5">
          <CheckCircle size={16} className="text-brand-gold/60" />
          <h2 className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/70">Especificações Técnicas</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Versão</label>
            <input name="version" defaultValue={initialData?.version} required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" placeholder="Plaid, Turbo S, etc." />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Quilometragem</label>
            <input name="mileage" defaultValue={initialData?.mileage} required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" placeholder="2.500 KM" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Câmbio</label>
            <input name="transmission" defaultValue={initialData?.transmission} required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" placeholder="Automático" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Combustível</label>
            <input name="fuel" defaultValue={initialData?.fuel} required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" placeholder="Gasolina" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Cor Exterior</label>
            <input name="color" defaultValue={initialData?.color} required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" placeholder="Preto Obsidian" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Blindagem</label>
            <input name="armor" defaultValue={initialData?.armor} className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" placeholder="NIII-A / Sem Blindagem" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Cidade</label>
            <input name="city" defaultValue={initialData?.city} required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" placeholder="São Paulo, SP" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Preço (R$)</label>
            <input name="price" defaultValue={initialData?.price} required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" placeholder="R$ 850.000" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Categoria (Tags)</label>
            <input name="category" defaultValue={initialData?.category} className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" placeholder="SUV, Esportivo, Luxo" />
          </div>
        </div>
      </section>

      {/* Assets & Meta */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 pb-4 border-b border-white/5">
          <ImageIcon size={16} className="text-brand-gold/60" />
          <h2 className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/70">Mídias & Destaque</h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">URLs das Imagens (uma por linha)</label>
            <textarea 
              name="images_json" 
              defaultValue={initialData?.images?.join("\n")}
              rows={6} 
              className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white font-mono placeholder:text-white/5" 
              placeholder="https://...&#10;https://..." 
            />
            <p className="text-[9px] text-white/10 uppercase tracking-widest leading-relaxed">
              Insira os links diretos das fotos. A primeira URL será usada como capa do anúncio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4 p-6 bg-white/[0.01] border border-white/5 rounded-sm">
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/20 block mb-2">Visibilidade</span>
              <div className="flex items-center gap-4">
                <select name="status" defaultValue={initialData?.status || "available"} className="bg-[#080808] border border-white/5 text-[10px] uppercase tracking-[0.2em] font-bold text-white/60 p-4 outline-none flex-1">
                  <option value="available">Disponível</option>
                  <option value="sold">Vendido</option>
                  <option value="reserved">Reservado</option>
                </select>
                <div className="flex items-center gap-3 px-4 border border-white/5 h-full rounded-sm">
                  <input type="checkbox" name="featured" id="featured" defaultChecked={initialData?.featured} className="w-4 h-4 accent-brand-gold" />
                  <label htmlFor="featured" className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 cursor-pointer">Destaque Home</label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Destaques Rápidos (Tags separadas por vírgula)</label>
              <textarea 
                name="highlights_json" 
                defaultValue={initialData?.highlights?.join(", ")}
                rows={3} 
                className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white resize-none" 
                placeholder="Único Dono, IPVA Pago, Garantia de Fábrica..." 
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
         <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Descrição Comercial Detalhada</label>
            <textarea name="description" defaultValue={initialData?.description} rows={8} className="w-full bg-[#080808] border border-white/5 p-6 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white/80 leading-relaxed resize-none" placeholder="Apresentação técnica e comercial do veículo..." />
          </div>
      </section>

      <div className="pt-12 border-t border-white/5">
        <button
          type="submit"
          className="w-full bg-brand-gold text-black py-6 text-[11px] uppercase tracking-[0.5em] font-bold rounded-sm hover:bg-[#C5A030] transition-all active:scale-[0.99] shadow-2xl shadow-brand-gold/20"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
}
