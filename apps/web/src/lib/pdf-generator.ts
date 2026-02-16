import { PDF, rgb } from "@libpdf/core";

interface BookingData {
  bookingNumber: string;
  tourTitle: string;
  tourDescription?: string;
  tourLocation: string;
  meetingPoint?: string;
  date: Date;
  duration: string;
  numberOfPeople: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  pricePerPerson: number;
  totalPrice: number;
  currency: string;
  specialRequests?: string;
  itinerary?: Array<{
    title: string;
    description?: string;
    duration?: string;
    location?: string;
  }>;
  highlights?: Array<{
    title: string;
    description?: string;
  }>;
}

/**
 * Generate Itinerary PDF
 */
export async function generateItineraryPDF(booking: BookingData): Promise<Uint8Array> {
  const pdf = PDF.create();
  pdf.setTitle(`Itinerary - ${booking.bookingNumber}`);
  pdf.setAuthor("RNAdventure");
  pdf.setSubject(`Tour Itinerary for ${booking.tourTitle}`);

  const page = pdf.addPage({ size: "a4" });
  let yPosition = 752;

  // Header with background
  page.drawRectangle({
    x: 0,
    y: yPosition,
    width: 595,
    height: 90,
    color: rgb(0.02, 0.902, 0.408), // venture-green equivalent
  });

  page.drawText("TOUR ITINERARY", {
    x: 50,
    y: yPosition + 45,
    size: 28,
    color: rgb(0.1, 0.1, 0.1),
  });

  page.drawText("RNAdventure", {
    x: 50,
    y: yPosition + 20,
    size: 14,
    color: rgb(0.2, 0.2, 0.2),
  });

  yPosition -= 90;

  // Booking Reference
  page.drawRectangle({
    x: 50,
    y: yPosition - 30,
    width: 495,
    height: 40,
    color: rgb(0.95, 0.95, 0.95),
    borderColor: rgb(0.8, 0.8, 0.8),
    borderWidth: 1,
  });

  page.drawText("Booking Reference:", {
    x: 60,
    y: yPosition - 10,
    size: 10,
    color: rgb(0.4, 0.4, 0.4),
  });

  page.drawText(booking.bookingNumber, {
    x: 60,
    y: yPosition - 25,
    size: 16,
    color: rgb(0, 0, 0),
  });

  yPosition -= 60;

  // Tour Title
  page.drawText(booking.tourTitle, {
    x: 50,
    y: yPosition,
    size: 20,
    color: rgb(0.1, 0.1, 0.1),
  });

  yPosition -= 30;

  // Date and Time
  page.drawText("Date & Time:", {
    x: 50,
    y: yPosition,
    size: 12,
    color: rgb(0.3, 0.3, 0.3),
  });

  page.drawText(formatDate(booking.date), {
    x: 50,
    y: yPosition - 18,
    size: 11,
    color: rgb(0, 0, 0),
  });

  yPosition -= 45;

  // Location
  page.drawText("Location:", {
    x: 50,
    y: yPosition,
    size: 12,
    color: rgb(0.3, 0.3, 0.3),
  });

  page.drawText(booking.tourLocation, {
    x: 50,
    y: yPosition - 18,
    size: 11,
    color: rgb(0, 0, 0),
  });

  if (booking.meetingPoint) {
    page.drawText(`Meeting Point: ${booking.meetingPoint}`, {
      x: 50,
      y: yPosition - 33,
      size: 10,
      color: rgb(0.4, 0.4, 0.4),
    });
    yPosition -= 15;
  }

  yPosition -= 45;

  // Duration and People
  const details = `Duration: ${booking.duration} | ${booking.numberOfPeople} ${booking.numberOfPeople === 1 ? "person" : "people"}`;
  page.drawText(details, {
    x: 50,
    y: yPosition,
    size: 11,
    color: rgb(0.3, 0.3, 0.3),
  });

  yPosition -= 35;

  // Line separator
  page.drawLine({
    start: { x: 50, y: yPosition },
    end: { x: 545, y: yPosition },
    color: rgb(0.8, 0.8, 0.8),
    thickness: 1,
  });

  yPosition -= 25;

  // Tour Highlights
  if (booking.highlights && booking.highlights.length > 0) {
    page.drawText("HIGHLIGHTS", {
      x: 50,
      y: yPosition,
      size: 14,
      color: rgb(0.1, 0.1, 0.1),
    });

    yPosition -= 25;

    for (const highlight of booking.highlights) {
      if (yPosition < 100) break; // Prevent overflow

      page.drawText(`• ${highlight.title}`, {
        x: 50,
        y: yPosition,
        size: 10,
        color: rgb(0, 0, 0),
      });

      if (highlight.description) {
        page.drawText(highlight.description, {
          x: 60,
          y: yPosition - 15,
          size: 9,
          color: rgb(0.4, 0.4, 0.4),
          maxWidth: 475,
        });
        yPosition -= 30;
      } else {
        yPosition -= 20;
      }
    }

    yPosition -= 15;

    // Line separator
    page.drawLine({
      start: { x: 50, y: yPosition },
      end: { x: 545, y: yPosition },
      color: rgb(0.8, 0.8, 0.8),
      thickness: 1,
    });

    yPosition -= 25;
  }

  // Itinerary Details
  let currentPage = page;
  if (booking.itinerary && booking.itinerary.length > 0) {
    currentPage.drawText("ITINERARY", {
      x: 50,
      y: yPosition,
      size: 14,
      color: rgb(0.1, 0.1, 0.1),
    });

    yPosition -= 25;

    for (let i = 0; i < booking.itinerary.length; i++) {
      const item = booking.itinerary[i];

      // Calculate approximate height needed for this item
      let itemHeight = 18; // title
      if (item.description) itemHeight += 30;
      if (item.duration || item.location) itemHeight += 25;

      // Check if we need a new page (leaving 100px margin at bottom)
      if (yPosition - itemHeight < 100) {
        // Add new page
        currentPage = pdf.addPage({ size: "a4" });
        yPosition = 752; // Start below where header would be
      }

      // Draw item title
      currentPage.drawText(`${i + 1}. ${item.title}`, {
        x: 50,
        y: yPosition,
        size: 11,
        color: rgb(0, 0, 0),
      });
      yPosition -= 18;

      // Draw description if exists
      if (item.description) {
        currentPage.drawText(item.description, {
          x: 60,
          y: yPosition,
          size: 9,
          color: rgb(0.4, 0.4, 0.4),
          maxWidth: 475,
        });
        yPosition -= 30;
      }

      // Draw duration and location if exists
      if (item.duration || item.location) {
        const details = [item.duration, item.location].filter(Boolean).join(" | ");
        currentPage.drawText(details, {
          x: 60,
          y: yPosition,
          size: 9,
          color: rgb(0.5, 0.5, 0.5),
        });
        yPosition -= 25;
      }
    }
  }

  // Special Requests (if any)
  if (booking.specialRequests) {
    // Check if we need space for special requests section (approx 100px)
    if (yPosition < 150) {
      currentPage = pdf.addPage({ size: "a4" });
      yPosition = 752;
    }

    yPosition -= 20;

    currentPage.drawLine({
      start: { x: 50, y: yPosition },
      end: { x: 545, y: yPosition },
      color: rgb(0.8, 0.8, 0.8),
      thickness: 1,
    });

    yPosition -= 25;

    currentPage.drawText("SPECIAL REQUESTS", {
      x: 50,
      y: yPosition,
      size: 12,
      color: rgb(0.1, 0.1, 0.1),
    });

    yPosition -= 20;

    currentPage.drawText(booking.specialRequests, {
      x: 50,
      y: yPosition,
      size: 10,
      color: rgb(0.4, 0.4, 0.4),
      maxWidth: 495,
    });
  }

  // Footer on the last page
  currentPage.drawText("For any questions, please contact us at support@rnadventure.com", {
    x: 50,
    y: 50,
    size: 9,
    color: rgb(0.5, 0.5, 0.5),
  });

  return await pdf.save();
}

/**
 * Generate Booking Confirmation Receipt PDF
 */
export async function generateReceiptPDF(booking: BookingData): Promise<Uint8Array> {
  const pdf = PDF.create();
  pdf.setTitle(`Receipt - ${booking.bookingNumber}`);
  pdf.setAuthor("RNAdventure");
  pdf.setSubject(`Booking Confirmation for ${booking.tourTitle}`);

  const page = pdf.addPage({ size: "a4" });
  let yPosition = 752;

  // Header
  page.drawRectangle({
    x: 0,
    y: yPosition,
    width: 595,
    height: 90,
    color: rgb(0.02, 0.902, 0.408), // venture-green equivalent
  });

  page.drawText("BOOKING CONFIRMATION", {
    x: 50,
    y: yPosition + 45,
    size: 28,
    color: rgb(0.1, 0.1, 0.1),
  });

  page.drawText("Payment Receipt", {
    x: 50,
    y: yPosition + 20,
    size: 14,
    color: rgb(0.2, 0.2, 0.2),
  });

  yPosition -= 90;

  // Status Badge
  page.drawRectangle({
    x: 50,
    y: yPosition - 25,
    width: 120,
    height: 30,
    color: rgb(0.87, 0.98, 0.94),
    borderColor: rgb(0.4, 0.71, 0.55),
    borderWidth: 1,
  });

  page.drawText("✓ CONFIRMED", {
    x: 60,
    y: yPosition - 15,
    size: 12,
    color: rgb(0.15, 0.48, 0.36),
  });

  yPosition -= 50;

  // Booking Number
  page.drawText("Booking Number:", {
    x: 50,
    y: yPosition,
    size: 11,
    color: rgb(0.4, 0.4, 0.4),
  });

  page.drawText(booking.bookingNumber, {
    x: 50,
    y: yPosition - 18,
    size: 18,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Date Issued: ${formatDate(new Date())}`, {
    x: 350,
    y: yPosition,
    size: 10,
    color: rgb(0.4, 0.4, 0.4),
  });

  yPosition -= 50;

  // Line separator
  page.drawLine({
    start: { x: 50, y: yPosition },
    end: { x: 545, y: yPosition },
    color: rgb(0.8, 0.8, 0.8),
    thickness: 1,
  });

  yPosition -= 30;

  // Customer Information
  page.drawText("CUSTOMER INFORMATION", {
    x: 50,
    y: yPosition,
    size: 12,
    color: rgb(0.1, 0.1, 0.1),
  });

  yPosition -= 25;

  page.drawText(`Name: ${booking.customerName}`, {
    x: 50,
    y: yPosition,
    size: 10,
    color: rgb(0.3, 0.3, 0.3),
  });

  yPosition -= 18;

  page.drawText(`Email: ${booking.customerEmail}`, {
    x: 50,
    y: yPosition,
    size: 10,
    color: rgb(0.3, 0.3, 0.3),
  });

  if (booking.customerPhone) {
    yPosition -= 18;
    page.drawText(`Phone: ${booking.customerPhone}`, {
      x: 50,
      y: yPosition,
      size: 10,
      color: rgb(0.3, 0.3, 0.3),
    });
  }

  yPosition -= 35;

  // Line separator
  page.drawLine({
    start: { x: 50, y: yPosition },
    end: { x: 545, y: yPosition },
    color: rgb(0.8, 0.8, 0.8),
    thickness: 1,
  });

  yPosition -= 30;

  // Booking Details
  page.drawText("BOOKING DETAILS", {
    x: 50,
    y: yPosition,
    size: 12,
    color: rgb(0.1, 0.1, 0.1),
  });

  yPosition -= 25;

  page.drawText("Tour:", {
    x: 50,
    y: yPosition,
    size: 10,
    color: rgb(0.4, 0.4, 0.4),
  });

  page.drawText(booking.tourTitle, {
    x: 150,
    y: yPosition,
    size: 10,
    color: rgb(0, 0, 0),
    maxWidth: 395,
  });

  yPosition -= 22;

  page.drawText("Date:", {
    x: 50,
    y: yPosition,
    size: 10,
    color: rgb(0.4, 0.4, 0.4),
  });

  page.drawText(formatDate(booking.date), {
    x: 150,
    y: yPosition,
    size: 10,
    color: rgb(0, 0, 0),
  });

  yPosition -= 22;

  page.drawText("Location:", {
    x: 50,
    y: yPosition,
    size: 10,
    color: rgb(0.4, 0.4, 0.4),
  });

  page.drawText(booking.tourLocation, {
    x: 150,
    y: yPosition,
    size: 10,
    color: rgb(0, 0, 0),
  });

  if (booking.meetingPoint) {
    yPosition -= 22;
    page.drawText("Meeting Point:", {
      x: 50,
      y: yPosition,
      size: 10,
      color: rgb(0.4, 0.4, 0.4),
    });

    page.drawText(booking.meetingPoint, {
      x: 150,
      y: yPosition,
      size: 10,
      color: rgb(0, 0, 0),
      maxWidth: 395,
    });
  }

  yPosition -= 22;

  page.drawText("Duration:", {
    x: 50,
    y: yPosition,
    size: 10,
    color: rgb(0.4, 0.4, 0.4),
  });

  page.drawText(booking.duration, {
    x: 150,
    y: yPosition,
    size: 10,
    color: rgb(0, 0, 0),
  });

  yPosition -= 22;

  page.drawText("Number of People:", {
    x: 50,
    y: yPosition,
    size: 10,
    color: rgb(0.4, 0.4, 0.4),
  });

  page.drawText(`${booking.numberOfPeople} ${booking.numberOfPeople === 1 ? "person" : "people"}`, {
    x: 150,
    y: yPosition,
    size: 10,
    color: rgb(0, 0, 0),
  });

  yPosition -= 35;

  // Line separator
  page.drawLine({
    start: { x: 50, y: yPosition },
    end: { x: 545, y: yPosition },
    color: rgb(0.8, 0.8, 0.8),
    thickness: 1,
  });

  yPosition -= 30;

  // Payment Summary
  page.drawText("PAYMENT SUMMARY", {
    x: 50,
    y: yPosition,
    size: 12,
    color: rgb(0.1, 0.1, 0.1),
  });

  yPosition -= 30;

  // Table header background
  page.drawRectangle({
    x: 50,
    y: yPosition - 20,
    width: 495,
    height: 25,
    color: rgb(0.95, 0.95, 0.95),
  });

  page.drawText("Description", {
    x: 60,
    y: yPosition - 10,
    size: 10,
    color: rgb(0.3, 0.3, 0.3),
  });

  page.drawText("Quantity", {
    x: 350,
    y: yPosition - 10,
    size: 10,
    color: rgb(0.3, 0.3, 0.3),
  });

  page.drawText("Amount", {
    x: 470,
    y: yPosition - 10,
    size: 10,
    color: rgb(0.3, 0.3, 0.3),
  });

  yPosition -= 35;

  // Line items
  page.drawText(booking.tourTitle, {
    x: 60,
    y: yPosition,
    size: 10,
    color: rgb(0, 0, 0),
    maxWidth: 280,
  });

  page.drawText(booking.numberOfPeople.toString(), {
    x: 360,
    y: yPosition,
    size: 10,
    color: rgb(0, 0, 0),
  });

  page.drawText(`${booking.currency} ${(booking.pricePerPerson / 100).toFixed(2)}`, {
    x: 450,
    y: yPosition,
    size: 10,
    color: rgb(0, 0, 0),
  });

  yPosition -= 30;

  // Separator
  page.drawLine({
    start: { x: 50, y: yPosition },
    end: { x: 545, y: yPosition },
    color: rgb(0.9, 0.9, 0.9),
    thickness: 0.5,
  });

  yPosition -= 25;

  // Total
  page.drawRectangle({
    x: 350,
    y: yPosition - 30,
    width: 195,
    height: 40,
    color: rgb(0.93, 0.97, 0.95),
    borderColor: rgb(0.4, 0.71, 0.55),
    borderWidth: 1,
  });

  page.drawText("TOTAL PAID", {
    x: 360,
    y: yPosition - 10,
    size: 11,
    color: rgb(0.15, 0.48, 0.36),
  });

  page.drawText(`${booking.currency} ${(booking.totalPrice / 100).toFixed(2)}`, {
    x: 360,
    y: yPosition - 25,
    size: 16,
    color: rgb(0.15, 0.48, 0.36),
  });

  yPosition -= 70;

  // Payment Status
  page.drawText("Payment Status: CONFIRMED", {
    x: 50,
    y: yPosition,
    size: 10,
    color: rgb(0.15, 0.48, 0.36),
  });

  // Footer
  yPosition = 80;

  page.drawLine({
    start: { x: 50, y: yPosition },
    end: { x: 545, y: yPosition },
    color: rgb(0.9, 0.9, 0.9),
    thickness: 0.5,
  });

  page.drawText("Thank you for booking with RNAdventure!", {
    x: 50,
    y: 60,
    size: 10,
    color: rgb(0.3, 0.3, 0.3),
  });

  page.drawText("For support: support@rnadventure.com | www.rnadventure.com", {
    x: 50,
    y: 45,
    size: 9,
    color: rgb(0.5, 0.5, 0.5),
  });

  return await pdf.save();
}

/**
 * Helper function to format dates
 */
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * Download PDF in browser
 */
export function downloadPDF(bytes: Uint8Array, filename: string) {
  const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}
