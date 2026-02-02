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

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="px-6 py-3 rounded-full font-semibold cursor-pointer transition-all duration-200 whitespace-nowrap"
      style={{
        border: isActive ? "1px solid #080808" : isHovered ? "1px solid #080808" : "1px solid #eee",
        background: isActive ? "#080808" : "#ffffff",
        color: isActive ? "#ffffff" : "#080808",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {label}
    </button>
  );
}
