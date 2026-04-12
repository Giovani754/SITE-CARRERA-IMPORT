import { PremiumHeader } from "@/components/premium/premium-header";
import { PremiumFooter } from "@/components/premium/premium-footer";
import { SectionTitle } from "@/components/premium/section-title";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground">
      <PremiumHeader />
      
      {/* Header Spacer */}
      <div className="h-32 lg:h-48" />

      {/* Hero Intro */}
      <section className="px-6 lg:px-12 mb-32">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            alignment="left"
            subtitle="Nossa História"
            title="A Carrera Imports nasce da união entre experiência, estratégia e paixão pelo mercado automotivo premium."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-8 text-muted-foreground text-lg leading-relaxed font-sans">
              <p>
                De um lado, uma trajetória construída no universo dos carros de alto padrão, com atuação nos bastidores em marketing, posicionamento e análise de veículos, sempre em busca das melhores oportunidades do mercado.
              </p>
              <p>
                Do outro, mais de 12 anos de experiência no setor automotivo, com atuação comercial e gerencial, desenvolvendo uma visão estratégica orientada a resultados e negociações de alto nível.
              </p>
              <p className="text-foreground italic font-serif py-8 border-y border-white/5">
                "Nascemos para resolver o que muitos proprietários de veículos premium não têm: disponibilidade, estratégia e segurança no processo de venda ou compra."
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="aspect-[3/4] bg-surface-base relative overflow-hidden group">
                 <Image 
                  src="https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1000&auto=format&fit=crop" 
                  alt="Consultoria" 
                  fill 
                  className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
              <div className="aspect-[3/4] bg-surface-base relative overflow-hidden mt-12 group">
                 <Image 
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop" 
                  alt="Negociação" 
                  fill 
                  className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="py-32 px-6 lg:px-12 bg-surface-base border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
            <div>
              <span className="text-brand-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">Posicionamento</span>
              <h3 className="text-2xl font-serif italic mb-6">Discrição Executiva</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Entendemos que tempo é o ativo mais valioso de um grande empresário, médico ou advogado. Nosso processo é desenhado para ser invisível e eficiente.
              </p>
            </div>
            <div>
              <span className="text-brand-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">Abordagem</span>
              <h3 className="text-2xl font-serif italic mb-6">Consultoria Consultiva</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Não somos vendedores de carros. Somos consultores de ativos automotivos. Cada movimentação é precedida por uma análise técnica e mercadológica séria.
              </p>
            </div>
            <div>
              <span className="text-brand-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">Compromisso</span>
              <h3 className="text-2xl font-serif italic mb-6">Valorização Máxima</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Nossa estratégia de divulgação e negociação visa o ponto ideal entre velocidade e valorização, respeitando a história e o estado de conservação de cada veículo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Banner */}
      <section className="h-[60vh] relative overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=2000&auto=format&fit=crop" 
          alt="Carrera Imports Atmosphere" 
          fill 
          className="object-cover grayscale brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-4xl md:text-5xl lg:text-7xl font-serif italic text-white/20 select-none tracking-widest text-center">
            MAIS DO QUE VENDER CARROS: <br /> POSICIONAMOS OPORTUNIDADES.
          </p>
        </div>
      </section>

      <PremiumFooter />
    </main>
  );
}
