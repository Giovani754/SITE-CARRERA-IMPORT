import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estoque Premium | Veículos Selecionados pela Carrera Imports",
  description:
    "Confira veículos premium selecionados com análise de procedência, histórico, conservação e margem de negociação pela Carrera Imports.",
  openGraph: {
    title: "Estoque Premium | Veículos Selecionados pela Carrera Imports",
    description:
      "Confira veículos premium selecionados com análise de procedência, histórico, conservação e margem de negociação pela Carrera Imports.",
  },
};

export default function EstoqueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
