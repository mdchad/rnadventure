"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { authClient } from "@rnadventure/auth/client";
import { useRouter } from "next/navigation";
import { AdminUsersSection } from "./admin-users-section";
import { AdminNavigation } from "./admin-navigation";

interface AdminUsersPageProps {
  user: {
    name: string;
    email: string;
  };
}

export function AdminUsersPage({ user }: AdminUsersPageProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold dark:text-white">Admin Panel</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Welcome back, {user.name}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Navigation Tabs */}
          <AdminNavigation />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <AdminUsersSection />
      </div>
    </div>
  );
}
