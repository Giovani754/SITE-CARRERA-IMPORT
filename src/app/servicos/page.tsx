import { PremiumHeader } from "@/components/premium/premium-header";
import { PremiumFooter } from "@/components/premium/premium-footer";
import { SectionTitle } from "@/components/premium/section-title";
import * as Icons from "lucide-react";
import { Shield, Target, Gem, Award, PenTool, Search, UserCheck, BarChart } from "lucide-react";

const detailedServices = [
  {
    title: "Consultoria Estratégica",
    description: "Assessoria completa para quem deseja vender seu veículo premium. Analisamos o mercado, definimos o posicionamento correto e conduzimos a estratégia de valorização.",
    iconName: "Target" as keyof typeof Icons,
    features: ["Análise de mercado personalizada", "Definição de preço estratégico", "Gestão de imagem do veículo"]
  },
  {
    title: "Venda e Intermediação",
    description: "Intermediação profissional de ponta a ponta. Filtramos curiosos, conduzimos as visitas e garantimos uma negociação segura e discreta.",
    iconName: "Shield" as keyof typeof Icons,
    features: ["Atendimento exclusivo a interessados", "Filtro rigoroso de leads", "Segurança em todas as etapas"]
  },
  {
    title: "Curadoria de Veículos",
    description: "Encontramos o veículo ideal para sua coleção ou uso diário. Nossa curadoria foca em procedência, estado de conservação e histórico impecável.",
    iconName: "Gem" as keyof typeof Icons,
    features: ["Busca personalizada (Hunter)", "Verificação técnica detalhada", "Acesso a estoque off-market"]
  },
  {
    title: "Serviços Premium",
    description: "Apoio total para que seu veículo esteja sempre em estado de concurso. Blindagem, estética, funilaria e revisão executados pelos melhores parceiros do mercado.",
    iconName: "Award" as keyof typeof Icons,
    features: ["Blindagem de alto nível", "Estética automotiva avançada", "Manutenção preventiva especializada"]
  }
];

export default function ServicesPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground">
      <PremiumHeader />
      
      <div className="h-32 lg:h-48" />

      <section className="px-6 lg:px-12 mb-32">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            alignment="left"
            subtitle="Ecossistema Carrera"
            title="Soluções inteligentes para um patrimônio automotivo de alto padrão."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {detailedServices.map((service, idx) => {
              const Icon = Icons[service.iconName] as React.ElementType;
              return (
              <div key={idx} className="bg-surface-base border border-white/5 p-12 relative group h-full flex flex-col">
                <div className="mb-10 text-brand-gold">
                   <Icon size={48} strokeWidth={1} />
                </div>
                
                <h3 className="text-3xl font-serif italic mb-6">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-10 flex-grow font-sans">
                  {service.description}
                </p>

                <ul className="space-y-4 mb-10">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm text-foreground/80">
                      <div className="w-1 h-1 bg-brand-gold rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold hover:text-white transition-colors flex items-center gap-4 group/btn">
                  Solicitar Consultoria
                  <div className="h-[1px] w-12 bg-brand-gold/30 group-hover/btn:w-20 group-hover/btn:bg-white transition-all" />
                </button>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid (Complementary) */}
      <section className="py-32 px-6 lg:px-12 bg-surface-base border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            subtitle="Complementares"
            title="Suporte completo em todas as frentes automotivas."
          />
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
             {[
               { iconName: "Search", name: "Vistoria Técnica" },
               { iconName: "PenTool", name: "Funilaria Premium" },
               { iconName: "UserCheck", name: "Consultoria Jurídica" },
               { iconName: "BarChart", name: "Análise de Portfólio" }
             ].map((item, idx) => {
               const Icon = Icons[item.iconName as keyof typeof Icons] as React.ElementType;
               return (
               <div key={idx} className="flex flex-col items-center text-center">
                 <div className="w-16 h-16 border border-white/10 flex items-center justify-center mb-6 text-brand-gold/50 group hover:text-brand-gold hover:border-brand-gold transition-all duration-500">
                    <Icon size={24} />
                 </div>
                 <span className="text-xs uppercase tracking-widest font-medium text-muted-foreground">{item.name}</span>
               </div>
               );
             })}
          </div>
        </div>
      </section>

      <PremiumFooter />
    </main>
  );
}
