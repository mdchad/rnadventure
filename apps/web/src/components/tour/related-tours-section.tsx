import { TourCardEnhanced } from "./tour-card-enhanced";

interface RelatedToursSectionProps {
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

export function RelatedToursSection({ tours }: RelatedToursSectionProps) {
  if (tours.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1240px] mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">
          You Might Also <span className="text-venture-green">Like</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCardEnhanced key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
