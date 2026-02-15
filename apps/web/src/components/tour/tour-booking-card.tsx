"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Users, DollarSign } from "lucide-react";
import Link from "next/link";

interface TourBookingCardProps {
  tour: {
    id: string;
    slug: string;
    price: number;
    originalPrice?: number | null;
    currency: string;
    maxGroupSize: number;
  };
}

export function TourBookingCard({ tour }: TourBookingCardProps) {
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const pricePerPerson = tour.price / 100;
  const totalPrice = pricePerPerson * numberOfPeople;

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
    <div id="booking" className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-lg">
      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-bold text-venture-green">
            ${pricePerPerson.toFixed(0)}
          </span>
          {tour.originalPrice && (
            <span className="text-gray-400 line-through text-xl">
              ${(tour.originalPrice / 100).toFixed(0)}
            </span>
          )}
        </div>
        <p className="text-gray-600">per person</p>
      </div>

      {/* Number of People Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          <Users className="w-4 h-4 inline mr-1" />
          Number of People
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={decrementPeople}
            disabled={numberOfPeople <= 1}
            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-venture-green disabled:opacity-50 disabled:cursor-not-allowed"
          >
            −
          </button>
          <span className="text-2xl font-semibold w-12 text-center">{numberOfPeople}</span>
          <button
            onClick={incrementPeople}
            disabled={numberOfPeople >= tour.maxGroupSize}
            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-venture-green disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">Maximum {tour.maxGroupSize} people</p>
      </div>

      {/* Total Price */}
      <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">
            ${pricePerPerson.toFixed(0)} x {numberOfPeople}{" "}
            {numberOfPeople === 1 ? "person" : "people"}
          </span>
          <span className="font-semibold">${totalPrice.toFixed(0)}</span>
        </div>
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total</span>
            <span className="text-2xl font-bold text-venture-green">${totalPrice.toFixed(0)}</span>
          </div>
        </div>
      </div>

      {/* Book Now Button */}
      <Link
        href={`/booking/${tour.id}?people=${numberOfPeople}`}
        className="block w-full bg-venture-green text-venture-black hover:bg-venture-hover font-semibold text-lg py-6 rounded-full text-center transition-colors"
      >
        Book Now
      </Link>

      <p className="text-center text-sm text-gray-500 mt-4">
        Free cancellation up to 24 hours before the tour
      </p>
    </div>
  );
}
