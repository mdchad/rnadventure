"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, Users, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { loadStripe } from "@stripe/stripe-js";
import { env } from "@rnadventure/env/web";
import { toast } from "sonner";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

interface BookingFormProps {
  tour: {
    id: string;
    title: string;
    coverImage: string;
    price: number;
    currency: string;
    maxGroupSize: number;
  };
  defaultNumberOfPeople: number;
}

export function BookingForm({ tour, defaultNumberOfPeople }: BookingFormProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [numberOfPeople, setNumberOfPeople] = useState(defaultNumberOfPeople || 1);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const pricePerPerson = tour.price;
  const totalPrice = pricePerPerson * numberOfPeople;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate) {
      toast.error("Please select a date for your tour");
      return;
    }

    if (!customerName || !customerEmail) {
      toast.error("Please fill in your contact information");
      return;
    }

    setIsLoading(true);

    try {
      // Create checkout session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tourId: tour.id,
          tourTitle: tour.title,
          tourImage: tour.coverImage,
          date: selectedDate.toISOString(),
          numberOfPeople,
          pricePerPerson,
          totalPrice,
          currency: tour.currency,
          customerName,
          customerEmail,
          customerPhone,
          specialRequests,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to load");
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to proceed to checkout. Please try again.");
      setIsLoading(false);
    }
  };

  const incrementPeople = () => {
    if (numberOfPeople < tour.maxGroupSize) {
      setNumberOfPeople(numberOfPeople + 1);
    }
  };

  const decrementPeople = () => {
    if (numberOfPeople > 1) {
      setNumberOfPeople(numberOfPeople - 1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Date Selection */}
      <div className="bg-white rounded-3xl border-2 border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-venture-green" />
          Select Date
        </h2>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
          className="rounded-2xl border"
        />
        {selectedDate && (
          <p className="mt-4 text-sm text-gray-600">
            Selected: <span className="font-semibold">{format(selectedDate, "PPPP")}</span>
          </p>
        )}
      </div>

      {/* Number of People */}
      <div className="bg-white rounded-3xl border-2 border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-venture-green" />
          Number of People
        </h2>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={decrementPeople}
            disabled={numberOfPeople <= 1}
            className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-venture-green disabled:opacity-50 disabled:cursor-not-allowed text-xl font-bold"
          >
            −
          </button>
          <span className="text-3xl font-semibold w-16 text-center">{numberOfPeople}</span>
          <button
            type="button"
            onClick={incrementPeople}
            disabled={numberOfPeople >= tour.maxGroupSize}
            className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-venture-green disabled:opacity-50 disabled:cursor-not-allowed text-xl font-bold"
          >
            +
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-4">Maximum {tour.maxGroupSize} people per booking</p>
      </div>

      {/* Customer Information */}
      <div className="bg-white rounded-3xl border-2 border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Contact Information</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number (Optional)</Label>
            <Input
              id="phone"
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="requests">Special Requests (Optional)</Label>
            <Textarea
              id="requests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              rows={4}
              className="mt-1"
              placeholder="Any dietary restrictions, accessibility needs, or special requests..."
            />
          </div>
        </div>
      </div>

      {/* Price Summary and Checkout */}
      <div className="bg-white rounded-3xl border-2 border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Payment Summary</h2>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-gray-600">
            <span>
              ${(pricePerPerson / 100).toFixed(0)} × {numberOfPeople}{" "}
              {numberOfPeople === 1 ? "person" : "people"}
            </span>
            <span className="font-semibold">${(totalPrice / 100).toFixed(0)}</span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total</span>
              <span className="text-3xl font-bold text-venture-green">
                ${(totalPrice / 100).toFixed(0)}
              </span>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !selectedDate}
          className="w-full bg-venture-green text-venture-black hover:bg-venture-hover font-semibold text-lg py-6 rounded-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Proceed to Payment"
          )}
        </Button>

        <p className="text-center text-sm text-gray-500 mt-4">
          You will be redirected to Stripe for secure payment
        </p>
      </div>
    </form>
  );
}
