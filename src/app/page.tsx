import { PremiumHeader } from "@/components/premium/premium-header";
import { HeroSection } from "@/components/premium/hero-section";
import { SectionTitle } from "@/components/premium/section-title";
import { ServiceCard } from "@/components/premium/service-card";
import { ProcessSteps } from "@/components/premium/process-steps";
import { CarCard } from "@/components/premium/car-card";
import { PremiumFooter } from "@/components/premium/premium-footer";
import { vehicles } from "@/data/vehicles";
import { Shield, Target, Award, Gem, ArrowRight } from "lucide-react";
import Link from "next/link";

const mainServices = [
  {
    title: "Consultoria Estratégica",
    description: "Assessoria especializada para vender seu veículo com posicionamento correto e máxima valorização.",
    iconName: "Target"
  },
  {
    title: "Venda e Intermediação",
    description: "Cuidamos de todo o processo, da divulgação à negociação final, com total discrição e profissionalismo.",
    iconName: "Shield"
  },
  {
    title: "Curadoria de Oportunidades",
    description: "Encontramos o veículo ideal que atenda às suas exigências de performance, história e exclusividade.",
    iconName: "Gem"
  },
  {
    title: "Serviços Automotivos",
    description: "Apoio completo: blindagem, estética, funilaria e revisão executados por especialistas parceiros.",
    iconName: "Award"
  }
];

export default function Home() {
  const featuredVehicles = vehicles.filter(v => v.featured);

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <PremiumHeader />
      
      {/* Hero Section */}
      <HeroSection 
        headline="Venda ou encontre seu veículo premium com estratégia, discrição e máxima valorização." 
        subheadline="A Carrera Imports conduz todo o processo com inteligência de mercado, curadoria e negociação profissional para clientes que exigem segurança, eficiência e exclusividade."
      />

      {/* Value Proposition / Institutional */}
      <section className="py-32 px-6 lg:px-12 bg-surface-base border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-6 block">
                Nossa Essência
              </span>
              <h2 className="text-4xl md:text-5xl font-serif italic mb-10 leading-tight tracking-tight">
                A Carrera Imports nasce da união entre experiência, estratégia e paixão pelo mercado automotivo premium.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl text-lg font-sans">
                Mais do que uma consultoria, somos o seu braço direito no mercado de alto padrão. Atuamos nos bastidores para garantir que seu tempo seja respeitado e seu capital automotivo seja potencializado.
              </p>
              <div className="flex gap-12 border-t border-white/5 pt-10 mt-10">
                <div className="flex flex-col">
                  <span className="text-3xl font-serif text-brand-gold italic leading-none mb-2">11+</span>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Anos de Expertise</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-serif text-brand-gold italic leading-none mb-2">400+</span>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Veículos Posicionados</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-square">
              <div className="absolute inset-x-8 -inset-y-8 border-[0.5px] border-brand-gold/30" />
              <div 
                className="w-full h-full bg-cover bg-center grayscale shadow-2xl"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1000&auto=format&fit=crop')" }}
              />
              <div className="absolute bottom-12 -right-12 bg-brand-gold p-12 hidden lg:block">
                <span className="text-black text-xs font-bold uppercase tracking-[0.4em] transform rotate-90 inline-block origin-left">EXCLUSIVIDADE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            subtitle="Especialidades"
            title="Consultoria automotiva completa para quem não pode perder tempo."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {mainServices.map((service, idx) => (
              <ServiceCard 
                key={service.title}
                index={idx}
                title={service.title}
                description={service.description}
                iconName={service.iconName}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-6 lg:px-12 bg-surface-base border-y border-white/5">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <SectionTitle 
            subtitle="Metodologia"
            title="Um processo inteligente focado em segurança e resultados."
          />
          <ProcessSteps />
        </div>
      </section>

      {/* Featured Inventory Section */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
            <div className="max-w-2xl">
              <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-6 block">
                Seleção Curada
              </span>
              <h2 className="text-4xl md:text-5xl font-serif italic mb-6 leading-tight tracking-tight">
                Oportunidades que atendem ao nosso rigoroso critério de excelência.
              </h2>
            </div>
            <Link 
              href="/estoque"
              className="group flex items-center gap-4 text-xs uppercase tracking-[0.2em] font-bold text-foreground hover:text-brand-gold transition-colors"
            >
              Ver Estoque Completo
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredVehicles.map((vehicle, idx) => (
              <CarCard key={vehicle.id} vehicle={vehicle} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust / FAQ placeholder */}
      <section className="py-32 px-6 lg:px-12 bg-surface-base/50 text-center">
        <div className="max-w-4xl mx-auto">
          <SectionTitle 
            subtitle="Relacionamento"
            title="Buscamos parceiros de jornada, não apenas transações pontuais."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-20">
            <div>
              <h4 className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-4">Discrição</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">Seus dados e ativos protegidos com o máximo sigilo profissional.</p>
            </div>
            <div>
              <h4 className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-4">Segurança</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">Condução documental e financeira 100% blindada pela nossa expertise.</p>
            </div>
            <div>
              <h4 className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-4">Curadoria</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">Apenas veículos que passam pelo nosso rigoroso checklist técnico.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 px-6 lg:px-12 overflow-hidden relative">
        <div className="absolute inset-0 bg-brand-gold/10 blur-[150px] -z-10 translate-x-1/2" />
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-serif italic mb-12 tracking-tight">
            Quer vender ou encontrar seu veículo premium com inteligência?
          </h2>
          <Link
            href="https://wa.me/YOUR_NUMBER"
            className="inline-block bg-brand-gold text-black px-12 py-6 text-sm uppercase tracking-widest font-bold transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-brand-gold/20"
          >
            Falar com a Carrera Imports
          </Link>
        </div>
      </section>

      <PremiumFooter />
    </main>
  );
}
