# Resend Email Integration Setup Guide

This guide explains how to set up Resend for sending booking confirmation emails with calendar invites to tour guides (admins).

## Overview

When a booking is successfully confirmed (after Stripe payment), the system automatically:

1. Sends an email to the admin email address configured in environment variables
2. Includes a beautiful HTML email with all booking details
3. Attaches an iCalendar (.ics) file that can be added to Apple Calendar, Google Calendar, Outlook, etc.

## Setup Steps

### 1. Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. The free tier includes:
   - 3,000 emails per month
   - 100 emails per day
   - Perfect for getting started!

### 2. Get Your API Key

1. Once logged in, go to **API Keys** in the Resend dashboard
2. Click **Create API Key**
3. Give it a name (e.g., "RNAdventure Production")
4. Select the appropriate permissions (Full access recommended for production)
5. Copy the API key (it starts with `re_`)

### 3. Add API Key to Environment Variables

Update your `apps/web/.env` file:

```env
# Resend (Email Service)
RESEND_API_KEY=re_your_actual_api_key_here
RESEND_FROM_EMAIL=bookings@rnadventure.com

# Admin Email (receives booking notifications)
ADMIN_EMAIL=your-admin@example.com
ADMIN_NAME=Your Name
```

### 4. Verify Your Domain (Important!)

For production use, you need to verify your domain with Resend:

1. In the Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `rnadventure.com`)
4. Resend will provide DNS records (SPF, DKIM, DMARC)
5. Add these DNS records to your domain's DNS settings
6. Wait for verification (usually takes a few minutes to an hour)

**Note:** Until you verify your domain, you can only send emails to the email address you signed up with.

### 5. Update the FROM Email Address

Once your domain is verified, update the `RESEND_FROM_EMAIL` in your `.env`:

```env
RESEND_FROM_EMAIL=bookings@yourdomain.com
```

Make sure the domain matches your verified domain!

### 6. Development/Testing

For development, you can:

- Use Resend's test mode (emails only go to your verified email)
- Or verify your domain and send to any email address

## Email Features

### Booking Confirmation Email

The email includes:

- **Booking number** - Unique identifier for the booking
- **Tour details** - Title, location, date, duration, meeting point
- **Customer information** - Name, email, phone, number of people
- **Special requests** - If the customer added any
- **Payment confirmation** - Total amount and payment status
- **Calendar invite** - iCalendar (.ics) attachment

### iCalendar (.ics) File

The calendar invite includes:

- **Event title** - Tour name + Customer name
- **Date and time** - When the tour starts
- **Duration** - Calculated from the tour's duration field
- **Location** - Meeting point or tour location
- **Description** - All booking details
- **Attendee** - Customer email address
- **Reminder** - 24-hour reminder before the tour

## How It Works

1. Customer completes booking and pays via Stripe
2. Stripe sends webhook to `/api/webhooks/stripe`
3. Webhook handler calls `confirmBooking(bookingId)`
4. `confirmBooking` function:
   - Updates booking status to "confirmed"
   - Updates payment status to "paid"
   - Fetches booking and tour details from database
   - Sends email notification to admin email (from `ADMIN_EMAIL` env variable) via Resend
   - Attaches calendar invite

## Testing

To test the email integration:

1. Make sure your Resend API key is set in `.env`
2. Make sure `ADMIN_EMAIL` and `ADMIN_NAME` are set in `.env`
3. Create a test booking through the platform
4. Complete payment (use Stripe test cards)
5. Check the admin email inbox (the email address in `ADMIN_EMAIL`)
6. Open the email and verify:
   - All details are correct
   - Calendar invite attachment is present
   - Calendar invite can be added to Apple Calendar

### Stripe Test Cards

For testing payments:

- Success: `4242 4242 4242 4242`
- Use any future expiry date
- Use any 3-digit CVC
- Use any ZIP code

## Troubleshooting

### Emails Not Sending

1. **Check API key** - Make sure `RESEND_API_KEY` is set correctly
2. **Check domain verification** - Verify your domain in Resend dashboard
3. **Check from email** - Make sure `RESEND_FROM_EMAIL` uses your verified domain
4. **Check logs** - Look for errors in your terminal/logs

### Calendar Invite Not Working

1. **Check file attachment** - The .ics file should be attached to the email
2. **Check date format** - Make sure the booking date is valid
3. **Check email client** - Some email clients may not display .ics files properly

### Only Receiving Test Emails

- You need to verify your domain to send to any email address
- Without domain verification, emails only go to your signup email

## Environment Variables Reference

| Variable            | Description                                     | Required | Example                   |
| ------------------- | ----------------------------------------------- | -------- | ------------------------- |
| `RESEND_API_KEY`    | Your Resend API key                             | Yes      | `re_123abc...`            |
| `RESEND_FROM_EMAIL` | Sender email address (must use verified domain) | Yes      | `bookings@yourdomain.com` |
| `ADMIN_EMAIL`       | Admin email that receives booking notifications | Yes      | `admin@yourdomain.com`    |
| `ADMIN_NAME`        | Admin name for email personalization            | Yes      | `John Doe`                |

## Code Structure

- **Email service**: `apps/web/src/lib/email.ts`
  - `sendBookingConfirmationToAdmin()` - Main email sending function
  - `generateICalendar()` - Creates .ics calendar invite
  - `generateBookingEmailHTML()` - Creates HTML email template

- **Booking actions**: `apps/web/src/actions/bookings.ts`
  - `confirmBooking()` - Confirms booking and sends email

- **Stripe webhook**: `apps/web/src/app/api/webhooks/stripe/route.ts`
  - Listens for `checkout.session.completed` event
  - Triggers booking confirmation

## Support

For Resend-specific issues:

- [Resend Documentation](https://resend.com/docs)
- [Resend Support](https://resend.com/support)

For integration issues:

- Check the console logs for error messages
- Verify all environment variables are set
- Test with Resend's test mode first
