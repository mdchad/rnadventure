import { Metadata } from "next";
import { redirect } from "next/navigation";
import Navigation from "@/components/landing/navigation";
import { Footer } from "@/components/layout/footer";
import { getBookingByStripeSessionId } from "@/actions/bookings";
import { CheckCircle, Calendar, MapPin, Users, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Booking Confirmed | RNAdventure",
  description: "Your tour booking has been confirmed",
};

interface SuccessPageProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function BookingSuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/");
  }

  const booking = await getBookingByStripeSessionId(session_id);

  if (!booking) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 text-lg">
            Your adventure awaits! We've sent a confirmation email to{" "}
            <span className="font-semibold">{booking.customerEmail}</span>
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-3xl border-2 border-gray-200 shadow-lg overflow-hidden mb-6">
          {/* Booking Number Banner */}
          <div className="bg-venture-green px-6 py-4">
            <div className="text-center">
              <p className="text-venture-black text-sm font-medium mb-1">Booking Number</p>
              <p className="text-venture-black text-2xl font-bold">{booking.bookingNumber}</p>
            </div>
          </div>

          {/* Tour Details */}
          <div className="p-6">
            {booking.tour.coverImage && (
              <img
                src={booking.tour.coverImage}
                alt={booking.tour.title}
                className="w-full h-64 object-cover rounded-2xl mb-6"
              />
            )}

            <h2 className="text-2xl font-bold mb-6">{booking.tour.title}</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-venture-green mt-0.5" />
                <div>
                  <p className="font-semibold">Date & Time</p>
                  <p className="text-gray-600">{format(new Date(booking.date), "PPPP")}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-venture-green mt-0.5" />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-gray-600">{booking.tour.location}</p>
                  {booking.tour.meetingPoint && (
                    <p className="text-sm text-gray-500 mt-1">
                      Meeting point: {booking.tour.meetingPoint}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-venture-green mt-0.5" />
                <div>
                  <p className="font-semibold">Number of People</p>
                  <p className="text-gray-600">
                    {booking.numberOfPeople} {booking.numberOfPeople === 1 ? "person" : "people"}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{booking.customerEmail}</span>
                  </div>
                  {booking.customerPhone && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{booking.customerPhone}</span>
                    </div>
                  )}
                </div>
              </div>

              {booking.specialRequests && (
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-semibold mb-2">Special Requests</h3>
                  <p className="text-gray-600">{booking.specialRequests}</p>
                </div>
              )}

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">
                    ${(booking.pricePerPerson / 100).toFixed(0)} × {booking.numberOfPeople}{" "}
                    {booking.numberOfPeople === 1 ? "person" : "people"}
                  </span>
                  <span className="font-semibold">${(booking.totalPrice / 100).toFixed(0)}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold">Total Paid</span>
                  <span className="font-bold text-venture-green text-2xl">
                    ${(booking.totalPrice / 100).toFixed(0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-6">
          <h3 className="font-bold text-lg mb-3">Important Information</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Please arrive 15 minutes before the tour start time at the meeting point</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Free cancellation up to 24 hours before the tour start time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Check your email for further instructions and tour guide contact details</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/tours"
            className="flex-1 bg-venture-green text-venture-black hover:bg-venture-hover font-semibold py-6 rounded-full text-center transition-colors"
          >
            Browse More Tours
          </Link>
          <Link
            href="/"
            className="flex-1 border-2 border-gray-300 hover:bg-gray-100 font-semibold py-6 rounded-full text-center transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
