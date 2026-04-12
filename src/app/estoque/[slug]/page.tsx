import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PremiumHeader } from "@/components/premium/premium-header";
import { PremiumFooter } from "@/components/premium/premium-footer";
import { vehicles } from "@/data/vehicles";
import { Gauge, Calendar, Zap, Fuel, MessageSquare, ChevronLeft, ShieldCheck, MapPin } from "lucide-react";

interface PageProps {
  params: { slug: string };
}

export default function VehiclePage({ params }: PageProps) {
  const vehicle = vehicles.find((v) => v.slug === params.slug);

  if (!vehicle) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground">
      <PremiumHeader />
      
      <div className="h-32 lg:h-48" />

      <section className="px-6 lg:px-12 mb-32">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/estoque"
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-brand-gold transition-colors mb-12"
          >
            <ChevronLeft size={14} />
            Voltar ao Acervo
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
            {/* Gallery Column */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div className="relative aspect-[16/9] bg-surface-base border border-white/5 overflow-hidden">
                <Image 
                  src={vehicle.image} 
                  alt={vehicle.model} 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div className="grid grid-cols-3 gap-8">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="aspect-[4/3] bg-surface-base border border-white/5 relative overflow-hidden group">
                      <Image 
                        src={vehicle.image} 
                        alt="Gallery" 
                        fill 
                        className="object-cover opacity-60 scale-110 blur-[2px] grayscale transition-all duration-700 group-hover:scale-100 group-hover:blur-0 group-hover:grayscale-0 group-hover:opacity-100" 
                      />
                   </div>
                 ))}
              </div>

              {/* Description */}
              <div className="py-12 border-t border-white/5 mt-8">
                <h3 className="text-2xl font-serif italic mb-8">Sobre este exemplar</h3>
                <div className="space-y-6 text-muted-foreground leading-relaxed font-sans max-w-3xl">
                  <p>
                    Este {vehicle.brand} {vehicle.model} representa o ápice da engenharia automotiva em seu ano, combinando performance bruta com um refinamento estético impecável. Cada detalhe foi preservado sob os mais altos padrões de manutenção.
                  </p>
                  <p>
                    O proprietário atual, assessorado pela Carrera Imports, manteve um histórico documental completo e todas as revisões em concessionário oficial. Um veículo para colecionadores e entusiastas que não abrem mão da perfeição técnica e estética.
                  </p>
                </div>
              </div>
            </div>

            {/* Sticky Sidebar Info */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-10">
                <div>
                  <span className="text-brand-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">{vehicle.brand}</span>
                  <h1 className="text-4xl xl:text-5xl font-serif italic mb-6 leading-tight">{vehicle.model}</h1>
                  <p className="text-3xl font-sans tracking-tight text-white/90">{vehicle.price}</p>
                </div>

                {/* Specs List */}
                <div className="grid grid-cols-1 gap-6 py-10 border-y border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-white/40">
                      <Calendar size={18} />
                      <span className="text-xs uppercase tracking-widest">Ano</span>
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase">{vehicle.year}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-white/40">
                      <Gauge size={18} />
                      <span className="text-xs uppercase tracking-widest">Quilometragem</span>
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase">{vehicle.mileage}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-white/40">
                      <Zap size={18} />
                      <span className="text-xs uppercase tracking-widest">Câmbio</span>
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase">{vehicle.transmission}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-white/40">
                      <Fuel size={18} />
                      <span className="text-xs uppercase tracking-widest">Combustível</span>
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase">{vehicle.fuel}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <Link
                    href="https://wa.me/YOUR_NUMBER"
                    className="bg-brand-gold text-black py-5 text-center text-xs uppercase tracking-widest font-bold shadow-xl shadow-brand-gold/20 hover:scale-[1.02] transition-transform"
                  >
                    Agendar Visita / Falar com Consultor
                  </Link>
                  <p className="text-[10px] text-muted-foreground/50 text-center uppercase tracking-widest">
                    Disponível para visualização em São Paulo/SP sob agendamento prévio.
                  </p>
                </div>

                <div className="p-8 bg-surface-base border border-white/5 flex flex-col gap-6">
                   <div className="flex items-start gap-4">
                      <ShieldCheck className="text-brand-gold shrink-0" size={20} />
                      <div>
                        <h4 className="text-[10px] uppercase tracking-widest font-bold mb-1">Garantia de Procedência</h4>
                        <p className="text-[9px] text-muted-foreground leading-normal uppercase tracking-widest">Veículo rigorosamente inspecionado pela equipe Carrera.</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <MapPin className="text-brand-gold shrink-0" size={20} />
                      <div>
                        <h4 className="text-[10px] uppercase tracking-widest font-bold mb-1">Localização</h4>
                        <p className="text-[9px] text-muted-foreground leading-normal uppercase tracking-widest">Showroom Privado - São Paulo/SP</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PremiumFooter />
    </main>
  );
}
