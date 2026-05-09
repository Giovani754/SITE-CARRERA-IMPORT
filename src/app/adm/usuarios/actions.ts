"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function getUsers() {
  const supabase = await createClient();
  
  // Note: Only admins can read auth.users. 
  // In a real app, we usually fetch from a 'profiles' table.
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return data;
}

export async function createTeamMember(formData: FormData) {
  // Use admin client to perform Auth Admin operations
  const supabaseAdmin = createAdminClient();
  
  const email = formData.get("email") as string;
  const full_name = formData.get("full_name") as string;
  const role = formData.get("role") as string;
  const function_label = formData.get("function") as string;

  // 1. Invite user via Supabase Auth
  const { data, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
    data: {
      full_name,
      role,
    }
  });

  if (inviteError) {
    return { error: `Erro ao convidar: ${inviteError.message}` };
  }

  // Safety check to prevent TypeError
  if (!data?.user?.id) {
    return { error: "Erro crítico: Usuário não foi retornado pelo Supabase após convite." };
  }

  // 2. Create profile entry (optional if handled by triggers)
  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .insert([{
      id: data.user.id,
      email,
      full_name,
      role,
      function: function_label,
      status: "active"
    }]);

  if (profileError) {
    console.error("Error creating profile:", profileError);
    // Even if profile fails, we shouldn't crash, but it's good to log
  }

  revalidatePath("/adm/usuarios");
  return { success: true };
}

export async function toggleUserStatus(userId: string, currentStatus: string) {
  const supabase = await createClient();
  const newStatus = currentStatus === "active" ? "inactive" : "active";

  const { error } = await supabase
    .from("profiles")
    .update({ status: newStatus })
    .eq("id", userId);

  if (error) return { error: "Falha ao atualizar status." };

  revalidatePath("/adm/usuarios");
  return { success: true };
}

export async function deleteUser(userId: string) {
  // Use admin client to perform Auth Admin operations
  const supabaseAdmin = createAdminClient();

  // 1. Delete from profiles
  await supabaseAdmin.from("profiles").delete().eq("id", userId);

  // 2. Delete from Auth (requires admin privileges)
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) return { error: "Falha ao remover do Auth." };

  revalidatePath("/adm/usuarios");
  return { success: true };
}
