export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

/**
 * Depoimentos mockados — substituir por dados reais quando disponíveis.
 * Estrutura preparada para conectar com CMS/banco futuramente.
 */
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ricardo M.",
    role: "Empresário",
    quote:
      "A Carrera Imports conduziu a venda do meu Porsche com total discrição e profissionalismo. Em menos de duas semanas, o veículo foi negociado acima do valor que eu esperava.",
    rating: 5,
  },
  {
    id: "2",
    name: "Fernanda L.",
    role: "Médica",
    quote:
      "Precisava de um carro premium com procedência garantida e não tinha tempo para pesquisar. A equipe encontrou exatamente o que eu queria, com toda a documentação verificada.",
    rating: 5,
  },
  {
    id: "3",
    name: "André S.",
    role: "Advogado",
    quote:
      "Atendimento impecável do início ao fim. A consultoria me ajudou a entender o melhor momento para trocar meu veículo e maximizar o retorno. Recomendo sem ressalvas.",
    rating: 5,
  },
  {
    id: "4",
    name: "Marcos T.",
    role: "Investidor",
    quote:
      "Já negociei três veículos com a Carrera. A confiança e a rapidez no processo fazem toda a diferença quando você não pode perder tempo.",
    rating: 5,
  },
];
