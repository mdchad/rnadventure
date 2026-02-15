import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { env } from "@rnadventure/env/server";
import { confirmBooking, getBookingByStripeSessionId, cancelBooking } from "@/actions/bookings";
import { headers } from "next/headers";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature provided" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // Get booking from database using session ID
        const booking = await getBookingByStripeSessionId(session.id);

        if (!booking) {
          console.error("Booking not found for session:", session.id);
          return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }

        // Confirm the booking
        await confirmBooking(booking.id);

        console.log(`Booking ${booking.bookingNumber} confirmed for session ${session.id}`);
        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;

        // Get booking from database using session ID
        const booking = await getBookingByStripeSessionId(session.id);

        if (booking && booking.status === "pending") {
          // Cancel the expired booking
          await cancelBooking(booking.id);
          console.log(
            `Booking ${booking.bookingNumber} cancelled due to expired session ${session.id}`,
          );
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error("Payment failed:", paymentIntent.id);
        // You could add logic here to notify the user or update booking status
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
