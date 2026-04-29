"use client";

import { requestPasswordReset } from "../actions";
import { LogoCarrera } from "@/components/premium/logo-carrera";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function RecoverPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await requestPasswordReset(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
    }
  }

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-12">
        <div className="flex flex-col items-center gap-6">
          <LogoCarrera />
          <div className="text-center">
            <span className="text-brand-gold text-[9px] uppercase tracking-[0.8em] font-medium block opacity-50 mb-2">
              Recuperação
            </span>
            <h1 className="text-xl font-serif italic text-white/90">Recuperar Senha</h1>
          </div>
        </div>

        {success ? (
          <div className="space-y-8 text-center animate-in fade-in zoom-in duration-500">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-sm bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold">
                <CheckCircle size={32} />
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-white/80">E-mail de recuperação enviado!</p>
              <p className="text-xs text-white/30 leading-relaxed font-light">
                Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
              </p>
            </div>
            <Link 
              href="/adm"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              Voltar ao Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/25 ml-1">
                  E-mail de Acesso
                </label>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-[#080808] border border-white/5 py-4 px-5 rounded-sm focus:outline-none focus:border-brand-gold/50 transition-colors font-sans text-sm text-white placeholder:text-white/10"
                    placeholder="seu@email.com.br"
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="text-[10px] text-red-500/80 uppercase tracking-widest text-center">{error}</p>
            )}

            <div className="space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-gold text-black py-5 text-[10px] uppercase tracking-[0.4em] font-bold rounded-sm hover:bg-[#C5A030] transition-all active:scale-[0.98] shadow-xl shadow-brand-gold/10 disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Enviar Instruções"}
              </button>
              
              <Link 
                href="/adm"
                className="flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.3em] font-bold text-white/20 hover:text-white transition-colors py-2"
              >
                <ArrowLeft size={12} />
                Voltar
              </Link>
            </div>
          </form>
        )}

        <p className="text-center text-[9px] text-white/15 uppercase tracking-[0.3em] leading-relaxed">
          Se você não receber o e-mail em alguns minutos,<br/>verifique sua pasta de spam.
        </p>
      </div>
    </div>
  );
}
