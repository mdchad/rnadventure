"use client";

import Link from "next/link";
import { useState } from "react";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="text-[0.95rem] font-medium transition-colors duration-200"
      style={{ color: isHovered ? "#04cf5d" : "#1a1a1a" }}
    >
      {children}
    </a>
  );
};

const Button = ({
  children,
  variant = "primary",
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const variantStyles =
    variant === "primary" ? "bg-[#05E668] text-[#080808]" : "bg-[#f4f4f5] text-[#080808]";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-flex items-center justify-center px-8 py-4 font-semibold text-base rounded-3xl cursor-pointer transition-all duration-200 ease-out border-none gap-2 ${variantStyles} ${className}`}
      style={{
        transform: isHovered && variant === "primary" ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {children}
    </button>
  );
};

export default function Navigation() {
  return (
    <nav className="py-6 bg-white sticky top-0 z-[100] border-b border-black/5">
      <div className="max-w-[1240px] mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="no-underline">
          <div className="flex items-center gap-3 font-extrabold text-2xl text-[#080808] tracking-tight">
            <div className="w-10 h-10 bg-[#05E668] rounded-xl flex items-center justify-center text-[#080808]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="stroke-current"
                style={{
                  strokeWidth: "2.5px",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  fill: "none",
                }}
              >
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5"></path>
              </svg>
            </div>
            RNAdventure
          </div>
        </Link>
        <div className="flex gap-8 items-center">
          <NavLink href="#destinations">Destinations</NavLink>
          <NavLink href="#experiences">Experiences</NavLink>
          <NavLink href="#guides">Guides</NavLink>
          <a
            href="#login"
            className="no-underline text-[#1a1a1a] font-bold text-[0.95rem] transition-colors duration-200 ml-4"
          >
            Log in
          </a>
          <Button className="!px-5 !py-2.5 !text-[0.9rem]">Sign Up</Button>
        </div>
      </div>
    </nav>
  );
}
