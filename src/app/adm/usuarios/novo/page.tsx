"use client";

import { createTeamMember } from "../actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, UserPlus, Shield, Briefcase, Mail } from "lucide-react";
import Link from "next/link";

export default function NewUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await createTeamMember(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/adm/usuarios");
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link 
          href="/adm/usuarios"
          className="w-10 h-10 border border-white/5 rounded-sm flex items-center justify-center text-white/40 hover:text-white hover:border-white/10 transition-all"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h2 className="text-xl font-serif italic text-white/90">Novo Colaborador</h2>
          <p className="text-xs text-white/30 mt-1">Configure o acesso e perfil para o novo membro da equipe.</p>
        </div>
      </div>

      <div className="bg-[#080808] border border-white/5 p-10 rounded-sm">
        <form onSubmit={handleSubmit} className="space-y-10">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-sm text-red-500 text-xs tracking-wider uppercase">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Nome Completo */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/25 ml-1 flex items-center gap-2">
                <UserPlus size={10} className="text-brand-gold/50" />
                Nome Completo
              </label>
              <input
                name="full_name"
                type="text"
                required
                className="w-full bg-transparent border-b border-white/[0.08] py-3 focus:outline-none focus:border-brand-gold transition-colors font-sans text-sm text-white placeholder:text-white/15"
                placeholder="Ex: João Silva"
              />
            </div>

            {/* E-mail Profissional */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/25 ml-1 flex items-center gap-2">
                <Mail size={10} className="text-brand-gold/50" />
                E-mail Profissional
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-transparent border-b border-white/[0.08] py-3 focus:outline-none focus:border-brand-gold transition-colors font-sans text-sm text-white placeholder:text-white/15"
                placeholder="email@carreiraimports.com.br"
              />
            </div>

            {/* Cargo / Função */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/25 ml-1 flex items-center gap-2">
                <Briefcase size={10} className="text-brand-gold/50" />
                Cargo / Função
              </label>
              <input
                name="function"
                type="text"
                required
                className="w-full bg-transparent border-b border-white/[0.08] py-3 focus:outline-none focus:border-brand-gold transition-colors font-sans text-sm text-white placeholder:text-white/15"
                placeholder="Ex: Consultor Sênior"
              />
            </div>

            {/* Perfil de Acesso */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/25 ml-1 flex items-center gap-2">
                <Shield size={10} className="text-brand-gold/50" />
                Perfil de Acesso
              </label>
              <select
                name="role"
                required
                className="w-full bg-transparent border-b border-white/[0.08] py-3 focus:outline-none focus:border-brand-gold transition-colors font-sans text-sm text-white appearance-none cursor-pointer"
              >
                <option value="editor" className="bg-[#0a0a0a]">Editor (Estoque)</option>
                <option value="admin" className="bg-[#0a0a0a]">Administrador Geral</option>
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-[9px] text-white/15 uppercase tracking-[0.2em] max-w-xs text-center sm:text-left">
              Um convite será enviado para o e-mail informado para que o colaborador defina sua senha de acesso.
            </p>
            
            <button
              type="submit"
              disabled={loading}
              className="bg-brand-gold text-black px-10 py-5 rounded-sm text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#C5A030] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-brand-gold/10"
            >
              {loading ? "Processando..." : "Criar Acesso"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
