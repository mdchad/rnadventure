import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, integer, index, real } from "drizzle-orm/sqlite-core";
import { user, organization } from "./auth";

// Main tour table
export const tour = sqliteTable(
  "tour",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    longDescription: text("long_description"),

    // Pricing (stored in cents)
    price: integer("price").notNull(),
    originalPrice: integer("original_price"),
    currency: text("currency").default("SGD").notNull(),

    // Tour details
    duration: text("duration").notNull(), // e.g., "4 hours", "Full day"
    durationMinutes: integer("duration_minutes").notNull(),
    maxGroupSize: integer("max_group_size").notNull(),
    location: text("location").notNull(),
    meetingPoint: text("meeting_point"),

    // Category
    category: text("category").notNull(), // City Tour, Food Tour, Jaulah Masjid, Edutrip

    // Media
    coverImage: text("cover_image").notNull(),
    images: text("images", { mode: "json" })
      .$type<string[]>()
      .default(sql`'[]'`),

    // Stats
    rating: real("rating").default(0),
    ratingCount: integer("rating_count").default(0),
    bookingCount: integer("booking_count").default(0),

    // Status
    available: integer("available", { mode: "boolean" }).default(true).notNull(),
    featured: integer("featured", { mode: "boolean" }).default(false).notNull(),

    // Relations
    organizationId: text("organization_id").references(() => organization.id, {
      onDelete: "set null",
    }),
    guideId: text("guide_id").references(() => user.id, { onDelete: "set null" }),

    // Timestamps
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("tour_slug_idx").on(table.slug),
    index("tour_category_idx").on(table.category),
    index("tour_organizationId_idx").on(table.organizationId),
    index("tour_featured_idx").on(table.featured),
  ],
);

// Tour highlights
export const tourHighlight = sqliteTable(
  "tour_highlight",
  {
    id: text("id").primaryKey(),
    tourId: text("tour_id")
      .notNull()
      .references(() => tour.id, { onDelete: "cascade" }),
    icon: text("icon").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    order: integer("order").notNull(),
  },
  (table) => [index("tour_highlight_tourId_idx").on(table.tourId)],
);

// Tour itinerary
export const tourItinerary = sqliteTable(
  "tour_itinerary",
  {
    id: text("id").primaryKey(),
    tourId: text("tour_id")
      .notNull()
      .references(() => tour.id, { onDelete: "cascade" }),
    order: integer("order").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    duration: text("duration"),
    location: text("location"),
  },
  (table) => [index("tour_itinerary_tourId_idx").on(table.tourId)],
);

// Bookings
export const booking = sqliteTable(
  "booking",
  {
    id: text("id").primaryKey(),
    bookingNumber: text("booking_number").notNull().unique(),
    tourId: text("tour_id")
      .notNull()
      .references(() => tour.id, { onDelete: "restrict" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "restrict" }),

    // Booking details
    date: integer("date", { mode: "timestamp_ms" }).notNull(),
    numberOfPeople: integer("number_of_people").notNull(),

    // Pricing (stored in cents)
    pricePerPerson: integer("price_per_person").notNull(),
    totalPrice: integer("total_price").notNull(),

    // Status
    status: text("status").notNull(), // pending, confirmed, cancelled, completed
    paymentStatus: text("payment_status").notNull(), // pending, paid, refunded

    // Customer info
    customerName: text("customer_name").notNull(),
    customerEmail: text("customer_email").notNull(),
    customerPhone: text("customer_phone"),
    specialRequests: text("special_requests"),

    // Payment
    stripePaymentIntentId: text("stripe_payment_intent_id"),
    stripeSessionId: text("stripe_session_id"),

    // Timestamps
    confirmedAt: integer("confirmed_at", { mode: "timestamp_ms" }),
    cancelledAt: integer("cancelled_at", { mode: "timestamp_ms" }),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("booking_userId_idx").on(table.userId),
    index("booking_tourId_idx").on(table.tourId),
    index("booking_date_idx").on(table.date),
    index("booking_status_idx").on(table.status),
  ],
);

// Reviews
export const review = sqliteTable(
  "review",
  {
    id: text("id").primaryKey(),
    tourId: text("tour_id")
      .notNull()
      .references(() => tour.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    bookingId: text("booking_id").references(() => booking.id, { onDelete: "set null" }),

    // Review content
    rating: integer("rating").notNull(), // 1-5
    title: text("title"),
    comment: text("comment"),

    // Verification
    verified: integer("verified", { mode: "boolean" }).default(false),

    // Timestamps
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("review_tourId_idx").on(table.tourId),
    index("review_userId_idx").on(table.userId),
  ],
);

// Relations
export const tourRelations = relations(tour, ({ many, one }) => ({
  highlights: many(tourHighlight),
  itinerary: many(tourItinerary),
  bookings: many(booking),
  reviews: many(review),
  organization: one(organization, {
    fields: [tour.organizationId],
    references: [organization.id],
  }),
  guide: one(user, {
    fields: [tour.guideId],
    references: [user.id],
  }),
}));

export const tourHighlightRelations = relations(tourHighlight, ({ one }) => ({
  tour: one(tour, {
    fields: [tourHighlight.tourId],
    references: [tour.id],
  }),
}));

export const tourItineraryRelations = relations(tourItinerary, ({ one }) => ({
  tour: one(tour, {
    fields: [tourItinerary.tourId],
    references: [tour.id],
  }),
}));

export const bookingRelations = relations(booking, ({ one }) => ({
  tour: one(tour, {
    fields: [booking.tourId],
    references: [tour.id],
  }),
  user: one(user, {
    fields: [booking.userId],
    references: [user.id],
  }),
  review: one(review, {
    fields: [booking.id],
    references: [review.bookingId],
  }),
}));

export const reviewRelations = relations(review, ({ one }) => ({
  tour: one(tour, {
    fields: [review.tourId],
    references: [tour.id],
  }),
  user: one(user, {
    fields: [review.userId],
    references: [user.id],
  }),
  booking: one(booking, {
    fields: [review.bookingId],
    references: [booking.id],
  }),
}));
