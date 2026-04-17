import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Edit2, ExternalLink, Filter } from 'lucide-react'
import Image from 'next/image'
import { StatusQuickAction, FeaturedQuickAction } from './quick-actions'
import { DeleteVehicleButton } from './delete-button'

export default async function VeiculosListPage() {
  const supabase = await createClient()

  const { data: vehicles } = await supabase
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-10 lg:p-16 space-y-12">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <span className="text-brand-gold text-[9px] uppercase tracking-[0.8em] font-medium block opacity-50 mb-3">
            Acervo
          </span>
          <h1 className="text-3xl font-serif italic text-white/90">Gestão de Estoque</h1>
        </div>
        
        <Link
          href="/adm/veiculos/novo"
          className="inline-flex items-center gap-3 bg-brand-gold text-black px-8 py-4 text-[10px] uppercase tracking-[0.4em] font-bold rounded-sm hover:bg-[#C5A030] transition-all active:scale-[0.98]"
        >
          <Plus size={14} />
          Novo Veículo
        </Link>
      </header>

      {/* Filters Bar */}
      <div className="flex items-center gap-6 py-4 border-y border-white/5 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-3 text-white/20 mr-4">
          <Filter size={14} strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Filtrar</span>
        </div>
        {['Todos', 'Disponíveis', 'Vendidos', 'Reservados'].map((f) => (
          <button
            key={f}
            className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/30 hover:text-white/60 transition-colors whitespace-nowrap"
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#080808] border border-white/5 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">Veículo</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">Ano/Km</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">Preço</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">Status</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] font-bold text-white/20 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {vehicles?.map((v) => (
                <tr key={v.id} className="group hover:bg-white/[0.01] transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/5 rounded-sm relative overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                        {v.images?.[0] && (
                          <Image src={v.images[0]} alt={v.model} fill className="object-cover" />
                        )}
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-brand-gold/60 block mb-0.5">
                          {v.brand}
                        </span>
                        <span className="text-sm font-medium text-white/80">{v.model}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] text-white/60">{v.year}</span>
                      <span className="text-[9px] uppercase tracking-widest text-white/20">{v.mileage}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[11px] font-sans text-white/60">{v.price}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[9px] uppercase tracking-[0.2em] font-bold px-2 py-1 rounded-[2px] ${
                      v.status === 'available' ? 'bg-green-500/10 text-green-500/60' :
                      v.status === 'sold' ? 'bg-white/5 text-white/30' :
                      'bg-orange-500/10 text-orange-500/60'
                    }`}>
                      {v.status === 'available' ? 'Disponível' :
                       v.status === 'sold' ? 'Vendido' : 'Reservado'}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <StatusQuickAction id={v.id} currentStatus={v.status} />
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <FeaturedQuickAction id={v.id} isFeatured={v.featured} />
                      <Link
                        href={`/estoque/${v.slug}`}
                        target="_blank"
                        className="p-2 text-white/20 hover:text-brand-gold transition-colors"
                        title="Ver no Site"
                      >
                        <ExternalLink size={14} />
                      </Link>
                      <Link
                        href={`/adm/veiculos/${v.id}`}
                        className="p-2 text-white/20 hover:text-white/80 transition-colors"
                        title="Editar"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <DeleteVehicleButton id={v.id} model={`${v.brand} ${v.model}`} />
                    </div>
                  </td>
                </tr>
              ))}
              {!vehicles?.length && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <p className="text-white/10 text-xs italic">Nenhum veículo cadastrado no acervo.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
