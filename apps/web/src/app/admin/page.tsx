import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@rnadventure/auth";
import { headers } from "next/headers";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard | RNAdventure",
  description: "Admin dashboard for managing bookings",
};

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  // Redirect if not logged in or not an admin
  if (!session?.user || session.user.role !== "admin") {
    redirect("/admin/login");
  }

  return <AdminDashboard user={session.user} />;
}
