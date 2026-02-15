import {
  Building,
  Utensils,
  Users,
  Heart,
  Camera,
  Star,
  MapPin,
  Clock,
  Award,
  Shield,
  Coffee,
  Music,
} from "lucide-react";

const iconMap: Record<string, any> = {
  building: Building,
  utensils: Utensils,
  users: Users,
  heart: Heart,
  camera: Camera,
  star: Star,
  "map-pin": MapPin,
  clock: Clock,
  award: Award,
  shield: Shield,
  coffee: Coffee,
  music: Music,
};

interface TourHighlightsProps {
  highlights: Array<{
    id: string;
    icon: string;
    title: string;
    description: string | null;
  }>;
}

export function TourHighlights({ highlights }: TourHighlightsProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Tour Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {highlights.map((highlight) => {
          const Icon = iconMap[highlight.icon] || Star;
          return (
            <div key={highlight.id} className="flex gap-4 p-6 bg-gray-50 rounded-2xl">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-venture-green/10 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-venture-green" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">{highlight.title}</h3>
                {highlight.description && (
                  <p className="text-gray-600 text-sm">{highlight.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
