import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navigation from "@/components/landing/navigation";
import { Footer } from "@/components/layout/footer";
import { TourDetailHero } from "@/components/tour/tour-detail-hero";
import { TourDescription } from "@/components/tour/tour-description";
import { TourHighlights } from "@/components/tour/tour-highlights";
import { TourItinerary } from "@/components/tour/tour-itinerary";
import { TourReviews } from "@/components/tour/tour-reviews";
import { TourBookingCard } from "@/components/tour/tour-booking-card";
import { RelatedToursSection } from "@/components/tour/related-tours-section";
import { getTourBySlug, getRelatedTours } from "@/actions/tours";

interface TourDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: TourDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour) {
    return {
      title: "Tour Not Found",
    };
  }

  return {
    title: `${tour.title} | RNAdventure`,
    description: tour.description,
    openGraph: {
      title: tour.title,
      description: tour.description,
      images: [{ url: tour.coverImage }],
    },
  };
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  const relatedTours = await getRelatedTours(tour.category, tour.id, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <TourDetailHero tour={tour} />

      <div className="max-w-[1240px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
          {/* Main Content */}
          <div className="space-y-12">
            <TourDescription description={tour.longDescription || tour.description} />
            {tour.highlights && tour.highlights.length > 0 && (
              <TourHighlights highlights={tour.highlights} />
            )}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <TourItinerary items={tour.itinerary} />
            )}
            {tour.reviews && tour.reviews.length > 0 && (
              <TourReviews
                reviews={tour.reviews}
                averageRating={tour.rating || 0}
                totalReviews={tour.ratingCount || 0}
              />
            )}
          </div>

          {/* Sticky Booking Card - Desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TourBookingCard tour={tour} />
            </div>
          </aside>
        </div>
      </div>

      {/* Related Tours */}
      {relatedTours.length > 0 && <RelatedToursSection tours={relatedTours} />}

      <Footer />

      {/* Mobile Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-gray-600">From</div>
            <div className="text-2xl font-bold text-venture-green">
              ${(tour.price / 100).toFixed(0)}
            </div>
          </div>
          <a
            href="#booking"
            className="flex-1 bg-venture-green text-venture-black hover:bg-venture-hover font-semibold px-6 py-3 rounded-full text-center"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
}
