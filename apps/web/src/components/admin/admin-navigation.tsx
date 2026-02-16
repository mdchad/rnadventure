"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users } from "lucide-react";

const tabs = [
  {
    name: "Dashboard",
    href: "/admin" as const,
    icon: LayoutDashboard,
  },
  {
    name: "Admin Users",
    href: "/admin/users" as const,
    icon: Users,
  },
] as const;

export function AdminNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-1 border-b border-gray-200 dark:border-gray-800">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        const Icon = tab.icon;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors",
              isActive
                ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-700",
            )}
          >
            <Icon className="h-4 w-4" />
            {tab.name}
          </Link>
        );
      })}
    </nav>
  );
}
