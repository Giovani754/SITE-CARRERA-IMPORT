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

  // WhatsApp — substituir pelo número real do cliente
  whatsapp: {
    number: "5511999999999",
    message: "Olá! Gostaria de saber mais sobre a Carrera Imports.",
    get url() {
      return `https://wa.me/${this.number}?text=${encodeURIComponent(this.message)}`;
    },
    /** URL sem mensagem pré-definida */
    get urlClean() {
      return `https://wa.me/${this.number}`;
    },
  },

  contact: {
    email: "contato@carreraimports.com.br",
    phone: "(11) 99999-9999",
  },

  location: {
    city: "São Paulo",
    state: "SP",
    full: "São Paulo, SP",
    label: "São Paulo / SP",
  },

  social: {
    instagram: "https://instagram.com/carreraimports",
    linkedin: "https://linkedin.com/company/carreraimports",
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
