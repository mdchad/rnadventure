import { Resend } from "resend";
import { env } from "@rnadventure/env/server";

const resend = new Resend(env.RESEND_API_KEY);

interface BookingEmailData {
  bookingNumber: string;
  tourTitle: string;
  tourLocation: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  numberOfPeople: number;
  bookingDate: Date;
  totalPrice: number;
  currency: string;
  specialRequests?: string;
  tourDuration: string;
  meetingPoint?: string;
}

interface AdminEmailData {
  adminEmail: string;
  adminName: string;
  bookingData: BookingEmailData;
}

/**
 * Generate iCalendar (.ics) file content for calendar invite
 */
export function generateICalendar(data: BookingEmailData): string {
  const now = new Date();
  const dtstart = formatICalDate(data.bookingDate);

  // Calculate end time (add duration from tour)
  const endDate = new Date(data.bookingDate);
  // Default to 4 hours if duration parsing fails
  const durationHours = parseDuration(data.tourDuration);
  endDate.setHours(endDate.getHours() + durationHours);
  const dtend = formatICalDate(endDate);

  const dtstamp = formatICalDate(now);
  const uid = `booking-${data.bookingNumber}@pixelmindstudio.com`;

  // Create attendee list
  const attendees = [`ATTENDEE;CN="${data.customerName}";RSVP=TRUE:mailto:${data.customerEmail}`];

  const description = [
    `Tour: ${data.tourTitle}`,
    `Customer: ${data.customerName}`,
    `Email: ${data.customerEmail}`,
    data.customerPhone ? `Phone: ${data.customerPhone}` : "",
    `Number of People: ${data.numberOfPeople}`,
    `Booking Number: ${data.bookingNumber}`,
    data.specialRequests ? `Special Requests: ${data.specialRequests}` : "",
  ]
    .filter(Boolean)
    .join("\\n");

  const location = data.meetingPoint || data.tourLocation;

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//RNAdventure//Tour Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${data.tourTitle} - ${data.customerName}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `STATUS:CONFIRMED`,
    "SEQUENCE:0",
    ...attendees,
    "BEGIN:VALARM",
    "TRIGGER:-PT24H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Tour tomorrow",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return icsContent;
}

/**
 * Format date for iCalendar format (YYYYMMDDTHHMMSSZ)
 */
function formatICalDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

/**
 * Parse duration string (e.g., "4 hours", "Full day") to hours
 */
function parseDuration(duration: string): number {
  const lowerDuration = duration.toLowerCase();

  if (lowerDuration.includes("full day")) {
    return 8;
  }
  if (lowerDuration.includes("half day")) {
    return 4;
  }

  const match = lowerDuration.match(/(\d+)\s*hour/);
  if (match) {
    return Number.parseInt(match[1], 10);
  }

  // Default to 4 hours if parsing fails
  return 4;
}

/**
 * Format price for display
 */
function formatPrice(cents: number, currency: string): string {
  return `${currency} ${(cents / 100).toFixed(2)}`;
}

/**
 * Generate HTML email template for booking confirmation
 */
function generateBookingEmailHTML(data: BookingEmailData): string {
  const formattedDate = new Date(data.bookingDate).toLocaleDateString("en-SG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">New Booking Confirmed! 🎉</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">

              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 24px; color: #374151;">
                Great news! You have a new booking for your tour.
              </p>

              <!-- Booking Number -->
              <div style="background-color: #f9fafb; border-radius: 6px; padding: 16px; margin-bottom: 24px; border-left: 4px solid #667eea;">
                <p style="margin: 0; font-size: 14px; color: #6b7280;">Booking Number</p>
                <p style="margin: 8px 0 0 0; font-size: 20px; font-weight: 600; color: #111827;">${data.bookingNumber}</p>
              </div>

              <!-- Tour Details -->
              <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #111827;">Tour Details</h2>

              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-size: 14px; color: #6b7280;">Tour</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                    <span style="font-size: 14px; font-weight: 500; color: #111827;">${data.tourTitle}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-size: 14px; color: #6b7280;">Date & Time</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                    <span style="font-size: 14px; font-weight: 500; color: #111827;">${formattedDate}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-size: 14px; color: #6b7280;">Duration</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                    <span style="font-size: 14px; font-weight: 500; color: #111827;">${data.tourDuration}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-size: 14px; color: #6b7280;">Location</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                    <span style="font-size: 14px; font-weight: 500; color: #111827;">${data.tourLocation}</span>
                  </td>
                </tr>
                ${
                  data.meetingPoint
                    ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-size: 14px; color: #6b7280;">Meeting Point</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                    <span style="font-size: 14px; font-weight: 500; color: #111827;">${data.meetingPoint}</span>
                  </td>
                </tr>
                `
                    : ""
                }
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-size: 14px; color: #6b7280;">Number of People</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                    <span style="font-size: 14px; font-weight: 500; color: #111827;">${data.numberOfPeople}</span>
                  </td>
                </tr>
              </table>

              <!-- Customer Details -->
              <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #111827;">Customer Details</h2>

              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-size: 14px; color: #6b7280;">Name</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                    <span style="font-size: 14px; font-weight: 500; color: #111827;">${data.customerName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-size: 14px; color: #6b7280;">Email</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                    <a href="mailto:${data.customerEmail}" style="font-size: 14px; font-weight: 500; color: #667eea; text-decoration: none;">${data.customerEmail}</a>
                  </td>
                </tr>
                ${
                  data.customerPhone
                    ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="font-size: 14px; color: #6b7280;">Phone</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                    <a href="tel:${data.customerPhone}" style="font-size: 14px; font-weight: 500; color: #667eea; text-decoration: none;">${data.customerPhone}</a>
                  </td>
                </tr>
                `
                    : ""
                }
                ${
                  data.specialRequests
                    ? `
                <tr>
                  <td colspan="2" style="padding: 12px 0;">
                    <span style="font-size: 14px; color: #6b7280; display: block; margin-bottom: 8px;">Special Requests</span>
                    <span style="font-size: 14px; color: #111827; background-color: #fef3c7; padding: 12px; border-radius: 4px; display: block;">${data.specialRequests}</span>
                  </td>
                </tr>
                `
                    : ""
                }
              </table>

              <!-- Payment Details -->
              <div style="background-color: #ecfdf5; border-radius: 6px; padding: 20px; margin-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 16px; font-weight: 500; color: #065f46;">Total Amount</span>
                  <span style="font-size: 24px; font-weight: 600; color: #065f46;">${formatPrice(data.totalPrice, data.currency)}</span>
                </div>
                <div style="margin-top: 8px;">
                  <span style="font-size: 14px; color: #047857;">✓ Payment Confirmed</span>
                </div>
              </div>

              <!-- Calendar Note -->
              <div style="background-color: #eff6ff; border-radius: 6px; padding: 16px; margin-bottom: 24px; border-left: 4px solid #3b82f6;">
                <p style="margin: 0; font-size: 14px; color: #1e40af;">
                  📅 A calendar invite has been attached to this email. Add it to your calendar so you don't miss this tour!
                </p>
              </div>

              <p style="margin: 24px 0 0 0; font-size: 14px; line-height: 20px; color: #6b7280;">
                If you have any questions about this booking, please contact the customer directly.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #6b7280;">
                This is an automated notification from RNAdventure
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Send booking confirmation email to tour guide (admin) with calendar invite
 */
export async function sendBookingConfirmationToAdmin(
  adminData: AdminEmailData,
): Promise<{ success: boolean; error?: string }> {
  try {
    const { bookingData, adminEmail, adminName } = adminData;

    // Generate iCalendar file
    const icalContent = generateICalendar(bookingData);

    // Generate HTML email
    const htmlContent = generateBookingEmailHTML(bookingData);

    // Send email with calendar attachment
    const result = await resend.emails.send({
      from: `RNAdventure <${env.RESEND_FROM_EMAIL}>`,
      to: adminEmail,
      subject: `New Booking: ${bookingData.tourTitle} - ${bookingData.bookingNumber}`,
      html: htmlContent,
      attachments: [
        {
          filename: `booking-${bookingData.bookingNumber}.ics`,
          content: Buffer.from(icalContent),
        },
      ],
    });

    if (result.error) {
      console.error("Error sending booking confirmation email:", result.error);
      return { success: false, error: result.error.message };
    }

    console.log(
      `Booking confirmation email sent to ${adminName} (${adminEmail}) for booking ${bookingData.bookingNumber}`,
    );
    return { success: true };
  } catch (error) {
    console.error("Error sending booking confirmation email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
