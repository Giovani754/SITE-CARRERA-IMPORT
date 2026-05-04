"use client";

import { usePathname } from "next/navigation";
import { PremiumHeader } from "@/components/premium/premium-header";
import { PremiumFooter } from "@/components/premium/premium-footer";
import { WhatsAppButton } from "@/components/premium/whatsapp-button";

export function PublicLayoutElements({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/adm");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <PremiumHeader />
      <main className="flex-1">{children}</main>
      <PremiumFooter />
      <WhatsAppButton />
    </>
  );
}
