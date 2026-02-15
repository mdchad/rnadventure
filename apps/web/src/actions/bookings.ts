"use server";

import { db } from "@rnadventure/db";
import { booking, tour } from "@rnadventure/db/schema";
import { eq, sql } from "drizzle-orm";
import { nanoid } from "nanoid";

export interface CreateBookingInput {
  tourId: string;
  userId: string | null;
  date: Date;
  numberOfPeople: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  specialRequests?: string;
}

export async function createBooking(input: CreateBookingInput) {
  // Get tour details to calculate pricing
  const tourData = await db.query.tour.findFirst({
    where: eq(tour.id, input.tourId),
  });

  if (!tourData) {
    throw new Error("Tour not found");
  }

  if (!tourData.available) {
    throw new Error("Tour is not available for booking");
  }

  if (input.numberOfPeople > tourData.maxGroupSize) {
    throw new Error(`Maximum group size is ${tourData.maxGroupSize} people`);
  }

  // Calculate pricing
  const pricePerPerson = tourData.price;
  const totalPrice = pricePerPerson * input.numberOfPeople;

  // Generate unique booking number (e.g., BK-20260215-ABCD1234)
  const bookingNumber = generateBookingNumber();

  // Create booking with pending status
  const [newBooking] = await db
    .insert(booking)
    .values({
      id: nanoid(),
      bookingNumber,
      tourId: input.tourId,
      userId: input.userId,
      date: input.date,
      numberOfPeople: input.numberOfPeople,
      pricePerPerson,
      totalPrice,
      status: "pending",
      paymentStatus: "pending",
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerPhone: input.customerPhone || null,
      specialRequests: input.specialRequests || null,
    })
    .returning();

  return newBooking;
}

export async function updateBookingPayment(
  bookingId: string,
  stripeSessionId: string,
  stripePaymentIntentId?: string,
) {
  const [updatedBooking] = await db
    .update(booking)
    .set({
      stripeSessionId,
      stripePaymentIntentId: stripePaymentIntentId || null,
    })
    .where(eq(booking.id, bookingId))
    .returning();

  return updatedBooking;
}

export async function confirmBooking(bookingId: string) {
  const [confirmedBooking] = await db
    .update(booking)
    .set({
      status: "confirmed",
      paymentStatus: "paid",
      confirmedAt: new Date(),
    })
    .where(eq(booking.id, bookingId))
    .returning();

  // Update tour booking count
  if (confirmedBooking) {
    await db
      .update(tour)
      .set({
        bookingCount: sql`${tour.bookingCount} + 1`,
      })
      .where(eq(tour.id, confirmedBooking.tourId));
  }

  return confirmedBooking;
}

export async function cancelBooking(bookingId: string) {
  const [cancelledBooking] = await db
    .update(booking)
    .set({
      status: "cancelled",
      cancelledAt: new Date(),
    })
    .where(eq(booking.id, bookingId))
    .returning();

  return cancelledBooking;
}

export async function getBookingByStripeSessionId(sessionId: string) {
  const bookingData = await db.query.booking.findFirst({
    where: eq(booking.stripeSessionId, sessionId),
    with: {
      tour: true,
      user: {
        columns: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return bookingData;
}

export async function getBookingById(bookingId: string) {
  const bookingData = await db.query.booking.findFirst({
    where: eq(booking.id, bookingId),
    with: {
      tour: true,
      user: {
        columns: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return bookingData;
}

export async function getUserBookings(userId: string) {
  const bookings = await db.query.booking.findMany({
    where: eq(booking.userId, userId),
    with: {
      tour: true,
    },
    orderBy: (bookings, { desc }) => [desc(bookings.createdAt)],
  });

  return bookings;
}

function generateBookingNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const randomString = nanoid(8).toUpperCase();

  return `BK-${year}${month}${day}-${randomString}`;
}
