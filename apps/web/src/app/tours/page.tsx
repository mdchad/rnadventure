import { Suspense } from "react";
import Navigation from "@/components/landing/navigation";
import { Footer } from "@/components/layout/footer";
import { TourGrid } from "@/components/tour/tour-grid";
import { getTours } from "@/actions/tours";
import { Skeleton } from "@/components/ui/skeleton";

interface ToursPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

async function ToursList({ searchParams }: ToursPageProps) {
  const params = await searchParams;
  const filters = {
    category: params.category,
    search: params.search,
    minPrice: params.minPrice ? parseInt(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? parseInt(params.maxPrice) : undefined,
  };

  const tours = await getTours(filters);

  return (
    <div className="py-12">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{params.category || "All Tours"}</h2>
          <p className="text-gray-600">
            {tours.length} {tours.length === 1 ? "tour" : "tours"} found
          </p>
        </div>

        <TourGrid tours={tours} />
      </div>
    </div>
  );
}

export default async function ToursPage({ searchParams }: ToursPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-venture-green to-venture-hover py-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-venture-black mb-4">
            Explore Our Tours
          </h1>
          <p className="text-venture-black/80 text-lg max-w-2xl">
            Discover amazing experiences across Singapore with our expert guides
          </p>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="py-12">
            <div className="max-w-[1240px] mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-64 w-full rounded-3xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      >
        <ToursList searchParams={searchParams} />
      </Suspense>

      <Footer />
    </div>
  );
}
