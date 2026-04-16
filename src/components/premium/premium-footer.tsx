import React from "react";
import Link from "next/link";
import {
  Instagram,
  Linkedin,
  MessageCircle,
  Mail,
  MapPin,
} from "lucide-react";
import { LogoCarrera } from "./logo-carrera";
import { SITE_CONFIG, NAV_ITEMS } from "@/data/constants";

export function PremiumFooter() {
  return (
    <footer className="bg-[#030303] border-t border-white/5 pt-20 pb-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 mb-20">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link href="/">
              <LogoCarrera className="w-44" />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-sans">
              Consultoria automotiva premium e intermediação estratégica de
              veículos de alto padrão em São Paulo. Procedência, confiança e
              atendimento personalizado.
            </p>
            <div className="flex gap-3">
              <Link
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Carrera Imports"
                className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center text-white/30 hover:text-brand-gold hover:border-brand-gold/50 transition-all duration-500"
              >
                <Instagram size={16} />
              </Link>
              <Link
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn da Carrera Imports"
                className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center text-white/30 hover:text-brand-gold hover:border-brand-gold/50 transition-all duration-500"
              >
                <Linkedin size={16} />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-8 text-brand-gold/70">
              Navegação
            </h4>
            <ul className="flex flex-col gap-4">
              {NAV_ITEMS.filter((i) => i.href !== "/").map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/35 hover:text-white/80 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-8 text-brand-gold/70">
              Serviços
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="text-sm text-white/35">Consultoria Automotiva</li>
              <li className="text-sm text-white/35">
                Intermediação da Venda
              </li>
              <li className="text-sm text-white/35">
                Curadoria de Veículos Premium
              </li>
              <li className="text-sm text-white/35">
                Apoio Estratégico Comercial
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-8 text-brand-gold/70">
              Contato
            </h4>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3">
                <MessageCircle
                  size={16}
                  className="text-brand-gold/50 shrink-0 mt-0.5"
                />
                <Link
                  href={SITE_CONFIG.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/35 hover:text-white/80 transition-colors"
                >
                  WhatsApp — Atendimento Digital
                </Link>
              </li>
              <li className="flex items-start gap-3">
                <Mail
                  size={16}
                  className="text-brand-gold/50 shrink-0 mt-0.5"
                />
                <span className="text-sm text-white/35">
                  {SITE_CONFIG.contact.email}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="text-brand-gold/50 shrink-0 mt-0.5"
                />
                <span className="text-sm text-white/35">
                  {SITE_CONFIG.location.full}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] uppercase tracking-[0.4em] text-white/20">
            © {new Date().getFullYear()} Carrera Imports. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-8">
            <Link
              href="#"
              className="text-[9px] uppercase tracking-[0.4em] text-white/20 hover:text-white/50 transition-colors"
            >
              Termos de Uso
            </Link>
            <Link
              href="#"
              className="text-[9px] uppercase tracking-[0.4em] text-white/20 hover:text-white/50 transition-colors"
            >
              Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
