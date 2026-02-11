import { db } from "./index";
import { tour, tourHighlight, tourItinerary, review } from "./schema/tours";
import { user } from "./schema/auth";

const sampleTours = [
  {
    id: "tour-1",
    slug: "singapore-city-highlights",
    title: "Singapore City Highlights Tour",
    description:
      "Discover the best of Singapore's iconic landmarks and hidden gems in this comprehensive city tour",
    longDescription:
      "Experience the vibrant culture and stunning architecture of Singapore on this immersive city tour. Visit Marina Bay Sands, Gardens by the Bay, Chinatown, and Little India. Learn about Singapore's fascinating history from our expert guides while enjoying the modern cityscape. Perfect for first-time visitors wanting to see all the must-visit attractions in one day.",
    price: 8900, // $89
    originalPrice: 11900,
    currency: "SGD",
    duration: "4 hours",
    durationMinutes: 240,
    maxGroupSize: 15,
    location: "Singapore",
    meetingPoint: "Marina Bay Sands Hotel Lobby",
    category: "City Tour",
    coverImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800",
    images: [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800",
      "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=800",
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800",
      "https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=800",
    ],
    rating: 4.8,
    ratingCount: 142,
    bookingCount: 320,
    available: true,
    featured: true,
  },
  {
    id: "tour-2",
    slug: "hawker-food-adventure",
    title: "Hawker Centre Food Adventure",
    description:
      "Taste your way through Singapore's best hawker centres and discover authentic local flavors",
    longDescription:
      "Join us on a culinary journey through Singapore's legendary hawker centres. Sample over 10 different local dishes including chicken rice, laksa, satay, and chili crab. Learn about the history and culture behind each dish from our foodie guide. This tour is perfect for food lovers wanting to experience authentic Singaporean cuisine beyond tourist restaurants.",
    price: 7500, // $75
    currency: "SGD",
    duration: "3.5 hours",
    durationMinutes: 210,
    maxGroupSize: 12,
    location: "Singapore",
    meetingPoint: "Maxwell Food Centre",
    category: "Food Tour",
    coverImage: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800",
    images: [
      "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800",
      "https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=800",
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
    ],
    rating: 4.9,
    ratingCount: 218,
    bookingCount: 450,
    available: true,
    featured: true,
  },
  {
    id: "tour-3",
    slug: "masjid-heritage-trail",
    title: "Masjid Heritage Trail",
    description:
      "Explore Singapore's beautiful mosques and learn about Islamic heritage in Southeast Asia",
    longDescription:
      "Discover the rich Islamic heritage of Singapore through visits to historic mosques including Sultan Mosque, Malabar Mosque, and Abdul Gafoor Mosque. Learn about the architectural significance and cultural importance of each mosque. Our knowledgeable guide will share stories about the Muslim community in Singapore and the role of these mosques in preserving Islamic traditions.",
    price: 5000, // $50
    currency: "SGD",
    duration: "3 hours",
    durationMinutes: 180,
    maxGroupSize: 20,
    location: "Singapore",
    meetingPoint: "Sultan Mosque Main Entrance",
    category: "Jaulah Masjid",
    coverImage: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800",
    images: [
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800",
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800",
    ],
    rating: 4.7,
    ratingCount: 89,
    bookingCount: 156,
    available: true,
    featured: true,
  },
  {
    id: "tour-4",
    slug: "sentosa-island-adventure",
    title: "Sentosa Island Adventure",
    description: "Full day exploration of Sentosa's beaches, attractions, and entertainment",
    longDescription:
      "Spend a full day discovering everything Sentosa Island has to offer. Visit Siloso Beach, explore Fort Siloso, ride the SkyHelix Sentosa, and enjoy the scenic cable car ride. Perfect for families and adventure seekers. Includes lunch at a beachside restaurant and time to relax on the beach. Our guide will ensure you experience the best of Sentosa without the crowds.",
    price: 12500, // $125
    originalPrice: 15000,
    currency: "SGD",
    duration: "7 hours",
    durationMinutes: 420,
    maxGroupSize: 12,
    location: "Sentosa Island",
    meetingPoint: "Vivo City, Level 3 Sentosa Express Station",
    category: "City Tour",
    coverImage: "https://images.unsplash.com/photo-1580735788033-673fc2103074?w=800",
    images: [
      "https://images.unsplash.com/photo-1580735788033-673fc2103074?w=800",
      "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800",
    ],
    rating: 4.6,
    ratingCount: 134,
    bookingCount: 245,
    available: true,
    featured: false,
  },
  {
    id: "tour-5",
    slug: "night-safari-experience",
    title: "Night Safari Experience",
    description: "Witness nocturnal wildlife in the world's first night zoo",
    longDescription:
      "Experience the world's first nocturnal wildlife park on this evening adventure. See over 130 species of animals in their natural nighttime habitat, including Asian elephants, Malayan tigers, and flying squirrels. Includes reserved tram ride and walking trails. Watch the spectacular Creatures of the Night show featuring otters, civets, and more. A magical experience for all ages.",
    price: 9800, // $98
    currency: "SGD",
    duration: "4.5 hours",
    durationMinutes: 270,
    maxGroupSize: 15,
    location: "Singapore Zoo",
    meetingPoint: "Singapore Zoo Main Entrance",
    category: "Edutrip",
    coverImage: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800",
    images: [
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800",
      "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800",
    ],
    rating: 4.8,
    ratingCount: 267,
    bookingCount: 512,
    available: true,
    featured: true,
  },
  {
    id: "tour-6",
    slug: "peranakan-culture-walk",
    title: "Peranakan Culture Walk",
    description: "Immerse yourself in the colorful world of Peranakan heritage",
    longDescription:
      "Explore the unique Peranakan culture of Singapore through visits to Katong and Joo Chiat neighborhoods. See beautifully preserved shophouses, visit the Peranakan Museum, and taste traditional Nyonya kueh. Learn about the fascinating blend of Chinese and Malay cultures that created this distinctive community. Includes a traditional Peranakan lunch.",
    price: 8500, // $85
    currency: "SGD",
    duration: "4 hours",
    durationMinutes: 240,
    maxGroupSize: 10,
    location: "Katong/Joo Chiat",
    meetingPoint: "Katong Antique House",
    category: "City Tour",
    coverImage: "https://images.unsplash.com/photo-1548708297-a2ca03c5dd9e?w=800",
    images: ["https://images.unsplash.com/photo-1548708297-a2ca03c5dd9e?w=800"],
    rating: 4.7,
    ratingCount: 95,
    bookingCount: 178,
    available: true,
    featured: false,
  },
  {
    id: "tour-7",
    slug: "singapore-street-food-crawl",
    title: "Singapore Street Food Crawl",
    description: "Evening food tour through Singapore's best street food spots",
    longDescription:
      "Join us for an evening food adventure through Singapore's vibrant street food scene. Visit 4 different hawker centres and food streets, sampling over 12 local delicacies. From oyster omelette to rojak, from carrot cake to durian, experience the full spectrum of Singapore's culinary heritage. Our guide will share the history and stories behind each dish.",
    price: 6800, // $68
    currency: "SGD",
    duration: "3 hours",
    durationMinutes: 180,
    maxGroupSize: 15,
    location: "Singapore",
    meetingPoint: "Chinatown MRT Station Exit A",
    category: "Food Tour",
    coverImage: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800",
    images: [
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    ],
    rating: 4.9,
    ratingCount: 312,
    bookingCount: 687,
    available: true,
    featured: true,
  },
  {
    id: "tour-8",
    slug: "pulau-ubin-island-escape",
    title: "Pulau Ubin Island Escape",
    description: "Cycling adventure through Singapore's last kampung village",
    longDescription:
      "Escape the city and explore Pulau Ubin, Singapore's last traditional village. Cycle through lush jungle trails, visit abandoned granite quarries, spot wildlife including monitor lizards and wild boars, and experience life as it was in 1960s Singapore. Includes bike rental, bumboat transfers, and a traditional kampung lunch. A perfect day trip for nature lovers.",
    price: 7200, // $72
    currency: "SGD",
    duration: "5 hours",
    durationMinutes: 300,
    maxGroupSize: 12,
    location: "Pulau Ubin",
    meetingPoint: "Changi Point Ferry Terminal",
    category: "Edutrip",
    coverImage: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800",
    images: ["https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800"],
    rating: 4.6,
    ratingCount: 78,
    bookingCount: 142,
    available: true,
    featured: false,
  },
  {
    id: "tour-9",
    slug: "islamic-cultural-experience",
    title: "Islamic Cultural Experience",
    description: "Deep dive into Islamic heritage, art, and cuisine in Singapore",
    longDescription:
      "A comprehensive tour exploring Islamic culture in Singapore. Visit the Malay Heritage Centre, explore Arab Street's vibrant shops selling prayer items and traditional clothing, learn about Islamic calligraphy at a local art studio, and enjoy a halal lunch at a traditional Malay restaurant. Our guide will share insights into the daily life and practices of Singapore's Muslim community.",
    price: 6500, // $65
    currency: "SGD",
    duration: "4 hours",
    durationMinutes: 240,
    maxGroupSize: 18,
    location: "Kampong Glam",
    meetingPoint: "Malay Heritage Centre",
    category: "Jaulah Masjid",
    coverImage: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=800",
    images: ["https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=800"],
    rating: 4.8,
    ratingCount: 124,
    bookingCount: 203,
    available: true,
    featured: false,
  },
  {
    id: "tour-10",
    slug: "singapore-river-cruise-dinner",
    title: "Singapore River Cruise & Dinner",
    description: "Sunset river cruise with traditional bumboat and riverside dinner",
    longDescription:
      "Experience Singapore from the water on this evening river cruise. Board a traditional bumboat and cruise along the Singapore River, passing Clarke Quay, Boat Quay, and Marina Bay. Watch the sunset over the city skyline and see the Marina Bay light show. Includes a delicious dinner at a riverside restaurant with views of the illuminated cityscape. Perfect for couples and photographers.",
    price: 11500, // $115
    currency: "SGD",
    duration: "3.5 hours",
    durationMinutes: 210,
    maxGroupSize: 20,
    location: "Singapore River",
    meetingPoint: "Clarke Quay Central Pier",
    category: "City Tour",
    coverImage: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800",
    images: ["https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800"],
    rating: 4.7,
    ratingCount: 156,
    bookingCount: 298,
    available: true,
    featured: true,
  },
  {
    id: "tour-11",
    slug: "gardens-by-the-bay-nature-walk",
    title: "Gardens by the Bay Nature Walk",
    description: "Guided tour through Gardens by the Bay's iconic Supertrees and conservatories",
    longDescription:
      "Discover the incredible biodiversity at Gardens by the Bay, Singapore's premier nature park. Walk through the Cloud Forest and Flower Dome conservatories, stroll along the OCBC Skyway suspended between Supertrees, and learn about sustainable urban gardening. See exotic plants from around the world and understand Singapore's commitment to becoming a city in a garden. Includes reserved entry tickets.",
    price: 9200, // $92
    currency: "SGD",
    duration: "3 hours",
    durationMinutes: 180,
    maxGroupSize: 15,
    location: "Gardens by the Bay",
    meetingPoint: "Gardens by the Bay Visitor Centre",
    category: "Edutrip",
    coverImage: "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=800",
    images: ["https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=800"],
    rating: 4.8,
    ratingCount: 189,
    bookingCount: 356,
    available: true,
    featured: true,
  },
  {
    id: "tour-12",
    slug: "breakfast-trail-local-eats",
    title: "Breakfast Trail: Local Eats",
    description: "Morning food tour sampling Singapore's best breakfast dishes",
    longDescription:
      "Start your day like a true local with this breakfast food tour. Sample traditional breakfast favorites including kaya toast with soft-boiled eggs, roti prata, nasi lemak, and local coffee made the traditional way. Visit 3-4 different hawker centres and kopitiams, learning about Singapore's unique breakfast culture. Perfect for early birds and food enthusiasts.",
    price: 5500, // $55
    currency: "SGD",
    duration: "2.5 hours",
    durationMinutes: 150,
    maxGroupSize: 12,
    location: "Singapore",
    meetingPoint: "Tanjong Pagar MRT Station",
    category: "Food Tour",
    coverImage: "https://images.unsplash.com/photo-1533920379810-6bedac961555?w=800",
    images: ["https://images.unsplash.com/photo-1533920379810-6bedac961555?w=800"],
    rating: 4.6,
    ratingCount: 67,
    bookingCount: 134,
    available: true,
    featured: false,
  },
];

const highlights = [
  // Tour 1 - Singapore City Highlights
  {
    id: "h1-1",
    tourId: "tour-1",
    icon: "building",
    title: "Marina Bay Sands",
    description: "Visit Singapore's iconic integrated resort",
    order: 1,
  },
  {
    id: "h1-2",
    tourId: "tour-1",
    icon: "tree-palm",
    title: "Gardens by the Bay",
    description: "Explore the famous Supertree Grove",
    order: 2,
  },
  {
    id: "h1-3",
    tourId: "tour-1",
    icon: "landmark",
    title: "Chinatown Heritage",
    description: "Discover historic Chinatown streets",
    order: 3,
  },
  {
    id: "h1-4",
    tourId: "tour-1",
    icon: "camera",
    title: "Photo Opportunities",
    description: "Capture stunning cityscapes",
    order: 4,
  },

  // Tour 2 - Hawker Food Adventure
  {
    id: "h2-1",
    tourId: "tour-2",
    icon: "utensils",
    title: "10+ Local Dishes",
    description: "Taste authentic Singaporean cuisine",
    order: 1,
  },
  {
    id: "h2-2",
    tourId: "tour-2",
    icon: "users",
    title: "Small Group",
    description: "Intimate experience with max 12 people",
    order: 2,
  },
  {
    id: "h2-3",
    tourId: "tour-2",
    icon: "chef-hat",
    title: "Expert Guide",
    description: "Learn from a local foodie",
    order: 3,
  },
  {
    id: "h2-4",
    tourId: "tour-2",
    icon: "heart",
    title: "Halal Options",
    description: "Dietary requirements accommodated",
    order: 4,
  },

  // Tour 3 - Masjid Heritage Trail
  {
    id: "h3-1",
    tourId: "tour-3",
    icon: "mosque",
    title: "Historic Mosques",
    description: "Visit 3 beautiful historic mosques",
    order: 1,
  },
  {
    id: "h3-2",
    tourId: "tour-3",
    icon: "book-open",
    title: "Islamic Heritage",
    description: "Learn about Muslim community history",
    order: 2,
  },
  {
    id: "h3-3",
    tourId: "tour-3",
    icon: "building",
    title: "Architecture",
    description: "Admire stunning Islamic architecture",
    order: 3,
  },

  // Tour 4 - Sentosa Island
  {
    id: "h4-1",
    tourId: "tour-4",
    icon: "island",
    title: "Beach Time",
    description: "Relax at Siloso Beach",
    order: 1,
  },
  {
    id: "h4-2",
    tourId: "tour-4",
    icon: "cable-car",
    title: "Cable Car Ride",
    description: "Scenic cable car experience",
    order: 2,
  },
  {
    id: "h4-3",
    tourId: "tour-4",
    icon: "utensils",
    title: "Lunch Included",
    description: "Beachside restaurant meal",
    order: 3,
  },

  // Tour 5 - Night Safari
  {
    id: "h5-1",
    tourId: "tour-5",
    icon: "moon",
    title: "Nocturnal Animals",
    description: "See 130+ species in nighttime habitat",
    order: 1,
  },
  {
    id: "h5-2",
    tourId: "tour-5",
    icon: "ticket",
    title: "Reserved Tram",
    description: "Skip the queue with reserved seating",
    order: 2,
  },
  {
    id: "h5-3",
    tourId: "tour-5",
    icon: "star",
    title: "Wildlife Show",
    description: "Watch Creatures of the Night performance",
    order: 3,
  },

  // Tour 7 - Street Food Crawl
  {
    id: "h7-1",
    tourId: "tour-7",
    icon: "utensils",
    title: "12+ Dishes",
    description: "Sample a wide variety of street food",
    order: 1,
  },
  {
    id: "h7-2",
    tourId: "tour-7",
    icon: "map",
    title: "4 Locations",
    description: "Visit multiple hawker centres",
    order: 2,
  },
  {
    id: "h7-3",
    tourId: "tour-7",
    icon: "sunset",
    title: "Evening Tour",
    description: "Experience the nighttime food scene",
    order: 3,
  },

  // Tour 10 - River Cruise
  {
    id: "h10-1",
    tourId: "tour-10",
    icon: "ship",
    title: "Bumboat Cruise",
    description: "Traditional boat experience",
    order: 1,
  },
  {
    id: "h10-2",
    tourId: "tour-10",
    icon: "sunset",
    title: "Sunset Views",
    description: "Watch sunset over the city",
    order: 2,
  },
  {
    id: "h10-3",
    tourId: "tour-10",
    icon: "sparkles",
    title: "Light Show",
    description: "See Marina Bay illuminated",
    order: 3,
  },

  // Tour 11 - Gardens by the Bay
  {
    id: "h11-1",
    tourId: "tour-11",
    icon: "tree-pine",
    title: "Cloud Forest",
    description: "Explore the misty mountain conservatory",
    order: 1,
  },
  {
    id: "h11-2",
    tourId: "tour-11",
    icon: "flower",
    title: "Flower Dome",
    description: "See Mediterranean and semi-arid plants",
    order: 2,
  },
  {
    id: "h11-3",
    tourId: "tour-11",
    icon: "bridge",
    title: "OCBC Skyway",
    description: "Walk between the Supertrees",
    order: 3,
  },
];

const itineraries = [
  // Tour 1 - Singapore City Highlights
  {
    id: "i1-1",
    tourId: "tour-1",
    order: 1,
    title: "Marina Bay Sands",
    description:
      "Start at the iconic Marina Bay Sands. Learn about its architecture and significance.",
    duration: "45 mins",
    location: "Marina Bay",
  },
  {
    id: "i1-2",
    tourId: "tour-1",
    order: 2,
    title: "Gardens by the Bay",
    description: "Walk through the Supertree Grove and outdoor gardens.",
    duration: "45 mins",
    location: "Gardens by the Bay",
  },
  {
    id: "i1-3",
    tourId: "tour-1",
    order: 3,
    title: "Chinatown",
    description: "Explore the historic streets and visit a traditional shophouse.",
    duration: "60 mins",
    location: "Chinatown",
  },
  {
    id: "i1-4",
    tourId: "tour-1",
    order: 4,
    title: "Little India",
    description: "Experience the vibrant colors and culture of Little India.",
    duration: "45 mins",
    location: "Little India",
  },
  {
    id: "i1-5",
    tourId: "tour-1",
    order: 5,
    title: "Merlion Park",
    description: "End at the iconic Merlion for photos and cityscape views.",
    duration: "25 mins",
    location: "Marina Bay",
  },

  // Tour 2 - Hawker Food Adventure
  {
    id: "i2-1",
    tourId: "tour-2",
    order: 1,
    title: "Maxwell Food Centre",
    description: "Start with famous chicken rice and other local favorites.",
    duration: "50 mins",
    location: "Maxwell Food Centre",
  },
  {
    id: "i2-2",
    tourId: "tour-2",
    order: 2,
    title: "Lau Pa Sat",
    description: "Sample satay and seafood dishes in this historic hawker centre.",
    duration: "50 mins",
    location: "Lau Pa Sat",
  },
  {
    id: "i2-3",
    tourId: "tour-2",
    order: 3,
    title: "Newton Food Centre",
    description: "Try chili crab and other signature dishes.",
    duration: "50 mins",
    location: "Newton Circus",
  },
  {
    id: "i2-4",
    tourId: "tour-2",
    order: 4,
    title: "Dessert Stop",
    description: "End with traditional desserts like ice kacang and chendol.",
    duration: "30 mins",
    location: "Various",
  },

  // Tour 3 - Masjid Heritage Trail
  {
    id: "i3-1",
    tourId: "tour-3",
    order: 1,
    title: "Sultan Mosque",
    description: "Tour Singapore's largest mosque with its golden dome.",
    duration: "60 mins",
    location: "Sultan Mosque",
  },
  {
    id: "i3-2",
    tourId: "tour-3",
    order: 2,
    title: "Malabar Mosque",
    description: "Visit this historic mosque in the heart of Kampong Glam.",
    duration: "45 mins",
    location: "Malabar Mosque",
  },
  {
    id: "i3-3",
    tourId: "tour-3",
    order: 3,
    title: "Abdul Gafoor Mosque",
    description: "Admire the unique architectural blend of this beautiful mosque.",
    duration: "45 mins",
    location: "Abdul Gafoor Mosque",
  },
  {
    id: "i3-4",
    tourId: "tour-3",
    order: 4,
    title: "Arab Street Walk",
    description: "Explore the surrounding cultural district.",
    duration: "30 mins",
    location: "Arab Street",
  },

  // Tour 5 - Night Safari
  {
    id: "i5-1",
    tourId: "tour-5",
    order: 1,
    title: "Arrival & Orientation",
    description: "Meet the guide and learn about the night safari experience.",
    duration: "20 mins",
    location: "Entrance",
  },
  {
    id: "i5-2",
    tourId: "tour-5",
    order: 2,
    title: "Tram Ride",
    description: "Reserved tram tour through different geographical zones.",
    duration: "45 mins",
    location: "Tram Route",
  },
  {
    id: "i5-3",
    tourId: "tour-5",
    order: 3,
    title: "Walking Trails",
    description: "Explore the forest and leopard trails on foot.",
    duration: "90 mins",
    location: "Walking Trails",
  },
  {
    id: "i5-4",
    tourId: "tour-5",
    order: 4,
    title: "Creatures of the Night",
    description: "Watch the spectacular animal performance show.",
    duration: "25 mins",
    location: "Amphitheatre",
  },

  // Tour 7 - Street Food Crawl
  {
    id: "i7-1",
    tourId: "tour-7",
    order: 1,
    title: "Chinatown Complex",
    description: "Start with popular dishes like oyster omelette and rojak.",
    duration: "50 mins",
    location: "Chinatown",
  },
  {
    id: "i7-2",
    tourId: "tour-7",
    order: 2,
    title: "Tiong Bahru Market",
    description: "Sample traditional kueh and local breakfast items.",
    duration: "40 mins",
    location: "Tiong Bahru",
  },
  {
    id: "i7-3",
    tourId: "tour-7",
    order: 3,
    title: "Old Airport Road",
    description: "Try famous carrot cake and BBQ chicken wings.",
    duration: "50 mins",
    location: "Geylang",
  },
  {
    id: "i7-4",
    tourId: "tour-7",
    order: 4,
    title: "Durian Tasting",
    description: "End with the King of Fruits (optional).",
    duration: "30 mins",
    location: "Geylang",
  },
];

const reviews = [
  // Tour 1 reviews
  {
    id: "r1-1",
    tourId: "tour-1",
    userId: "sample-user-1",
    rating: 5,
    title: "Amazing experience!",
    comment:
      "Our guide was incredibly knowledgeable and showed us all the best spots. Highly recommend this tour for first-time visitors!",
  },
  {
    id: "r1-2",
    tourId: "tour-1",
    userId: "sample-user-2",
    rating: 5,
    title: "Perfect city overview",
    comment:
      "Great way to see all the main attractions in one day. The pace was just right and the guide was very friendly.",
  },
  {
    id: "r1-3",
    tourId: "tour-1",
    userId: "sample-user-3",
    rating: 4,
    title: "Very good tour",
    comment:
      "Enjoyed seeing all the landmarks. Would have liked a bit more time at Gardens by the Bay but overall excellent.",
  },

  // Tour 2 reviews
  {
    id: "r2-1",
    tourId: "tour-2",
    userId: "sample-user-4",
    rating: 5,
    title: "Food heaven!",
    comment:
      "This tour was incredible! We tried so many delicious dishes. Our guide knew all the best stalls and the stories behind each dish.",
  },
  {
    id: "r2-2",
    tourId: "tour-2",
    userId: "sample-user-5",
    rating: 5,
    title: "Best food tour ever",
    comment:
      "As a food lover, this was the highlight of my Singapore trip. Authentic local flavors and great company.",
  },
  {
    id: "r2-3",
    tourId: "tour-2",
    userId: "sample-user-6",
    rating: 5,
    title: "Highly recommended",
    comment: "Amazing variety of food and the portions were generous. Left feeling very satisfied!",
  },
  {
    id: "r2-4",
    tourId: "tour-2",
    userId: "sample-user-7",
    rating: 4,
    title: "Great food experience",
    comment:
      "Loved all the food we tried. Could have had more vegetarian options but overall fantastic.",
  },

  // Tour 3 reviews
  {
    id: "r3-1",
    tourId: "tour-3",
    userId: "sample-user-8",
    rating: 5,
    title: "Beautiful mosques",
    comment:
      "The mosques were absolutely stunning and the guide was very respectful and informative about Islamic culture.",
  },
  {
    id: "r3-2",
    tourId: "tour-3",
    userId: "sample-user-9",
    rating: 5,
    title: "Educational and inspiring",
    comment:
      "Learned so much about Singapore's Muslim heritage. The architecture was breathtaking.",
  },

  // Tour 5 reviews
  {
    id: "r5-1",
    tourId: "tour-5",
    userId: "sample-user-10",
    rating: 5,
    title: "Magical night experience",
    comment:
      "Seeing the animals at night was so special. The show was entertaining and the tram ride was comfortable.",
  },
  {
    id: "r5-2",
    tourId: "tour-5",
    userId: "sample-user-11",
    rating: 5,
    title: "Kids loved it!",
    comment:
      "Perfect family activity. Our children were amazed by all the animals. Worth every penny!",
  },
  {
    id: "r5-3",
    tourId: "tour-5",
    userId: "sample-user-12",
    rating: 4,
    title: "Great wildlife experience",
    comment:
      "Very well organized tour. The reserved tram was a nice touch. Would recommend to anyone visiting Singapore.",
  },

  // Tour 7 reviews
  {
    id: "r7-1",
    tourId: "tour-7",
    userId: "sample-user-13",
    rating: 5,
    title: "Street food paradise",
    comment: "This tour exceeded all expectations. So much variety and everything was delicious!",
  },
  {
    id: "r7-2",
    tourId: "tour-7",
    userId: "sample-user-14",
    rating: 5,
    title: "Authentic local experience",
    comment:
      "Felt like a local for the evening. Our guide was passionate about food and it showed.",
  },
  {
    id: "r7-3",
    tourId: "tour-7",
    userId: "sample-user-15",
    rating: 5,
    title: "Must do tour!",
    comment: "If you only do one food tour in Singapore, make it this one. Absolutely fantastic!",
  },

  // Tour 10 reviews
  {
    id: "r10-1",
    tourId: "tour-10",
    userId: "sample-user-16",
    rating: 5,
    title: "Romantic and beautiful",
    comment:
      "Perfect evening activity for couples. The sunset was gorgeous and dinner was excellent.",
  },
  {
    id: "r10-2",
    tourId: "tour-10",
    userId: "sample-user-17",
    rating: 4,
    title: "Lovely experience",
    comment:
      "The river cruise was relaxing and the light show was spectacular. Dinner was good but could have been better.",
  },

  // Tour 11 reviews
  {
    id: "r11-1",
    tourId: "tour-11",
    userId: "sample-user-18",
    rating: 5,
    title: "Nature lover's dream",
    comment:
      "The Gardens are absolutely incredible. Our guide was very knowledgeable about all the plants.",
  },
  {
    id: "r11-2",
    tourId: "tour-11",
    userId: "sample-user-19",
    rating: 5,
    title: "Stunning conservatories",
    comment: "The Cloud Forest was my favorite. Skip the queue tickets were very helpful!",
  },
];

async function seed() {
  console.log("🌱 Starting seed...");

  try {
    // Create sample user for reviews if not exists
    const sampleUsers = [
      { id: "sample-user-1", name: "Sarah Chen", email: "sarah@example.com", emailVerified: true },
      {
        id: "sample-user-2",
        name: "Michael Tan",
        email: "michael@example.com",
        emailVerified: true,
      },
      {
        id: "sample-user-3",
        name: "Rachel Wong",
        email: "rachel@example.com",
        emailVerified: true,
      },
      { id: "sample-user-4", name: "David Lim", email: "david@example.com", emailVerified: true },
      { id: "sample-user-5", name: "Emily Ng", email: "emily@example.com", emailVerified: true },
      { id: "sample-user-6", name: "James Kumar", email: "james@example.com", emailVerified: true },
      { id: "sample-user-7", name: "Lisa Tan", email: "lisa@example.com", emailVerified: true },
      {
        id: "sample-user-8",
        name: "Ahmed Hassan",
        email: "ahmed@example.com",
        emailVerified: true,
      },
      {
        id: "sample-user-9",
        name: "Fatimah Ibrahim",
        email: "fatimah@example.com",
        emailVerified: true,
      },
      { id: "sample-user-10", name: "Kevin Ong", email: "kevin@example.com", emailVerified: true },
      {
        id: "sample-user-11",
        name: "Michelle Teo",
        email: "michelle@example.com",
        emailVerified: true,
      },
      { id: "sample-user-12", name: "Ryan Lee", email: "ryan@example.com", emailVerified: true },
      {
        id: "sample-user-13",
        name: "Sophia Lim",
        email: "sophia@example.com",
        emailVerified: true,
      },
      {
        id: "sample-user-14",
        name: "Daniel Koh",
        email: "daniel@example.com",
        emailVerified: true,
      },
      {
        id: "sample-user-15",
        name: "Amanda Chua",
        email: "amanda@example.com",
        emailVerified: true,
      },
      {
        id: "sample-user-16",
        name: "Benjamin Tan",
        email: "benjamin@example.com",
        emailVerified: true,
      },
      { id: "sample-user-17", name: "Grace Wong", email: "grace@example.com", emailVerified: true },
      {
        id: "sample-user-18",
        name: "Nathan Goh",
        email: "nathan@example.com",
        emailVerified: true,
      },
      {
        id: "sample-user-19",
        name: "Olivia Sim",
        email: "olivia@example.com",
        emailVerified: true,
      },
    ];

    console.log("Creating sample users...");
    for (const userData of sampleUsers) {
      await db.insert(user).values(userData).onConflictDoNothing();
    }

    // Insert tours
    console.log("Inserting tours...");
    for (const tourData of sampleTours) {
      await db.insert(tour).values(tourData).onConflictDoNothing();
    }

    // Insert highlights
    console.log("Inserting tour highlights...");
    for (const highlight of highlights) {
      await db.insert(tourHighlight).values(highlight).onConflictDoNothing();
    }

    // Insert itineraries
    console.log("Inserting tour itineraries...");
    for (const itinerary of itineraries) {
      await db.insert(tourItinerary).values(itinerary).onConflictDoNothing();
    }

    // Insert reviews
    console.log("Inserting reviews...");
    for (const reviewData of reviews) {
      await db
        .insert(review)
        .values({
          ...reviewData,
          verified: true,
        })
        .onConflictDoNothing();
    }

    console.log("✅ Seed completed successfully!");
    console.log(`   - ${sampleTours.length} tours`);
    console.log(`   - ${highlights.length} highlights`);
    console.log(`   - ${itineraries.length} itinerary items`);
    console.log(`   - ${reviews.length} reviews`);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    throw error;
  }
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
