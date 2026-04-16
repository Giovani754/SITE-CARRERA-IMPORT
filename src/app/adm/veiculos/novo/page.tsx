import { upsertVehicle } from '../actions'
import { ChevronLeft, Info, Image as ImageIcon, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function NovoVeiculoPage() {
  return (
    <div className="p-10 lg:p-16 max-w-5xl">
      <header className="mb-12">
        <Link
          href="/adm/veiculos"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 hover:text-brand-gold transition-colors mb-6"
        >
          <ChevronLeft size={14} />
          Voltar à Lista
        </Link>
        <h1 className="text-3xl font-serif italic text-white/90">Cadastrar Novo Veículo</h1>
      </header>

      <form action={upsertVehicle} className="space-y-12">
        {/* Basic Info */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-white/5">
            <Info size={16} className="text-brand-gold/60" />
            <h2 className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/70">Informações Básicas</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Marca</label>
              <input name="brand" required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" placeholder="Ex: Porsche" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Modelo</label>
              <input name="model" required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" placeholder="Ex: 911 Carrera S" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Ano</label>
              <input name="year" type="number" required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" placeholder="2023" />
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
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">KM</label>
              <input name="mileage" required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" placeholder="2.500 KM" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Câmbio</label>
              <input name="transmission" required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" placeholder="PDK" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Cor</label>
              <input name="color" required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" placeholder="Crayon" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Categoria (Tags)</label>
              <input name="category" className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" placeholder="Ex: Esportivo, SUV, Blindado" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Combustível</label>
              <input name="fuel" required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" placeholder="Gasolina / Híbrido" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Preço</label>
              <input name="price" required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" placeholder="R$ 1.150.000" />
            </div>
          </div>
        </section>

        {/* Assets */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-white/5">
            <ImageIcon size={16} className="text-brand-gold/60" />
            <h2 className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/70">Mídias & Destaque</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">URLs das Imagens (separadas por vírgula)</label>
              <textarea name="images_json" rows={3} className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white resize-none" placeholder="https://url1, https://url2..." />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Destaques Técnicos (separados por vírgula)</label>
              <textarea name="highlights_json" rows={2} className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white resize-none" placeholder="Ex: IPVA Pago, Único Dono, Todas as revisões na concessionária..." />
            </div>
            
            <div className="flex items-center gap-8 p-6 bg-white/[0.02] border border-white/5 rounded-sm">
              <div className="flex items-center gap-3">
                <input type="checkbox" name="featured" id="featured" className="w-4 h-4 accent-brand-gold" />
                <label htmlFor="featured" className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/60 cursor-pointer">Destacar na Home</label>
              </div>
              <div className="flex items-center gap-3">
                <select name="status" className="bg-transparent border border-white/10 text-[10px] uppercase tracking-[0.2em] font-bold text-white/60 p-2 outline-none">
                  <option value="available">Disponível</option>
                  <option value="sold">Vendido</option>
                  <option value="reserved">Reservado</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
           <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Descrição Completa</label>
              <textarea name="description" rows={5} className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white resize-none" placeholder="Detalhes refinados sobre o veículo..." />
            </div>
        </section>

        <div className="pt-8 border-t border-white/5">
          <button
            type="submit"
            className="w-full bg-brand-gold text-black py-6 text-[11px] uppercase tracking-[0.5em] font-bold rounded-sm hover:bg-[#C5A030] transition-all active:scale-[0.99] shadow-2xl shadow-brand-gold/10"
          >
            Publicar Veículo no Acervo
          </button>
        </div>
      </form>
    </div>
  )
}
