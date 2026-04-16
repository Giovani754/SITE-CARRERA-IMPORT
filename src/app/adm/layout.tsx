import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LogoCarrera } from '@/components/premium/logo-carrera'
import { LayoutDashboard, Car, LogOut, Globe } from 'lucide-react'
import { logout } from './actions'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // The middleware also checks this, but extra safety
  if (!user && (children as any).type?.name !== 'LoginPage') {
    // This is handled by the middleware, but we need session for layout links
  }

  return (
    <div className="min-h-screen bg-[#030303] flex">
      {/* Sidebar - only visible if logged in */}
      {user && (
        <aside className="w-64 border-r border-white/5 flex flex-col h-screen sticky top-0 hidden lg:flex">
          <div className="p-8 border-b border-white/5">
            <LogoCarrera />
          </div>
          
          <nav className="flex-1 p-6 space-y-2">
            {[
              { label: 'Dashboard', href: '/adm/dashboard', icon: LayoutDashboard },
              { label: 'Veículos', href: '/adm/veiculos', icon: Car },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 px-4 py-3 text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 hover:text-brand-gold hover:bg-white/[0.02] transition-all rounded-sm"
              >
                <item.icon size={15} strokeWidth={1.5} />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-6 border-t border-white/5 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-4 px-4 py-3 text-[9px] uppercase tracking-[0.2em] font-bold text-white/20 hover:text-white/50 transition-all"
            >
              <Globe size={13} />
              Ver Site Público
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="w-full flex items-center gap-4 px-4 py-3 text-[9px] uppercase tracking-[0.2em] font-bold text-red-500/40 hover:text-red-500/80 transition-all"
              >
                <LogOut size={13} />
                Encerrar Sessão
              </button>
            </form>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto min-h-screen">
        {children}
      </main>
    </div>
  )
}
