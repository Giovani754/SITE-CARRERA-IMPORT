"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageSquare, Car } from "lucide-react";
import { LogoCarrera } from "./logo-carrera";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Início", href: "/" },
  { name: "Sobre", href: "/sobre" },
  { name: "Serviços", href: "/servicos" },
  { name: "Estoque", href: "/estoque" },
  { name: "Contato", href: "/contato" },
];

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
          ? "py-3 glass-header" 
          : "py-6 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="transition-all hover:opacity-80 duration-300">
          <LogoCarrera className="w-32 lg:w-40" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-xs uppercase tracking-[0.2em] font-medium transition-colors hover:text-brand-gold relative group",
                pathname === item.href ? "text-brand-gold" : "text-foreground/80"
              )}
            >
              {item.name}
              <span className={cn(
                "absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-full",
                pathname === item.href ? "w-full" : "w-0"
              )} />
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            href="/estoque"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-foreground hover:text-brand-gold transition-colors"
          >
            <Car size={16} />
            Estoque
          </Link>
          <Link
            href="https://wa.me/YOUR_NUMBER"
            target="_blank"
            className="bg-brand-gold hover:bg-brand-copper text-black px-6 py-3 rounded-sm text-xs uppercase tracking-widest font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-brand-gold/20"
          >
            <MessageSquare size={16} />
            Falar com Consultor
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 flex flex-col p-8 gap-6 lg:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-lg font-serif italic tracking-wide",
                  pathname === item.href ? "text-brand-gold" : "text-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="https://wa.me/YOUR_NUMBER"
              className="bg-brand-gold text-black py-4 rounded-sm text-center text-xs uppercase tracking-widest font-bold mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Consultor via WhatsApp
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
