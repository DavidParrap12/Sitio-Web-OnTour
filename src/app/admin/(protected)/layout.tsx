import { requireAdmin } from "@/lib/adminAuth";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await requireAdmin(["admin","editor","sales"]);

  return (
    <div className="min-h-screen">
      <AdminHeader email={user.email ?? "Editor"} />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {children}
      </main>
    </div>
  );
}
