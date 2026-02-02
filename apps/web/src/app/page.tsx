"use client";

import { useState } from "react";
import Navigation from "@/components/landing/navigation";
import SearchInput from "@/components/landing/search-input";
import TourCard from "@/components/landing/tour-card";
import CategoryPill from "@/components/landing/category-pill";

export default function Home() {
  const [location, setLocation] = useState("Kyoto, Japan");
  const [date, setDate] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Culinary", "Adventure", "History", "Art & Design", "Nightlife"];

  const tours = [
    {
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1988&auto=format&fit=crop",
      price: 45,
      duration: "2.5 Hours",
      rating: 4.96,
      ratingCount: 128,
      title: "Neon Nights: Shinjuku Alleyways",
      description: "Explore the hidden bars and yakitori stands of Golden Gai with a local chef.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1599707367072-cd6ad66aa5a8?q=80&w=2070&auto=format&fit=crop",
      price: 60,
      duration: "4 Hours",
      rating: 4.82,
      ratingCount: 84,
      title: "Silent Zen: Private Temple Access",
      description: "Early morning meditation and tea ceremony in a secluded moss garden.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=2092&auto=format&fit=crop",
      price: 35,
      duration: "3 Hours",
      rating: 5.0,
      ratingCount: 42,
      title: "Retro Osaka: Vintage & Vinyl",
      description: "Hunt for rare records and vintage clothing in Amerikamura's backstreets.",
    },
  ];

  return (
    <div className="text-[#080808] bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;500;600&family=Outfit:wght@400;500;700;800&display=swap");
        
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }
        
        * {
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
        }
        
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
      `}</style>

      <Navigation />

      {/* Hero Section */}
      <header className="py-20 pb-[100px] relative">
        <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div>
            <h1
              className="font-bold text-[4.5rem] mb-6 leading-tight tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Go where the
              <br />
              locals go.
            </h1>
            <p className="text-xl text-[#555] mb-10 max-w-[500px]">
              Book authentic tours with guides who know the heartbeat of the city. No tourist traps,
              just real experiences.
            </p>

            <div className="bg-white border border-[#e4e4e7] p-3 rounded-[28px] flex items-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] max-w-[500px]">
              <SearchInput
                label="Location"
                placeholder="Tokyo, Japan"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <SearchInput
                label="Date"
                placeholder="Add dates"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <button className="w-14 h-14 bg-[#080808] rounded-[20px] flex items-center justify-center text-[#05E668] cursor-pointer transition-transform duration-200 border-none hover:scale-105">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="stroke-current"
                  style={{
                    strokeWidth: "2.5px",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    fill: "none",
                  }}
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>
          </div>

          <div className="relative h-[600px]">
            <img
              src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop"
              alt="Hiker overlooking mountains"
              className="w-full h-full object-cover rounded-[40px] relative z-[1]"
            />

            <div className="absolute bottom-10 -left-10 bg-white p-5 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] z-[2] flex gap-4 items-center">
              <div className="w-12 h-12 bg-[#f4f4f5] rounded-2xl flex items-center justify-center text-2xl">
                🌿
              </div>
              <div>
                <div
                  className="font-bold text-[1.1rem]"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Top Rated
                </div>
                <div className="text-[0.85rem] text-[#666]">Nature Walks 2024</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 animate-[bounce_2s_infinite]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="stroke-[#ccc]"
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
            <h2
              className="font-bold text-[2rem] leading-tight tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Curated this week
            </h2>
            <a
              href="#all"
              className="text-[#080808] font-semibold no-underline border-b-2 border-[#05E668]"
            >
              View all
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
        <div className="bg-[#080808] rounded-[40px] p-16 text-white grid grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className="font-bold text-[2.5rem] mb-6 leading-tight tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Not a tour guide.
              <br />A local friend.
            </h2>
            <p className="text-[#aaa] mb-8 text-[1.1rem] max-w-[400px]">
              Our vetting process is rigorous. We look for storytellers, historians, and artists who
              want to share their world.
            </p>
            <button className="inline-flex items-center justify-center px-8 py-4 font-semibold text-base rounded-3xl cursor-pointer transition-all duration-200 ease-out border-none gap-2 bg-[#05E668] text-[#080808]">
              Become a Guide
            </button>
          </div>
          <div className="relative">
            <div className="absolute -top-5 -right-5 w-[100px] h-[100px] rounded-[30px] bg-[#05E668] z-0"></div>
            <img
              src="https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1998&auto=format&fit=crop"
              className="w-full rounded-3xl relative z-[1]"
              alt="Local guide smiling"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
