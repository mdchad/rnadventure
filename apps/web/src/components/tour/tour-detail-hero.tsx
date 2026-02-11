import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Star } from "lucide-react";
import Link from "next/link";

interface TourDetailHeroProps {
  tour: {
    title: string;
    category: string;
    location: string;
    duration: string;
    maxGroupSize: number;
    rating: number | null;
    ratingCount: number | null;
    coverImage: string;
    images?: string[] | null;
  };
}

export function TourDetailHero({ tour }: TourDetailHeroProps) {
  const images = tour.images || [];
  const displayImages = [tour.coverImage, ...images].slice(0, 5);

  return (
    <div className="bg-gray-50">
      <div className="max-w-[1240px] mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-venture-green">
            Home
          </Link>
          <span>/</span>
          <Link href="/tours" className="hover:text-venture-green">
            Tours
          </Link>
          <span>/</span>
          <Link href={`/tours?category=${tour.category}`} className="hover:text-venture-green">
            {tour.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{tour.title}</span>
        </div>

        {/* Title and Info */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-venture-green text-venture-black">{tour.category}</Badge>
            {tour.rating && tour.ratingCount && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{tour.rating.toFixed(1)}</span>
                </div>
                <span className="text-gray-500">({tour.ratingCount} reviews)</span>
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">{tour.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{tour.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Max {tour.maxGroupSize} people</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-4 gap-4 h-[500px] rounded-3xl overflow-hidden">
          {/* Main Image */}
          <div className="col-span-4 md:col-span-2 md:row-span-2 relative">
            <img src={displayImages[0]} alt={tour.title} className="w-full h-full object-cover" />
          </div>

          {/* Smaller Images */}
          {displayImages.slice(1, 5).map((image, index) => (
            <div key={index} className="col-span-2 md:col-span-1 relative hidden md:block">
              <img
                src={image}
                alt={`${tour.title} - Image ${index + 2}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {displayImages.length > 5 && (
            <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
              View all photos
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
