import { getUsers } from "./actions";
import Link from "next/link";
import { Plus, MoreHorizontal, UserX, Shield } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  status: string;
  function?: string;
  created_at: string;
}

export default async function UsersPage() {
  const users = await getUsers() as User[];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif italic text-white/90">Equipe Carrera Imports</h2>
          <p className="text-xs text-white/30 mt-1">Gerencie os acessos e permissões dos colaboradores.</p>
        </div>
        
        <Link 
          href="/adm/usuarios/novo"
          className="bg-brand-gold text-black px-6 py-3 rounded-sm text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-2 hover:bg-[#C5A030] transition-all"
        >
          <Plus size={14} />
          Novo Colaborador
        </Link>
      </div>

      <div className="bg-[#080808] border border-white/5 rounded-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-6 py-4 text-[9px] uppercase tracking-[0.2em] font-bold text-white/40">Colaborador</th>
              <th className="px-6 py-4 text-[9px] uppercase tracking-[0.2em] font-bold text-white/40">Cargo</th>
              <th className="px-6 py-4 text-[9px] uppercase tracking-[0.2em] font-bold text-white/40">Perfil</th>
              <th className="px-6 py-4 text-[9px] uppercase tracking-[0.2em] font-bold text-white/40">Status</th>
              <th className="px-6 py-4 text-[9px] uppercase tracking-[0.2em] font-bold text-white/40">Data</th>
              <th className="px-6 py-4 text-[9px] uppercase tracking-[0.2em] font-bold text-white/40 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-3 opacity-20">
                    <UserX size={32} />
                    <p className="text-xs uppercase tracking-widest">Nenhum colaborador encontrado</p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user: User) => (
                <tr key={user.id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-sm bg-white/5 border border-white/5 flex items-center justify-center text-white/20 group-hover:border-brand-gold/20 transition-all font-serif italic text-sm">
                        {user.full_name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/80">{user.full_name}</p>
                        <p className="text-[10px] text-white/20 font-mono mt-0.5">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[10px] uppercase tracking-wider text-white/40">
                      {user.function || "Consultor"}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Shield size={12} className={user.role === 'admin' ? "text-brand-gold/60" : "text-white/20"} />
                      <span className="text-[10px] uppercase tracking-wider text-white/60">
                        {user.role || "Membro"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500/60' : 'bg-red-500/60'}`} />
                      <span className="text-[10px] uppercase tracking-wider text-white/40">
                        {user.status === 'active' ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[10px] text-white/20">
                      {format(new Date(user.created_at), "dd/MM/yyyy", { locale: ptBR })}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-white/20 hover:text-white transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
