"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

interface LeadFormProps {
  variant?: "default" | "inline";
  title?: string;
}

export function LeadForm({
  variant = "default",
  title = "Fale com nossa equipe",
}: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — conectar com API/webhook futuramente
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex flex-col items-center justify-center gap-4 text-center ${
          variant === "inline" ? "py-12" : "p-12 bg-surface-base border border-white/5"
        }`}
      >
        <CheckCircle size={40} className="text-brand-gold" />
        <h4 className="text-lg font-serif italic text-white/90">
          Mensagem enviada
        </h4>
        <p className="text-sm text-white/40 font-light">
          Nossa equipe retornará em breve. Obrigado pelo seu interesse.
        </p>
      </motion.div>
    );
  }

  return (
    <div
      className={
        variant === "inline"
          ? ""
          : "bg-surface-base border border-white/5 p-10 lg:p-14"
      }
    >
      {title && (
        <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold mb-8">
          {title}
        </h4>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="lead-name"
            className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30"
          >
            Nome
          </label>
          <input
            id="lead-name"
            type="text"
            required
            placeholder="Seu nome"
            className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-brand-gold transition-colors font-sans text-sm text-white placeholder:text-white/20"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="lead-phone"
            className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30"
          >
            Telefone / WhatsApp
          </label>
          <input
            id="lead-phone"
            type="tel"
            required
            placeholder="(11) 99999-9999"
            className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-brand-gold transition-colors font-sans text-sm text-white placeholder:text-white/20"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="lead-interest"
            className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30"
          >
            Interesse
          </label>
          <select
            id="lead-interest"
            className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-brand-gold transition-colors font-sans text-sm text-white/60 appearance-none cursor-pointer"
          >
            <option value="" className="bg-[#0a0a0a]">
              Selecione...
            </option>
            <option value="comprar" className="bg-[#0a0a0a]">
              Quero comprar um veículo
            </option>
            <option value="vender" className="bg-[#0a0a0a]">
              Quero vender meu veículo
            </option>
            <option value="consultoria" className="bg-[#0a0a0a]">
              Consultoria automotiva
            </option>
            <option value="outro" className="bg-[#0a0a0a]">
              Outro assunto
            </option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-brand-gold text-black py-5 text-[10px] uppercase tracking-[0.4em] font-bold flex items-center justify-center gap-3 hover:bg-[#C5A030] transition-all hover:scale-[1.01] active:scale-[0.99] rounded-sm mt-4"
        >
          <Send size={14} />
          Enviar
        </button>
      </form>
    </div>
  );
}
