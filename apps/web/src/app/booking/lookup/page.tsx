import type { Metadata } from "next";
import Navigation from "@/components/landing/navigation";
import { Footer } from "@/components/layout/footer";
import { BookingLookupForm } from "@/components/booking/booking-lookup-form";

export const metadata: Metadata = {
  title: "Booking Lookup | RNAdventure",
  description: "Look up your booking details",
};

export default function BookingLookupPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Find Your Booking</h1>
          <p className="text-gray-600 text-lg">
            Enter your booking reference to view your tour details and download documents
          </p>
        </div>

        <BookingLookupForm />
      </div>

      <Footer />
    </div>
  );
}
