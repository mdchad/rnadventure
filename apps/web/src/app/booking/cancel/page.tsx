import type { Metadata } from "next";
import Navigation from "@/components/landing/navigation";
import { Footer } from "@/components/layout/footer";
import { XCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Booking Cancelled | RNAdventure",
  description: "Your booking was cancelled",
};

export default async function BookingCancelPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Cancel Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Booking Cancelled</h1>
          <p className="text-gray-600 text-lg">
            Your payment was cancelled and no charges were made.
          </p>
        </div>

        {/* Information Card */}
        <div className="bg-white rounded-3xl border-2 border-gray-200 shadow-lg p-8 mb-6">
          <h2 className="text-xl font-bold mb-4">What happened?</h2>
          <p className="text-gray-600 mb-6">
            You cancelled the payment process or closed the checkout window. No payment was
            processed and no booking was created.
          </p>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 mb-6">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Note:</span> If you experienced any issues during
              checkout, please try again or contact our support team for assistance.
            </p>
          </div>

          <h3 className="font-bold mb-3">What would you like to do?</h3>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-venture-green mt-1">•</span>
              <span>Try booking again with a different payment method</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-venture-green mt-1">•</span>
              <span>Browse other available tours</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-venture-green mt-1">•</span>
              <span>Contact support if you need help</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/tours"
            className="flex-1 bg-venture-green text-venture-black hover:bg-venture-hover font-semibold py-6 rounded-full text-center transition-colors"
          >
            Browse Tours
          </Link>
          <Link
            href="/"
            className="flex-1 border-2 border-gray-300 hover:bg-gray-100 font-semibold py-6 rounded-full text-center transition-colors"
          >
            Go to Homepage
          </Link>
        </div>

        {/* Support Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Need help? Contact our support team at support@rnadventure.com
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
