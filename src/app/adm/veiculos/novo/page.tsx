import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { VehicleForm } from '../vehicle-form'

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

      <VehicleForm 
        title="Cadastrar Novo Veículo" 
        buttonText="Publicar Veículo no Acervo" 
      />
    </div>
  )
}
