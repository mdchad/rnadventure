"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Loader2, Info } from "lucide-react";
import { getBookingByBookingNumber } from "@/actions/bookings";
import { toast } from "sonner";

export function BookingLookupForm() {
  const router = useRouter();
  const [bookingNumber, setBookingNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookingNumber.trim()) {
      toast.error("Please enter a booking reference");
      return;
    }

    setIsSearching(true);

    try {
      const booking = await getBookingByBookingNumber(bookingNumber.trim());

      if (!booking) {
        toast.error("Booking not found. Please check your booking reference and try again.");
        setIsSearching(false);
        return;
      }

      // Redirect to booking details page
      router.push(`/booking/details/${booking.bookingNumber}`);
    } catch (error) {
      console.error("Error looking up booking:", error);
      toast.error("An error occurred. Please try again.");
      setIsSearching(false);
    }
  };

  return (
    <div>
      <Card className="border-2 border-gray-200 shadow-lg">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="bookingNumber" className="text-sm font-medium text-gray-700">
                Booking Reference
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="bookingNumber"
                  type="text"
                  placeholder="BK-20260216-ABC12345"
                  value={bookingNumber}
                  onChange={(e) => setBookingNumber(e.target.value.toUpperCase())}
                  className="pl-11 h-14 text-lg"
                  disabled={isSearching}
                  autoComplete="off"
                />
              </div>
              <p className="text-sm text-gray-500">
                Your booking reference was sent to your email after booking
              </p>
            </div>

            <Button
              type="submit"
              disabled={isSearching || !bookingNumber.trim()}
              className="w-full h-14 text-lg bg-venture-green hover:bg-venture-hover text-venture-black font-semibold"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Find My Booking
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Help Card */}
      <Card className="mt-6 border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">
                Can't find your booking reference?
              </h3>
              <p className="text-sm text-blue-800">
                Check your email inbox for the booking confirmation we sent you. If you still can't
                find it, please contact us at{" "}
                <a href="mailto:support@rnadventure.com" className="underline font-medium">
                  support@rnadventure.com
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
