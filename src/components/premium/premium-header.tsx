"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { LogoCarrera } from "./logo-carrera";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, SITE_CONFIG } from "@/data/constants";

export function PremiumHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 lg:px-12",
        isScrolled
          ? "glass-header shadow-lg h-18"
          : "bg-transparent h-22"
      )}
    >
      <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-between">
        {/* Logo — protagonismo visual */}
        <Link
          href="/"
          className="transition-all hover:opacity-80 duration-300 flex items-center shrink-0"
        >
          <LogoCarrera className="w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-12">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-[10px] uppercase tracking-[0.4em] font-light transition-all duration-500 hover:text-brand-gold relative group",
                pathname === item.href
                  ? "text-brand-gold"
                  : "text-foreground/40"
              )}
            >
              {item.name}
              <span
                className={cn(
                  "absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-[0.5px] bg-brand-gold transition-all duration-500 group-hover:w-full",
                  pathname === item.href ? "w-full" : "w-0"
                )}
              />
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center">
          <Link
            href={SITE_CONFIG.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-gold hover:bg-[#C5A030] text-black px-7 py-3.5 rounded-sm text-[10px] uppercase tracking-[0.3em] font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2.5 shadow-lg shadow-brand-gold/10"
          >
            <MessageCircle size={14} />
            Falar com Consultor
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-[#030303]/98 backdrop-blur-2xl border-b border-white/5 flex flex-col p-8 gap-6 lg:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-lg font-serif italic tracking-wide transition-colors",
                  pathname === item.href
                    ? "text-brand-gold"
                    : "text-foreground/70 hover:text-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={SITE_CONFIG.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-gold text-black py-4 rounded-sm text-center text-[10px] uppercase tracking-[0.3em] font-bold mt-4 flex items-center justify-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MessageCircle size={14} />
              WhatsApp
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
