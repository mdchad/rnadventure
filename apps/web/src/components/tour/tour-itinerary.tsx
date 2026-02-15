import { Clock, MapPin } from "lucide-react";

interface TourItineraryProps {
  items: Array<{
    id: string;
    order: number;
    title: string;
    description: string | null;
    duration: string | null;
    location: string | null;
  }>;
}

export function TourItinerary({ items }: TourItineraryProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Itinerary</h2>
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-8">
          {items.map((item, index) => (
            <div key={item.id} className="relative flex gap-6">
              {/* Order Number */}
              <div className="flex-shrink-0 w-12 h-12 bg-venture-green rounded-full flex items-center justify-center text-venture-black font-bold z-10">
                {item.order}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>

                {item.description && <p className="text-gray-700 mb-3">{item.description}</p>}

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  {item.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{item.duration}</span>
                    </div>
                  )}
                  {item.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
