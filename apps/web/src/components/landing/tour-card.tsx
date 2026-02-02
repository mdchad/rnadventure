"use client";

import { useState } from "react";

export default function TourCard({
  image,
  price,
  duration,
  rating,
  ratingCount,
  title,
  description,
}: {
  image: string;
  price: number;
  duration: string;
  rating: number;
  ratingCount: number;
  title: string;
  description: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-white rounded-3xl overflow-hidden transition-transform duration-200 cursor-pointer relative ${
        isHovered ? "-translate-y-2" : ""
      }`}
    >
      <div className="h-80 relative rounded-3xl overflow-hidden mb-4">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
        <div className="absolute top-4 right-4 bg-venture-green text-venture-black px-4 py-2 rounded-xl font-bold text-[0.9rem]">
          ${price}
        </div>
      </div>
      <div>
        <div className="flex gap-4 text-[#666] text-[0.9rem] mb-4 font-medium">
          <span>{duration}</span>
          <span>•</span>
          <div className="flex items-center gap-1 text-venture-black font-bold">
            <svg width="14" height="14" viewBox="0 0 24 24" className="fill-venture-black">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            {rating} ({ratingCount})
          </div>
        </div>
        <h3 className="text-xl mb-2 font-bold leading-tight tracking-tight font-[family-name:var(--font-outfit)]">
          {title}
        </h3>
        <p className="text-[#666] text-[0.95rem] mt-2">{description}</p>
      </div>
    </article>
  );
}
