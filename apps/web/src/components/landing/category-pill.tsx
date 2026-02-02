"use client";

import { useState } from "react";

export default function CategoryPill({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const borderColor = isActive || isHovered ? "border-venture-black" : "border-[#eee]";
  const bgColor = isActive ? "bg-venture-black" : "bg-white";
  const textColor = isActive ? "text-white" : "text-venture-black";

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`px-6 py-3 rounded-full font-semibold cursor-pointer transition-all duration-200 whitespace-nowrap border ${borderColor} ${bgColor} ${textColor} font-[family-name:var(--font-outfit)]`}
    >
      {label}
    </button>
  );
}
