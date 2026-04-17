import { createClient } from '@/lib/supabase/server'
import { Car, TrendingUp, CheckCircle, Clock } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Get some stats
  const { count: totalCars } = await supabase
    .from('vehicles')
    .select('*', { count: 'exact', head: true })

  const { count: availableCars } = await supabase
    .from('vehicles')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'available')

  const { count: soldCars } = await supabase
    .from('vehicles')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'sold')

  const { count: reservedCars } = await supabase
    .from('vehicles')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'reserved')

  const { count: featuredCars } = await supabase
    .from('vehicles')
    .select('*', { count: 'exact', head: true })
    .eq('featured', true)

  const { data: recentVehicles } = await supabase
    .from('vehicles')
    .select('id, brand, model, updated_at, status')
    .order('updated_at', { ascending: false })
    .limit(5)

  return (
    <div className="p-10 lg:p-16 space-y-12">
      <header>
        <span className="text-brand-gold text-[9px] uppercase tracking-[0.8em] font-medium block opacity-50 mb-3">
          Overview
        </span>
        <h1 className="text-3xl font-serif italic text-white/90">Dashboard Estratégico</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          { label: 'Total Acervo', value: totalCars || 0, icon: Car, color: 'text-brand-gold' },
          { label: 'Disponíveis', value: availableCars || 0, icon: CheckCircle, color: 'text-green-500/60' },
          { label: 'Vendidos', value: soldCars || 0, icon: TrendingUp, color: 'text-blue-500/60' },
          { label: 'Reservados', value: reservedCars || 0, icon: Clock, color: 'text-orange-500/60' },
          { label: 'Em Destaque', value: featuredCars || 0, icon: CheckCircle, color: 'text-brand-gold/60' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#080808] border border-white/5 p-8 rounded-sm space-y-4">
            <div className="flex items-center justify-between">
              <stat.icon size={18} className={stat.color} strokeWidth={1.5} />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/20 block mb-1">
                {stat.label}
              </span>
              <span className="text-2xl font-sans font-medium text-white/80">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#080808] border border-white/5 p-8 rounded-sm">
          <h3 className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/40 mb-8 pb-4 border-b border-white/5">
            Atividade Recente
          </h3>
          <div className="space-y-6">
            {recentVehicles?.map((v) => (
              <div key={v.id} className="flex items-center justify-between group">
                <div className="flex flex-col">
                  <span className="text-xs text-white/70 font-medium group-hover:text-brand-gold transition-colors">{v.brand} {v.model}</span>
                  <span className="text-[9px] uppercase tracking-widest text-white/20">Atualizado em {new Date(v.updated_at).toLocaleDateString('pt-BR')}</span>
                </div>
                <span className={`text-[8px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-[2px] ${
                  v.status === 'available' ? 'text-green-500/50 border border-green-500/10' :
                  v.status === 'sold' ? 'text-white/20 border border-white/5' :
                  'text-orange-500/50 border border-orange-500/10'
                }`}>
                  {v.status === 'available' ? 'Disponível' : v.status === 'sold' ? 'Vendido' : 'Reservado'}
                </span>
              </div>
            ))}
            {!recentVehicles?.length && (
              <p className="text-white/10 text-xs italic">Nenhuma atividade registrada.</p>
            )}
          </div>
        </div>
        <div className="bg-brand-gold/5 border border-brand-gold/10 p-8 rounded-sm flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold">
            <Car size={32} strokeWidth={1} />
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold/60 leading-relaxed">
            Mantenha o acervo sempre atualizado para garantir a conversão no site.
          </p>
        </div>
      </div>
    </div>
  )
}
