import { login } from './actions'
import { LogoCarrera } from '@/components/premium/logo-carrera'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/adm/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-12">
        <div className="flex flex-col items-center gap-6">
          <LogoCarrera />
          <div className="text-center">
            <span className="text-brand-gold text-[9px] uppercase tracking-[0.8em] font-medium block opacity-50 mb-2">
              Privativo
            </span>
            <h1 className="text-xl font-serif italic text-white/90">Painel Administrativo</h1>
          </div>
        </div>

        <form className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 ml-1">
                E-mail
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-[#080808] border border-white/5 py-4 px-5 rounded-sm focus:outline-none focus:border-brand-gold/50 transition-colors font-sans text-sm text-white placeholder:text-white/10"
                placeholder="seu@parceiro.com.br"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 ml-1">
                Senha
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full bg-[#080808] border border-white/5 py-4 px-5 rounded-sm focus:outline-none focus:border-brand-gold/50 transition-colors font-sans text-sm text-white placeholder:text-white/10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            formAction={login}
            className="w-full bg-brand-gold text-black py-5 text-[10px] uppercase tracking-[0.4em] font-bold rounded-sm hover:bg-[#C5A030] transition-all active:scale-[0.98] shadow-xl shadow-brand-gold/10"
          >
            Entrar no Sistema
          </button>
        </form>

        <p className="text-center text-[9px] text-white/15 uppercase tracking-[0.3em]">
          Este acesso é restrito à equipe estratégica.<br/>Toda atividade é monitorada.
        </p>
      </div>
    </div>
  )
}
