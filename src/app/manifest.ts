import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Carrera Imports — Consultoria Automotiva Premium",
    short_name: "Carrera Imports",
    description:
      "Intermediação estratégica e consultoria de veículos de alto padrão em São Paulo.",
    start_url: "/",
    display: "standalone",
    background_color: "#030303",
    theme_color: "#C5A030",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
