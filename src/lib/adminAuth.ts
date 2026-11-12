import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getServerClient } from "@/lib/supabase/server";
export type StaffRole = "admin" | "editor" | "sales";
export async function requireAdmin(roles: StaffRole[] = ["admin", "editor"]) {
 if (!isSupabaseConfigured()) redirect("/admin/login?setup=1");
 const supabase = await getServerClient();
 const { data: { user } } = await supabase.auth.getUser();
 if (!user) redirect("/admin/login");
 const {data: member} = await supabase.from("staff").select("role,active,require_mfa").eq("user_id",user.id).maybeSingle();
 if (!member?.active || !roles.includes(member.role)) redirect("/admin/access");
 const {data: allowed} = await supabase.rpc("has_staff_role",{roles});
 if (!allowed) redirect("/admin/security");
 return {supabase,user,role: member.role as StaffRole};
}
export async function getAdminUser() {
 if (!isSupabaseConfigured()) return null;
 try {
 const supabase = await getServerClient();
 const {data:{user}}=await supabase.auth.getUser();
 const {data: allowed}=await supabase.rpc("has_staff_role",{roles:["admin","editor"]});
 return user && allowed ? user : null;
 } catch { return null; }
}
