import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TourCardEnhanced } from "@/components/tour/tour-card-enhanced";
import { ArrowRight } from "lucide-react";

interface FeaturedToursSectionProps {
  tours: Array<{
    id: string;
    slug: string;
    title: string;
    description: string;
    price: number;
    originalPrice?: number | null;
    currency: string;
    duration: string;
    location: string;
    category: string;
    coverImage: string;
    rating: number | null;
    ratingCount: number | null;
    maxGroupSize: number;
  }>;
}

export function FeaturedToursSection({ tours }: FeaturedToursSectionProps) {
  return (
    <section className="py-20">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-venture-green">Tours</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked experiences that showcase the best of Singapore
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tours.map((tour) => (
            <TourCardEnhanced key={tour.id} tour={tour} />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="rounded-full px-8">
            <Link href="/tours">
              View All Tours
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
