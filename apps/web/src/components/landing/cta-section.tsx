import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=1600"
          alt="Singapore Gardens by the Bay"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready for Your Next <span className="text-venture-green">Adventure</span>?
        </h2>
        <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
          Join thousands of happy travelers who have discovered Singapore with us. Book your tour
          today and create memories that last a lifetime.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-venture-green text-venture-black hover:bg-venture-hover font-semibold text-lg px-10 py-7 rounded-full"
        >
          <Link href="/tours">
            Book a Tour Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
