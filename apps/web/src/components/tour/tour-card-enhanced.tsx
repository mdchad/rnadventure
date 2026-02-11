import Link from "next/link";
import { Clock, MapPin, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TourCardProps {
  tour: {
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
  };
}

export function TourCardEnhanced({ tour }: TourCardProps) {
  const formattedPrice = (tour.price / 100).toFixed(0);
  const formattedOriginalPrice = tour.originalPrice ? (tour.originalPrice / 100).toFixed(0) : null;

  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group block bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={tour.coverImage}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/90 text-venture-black hover:bg-white">{tour.category}</Badge>
        </div>

        {/* Discount Badge */}
        {tour.originalPrice && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-venture-green text-venture-black">
              Save ${((tour.originalPrice - tour.price) / 100).toFixed(0)}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-venture-green transition-colors line-clamp-2">
          {tour.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.description}</p>

        {/* Rating */}
        {tour.rating && tour.ratingCount && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{tour.rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-500 text-sm">({tour.ratingCount} reviews)</span>
          </div>
        )}

        {/* Details */}
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{tour.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>Max {tour.maxGroupSize}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between pt-4 border-t">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-venture-green">${formattedPrice}</span>
            {formattedOriginalPrice && (
              <span className="text-gray-400 line-through text-lg">${formattedOriginalPrice}</span>
            )}
          </div>
          <span className="text-gray-500 text-sm">per person</span>
        </div>
      </div>
    </Link>
  );
}
