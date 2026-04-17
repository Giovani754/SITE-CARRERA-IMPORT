import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { VehicleForm } from '../vehicle-form'
import { DeleteVehicleButton } from '../delete-button'

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

        <div className="flex items-center gap-4">
          <Link
            href={`/estoque/${vehicle.slug}`}
            target="_blank"
            className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/30 border border-white/5 px-4 py-2 hover:text-brand-gold hover:border-brand-gold/30 transition-all"
          >
            Ver no Site
          </Link>
          <DeleteVehicleButton id={vehicle.id} model={`${vehicle.brand} ${vehicle.model}`} />
        </div>
      </header>

      <VehicleForm 
        initialData={vehicle} 
        title="Editar Veículo" 
        buttonText="Salvar Alterações no Acervo" 
      />
    </div>
  )
}
