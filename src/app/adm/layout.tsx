import { createClient } from '@/lib/supabase/server'
import { LogoCarrera } from '@/components/premium/logo-carrera'
import { LogOut, Globe } from 'lucide-react'
import { logout } from './actions'
import { SidebarNav } from '@/components/admin/sidebar-nav'
import { AdminHeader } from '@/components/admin/admin-header'
import Link from 'next/link'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-[#030303] flex">
      {/* Sidebar - only visible if logged in */}
      {user && (
        <aside className="w-64 border-r border-white/5 flex flex-col h-screen sticky top-0 hidden lg:flex">
          <div className="p-8 border-b border-white/5">
            <LogoCarrera />
          </div>
          
          <SidebarNav />

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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {user && <AdminHeader userEmail={user.email} />}
        
        <main className="flex-1 overflow-auto bg-[#050505]">
          <div className="p-8 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
