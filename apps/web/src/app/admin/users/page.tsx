import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@rnadventure/auth";
import { headers } from "next/headers";
import { AdminUsersPage } from "@/components/admin/admin-users-page";

export const metadata: Metadata = {
  title: "Admin Users | RNAdventure",
  description: "Manage admin users",
};

export default async function AdminUsersRoute() {
  const session = await auth.api.getSession({ headers: await headers() });

  // Redirect if not logged in or not an admin
  if (!session?.user || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  return <AdminUsersPage user={session.user} />;
}
