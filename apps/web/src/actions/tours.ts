"use server";

import { db } from "@rnadventure/db";
import { tour, review, booking } from "@rnadventure/db/schema";
import { eq, and, sql, desc, gte, lte, like } from "drizzle-orm";

export async function getFeaturedTours(limit = 6) {
  const tours = await db
    .select()
    .from(tour)
    .where(and(eq(tour.featured, true), eq(tour.available, true)))
    .orderBy(desc(tour.bookingCount))
    .limit(limit);

  return tours;
}

export async function getTours(filters?: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}) {
  let query = db.select().from(tour).where(eq(tour.available, true));

  const conditions = [eq(tour.available, true)];

  if (filters?.category) {
    conditions.push(eq(tour.category, filters.category));
  }

  if (filters?.minPrice) {
    conditions.push(gte(tour.price, filters.minPrice));
  }

  if (filters?.maxPrice) {
    conditions.push(lte(tour.price, filters.maxPrice));
  }

  if (filters?.search) {
    conditions.push(
      sql`${tour.title} LIKE ${"%" + filters.search + "%"} OR ${tour.description} LIKE ${"%" + filters.search + "%"}`,
    );
  }

  const tours = await db
    .select()
    .from(tour)
    .where(and(...conditions))
    .orderBy(desc(tour.featured), desc(tour.rating));

  return tours;
}

export async function getTourBySlug(slug: string) {
  const tourData = await db.query.tour.findFirst({
    where: eq(tour.slug, slug),
    with: {
      highlights: {
        orderBy: (highlights, { asc }) => [asc(highlights.order)],
      },
      itinerary: {
        orderBy: (itinerary, { asc }) => [asc(itinerary.order)],
      },
      reviews: {
        with: {
          user: {
            columns: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: (reviews, { desc }) => [desc(reviews.createdAt)],
        limit: 10,
      },
    },
  });

  return tourData;
}

export async function getRelatedTours(category: string, excludeId: string, limit = 3) {
  const tours = await db
    .select()
    .from(tour)
    .where(
      and(eq(tour.category, category), eq(tour.available, true), sql`${tour.id} != ${excludeId}`),
    )
    .orderBy(desc(tour.rating))
    .limit(limit);

  return tours;
}

export async function getTourReviews(tourId: string) {
  const reviews = await db.query.review.findMany({
    where: eq(review.tourId, tourId),
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: desc(review.createdAt),
  });

  return reviews;
}

export async function getStats() {
  const [toursCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(tour)
    .where(eq(tour.available, true));

  const [bookingsCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(booking)
    .where(eq(booking.status, "confirmed"));

  const [reviewsCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(review)
    .where(gte(review.rating, 5));

  return {
    totalTours: toursCount?.count || 0,
    totalBookings: bookingsCount?.count || 0,
    totalReviews: reviewsCount?.count || 0,
    yearsExperience: 3,
  };
}
