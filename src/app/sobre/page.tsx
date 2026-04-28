import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/premium/breadcrumb";
import { PageHero } from "@/components/premium/page-hero";
import { CTASection } from "@/components/premium/cta-section";
import { AboutCinematicBanner } from "@/components/premium/about-cinematic-banner";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a Carrera Imports: consultoria automotiva premium em São Paulo especializada em intermediação e curadoria de veículos de alto padrão com procedência garantida.",
  openGraph: {
    title: "Sobre a Carrera Imports | Consultoria Automotiva Premium",
    description:
      "Consultoria estratégica para compra e venda de veículos premium. Atendimento personalizado, procedência e eficácia em São Paulo.",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="QUEM SOMOS"
        title="Referência em consultoria automotiva premium em São Paulo."
        description="A Carrera Imports nasceu da união entre visão estratégica, experiência comercial e uma obsessão simples: proteger o cliente em um mercado onde aparência nem sempre significa procedência."
        backgroundImage="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop"
        backgroundAlt="Porsche em estúdio - Carrera Imports"
        accentPosition="right"
      />

      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[{ name: "Sobre", href: "/sobre" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-8 text-white/60 text-[15px] lg:text-base leading-[1.8] font-sans font-light">
              <div className="space-y-6">
                <p>
                  De um lado, uma trajetória construída no universo dos veículos de alto padrão, com atuação nos bastidores de marketing, posicionamento e análise de mercado.
                </p>
                <p>
                  Do outro, mais de 12 anos de experiência no setor automotivo, com atuação comercial e gerencial, conduzindo negociações, avaliando oportunidades e entendendo de perto como o mercado realmente funciona.
                </p>
                <p className="text-white/90 font-medium text-lg">
                  A Carrera Imports nasceu desse encontro.
                </p>
                <p>
                  Uma boutique de consultoria e intermediação automotiva criada em São Paulo para atender quem não quer depender de anúncio bonito, promessa de vendedor ou negociação conduzida no escuro.
                </p>
                <p>
                  Aqui, cada veículo passa por filtro. Cada oportunidade é analisada com critério. Cada negociação é tratada com a discrição que um patrimônio exige.
                </p>
                <div className="pt-4 space-y-2">
                  <p className="text-brand-gold/80 italic">Porque no mercado premium, o erro quase nunca aparece na primeira conversa.</p>
                  <p className="text-white/80 font-medium">Ele aparece depois.</p>
                  <ul className="space-y-1 text-white/40 text-sm">
                    <li>• No histórico mal contado.</li>
                    <li>• Na documentação ignorada.</li>
                    <li>• No preço que parecia oportunidade.</li>
                    <li>• No detalhe que ninguém fez questão de mostrar.</li>
                  </ul>
                </div>
                <p className="text-white/90 font-medium pt-4">
                  A Carrera Imports existe para entrar antes desse erro.
                </p>
              </div>
              
              <blockquote className="text-foreground/90 italic font-serif text-xl md:text-2xl py-10 border-y border-white/10 mt-12 leading-relaxed">
                &ldquo;Não vendemos carros. Protegemos decisões, conectamos pessoas a oportunidades reais e conduzimos negociações com inteligência de mercado.&rdquo;
              </blockquote>
            </div>

            <div className="grid grid-cols-2 gap-4 sticky top-32">
              <div className="aspect-[3/4] bg-surface-base relative overflow-hidden group rounded-sm shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop"
                  alt="Veículo premium em consultoria"
                  fill
                  className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
              <div className="aspect-[3/4] bg-surface-base relative overflow-hidden mt-10 group rounded-sm shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop"
                  alt="Curadoria automotiva de alto padrão"
                  fill
                  className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores / Pilares */}
      <section className="py-32 px-6 lg:px-12 bg-[#050505] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.02),transparent)] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
            <div className="space-y-6">
              <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold block opacity-60">
                POSICIONAMENTO
              </span>
              <h3 className="text-2xl font-serif italic text-white/95">
                Atendimento sob medida
              </h3>
              <p className="text-white/50 text-[15px] leading-relaxed font-light">
                Cada cliente chega com um objetivo diferente. Alguns querem comprar melhor. Outros querem vender sem se expor. Outros precisam sair de um ativo com segurança, sem abrir espaço para curioso ou negociação mal conduzida.
              </p>
            </div>
            <div className="space-y-6">
              <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold block opacity-60">
                ABORDAGEM
              </span>
              <h3 className="text-2xl font-serif italic text-white/95">
                Consultoria estratégica
              </h3>
              <p className="text-white/50 text-[15px] leading-relaxed font-light">
                Não somos vendedores tentando empurrar o carro da vez. Analisamos mercado, histórico, preço, conservação e margem de negociação para posicionar cada decisão com clareza, revelando o que o mercado tenta esconder.
              </p>
            </div>
            <div className="space-y-6">
              <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold block opacity-60">
                COMPROMISSO
              </span>
              <h3 className="text-2xl font-serif italic text-white/95">
                Procedência verificada
              </h3>
              <p className="text-white/50 text-[15px] leading-relaxed font-light">
                Foto bonita não prova nada. Anúncio bem escrito não garante nada. Por isso, avaliamos histórico e estado real do veículo antes de qualquer avanço, impedindo que um patrimônio entre em um risco disfarçado de oportunidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AboutCinematicBanner />

      <CTASection
        variant="compact"
        headline="Quer saber mais sobre a Carrera Imports?"
        subheadline="Fale com nossa equipe e entenda como podemos conduzir sua próxima compra ou venda com segurança, discrição e critério."
      />
    </>
  );
}
