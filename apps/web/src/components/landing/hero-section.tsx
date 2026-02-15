import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1600"
          alt="Singapore skyline"
          className="w-full h-full object-cover"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Discover Singapore
            <br />
            <span className="text-venture-green">Like Never Before</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
            Experience authentic tours led by passionate local guides. From hidden gems to iconic
            landmarks, create unforgettable memories.
          </p>
          <Button
            size="lg"
            className="bg-venture-green text-venture-black hover:bg-venture-hover font-semibold text-lg px-8 py-6 rounded-full"
          >
            <Link href="/tours" className="flex items-center gap-2">
              <span>Explore Tours</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}
