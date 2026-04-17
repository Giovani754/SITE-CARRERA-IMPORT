"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Car, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/adm/dashboard", icon: LayoutDashboard },
  { label: "Veículos", href: "/adm/veiculos", icon: Car },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 p-6 space-y-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-4 px-4 py-3 text-[10px] uppercase tracking-[0.3em] font-bold transition-all rounded-sm",
              isActive 
                ? "text-brand-gold bg-white/[0.03]" 
                : "text-white/40 hover:text-brand-gold hover:bg-white/[0.02]"
            )}
          >
            <item.icon size={15} strokeWidth={isActive ? 2 : 1.5} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
