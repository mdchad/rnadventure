import { Users, Star, MapPin, Calendar } from "lucide-react";

interface StatsSectionProps {
  stats: {
    totalTours: number;
    totalBookings: number;
    totalReviews: number;
    yearsExperience: number;
  };
}

const statIcons = {
  tours: MapPin,
  customers: Users,
  reviews: Star,
  years: Calendar,
};

export function StatsSection({ stats }: StatsSectionProps) {
  const statsData = [
    {
      label: "Tours Available",
      value: stats.totalTours,
      icon: statIcons.tours,
    },
    {
      label: "Happy Customers",
      value: stats.totalBookings,
      icon: statIcons.customers,
    },
    {
      label: "5-Star Reviews",
      value: stats.totalReviews,
      icon: statIcons.reviews,
    },
    {
      label: "Years of Experience",
      value: `${stats.yearsExperience}+`,
      icon: statIcons.years,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-venture-green to-venture-hover">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {statsData.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-4">
                  <Icon className="w-12 h-12 text-venture-black" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-venture-black mb-2">
                  {stat.value}
                </div>
                <div className="text-venture-black/80 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
