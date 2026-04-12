import { PremiumHeader } from "@/components/premium/premium-header";
import { PremiumFooter } from "@/components/premium/premium-footer";
import { SectionTitle } from "@/components/premium/section-title";
import { MessageSquare, Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground">
      <PremiumHeader />
      
      <div className="h-32 lg:h-48" />

      <section className="px-6 lg:px-12 mb-32">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            alignment="left"
            subtitle="Conexão"
            title="Estamos prontos para conduzir o seu próximo passo no mercado premium."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {/* Contact Information */}
            <div className="space-y-16">
              <div className="space-y-8">
                <p className="text-muted-foreground text-lg leading-relaxed font-sans max-w-lg">
                  Seja para vender um ativo com discrição ou encontrar um exemplar raro, nossa equipe consultiva retornará o seu contato com a agilidade que o seu tempo exige.
                </p>
                
                <div className="space-y-8 pt-8">
                  <div className="flex items-center gap-6 group">
                     <div className="w-14 h-14 border border-white/5 bg-surface-base flex items-center justify-center text-brand-gold group-hover:border-brand-gold transition-all duration-500">
                        <MessageSquare size={20} />
                     </div>
                     <div>
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 block mb-1">WhatsApp</span>
                        <span className="text-sm font-bold tracking-widest uppercase">Atendimento Digital Imediato</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-6 group">
                     <div className="w-14 h-14 border border-white/5 bg-surface-base flex items-center justify-center text-brand-gold group-hover:border-brand-gold transition-all duration-500">
                        <Mail size={20} />
                     </div>
                     <div>
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 block mb-1">E-mail</span>
                        <span className="text-sm font-bold tracking-widest uppercase">contato@carreraimports.com.br</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-6 group">
                     <div className="w-14 h-14 border border-white/5 bg-surface-base flex items-center justify-center text-brand-gold group-hover:border-brand-gold transition-all duration-500">
                        <MapPin size={20} />
                     </div>
                     <div>
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 block mb-1">Localização</span>
                        <span className="text-sm font-bold tracking-widest uppercase">Showroom Privado - São Paulo / SP</span>
                     </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="p-10 border border-white/5 bg-surface-base/30">
                 <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-6 text-brand-gold">Expediente Consultivo</h4>
                 <div className="space-y-3">
                   <div className="flex justify-between text-xs tracking-widest uppercase">
                     <span className="text-muted-foreground">Segunda a Sexta</span>
                     <span className="text-foreground">09h às 19h</span>
                   </div>
                   <div className="flex justify-between text-xs tracking-widest uppercase">
                     <span className="text-muted-foreground">Sábados</span>
                     <span className="text-foreground">10h às 14h</span>
                   </div>
                 </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-surface-base border border-white/5 p-12 lg:p-16">
              <form className="space-y-10">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Nome Completo</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-brand-gold transition-colors font-sans text-sm" placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">E-mail Corporativo / Pessoal</label>
                  <input type="email" className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-brand-gold transition-colors font-sans text-sm" placeholder="seu@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Telefone / WhatsApp</label>
                  <input type="tel" className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-brand-gold transition-colors font-sans text-sm" placeholder="(11) 99999-9999" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Mensagem / Interesse</label>
                  <textarea rows={4} className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-brand-gold transition-colors font-sans text-sm resize-none" placeholder="Como podemos ajudar?" />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-brand-gold text-black py-6 text-sm uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-4 hover:bg-brand-copper transition-all"
                >
                  Enviar Mensagem
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <PremiumFooter />
    </main>
  );
}
