import { Suspense } from "react";
import Navigation from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { CategoriesSection } from "@/components/landing/categories-section";
import { FeaturedToursSection } from "@/components/landing/featured-tours-section";
import { StatsSection } from "@/components/landing/stats-section";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/layout/footer";
import { getFeaturedTours, getStats } from "@/actions/tours";
import { Skeleton } from "@/components/ui/skeleton";

async function FeaturedTours() {
  const tours = await getFeaturedTours(6);
  return <FeaturedToursSection tours={tours} />;
}

async function Stats() {
  const stats = await getStats();
  return <StatsSection stats={stats} />;
}

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <HeroSection />

      <CategoriesSection />

      <Suspense
        fallback={
          <div className="py-20">
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
        <FeaturedTours />
      </Suspense>

      <Suspense
        fallback={
          <div className="py-20 bg-venture-green">
            <div className="max-w-[1240px] mx-auto px-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            </div>
          </div>
        }
      >
        <Stats />
      </Suspense>

      <CTASection />

      <Footer />
    </div>
  );
}
