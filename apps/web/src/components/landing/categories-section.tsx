import Link from "next/link";
import { MapPin, Utensils, Building, GraduationCap } from "lucide-react";

const categories = [
  {
    name: "City Tours",
    href: "/tours?category=City+Tour",
    icon: Building,
    count: 3,
    description: "Explore iconic landmarks and hidden gems",
  },
  {
    name: "Food Tours",
    href: "/tours?category=Food+Tour",
    icon: Utensils,
    count: 3,
    description: "Taste authentic local flavors",
  },
  {
    name: "Jaulah Masjid",
    href: "/tours?category=Jaulah+Masjid",
    icon: MapPin,
    count: 2,
    description: "Discover Islamic heritage",
  },
  {
    name: "Edutrips",
    href: "/tours?category=Edutrip",
    icon: GraduationCap,
    count: 3,
    description: "Educational adventures for all ages",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Browse by <span className="text-venture-green">Category</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our diverse range of tours designed to match your interests
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group relative bg-white rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-venture-green/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-venture-green transition-colors">
                    <Icon className="w-8 h-8 text-venture-green group-hover:text-venture-black transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                  <span className="text-venture-green font-medium">{category.count} tours →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
