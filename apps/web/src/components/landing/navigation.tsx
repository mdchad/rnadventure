"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/layout/mobile-menu";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`text-[0.95rem] font-medium transition-colors duration-200 ${
        isHovered ? "text-venture-hover" : "text-[#1a1a1a]"
      }`}
    >
      {children}
    </Link>
  );
};

const tourCategories = [
  { name: "All Tours", href: "/tours" },
  { name: "City Tours", href: "/tours?category=City+Tour" },
  { name: "Food Tours", href: "/tours?category=Food+Tour" },
  { name: "Jaulah Masjid", href: "/tours?category=Jaulah+Masjid" },
  { name: "Edutrips", href: "/tours?category=Edutrip" },
];

interface NavigationProps {
  user?: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  } | null;
}

export default function Navigation({ user }: NavigationProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className="py-6 bg-white sticky top-0 z-[100] border-b border-black/5">
      <div className="max-w-[1240px] mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="no-underline">
          <div className="flex items-center gap-3 font-extrabold text-2xl text-venture-black tracking-tight font-[family-name:var(--font-outfit)]">
            <div className="w-10 h-10 bg-venture-green rounded-xl flex items-center justify-center text-venture-black">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="stroke-current"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              >
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5"></path>
              </svg>
            </div>
            RNAdventure
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 items-center">
          <NavLink href="/">Home</NavLink>

          {/* Tours Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-[0.95rem] font-medium transition-colors duration-200 hover:text-venture-hover flex items-center gap-1 outline-none">
              Tours
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {tourCategories.map((category) => (
                <DropdownMenuItem key={category.name} asChild>
                  <Link href={category.href} className="cursor-pointer">
                    {category.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>

          {/* User Section */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none ml-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-venture-green flex items-center justify-center text-venture-black font-semibold">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-semibold">{user.name}</span>
                    <span className="text-xs text-gray-500">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/bookings" className="cursor-pointer">
                    My Bookings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form action="/api/auth/sign-out" method="POST" className="w-full">
                    <button type="submit" className="flex items-center w-full">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href="/login"
                className="no-underline text-[#1a1a1a] font-bold text-[0.95rem] transition-colors duration-200 hover:text-venture-hover ml-4"
              >
                Log in
              </Link>
              <Button
                asChild
                className="bg-venture-green text-venture-black hover:bg-venture-hover"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <MobileMenu user={user} />
      </div>
    </nav>
  );
}
