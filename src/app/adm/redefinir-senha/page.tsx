"use client";

import { updatePassword } from "../actions";
import { LogoCarrera } from "@/components/premium/logo-carrera";
import { useState } from "react";
import { ShieldCheck, Lock } from "lucide-react";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;

    if (password !== confirm) {
      setError("As senhas não coincidem");
      setLoading(false);
      return;
    }

    const result = await updatePassword(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-12">
        <div className="flex flex-col items-center gap-6">
          <LogoCarrera />
          <div className="text-center">
            <span className="text-brand-gold text-[9px] uppercase tracking-[0.8em] font-medium block opacity-50 mb-2">
              Segurança
            </span>
            <h1 className="text-xl font-serif italic text-white/90">Nova Senha</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/25 ml-1">
                Nova Senha
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full bg-[#080808] border border-white/5 py-4 px-5 rounded-sm focus:outline-none focus:border-brand-gold/50 transition-colors font-sans text-sm text-white placeholder:text-white/10"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/25 ml-1">
                Confirmar Senha
              </label>
              <input
                name="confirm"
                type="password"
                required
                className="w-full bg-[#080808] border border-white/5 py-4 px-5 rounded-sm focus:outline-none focus:border-brand-gold/50 transition-colors font-sans text-sm text-white placeholder:text-white/10"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="text-[10px] text-red-500/80 uppercase tracking-widest text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-gold text-black py-5 text-[10px] uppercase tracking-[0.4em] font-bold rounded-sm hover:bg-[#C5A030] transition-all active:scale-[0.98] shadow-xl shadow-brand-gold/10 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            <ShieldCheck size={16} />
            {loading ? "Salvando..." : "Redefinir Senha"}
          </button>
        </form>

        <p className="text-center text-[9px] text-white/15 uppercase tracking-[0.3em] leading-relaxed">
          Escolha uma senha forte para garantir<br/>a segurança da sua conta corporativa.
        </p>
      </div>
    </div>
  );
}
