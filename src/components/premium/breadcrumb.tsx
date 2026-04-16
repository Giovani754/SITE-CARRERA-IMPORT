import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems = [{ name: "Início", href: "/" }, ...items];

  return (
    <>
      <BreadcrumbJsonLd items={allItems} />
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold mb-8"
      >
        {allItems.map((item, idx) => (
          <React.Fragment key={item.href}>
            {idx > 0 && (
              <ChevronRight size={10} className="text-white/20 shrink-0" />
            )}
            {idx === allItems.length - 1 ? (
              <span className="text-white/50">{item.name}</span>
            ) : (
              <Link
                href={item.href}
                className="text-white/30 hover:text-brand-gold transition-colors"
              >
                {item.name}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>
    </>
  );
}
