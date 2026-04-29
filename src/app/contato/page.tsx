import type { Metadata } from "next";
import { Breadcrumb } from "@/components/premium/breadcrumb";
import { PageHero } from "@/components/premium/page-hero";

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
        eyebrow="CONSULTORIA EM SÃO PAULO"
        title="Antes de negociar, fale com quem entende o mercado."
        description="Entre em contato com a Carrera Imports e receba uma condução discreta, criteriosa e alinhada ao seu objetivo: comprar, vender ou encontrar o veículo certo."
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop"
        backgroundAlt="Arquitetura urbana premium - São Paulo"
        accentPosition="right"
      />

      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[{ name: "Contato", href: "/contato" }]} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Information */}
            <div className="space-y-12">
              <div className="space-y-6">
                <p className="text-white/45 text-[15px] leading-[1.8] font-sans font-light max-w-lg">
                  Antes de comprar, vender ou avaliar um veículo premium, fale com quem sabe conduzir esse tipo de negociação.
                  <br /><br />
                  A Carrera Imports atende clientes que buscam discrição, procedência e clareza para tomar decisões automotivas com mais segurança.
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
                        WHATSAPP
                      </span>
                      <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                        Atendimento direto
                      </span>
                    </div>
                  </Link>
                  <div className="flex items-center gap-5 group">
                    <div className="w-12 h-12 border border-white/[0.08] bg-[#080808] rounded-sm flex items-center justify-center text-brand-gold/60">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/25 block mb-0.5">
                        E-MAIL
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
                        LOCALIZAÇÃO
                      </span>
                      <span className="text-sm font-medium text-white/70">
                        {SITE_CONFIG.location.full}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours & Map */}
              <div className="space-y-8">
                <div className="p-8 border border-white/5 bg-[#080808] rounded-sm">
                  <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-5 text-brand-gold/60">
                    HORÁRIO DE ATENDIMENTO
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-[11px] tracking-[0.2em] uppercase">
                      <span className="text-white/30">SEGUNDA A SEXTA</span>
                      <span className="text-white/70 font-medium">
                        09H ÀS 19H
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] tracking-[0.2em] uppercase">
                      <span className="text-white/30">SÁBADOS</span>
                      <span className="text-white/70 font-medium">
                        10H ÀS 14H
                      </span>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="w-full aspect-video border border-white/10 rounded-sm overflow-hidden relative group">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.3685!2d-46.6976!3d-23.6090!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce57223e743603%3A0xc3461421c6139c8c!2sAv.%20Eng.%20Lu%C3%ADs%20Carlos%20Berrini%2C%201748%20-%20Itaim%20Bibi%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004571-010!5e0!3m2!1spt-BR!2sbr!4v1714347700000!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "grayscale(1) contrast(1.2) opacity(0.6)" }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização Carrera Imports"
                    className="grayscale hover:grayscale-0 transition-all duration-700"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Contact Form Area */}
            <div className="bg-[#080808] border border-white/5 p-10 lg:p-14 rounded-sm h-fit">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold/60 mb-2">
                INICIE SUA CONSULTORIA
              </h3>
              <p className="text-white/30 text-xs mb-8 font-light">
                Preencha seus dados ou entre em contato diretamente via WhatsApp para um atendimento imediato.
              </p>
              <div className="space-y-8">
                {/* Form fields (visual only now, or we can keep them for context before clicking) */}
                <div className="space-y-2">
                  <label
                    className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/25"
                  >
                    NOME COMPLETO
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-white/[0.08] py-3 focus:outline-none focus:border-brand-gold transition-colors font-sans text-sm text-white placeholder:text-white/15"
                    placeholder="Seu nome"
                  />
                </div>
                
                <div className="space-y-2">
                  <label
                    className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/25"
                  >
                    ASSUNTO DE INTERESSE
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-white/[0.08] py-3 focus:outline-none focus:border-brand-gold transition-colors font-sans text-sm text-white placeholder:text-white/15"
                    placeholder="Comprar, vender ou consultoria"
                  />
                </div>

                <Link
                  href={SITE_CONFIG.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-brand-gold text-black py-5 text-[10px] uppercase tracking-[0.4em] font-bold flex items-center justify-center gap-3 hover:bg-[#C5A030] transition-all hover:scale-[1.01] active:scale-[0.99] rounded-sm mt-10"
                >
                  <MessageCircle size={16} />
                  SOLICITAR VIA WHATSAPP
                </Link>
                
                <p className="text-center text-[9px] uppercase tracking-[0.2em] text-white/20 pt-4">
                  Resposta imediata em horário comercial
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
