import React from "react";
import Link from "next/link";
import { Instagram, Linkedin, MessageSquare, Phone, Mail, MapPin } from "lucide-react";
import { LogoCarrera } from "./logo-carrera";

export function PremiumFooter() {
  return (
    <footer className="bg-background border-t border-white/5 pt-24 pb-12 px-6 lg:px-12 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Info */}
          <div className="flex flex-col gap-8">
            <Link href="/">
              <LogoCarrera className="w-48" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs font-sans tracking-wide">
              Especialistas em intermediação e posicionamento estratégico de veículos premium. Unindo inteligência de mercado e paixão automotiva.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center text-muted-foreground hover:text-brand-gold hover:border-brand-gold transition-all">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center text-muted-foreground hover:text-brand-gold hover:border-brand-gold transition-all">
                <Linkedin size={18} />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.4em] font-bold mb-10 text-brand-gold">Navegação</h4>
            <ul className="flex flex-col gap-5">
              <li><Link href="/sobre" className="text-sm text-muted-foreground hover:text-foreground transition-colors">A Empresa</Link></li>
              <li><Link href="/servicos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Serviços</Link></li>
              <li><Link href="/estoque" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Estoque Curado</Link></li>
              <li><Link href="/contato" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.4em] font-bold mb-10 text-brand-gold">Serviços</h4>
            <ul className="flex flex-col gap-5">
              <li className="text-sm text-muted-foreground">Consultoria Estratégica</li>
              <li className="text-sm text-muted-foreground">Intermediação de Venda</li>
              <li className="text-sm text-muted-foreground">Curadoria de Veículos</li>
              <li className="text-sm text-muted-foreground">Serviços Premium</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.4em] font-bold mb-10 text-brand-gold">Canais</h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-3">
                <MessageSquare size={18} className="text-brand-gold shrink-0" />
                <span className="text-sm text-muted-foreground">Atendimento Digital via WhatsApp</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-brand-gold shrink-0" />
                <span className="text-sm text-muted-foreground">contato@carreraimports.com.br</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-gold shrink-0" />
                <span className="text-sm text-muted-foreground">Sede em São Paulo / SP</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
            © {new Date().getFullYear()} CARRERA IMPORTS. TODOS OS DIREITOS RESERVADOS.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-[10px] uppercase tracking-widest text-muted-foreground/50 hover:text-white transition-colors">Termos de Uso</Link>
            <Link href="#" className="text-[10px] uppercase tracking-widest text-muted-foreground/50 hover:text-white transition-colors">Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
