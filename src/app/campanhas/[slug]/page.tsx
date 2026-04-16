import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/premium/breadcrumb";
import { LeadForm } from "@/components/premium/lead-form";
import { SITE_CONFIG } from "@/data/constants";
import { MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Estrutura base para landing pages de campanha.
 *
 * Para criar uma campanha nova, adicione um objeto ao array `campaigns`
 * com slug, título, descrição e conteúdo. Futuramente, conectar com CMS.
 */

const campaigns = [
  {
    slug: "avaliacao-gratis",
    title: "Avaliação Gratuita do Seu Veículo Premium",
    description:
      "Descubra o valor real do seu veículo com uma avaliação profissional sem compromisso em São Paulo. Nossa equipe analisa o mercado e posiciona seu ativo para máxima valorização.",
    eyebrow: "Venda Inteligente",
    ctaText: "Solicitar Avaliação Gratuita",
    features: [
      "Análise de mercado personalizada",
      "Posicionamento estratégico de preço",
      "Sem compromisso",
      "Resposta em até 24 horas",
    ],
  },
  {
    slug: "curadoria-personalizada",
    title: "Encontre seu Carro Premium com Procedência",
    description:
      "Nossa consultoria ativa a rede de relacionamento em São Paulo para encontrar o veículo dos seus sonhos, com histórico verificado e laudo cautelar aprovado.",
    eyebrow: "Compra Consultiva",
    ctaText: "Ativar Curadoria Agora",
    features: [
      "Filtro rigoroso de procedência",
      "Busca em estoque 'off-market'",
      "Negociação profissional",
      "Apoio documental completo",
    ],
  },
];

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const campaign = campaigns.find((c) => c.slug === slug);

  if (!campaign) {
    return { title: "Campanha não encontrada" };
  }

  return {
    title: campaign.title,
    description: campaign.description,
    robots: { index: true, follow: true },
  };
}

export default async function CampaignPage({ params }: PageProps) {
  const { slug } = await params;
  const campaign = campaigns.find((c) => c.slug === slug);

  if (!campaign) {
    notFound();
  }

  return (
    <>
      {/* Campaign Hero */}
      <section className="pt-32 lg:pt-44 pb-16 lg:pb-20 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-brand-gold text-[9px] uppercase tracking-[0.8em] font-medium mb-8 block opacity-60">
            {campaign.eyebrow}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight leading-[1.08] text-white/90 mb-6">
            {campaign.title}
          </h1>
          <p className="text-white/45 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed mb-10">
            {campaign.description}
          </p>
          <Link
            href={SITE_CONFIG.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-brand-gold text-black px-12 py-6 text-[10px] uppercase tracking-[0.4em] font-bold rounded-sm hover:bg-[#C5A030] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-brand-gold/10"
          >
            <MessageCircle size={14} />
            {campaign.ctaText}
          </Link>
        </div>
      </section>

      {/* Features + Form */}
      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb
            items={[
              { name: "Campanhas", href: "/campanhas/avaliacao-gratis" },
              { name: campaign.title, href: `/campanhas/${campaign.slug}` },
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-8">
            <div>
              <h2 className="text-xl font-serif italic mb-6 text-white/90">
                O que você recebe
              </h2>
              <ul className="space-y-4">
                {campaign.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-sm text-white/60"
                  >
                    <ArrowRight
                      size={12}
                      className="text-brand-gold/60 shrink-0"
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <LeadForm title="Preencha seus dados" />
          </div>
        </div>
      </section>
    </>
  );
}
