import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@rnadventure/auth";
import { headers } from "next/headers";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata: Metadata = {
  title: "Admin Login | RNAdventure",
  description: "Admin login page",
};

export default async function AdminLoginPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  // If already logged in as admin, redirect to admin dashboard
  if (session?.user?.role === "admin") {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 dark:text-white">Admin Login</h1>
          <p className="text-gray-600 dark:text-gray-400">Sign in to access the admin dashboard</p>
        </div>

        <AdminLoginForm />
      </div>
    </div>
  );
}
