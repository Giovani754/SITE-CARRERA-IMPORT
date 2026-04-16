import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estoque",
  description:
    "Confira nosso acervo de veículos premium rigorosamente selecionados. Porsche, BMW, Audi, Mercedes-Benz e mais. Consultoria automotiva em São Paulo com procedência garantida.",
  openGraph: {
    title: "Estoque de Veículos Premium | Carrera Imports",
    description:
      "Veículos de alto padrão com procedência garantida. Curadoria premium em São Paulo.",
  },
};

export default function EstoqueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
