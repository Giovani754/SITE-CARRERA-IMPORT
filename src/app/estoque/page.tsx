import { PremiumHeader } from "@/components/premium/premium-header";
import { PremiumFooter } from "@/components/premium/premium-footer";
import { SectionTitle } from "@/components/premium/section-title";
import { CarCard } from "@/components/premium/car-card";
import { vehicles } from "@/data/vehicles";
import { SlidersHorizontal, Search } from "lucide-react";

export default function InventoryPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground">
      <PremiumHeader />
      
      <div className="h-32 lg:h-48" />

      <section className="px-6 lg:px-12 mb-32">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            alignment="left"
            subtitle="Nosso Acervo"
            title="Veículos premium rigorosamente selecionados e curados."
          />

          {/* Filtering Placeholder */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-16 py-6 border-y border-white/5">
            <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-4 lg:pb-0 w-full lg:w-auto">
              {["Todos", "Porsche", "Audi", "BMW", "Mercedes-Benz"].map((brand) => (
                <button 
                  key={brand}
                  className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-brand-gold transition-colors whitespace-nowrap"
                >
                  {brand}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-6 w-full lg:w-auto">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-white/40 cursor-pointer hover:text-white transition-colors">
                <SlidersHorizontal size={14} />
                Filtros Avançados
              </div>
              <div className="h-4 w-[1px] bg-white/10 hidden lg:block" />
              <div className="relative group flex-grow lg:flex-grow-0">
                <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20" />
                <input 
                  type="text" 
                  placeholder="BUSCAR MODELO..." 
                  className="bg-transparent border-none text-[10px] tracking-widest uppercase font-bold pl-6 focus:ring-0 w-full lg:w-48 placeholder:text-white/20"
                />
              </div>
            </div>
          </div>

          {/* Inventory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
            {vehicles.map((vehicle, idx) => (
              <CarCard key={vehicle.id} vehicle={vehicle} index={idx} />
            ))}
          </div>

          {/* Empty state / Load more placeholder */}
          <div className="mt-24 text-center">
            <p className="text-muted-foreground text-xs uppercase tracking-[0.4em] mb-8">
              Apresentando {vehicles.length} de {vehicles.length} unidades
            </p>
            <div className="w-12 h-[1px] bg-brand-gold mx-auto" />
          </div>
        </div>
      </section>

      {/* Special Offer / Off-market CTA */}
      <section className="py-24 px-6 lg:px-12 bg-surface-base border-y border-white/5 mx-6 lg:mx-12 mb-32">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-serif italic mb-6">Não encontrou o que procurava?</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-10 max-w-xl mx-auto font-sans">
            Temos acesso a um acervo de veículos exclusivos que não estão publicados em sites ou marketplaces. Ativamos nossa rede para encontrar a configuração exata que você deseja.
          </p>
          <button className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold hover:text-white transition-all underline underline-offset-8 decoration-brand-gold/30 hover:decoration-white">
            Ativar Curadoria Hunter
          </button>
        </div>
      </section>

      <PremiumFooter />
    </main>
  );
}
