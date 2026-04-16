import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { upsertVehicle, deleteVehicle } from '../actions'
import { ChevronLeft, Info, Image as ImageIcon, CheckCircle, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default async function EditarVeiculoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: vehicle } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', id)
    .single()

  if (!vehicle) {
    notFound()
  }

  const handleDelete = deleteVehicle.bind(null, id)

  return (
    <div className="p-10 lg:p-16 max-w-5xl">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link
            href="/adm/veiculos"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 hover:text-brand-gold transition-colors mb-6"
          >
            <ChevronLeft size={14} />
            Voltar à Lista
          </Link>
          <h1 className="text-3xl font-serif italic text-white/90">Editar Veículo</h1>
        </div>

        <form action={handleDelete}>
          <button
            type="submit"
            className="flex items-center gap-2 text-[9px] uppercase tracking-[0.4em] font-bold text-red-500/40 hover:text-red-500/80 transition-all border border-red-500/10 hover:border-red-500/30 px-4 py-2 rounded-[2px]"
          >
            <Trash2 size={12} />
            Remover do Acervo
          </button>
        </form>
      </header>

      <form action={upsertVehicle} className="space-y-12">
        <input type="hidden" name="id" value={vehicle.id} />
        <input type="hidden" name="slug" value={vehicle.slug} />

        {/* Basic Info */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-white/5">
            <Info size={16} className="text-brand-gold/60" />
            <h2 className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/70">Informações Básicas</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Marca</label>
              <input name="brand" defaultValue={vehicle.brand} required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Modelo</label>
              <input name="model" defaultValue={vehicle.model} required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Ano</label>
              <input name="year" type="number" defaultValue={vehicle.year} required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" />
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
              <input name="mileage" defaultValue={vehicle.mileage} required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Câmbio</label>
              <input name="transmission" defaultValue={vehicle.transmission} required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Cor</label>
              <input name="color" defaultValue={vehicle.color} required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Combustível</label>
              <input name="fuel" defaultValue={vehicle.fuel} required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Categoria</label>
              <input name="category" defaultValue={vehicle.category} className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" placeholder="Ex: Esportivo" />
            </div>
            <div className="space-y-2 lg:col-span-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Preço</label>
              <input name="price" defaultValue={vehicle.price} required className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white" />
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
              <textarea name="images_json" defaultValue={vehicle.images?.join(', ')} rows={3} className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white resize-none" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Destaques Técnicos (separados por vírgula)</label>
              <textarea name="highlights_json" defaultValue={vehicle.highlights?.join(', ')} rows={2} className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white resize-none" placeholder="Ex: IPVA Pago, Único Dono..." />
            </div>
            
            <div className="flex items-center gap-8 p-6 bg-white/[0.02] border border-white/5 rounded-sm">
              <div className="flex items-center gap-3">
                <input type="checkbox" name="featured" id="featured" defaultChecked={vehicle.featured} className="w-4 h-4 accent-brand-gold" />
                <label htmlFor="featured" className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/60 cursor-pointer">Destacar na Home</label>
              </div>
              <div className="flex items-center gap-3">
                <select name="status" defaultValue={vehicle.status} className="bg-transparent border border-white/10 text-[10px] uppercase tracking-[0.2em] font-bold text-white/60 p-2 outline-none">
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
              <textarea name="description" defaultValue={vehicle.description} rows={5} className="w-full bg-[#080808] border border-white/5 p-4 rounded-sm focus:border-brand-gold/50 outline-none text-sm text-white resize-none" />
            </div>
        </section>

        <div className="pt-8 border-t border-white/5">
          <button
            type="submit"
            className="w-full bg-brand-gold text-black py-6 text-[11px] uppercase tracking-[0.5em] font-bold rounded-sm hover:bg-[#C5A030] transition-all active:scale-[0.99] shadow-2xl shadow-brand-gold/10"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  )
}
