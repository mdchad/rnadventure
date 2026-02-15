import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { env } from "@rnadventure/env/server";
import { createBooking, updateBookingPayment } from "@/actions/bookings";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      tourId,
      tourTitle,
      tourImage,
      date,
      numberOfPeople,
      pricePerPerson,
      totalPrice,
      currency,
      customerName,
      customerEmail,
      customerPhone,
      specialRequests,
    } = body;

    // Validate required fields
    if (
      !tourId ||
      !tourTitle ||
      !date ||
      !numberOfPeople ||
      !pricePerPerson ||
      !totalPrice ||
      !customerName ||
      !customerEmail
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create booking in database (without userId for now)
    const booking = await createBooking({
      tourId,
      userId: "guest", // Guest checkout
      date: new Date(date),
      numberOfPeople,
      customerName,
      customerEmail,
      customerPhone,
      specialRequests,
    });

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: (currency || "sgd").toLowerCase(),
            product_data: {
              name: tourTitle,
              description: `Tour booking for ${numberOfPeople} ${numberOfPeople === 1 ? "person" : "people"} on ${new Date(date).toLocaleDateString()}`,
              images: tourImage ? [tourImage] : undefined,
            },
            unit_amount: pricePerPerson, // Amount in cents
          },
          quantity: numberOfPeople,
        },
      ],
      success_url: `${env.BETTER_AUTH_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.BETTER_AUTH_URL}/booking/cancel`,
      customer_email: customerEmail,
      metadata: {
        bookingId: booking.id,
        bookingNumber: booking.bookingNumber,
        tourId,
        numberOfPeople: numberOfPeople.toString(),
        date: new Date(date).toISOString(),
      },
    });

    // Update booking with Stripe session ID
    await updateBookingPayment(booking.id, checkoutSession.id);

    return NextResponse.json({
      sessionId: checkoutSession.id,
      bookingId: booking.id,
      bookingNumber: booking.bookingNumber,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
