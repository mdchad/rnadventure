"use server";

import { db } from "@rnadventure/db";
import { booking, tour, user } from "@rnadventure/db/schema";
import { desc, count, sum, eq, sql } from "drizzle-orm";
import { auth } from "@rnadventure/auth";
import { headers } from "next/headers";

export async function getAdminStats() {
  // Total bookings
  const [totalBookingsResult] = await db.select({ count: count() }).from(booking);

  // Confirmed bookings
  const [confirmedBookingsResult] = await db
    .select({ count: count() })
    .from(booking)
    .where(eq(booking.status, "confirmed"));

  // Pending bookings
  const [pendingBookingsResult] = await db
    .select({ count: count() })
    .from(booking)
    .where(eq(booking.status, "pending"));

  // Total revenue (only confirmed bookings)
  const [revenueResult] = await db
    .select({ total: sum(booking.totalPrice) })
    .from(booking)
    .where(eq(booking.paymentStatus, "paid"));

  return {
    totalBookings: totalBookingsResult?.count || 0,
    confirmedBookings: confirmedBookingsResult?.count || 0,
    pendingBookings: pendingBookingsResult?.count || 0,
    totalRevenue: Number(revenueResult?.total || 0),
  };
}

export async function getAllBookings(filters?: {
  status?: string;
  paymentStatus?: string;
  search?: string;
}) {
  // Build conditions
  const conditions = [];

  if (filters?.status) {
    conditions.push(eq(booking.status, filters.status));
  }

  if (filters?.paymentStatus) {
    conditions.push(eq(booking.paymentStatus, filters.paymentStatus));
  }

  if (filters?.search) {
    conditions.push(
      sql`${booking.bookingNumber} LIKE ${"%" + filters.search + "%"} OR ${booking.customerName} LIKE ${"%" + filters.search + "%"} OR ${booking.customerEmail} LIKE ${"%" + filters.search + "%"}`,
    );
  }

  // Build query
  const query = db
    .select({
      id: booking.id,
      bookingNumber: booking.bookingNumber,
      tourId: booking.tourId,
      tourTitle: tour.title,
      tourSlug: tour.slug,
      date: booking.date,
      numberOfPeople: booking.numberOfPeople,
      totalPrice: booking.totalPrice,
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      customerPhone: booking.customerPhone,
      specialRequests: booking.specialRequests,
      createdAt: booking.createdAt,
      confirmedAt: booking.confirmedAt,
      stripeSessionId: booking.stripeSessionId,
    })
    .from(booking)
    .leftJoin(tour, eq(booking.tourId, tour.id))
    .$dynamic();

  // Apply where clause if we have conditions
  const bookings = await (
    conditions.length > 0 ? query.where(sql.join(conditions, sql` AND `)) : query
  ).orderBy(desc(booking.createdAt));

  return bookings;
}

export async function getBookingStats() {
  // Bookings by status
  const statusStats = await db
    .select({
      status: booking.status,
      count: count(),
    })
    .from(booking)
    .groupBy(booking.status);

  // Bookings by payment status
  const paymentStats = await db
    .select({
      paymentStatus: booking.paymentStatus,
      count: count(),
    })
    .from(booking)
    .groupBy(booking.paymentStatus);

  // Recent bookings (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [recentBookingsResult] = await db
    .select({ count: count() })
    .from(booking)
    .where(sql`${booking.createdAt} >= ${sevenDaysAgo.getTime()}`);

  return {
    byStatus: statusStats,
    byPaymentStatus: paymentStats,
    recentCount: recentBookingsResult?.count || 0,
  };
}

/**
 * Get all admin users
 */
export async function getAllAdminUsers() {
  const admins = await db.query.user.findMany({
    where: eq(user.role, "admin"),
    columns: {
      id: true,
      email: true,
      name: true,
      emailVerified: true,
      createdAt: true,
      role: true,
    },
    orderBy: [desc(user.createdAt)],
  });

  return admins;
}

/**
 * Create a new admin user
 */
export async function createAdminUser(data: { name: string; email: string; password: string }) {
  try {
    // Create user with signUpEmail
    const newUser = await auth.api.signUpEmail({
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    // Check if user was created successfully
    if ("user" in newUser && newUser.user?.id) {
      // Use Better Auth's admin API to set the role
      await auth.api.setRole({
        headers: await headers(),
        body: {
          userId: newUser.user.id,
          role: "admin",
        },
      });

      return {
        success: true,
        message: "Admin user created successfully",
        userId: newUser.user.id,
      };
    }

    return {
      success: false,
      message: "Failed to create admin user",
    };
  } catch (error: any) {
    console.error("Error creating admin user:", error);

    // Check if user already exists
    if (error?.message?.includes("already exists") || error?.message?.includes("unique")) {
      return {
        success: false,
        message: "User with this email already exists",
      };
    }

    return {
      success: false,
      message: error?.message || "Failed to create admin user",
    };
  }
}

/**
 * Delete admin user
 */
export async function deleteAdminUser(userId: string) {
  try {
    // Check how many admins exist
    const [adminCount] = await db
      .select({ count: count() })
      .from(user)
      .where(eq(user.role, "admin"));

    // Prevent deleting the last admin
    if (adminCount.count <= 1) {
      return {
        success: false,
        message: "Cannot delete the last admin user",
      };
    }

    // Delete the user
    await db.delete(user).where(eq(user.id, userId));

    return {
      success: true,
      message: "Admin user deleted successfully",
    };
  } catch (error: any) {
    console.error("Error deleting admin user:", error);
    return {
      success: false,
      message: error?.message || "Failed to delete admin user",
    };
  }
}
