import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/premium/breadcrumb";
import { PageHero } from "@/components/premium/page-hero";
import { CTASection } from "@/components/premium/cta-section";

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
        eyebrow="Quem Somos"
        title="Referência em consultoria automotiva premium em São Paulo."
        description="A Carrera Imports nasceu para transformar o mercado de veículos de alto padrão na capital paulista, unindo procedência e exclusividade."
      />

      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[{ name: "Sobre", href: "/sobre" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-6 text-white/50 text-[15px] leading-[1.8] font-sans font-light">
              <p>
                De um lado, uma trajetória construída no universo dos carros de
                alto padrão, com atuação nos bastidores em marketing,
                posicionamento e análise de veículos, sempre em busca das
                melhores oportunidades do mercado.
              </p>
              <p>
                Do outro, mais de 12 anos de experiência no setor automotivo,
                com atuação comercial e gerencial, desenvolvendo uma visão
                estratégica orientada a resultados e negociações de alto nível.
              </p>
              <p>
                A Carrera Imports atua como uma{" "}
                <span className="text-white/80 font-medium">
                  boutique de consultoria e intermediação em São Paulo
                </span>{" "}
                para quem busca veículos premium com procedência ou deseja
                vender seu patrimônio automotivo com apoio profissional,
                rapidez e a discrição que o mercado paulistano exige.
              </p>
              <blockquote className="text-foreground/70 italic font-serif text-lg py-6 border-y border-white/5 mt-4">
                &ldquo;Não vendemos carros. Conectamos pessoas a oportunidades
                com procedência, confiança e inteligência de mercado.&rdquo;
              </blockquote>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] bg-surface-base relative overflow-hidden group rounded-sm">
                <Image
                  src="https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop"
                  alt="Veículo premium em consultoria"
                  fill
                  className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
              <div className="aspect-[3/4] bg-surface-base relative overflow-hidden mt-10 group rounded-sm">
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

      {/* Valores */}
      <section className="py-24 px-6 lg:px-12 bg-[#050505] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <span className="text-brand-gold text-[9px] uppercase tracking-[0.4em] font-bold mb-5 block opacity-60">
                Posicionamento
              </span>
              <h3 className="text-xl font-serif italic mb-4 text-white/90">
                Atendimento Personalizado
              </h3>
              <p className="text-white/40 text-sm leading-relaxed font-light">
                Cada cliente é único. Entendemos suas necessidades específicas e
                oferecemos soluções sob medida com total discrição e agilidade.
              </p>
            </div>
            <div>
              <span className="text-brand-gold text-[9px] uppercase tracking-[0.4em] font-bold mb-5 block opacity-60">
                Abordagem
              </span>
              <h3 className="text-xl font-serif italic mb-4 text-white/90">
                Consultoria Estratégica
              </h3>
              <p className="text-white/40 text-sm leading-relaxed font-light">
                Não somos vendedores de carros. Somos consultores que analisam o
                mercado, posicionam seu veículo corretamente e conduzem
                negociações inteligentes.
              </p>
            </div>
            <div>
              <span className="text-brand-gold text-[9px] uppercase tracking-[0.4em] font-bold mb-5 block opacity-60">
                Compromisso
              </span>
              <h3 className="text-xl font-serif italic mb-4 text-white/90">
                Procedência Garantida
              </h3>
              <p className="text-white/40 text-sm leading-relaxed font-light">
                Verificação rigorosa de histórico, documentação e estado de
                conservação. Seu patrimônio automotivo merece esse cuidado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="h-[50vh] relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1621993202323-eb4ed813e4ce?q=80&w=2000&auto=format&fit=crop"
          alt="Experiência premium Carrera Imports"
          fill
          className="object-cover grayscale brightness-40"
        />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <p className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-white/15 select-none tracking-wide text-center leading-tight">
            Procedência. Confiança.
            <br />
            Resultado.
          </p>
        </div>
      </section>

      <CTASection
        variant="compact"
        headline="Quer saber mais sobre a Carrera Imports?"
        subheadline="Fale com nossa equipe e descubra como podemos ajudar."
      />
    </>
  );
}
