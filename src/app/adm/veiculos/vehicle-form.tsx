"use client";

import { upsertVehicle } from "./actions";
import { Info, Image as ImageIcon, CheckCircle, Save, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { ImageUpload } from "@/components/adm/image-upload";
import { useRouter } from "next/navigation";

import { Vehicle } from "@/data/vehicles";

interface VehicleFormProps {
  initialData?: Vehicle;
  title: string;
  buttonText: string;
}

export function VehicleForm({ initialData, buttonText }: VehicleFormProps) {
  const router = useRouter();
  const [brand, setBrand] = useState(initialData?.brand || "");
  const [model, setModel] = useState(initialData?.model || "");
  const [year, setYear] = useState(initialData?.year || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [isPending, setIsPending] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(initialData?.images || []);

  // Auto-generate slug suggestion for NEW vehicles or if explicitly requested
  useEffect(() => {
    if (!initialData && (brand || model || year)) {
      const suggested = `${brand}-${model}-${year}`
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSlug(suggested);
    }
  }, [brand, model, year, initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;
    
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    
    // Add images as a comma-separated string to avoid large FormData payloads
    formData.set("images_json", imageUrls.join(","));
    
    try {
      const result = await upsertVehicle(formData);
      if (result?.error) {
        alert(result.error);
        setIsPending(false);
      } else {
        // Success redirect
        router.push("/adm/veiculos");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      alert("Ocorreu um erro ao salvar o veículo.");
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 pb-24">
      {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}
      
      {/* Basic Info */}
      <section className="space-y-8 bg-white/[0.01] border border-white/5 p-8 rounded-sm">
        <div className="flex items-center gap-3 pb-4 border-b border-white/5">
          <Info size={16} className="text-brand-gold/60" />
          <h2 className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/70">Informações do Ativo</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Marca</label>
            <input 
              name="brand" 
              required 
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full bg-black border border-white/10 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white transition-all" 
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
              className="w-full bg-black border border-white/10 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white transition-all" 
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
              className="w-full bg-black border border-white/10 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white transition-all" 
              placeholder="2023" 
            />
          </div>
        </div>

        <div className="space-y-2 pt-4">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">URL do Anúncio (Slug)</label>
          <input 
            name="slug" 
            required 
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full bg-black/40 border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-brand-gold/50 font-mono transition-all" 
            placeholder="porsche-911-2023" 
          />
        </div>
      </section>

      {/* Technical Info */}
      <section className="space-y-8 bg-white/[0.01] border border-white/5 p-8 rounded-sm">
        <div className="flex items-center gap-3 pb-4 border-b border-white/5">
          <CheckCircle size={16} className="text-brand-gold/60" />
          <h2 className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/70">Ficha Técnica</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Versão</label>
            <input name="version" defaultValue={initialData?.version} required className="w-full bg-black border border-white/10 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white transition-all" placeholder="Ex: Turbo S" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Quilometragem</label>
            <input name="mileage" defaultValue={initialData?.mileage} required className="w-full bg-black border border-white/10 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white transition-all" placeholder="2.500 KM" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Preço (R$)</label>
            <input name="price" defaultValue={initialData?.price} required className="w-full bg-black border border-white/10 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white transition-all" placeholder="R$ 850.000 ou Sob Consulta" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Categoria</label>
            <input name="category" defaultValue={initialData?.category} className="w-full bg-black border border-white/10 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white transition-all" placeholder="Esportivo, SUV, etc." />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Câmbio</label>
            <input name="transmission" defaultValue={initialData?.transmission} className="w-full bg-black border border-white/10 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white transition-all" placeholder="Automático" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Combustível</label>
            <input name="fuel" defaultValue={initialData?.fuel} className="w-full bg-black border border-white/10 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white transition-all" placeholder="Gasolina" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Cor</label>
            <input name="color" defaultValue={initialData?.color} className="w-full bg-black border border-white/10 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white transition-all" placeholder="Preto" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Blindagem</label>
            <input name="blindagem" defaultValue={initialData?.blindagem} className="w-full bg-black border border-white/10 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white transition-all" placeholder="NIII-A ou Vazio" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Cidade</label>
            <input name="city" defaultValue={initialData?.city} className="w-full bg-black border border-white/10 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white transition-all" placeholder="São Paulo, SP" />
          </div>
        </div>
      </section>

      {/* Media Selection */}
      <section className="space-y-8 bg-white/[0.01] border border-white/5 p-8 rounded-sm">
        <div className="flex items-center gap-3 pb-4 border-b border-white/5">
          <ImageIcon size={16} className="text-brand-gold/60" />
          <h2 className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/70">Mídias e Destaques</h2>
        </div>

        <ImageUpload 
          onImagesChange={setImageUrls} 
          initialImages={imageUrls}
          slug={slug}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 block mb-2">Visibilidade e Destaque</label>
            <div className="flex flex-wrap gap-4">
              <select name="status" defaultValue={initialData?.status || "available"} className="bg-black border border-white/10 text-[10px] uppercase tracking-[0.2em] font-bold text-white/60 p-4 outline-none flex-1 rounded-sm">
                <option value="available">Disponível</option>
                <option value="sold">Vendido</option>
                <option value="reserved">Reservado</option>
              </select>
              <div className="flex items-center gap-3 px-6 border border-white/10 h-full rounded-sm bg-black/20">
                <input type="checkbox" name="featured" id="featured" defaultChecked={initialData?.featured} className="w-4 h-4 accent-brand-gold" />
                <label htmlFor="featured" className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 cursor-pointer">Destaque na Home</label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Tags de Destaque (Separadas por vírgula)</label>
            <textarea 
              name="highlights_json" 
              defaultValue={initialData?.highlights?.join(", ")}
              rows={3} 
              className="w-full bg-black border border-white/10 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white resize-none transition-all" 
              placeholder="Único Dono, Laudo Aprovado, Revisado..." 
            />
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="space-y-8 bg-white/[0.01] border border-white/5 p-8 rounded-sm">
         <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Descrição Comercial</label>
            <textarea name="description" defaultValue={initialData?.description} rows={8} className="w-full bg-black border border-white/10 p-6 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white/80 leading-relaxed resize-none transition-all" placeholder="Descreva os detalhes e diferenciais deste veículo..." />
          </div>
      </section>

      {/* Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-black/80 backdrop-blur-xl border-t border-white/5 z-50 flex justify-center">
        <button
          type="submit"
          disabled={isPending}
          className="w-full max-w-xl bg-brand-gold text-black py-5 text-[11px] uppercase tracking-[0.5em] font-bold rounded-sm hover:bg-[#C5A030] transition-all active:scale-[0.98] shadow-2xl shadow-brand-gold/20 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <Save size={16} />
              {buttonText}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

