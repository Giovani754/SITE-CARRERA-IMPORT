"use client";

import React from "react";

interface JsonLdProps {
  data: Record<string, unknown>;
}

/** Componente genérico para injetar JSON-LD no head */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Schema markup de Organization */
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Carrera Imports",
        url: "https://carreraimports.com.br",
        logo: "https://carreraimports.com.br/logo-carrera-imports.png",
        description:
          "Consultoria automotiva premium e intermediação de veículos de alto padrão em São Paulo.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "São Paulo",
          addressRegion: "SP",
          addressCountry: "BR",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "contato@carreraimports.com.br",
        },
        sameAs: [
          "https://instagram.com/carreraimports",
          "https://linkedin.com/company/carreraimports",
        ],
      }}
    />
  );
}

/** Schema markup de LocalBusiness / AutoDealer */
export function LocalBusinessJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "AutoDealer",
        name: "Carrera Imports",
        description:
          "Intermediação estratégica e consultoria de veículos de alto padrão. Boutique automotiva premium em São Paulo.",
        url: "https://carreraimports.com.br",
        logo: "https://carreraimports.com.br/logo-carrera-imports.png",
        image: "https://carreraimports.com.br/logo-carrera-imports.png",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Av. Europa",
          addressLocality: "São Paulo",
          addressRegion: "SP",
          postalCode: "01449-001",
          addressCountry: "BR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "-23.585526",
          longitude: "-46.678433",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ],
            opens: "09:00",
            closes: "19:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "10:00",
            closes: "14:00",
          },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "contato@carreraimports.com.br",
          telephone: "+55-11-99999-9999",
        },
        priceRange: "$$$",
      }}
    />
  );
}

/** Schema markup de WebSite */
export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Carrera Imports",
        url: "https://carreraimports.com.br",
        description:
          "Consultoria automotiva premium e intermediação de veículos de alto padrão em São Paulo.",
        publisher: {
          "@type": "Organization",
          name: "Carrera Imports",
        },
      }}
    />
  );
}

/** Schema markup de BreadcrumbList */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `https://carreraimports.com.br${item.href}`,
        })),
      }}
    />
  );
}

/** Schema markup de Vehicle (para páginas de detalhe) */
export function VehicleJsonLd({
  vehicle,
}: {
  vehicle: {
    brand: string;
    model: string;
    year: number;
    mileage: string | number;
    price: string | number;
    fuel: string;
    transmission: string;
    color: string;
    image: string;
    description: string;
    slug: string;
  };
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Vehicle",
        name: `${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
        brand: {
          "@type": "Brand",
          name: vehicle.brand,
        },
        model: vehicle.model,
        modelDate: String(vehicle.year),
        vehicleModelDate: String(vehicle.year),
        mileageFromOdometer: {
          "@type": "QuantitativeValue",
          value: String(vehicle.mileage).replace(/[^\d]/g, ""),
          unitCode: "KMT",
        },
        fuelType: vehicle.fuel,
        vehicleTransmission: vehicle.transmission,
        color: vehicle.color,
        itemCondition: "https://schema.org/UsedCondition",
        image: vehicle.image,
        description: vehicle.description,
        url: `https://carreraimports.com.br/estoque/${vehicle.slug}`,
        offers: {
          "@type": "Offer",
          priceCurrency: "BRL",
          price: String(vehicle.price).includes("Consulta")
            ? undefined
            : String(vehicle.price).replace(/[^\d]/g, ""),
          availability: "https://schema.org/InStock",

          areaServed: {
            "@type": "City",
            name: "São Paulo",
          },
          seller: {
            "@type": "Organization",
            name: "Carrera Imports",
          },
        },
      }}
    />
  );
}
