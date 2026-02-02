"use client";

import { useState } from "react";
import Navigation from "@/components/landing/navigation";
import SearchInput from "@/components/landing/search-input";
import TourCard from "@/components/landing/tour-card";
import CategoryPill from "@/components/landing/category-pill";

export default function Home() {
  const [location, setLocation] = useState("Singapore");
  const [date, setDate] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "City Tour", "Food Tour", "Jaulah Masjid", "Edutrip"];

  const tours = [
    {
      image:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2052&auto=format&fit=crop",
      price: 120,
      duration: "3 Hours",
      rating: 4.98,
      ratingCount: 156,
      title: "Marina Bay Skyline Experience",
      description:
        "Discover iconic landmarks including Marina Bay Sands, Merlion Park, and Gardens by the Bay with a local guide.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1555217851-6141535bd771?q=80&w=2070&auto=format&fit=crop",
      price: 85,
      duration: "4 Hours",
      rating: 5.0,
      ratingCount: 203,
      title: "Hawker Heritage Food Tour",
      description:
        "Taste authentic Singaporean cuisine at legendary hawker centres. Includes laksa, chicken rice, and satay.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1581791911236-d13870ec803e?q=80&w=2074&auto=format&fit=crop",
      price: 95,
      duration: "2.5 Hours",
      rating: 4.89,
      ratingCount: 89,
      title: "Sultan Mosque & Arab Street Heritage",
      description:
        "Explore the historic Kampong Glam district, Sultan Mosque, and Arab Street's vibrant culture.",
    },
  ];

  return (
    <div className="text-venture-black bg-white font-[family-name:var(--font-dm-sans)]">
      <Navigation />

      {/* Hero Section */}
      <header className="py-20 pb-[100px] relative">
        <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div>
            <h1 className="font-bold text-[4.5rem] mb-6 leading-tight tracking-tight font-[family-name:var(--font-outfit)]">
              Discover Singapore
              <br />
              with a local.
            </h1>
            <p className="text-xl text-[#555] mb-10 max-w-[500px]">
              Book personalized tours and transport services with an experienced Singapore tour
              guide. Flexible schedules, multiple languages available.
            </p>

            <div className="bg-white border border-[#e4e4e7] p-3 rounded-[28px] flex items-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] max-w-[500px]">
              <SearchInput
                label="Tour Type"
                placeholder="City Tour, Food Tour..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <SearchInput
                label="Date"
                placeholder="Select date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <button className="w-14 h-14 bg-venture-black rounded-[20px] flex items-center justify-center text-venture-green cursor-pointer transition-transform duration-200 border-none hover:scale-105">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="stroke-current"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>
          </div>

          <div className="relative h-[600px]">
            <img
              src="https://images.unsplash.com/flagged/photo-1562503542-2a1e6f03b16b?q=80&w=2069&auto=format&fit=stretch"
              alt="Singapore skyline at sunset"
              className="w-full h-full object-cover rounded-[40px] relative z-[1]"
            />

            <div className="absolute bottom-10 -left-10 bg-white p-5 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] z-[2] flex gap-4 items-center">
              <div className="w-12 h-12 bg-[#f4f4f5] rounded-2xl flex items-center justify-center text-2xl">
                🇸🇬
              </div>
              <div>
                <div className="font-bold text-[1.1rem] font-[family-name:var(--font-outfit)]">
                  Licensed Guide
                </div>
                <div className="text-[0.85rem] text-[#666]">Over 500+ Tours</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 animate-[bounce-arrow_2s_infinite]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="stroke-[#ccc]"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"></path>
          </svg>
        </div>
      </header>

      {/* Categories */}
      <section className="max-w-[1240px] mx-auto py-10 px-6 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-4">
          {categories.map((category) => (
            <CategoryPill
              key={category}
              label={category}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-10 pb-[100px]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="mb-12 flex justify-between items-end">
            <h2 className="font-bold text-[2rem] leading-tight tracking-tight font-[family-name:var(--font-outfit)]">
              Popular tours
            </h2>
            <a
              href="#all"
              className="text-venture-black font-semibold no-underline border-b-2 border-venture-green"
            >
              View all tours
            </a>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
            {tours.map((tour, index) => (
              <TourCard key={index} {...tour} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-[1240px] mx-auto px-6 pb-[100px]">
        <div className="bg-venture-black rounded-[40px] p-16 text-white grid grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-bold text-[2.5rem] mb-6 leading-tight tracking-tight font-[family-name:var(--font-outfit)]">
              Flexible tours.
              <br />
              Your schedule.
            </h2>
            <p className="text-[#aaa] mb-8 text-[1.1rem] max-w-[400px]">
              Choose your language, duration, and group size. Private transport available. From city
              tours to food adventures - tailored to your needs.
            </p>
            <button className="inline-flex items-center justify-center px-8 py-4 font-semibold text-base rounded-3xl cursor-pointer transition-all duration-200 ease-out border-none gap-2 bg-venture-green text-venture-black">
              Book a Tour
            </button>
          </div>
          <div className="relative">
            <div className="absolute -top-5 -right-5 w-[100px] h-[100px] rounded-[30px] bg-venture-green z-0"></div>
            <img
              src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070&auto=format&fit=crop"
              className="w-full rounded-3xl relative z-[1]"
              alt="Singapore Gardens by the Bay"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
