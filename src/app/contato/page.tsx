import type { Metadata } from "next";
import { Breadcrumb } from "@/components/premium/breadcrumb";
import { PageHero } from "@/components/premium/page-hero";
import { LeadForm } from "@/components/premium/lead-form";
import { LocalBusinessJsonLd } from "@/components/seo/json-ld";
import { SITE_CONFIG } from "@/data/constants";
import {
  MessageCircle,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a Carrera Imports. Consultoria automotiva premium em São Paulo. WhatsApp, e-mail e atendimento personalizado para compra e venda de veículos de alto padrão.",
  openGraph: {
    title: "Contato | Carrera Imports",
    description:
      "Fale com a Carrera Imports. Atendimento personalizado para compra e venda de veículos premium em São Paulo.",
  },
};

export default function ContactPage() {
  return (
    <>
      <LocalBusinessJsonLd />

      <PageHero
        eyebrow="Consultoria em São Paulo"
        title="Estamos prontos para conduzir o seu próximo passo na capital."
        description="Fale com nossa equipe estratégica em São Paulo. Atendimento personalizado para o mercado de alto desempenho."
      />

      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[{ name: "Contato", href: "/contato" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Information */}
            <div className="space-y-12">
              <div className="space-y-6">
                <p className="text-white/45 text-[15px] leading-[1.8] font-sans font-light max-w-lg">
                  Seja para vender um veículo com discrição ou encontrar um
                  exemplar premium com procedência, nossa equipe oferece
                  atendimento personalizado com rapidez e eficácia.
                </p>

                <div className="space-y-6 pt-6">
                  <Link
                    href={SITE_CONFIG.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-5 group"
                  >
                    <div className="w-12 h-12 border border-white/[0.08] bg-[#080808] rounded-sm flex items-center justify-center text-brand-gold/60 group-hover:border-brand-gold/30 group-hover:text-brand-gold transition-all duration-500">
                      <MessageCircle size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/25 block mb-0.5">
                        WhatsApp
                      </span>
                      <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                        Atendimento Imediato
                      </span>
                    </div>
                  </Link>
                  <div className="flex items-center gap-5 group">
                    <div className="w-12 h-12 border border-white/[0.08] bg-[#080808] rounded-sm flex items-center justify-center text-brand-gold/60">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/25 block mb-0.5">
                        E-mail
                      </span>
                      <span className="text-sm font-medium text-white/70">
                        {SITE_CONFIG.contact.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 group">
                    <div className="w-12 h-12 border border-white/[0.08] bg-[#080808] rounded-sm flex items-center justify-center text-brand-gold/60">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/25 block mb-0.5">
                        Localização
                      </span>
                      <span className="text-sm font-medium text-white/70">
                        {SITE_CONFIG.location.full}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours & Map Placeholder */}
              <div className="space-y-8">
                <div className="p-8 border border-white/5 bg-[#080808] rounded-sm">
                  <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-5 text-brand-gold/60">
                    Horário de Atendimento
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-[11px] tracking-[0.2em] uppercase">
                      <span className="text-white/30">Segunda a Sexta</span>
                      <span className="text-white/70 font-medium">
                        {SITE_CONFIG.hours.weekdays}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] tracking-[0.2em] uppercase">
                      <span className="text-white/30">Sábados</span>
                      <span className="text-white/70 font-medium">
                        {SITE_CONFIG.hours.saturday}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="aspect-video bg-surface-base border border-white/5 overflow-hidden filter grayscale opacity-40 hover:opacity-60 transition-opacity rounded-sm relative group">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin size={24} className="text-brand-gold/30" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-[2px] text-[8px] uppercase tracking-widest text-white/50">
                    SÃO PAULO, SP — JARDINS
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#080808] border border-white/5 p-10 lg:p-14 rounded-sm">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold/60 mb-2">
                Envie uma Mensagem
              </h3>
              <p className="text-white/30 text-xs mb-8 font-light">
                Preencha o formulário e retornaremos em breve.
              </p>
              <form className="space-y-8">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/25"
                  >
                    Nome Completo
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    className="w-full bg-transparent border-b border-white/[0.08] py-3 focus:outline-none focus:border-brand-gold transition-colors font-sans text-sm text-white placeholder:text-white/15"
                    placeholder="Seu nome"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/25"
                  >
                    E-mail
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    className="w-full bg-transparent border-b border-white/[0.08] py-3 focus:outline-none focus:border-brand-gold transition-colors font-sans text-sm text-white placeholder:text-white/15"
                    placeholder="seu@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-phone"
                    className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/25"
                  >
                    Telefone / WhatsApp
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    className="w-full bg-transparent border-b border-white/[0.08] py-3 focus:outline-none focus:border-brand-gold transition-colors font-sans text-sm text-white placeholder:text-white/15"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/25"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    className="w-full bg-transparent border-b border-white/[0.08] py-3 focus:outline-none focus:border-brand-gold transition-colors font-sans text-sm resize-none text-white placeholder:text-white/15"
                    placeholder="Como podemos ajudar?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-gold text-black py-5 text-[10px] uppercase tracking-[0.4em] font-bold flex items-center justify-center gap-3 hover:bg-[#C5A030] transition-all hover:scale-[1.01] active:scale-[0.99] rounded-sm"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
