"use client";

import Link from "next/link";
import type { Route } from "next";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileMenu } from "@/components/layout/mobile-menu";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href as Route}
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

export default function Navigation() {
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
                <DropdownMenuItem key={category.name}>
                  <Link href={category.href as Route} className="cursor-pointer">
                    {category.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <NavLink href="/booking/lookup">Find Booking</NavLink>

          <Link
            href="/tours"
            className="ml-4 px-6 py-2 bg-venture-green text-venture-black hover:bg-venture-hover font-bold rounded-full transition-colors duration-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Book a Tour
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
