// ============================================
// Carrera Imports — Dados Centralizados
// ============================================
// Altere aqui para refletir em todo o site.

export const SITE_CONFIG = {
  name: "Carrera Imports",
  tagline: "Consultoria Automotiva Premium",
  description:
    "Intermediação estratégica e consultoria de veículos de alto padrão em São Paulo. Procedência, atendimento personalizado e eficácia.",

  // Domínio — substituir quando adquirido
  domain: "https://carreraimports.com.br",

  // WhatsApp — official number
  whatsapp: {
    number: "5511989189050",
    message: "Olá! Vim pelo site da Carrera Imports e gostaria de falar com um consultor.",
    get url() {
      return `https://wa.me/${this.number}?text=${encodeURIComponent(this.message)}`;
    },
    /** URL sem mensagem pré-definida */
    get urlClean() {
      return `https://wa.me/${this.number}`;
    },
  },

  contact: {
    email: "carrera.imports9@gmail.com",
    phone: "(11) 98918-9050",
  },

  location: {
    city: "São Paulo",
    state: "SP",
    full: "Av. Engenheiro Luís Carlos Berrini, 1748 - Itaim Bibi, São Paulo - SP, 04571-010",
    label: "São Paulo / SP",
  },

  social: {
    instagram: "https://www.instagram.com/carreraimports_/",
  },

  hours: {
    weekdays: "09h às 19h",
    saturday: "10h às 14h",
  },
} as const;

/** Itens de navegação principal */
export const NAV_ITEMS = [
  { name: "Início", href: "/" },
  { name: "Sobre", href: "/sobre" },
  { name: "Serviços", href: "/servicos" },
  { name: "Estoque", href: "/estoque" },
  { name: "Contato", href: "/contato" },
] as const;
