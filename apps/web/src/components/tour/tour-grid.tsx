import { TourCardEnhanced } from "./tour-card-enhanced";
import { Compass } from "lucide-react";
import Link from "next/link";

interface TourGridProps {
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

export function TourGrid({ tours }: TourGridProps) {
  if (tours.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <Compass className="w-12 h-12 text-gray-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2">No tours found</h3>
        <p className="text-gray-600 mb-8">Try adjusting your filters or explore all tours</p>
        <Link
          href="/tours"
          className="inline-block px-6 py-3 border-2 border-gray-300 hover:bg-gray-100 rounded-lg font-semibold transition-colors"
        >
          View All Tours
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tours.map((tour) => (
        <TourCardEnhanced key={tour.id} tour={tour} />
      ))}
    </div>
  );
}
