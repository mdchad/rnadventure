"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Download, Loader2 } from "lucide-react";
import { generateItineraryPDF, generateReceiptPDF, downloadPDF } from "@/lib/pdf-generator";
import { toast } from "sonner";

interface BookingDetails {
  bookingNumber: string;
  tour: {
    title: string;
    description?: string;
    location: string;
    meetingPoint?: string | null;
    duration: string;
    itinerary?: Array<{
      title: string;
      description?: string | null;
      duration?: string | null;
      location?: string | null;
    }>;
    highlights?: Array<{
      title: string;
      description?: string | null;
    }>;
  };
  date: Date;
  numberOfPeople: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  pricePerPerson: number;
  totalPrice: number;
  specialRequests?: string | null;
}

interface DownloadDocumentsProps {
  booking: BookingDetails;
}

export function DownloadDocuments({ booking }: DownloadDocumentsProps) {
  const [isGeneratingItinerary, setIsGeneratingItinerary] = useState(false);
  const [isGeneratingReceipt, setIsGeneratingReceipt] = useState(false);

  const handleDownloadItinerary = async () => {
    setIsGeneratingItinerary(true);
    try {
      const pdfBytes = await generateItineraryPDF({
        bookingNumber: booking.bookingNumber,
        tourTitle: booking.tour.title,
        tourDescription: booking.tour.description,
        tourLocation: booking.tour.location,
        meetingPoint: booking.tour.meetingPoint || undefined,
        date: new Date(booking.date),
        duration: booking.tour.duration,
        numberOfPeople: booking.numberOfPeople,
        customerName: booking.customerName,
        customerEmail: booking.customerEmail,
        customerPhone: booking.customerPhone || undefined,
        pricePerPerson: booking.pricePerPerson,
        totalPrice: booking.totalPrice,
        currency: "SGD",
        specialRequests: booking.specialRequests || undefined,
        itinerary: booking.tour.itinerary?.map((item) => ({
          title: item.title,
          description: item.description || undefined,
          duration: item.duration || undefined,
          location: item.location || undefined,
        })),
        highlights: booking.tour.highlights?.map((item) => ({
          title: item.title,
          description: item.description || undefined,
        })),
      });

      downloadPDF(pdfBytes, `Itinerary-${booking.bookingNumber}.pdf`);
      toast.success("Itinerary downloaded successfully!");
    } catch (error) {
      console.error("Error generating itinerary:", error);
      toast.error("Failed to generate itinerary. Please try again.");
    } finally {
      setIsGeneratingItinerary(false);
    }
  };

  const handleDownloadReceipt = async () => {
    setIsGeneratingReceipt(true);
    try {
      const pdfBytes = await generateReceiptPDF({
        bookingNumber: booking.bookingNumber,
        tourTitle: booking.tour.title,
        tourLocation: booking.tour.location,
        meetingPoint: booking.tour.meetingPoint || undefined,
        date: new Date(booking.date),
        duration: booking.tour.duration,
        numberOfPeople: booking.numberOfPeople,
        customerName: booking.customerName,
        customerEmail: booking.customerEmail,
        customerPhone: booking.customerPhone || undefined,
        pricePerPerson: booking.pricePerPerson,
        totalPrice: booking.totalPrice,
        currency: "SGD",
        specialRequests: booking.specialRequests || undefined,
      });

      downloadPDF(pdfBytes, `Receipt-${booking.bookingNumber}.pdf`);
      toast.success("Receipt downloaded successfully!");
    } catch (error) {
      console.error("Error generating receipt:", error);
      toast.error("Failed to generate receipt. Please try again.");
    } finally {
      setIsGeneratingReceipt(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-gray-200 shadow-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-venture-green" />
        <h3 className="font-bold text-lg">Download Documents</h3>
      </div>

      <p className="text-gray-600 text-sm mb-6">
        Download your tour itinerary and booking confirmation for your records.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          onClick={handleDownloadItinerary}
          disabled={isGeneratingItinerary}
          variant="outline"
          className="w-full h-auto py-4 flex flex-col items-center gap-2 hover:border-venture-green hover:bg-venture-green/5"
        >
          {isGeneratingItinerary ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Download className="w-5 h-5" />
          )}
          <span className="font-semibold">
            {isGeneratingItinerary ? "Generating..." : "Download Itinerary"}
          </span>
          <span className="text-xs text-gray-500">Tour schedule & details</span>
        </Button>

        <Button
          onClick={handleDownloadReceipt}
          disabled={isGeneratingReceipt}
          variant="outline"
          className="w-full h-auto py-4 flex flex-col items-center gap-2 hover:border-venture-green hover:bg-venture-green/5"
        >
          {isGeneratingReceipt ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Download className="w-5 h-5" />
          )}
          <span className="font-semibold">
            {isGeneratingReceipt ? "Generating..." : "Download Receipt"}
          </span>
          <span className="text-xs text-gray-500">Payment confirmation</span>
        </Button>
      </div>
    </div>
  );
}
