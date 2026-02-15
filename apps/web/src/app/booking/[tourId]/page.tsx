import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navigation from "@/components/landing/navigation";
import { Footer } from "@/components/layout/footer";
import { getTourBySlug } from "@/actions/tours";
import { BookingForm } from "@/components/booking/booking-form";
import { db } from "@rnadventure/db";
import { tour } from "@rnadventure/db/schema";
import { eq } from "drizzle-orm";

interface BookingPageProps {
  params: Promise<{
    tourId: string;
  }>;
  searchParams: Promise<{
    people?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Book Your Tour | RNAdventure",
  description: "Complete your tour booking",
};

export default async function BookingPage({ params, searchParams }: BookingPageProps) {
  const { tourId } = await params;
  const { people } = await searchParams;

  // Get tour by ID
  const tourData = await db.query.tour.findFirst({
    where: eq(tour.id, tourId),
  });

  if (!tourData) {
    notFound();
  }

  const numberOfPeople = Number.parseInt(people || "1", 10);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-[1240px] mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Complete Your Booking</h1>
          <p className="text-gray-600">
            You're almost there! Fill in your details to confirm your booking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
          {/* Booking Form */}
          <BookingForm tour={tourData} defaultNumberOfPeople={numberOfPeople} />

          {/* Tour Summary - Sticky on desktop */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-3xl border-2 border-gray-200 p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

              {/* Tour Image */}
              {tourData.coverImage && (
                <img
                  src={tourData.coverImage}
                  alt={tourData.title}
                  className="w-full h-48 object-cover rounded-2xl mb-4"
                />
              )}

              {/* Tour Details */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-lg">{tourData.title}</h3>
                  <p className="text-gray-600 text-sm">{tourData.location}</p>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{tourData.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Max Group Size</span>
                    <span className="font-medium">{tourData.maxGroupSize} people</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price per person</span>
                    <span className="font-bold text-venture-green">
                      ${(tourData.price / 100).toFixed(0)}
                    </span>
                  </div>
                </div>

                {tourData.rating && tourData.ratingCount ? (
                  <div className="border-t pt-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="font-bold ml-1">{tourData.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-gray-600 text-sm">
                        ({tourData.ratingCount} reviews)
                      </span>
                    </div>
                  </div>
                ) : null}

                <div className="border-t pt-3 bg-gray-50 -mx-6 px-6 py-4 rounded-b-2xl">
                  <p className="text-xs text-gray-600 text-center">
                    Free cancellation up to 24 hours before the tour
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
