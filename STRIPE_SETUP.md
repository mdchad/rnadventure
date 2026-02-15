# Stripe Integration Setup Guide

This guide will help you set up and test the Stripe payment integration for tour bookings.

## 🎯 What's Been Implemented

### 1. **Booking System**

- Complete booking flow from tour selection to payment
- Date picker for tour scheduling
- Customer information collection
- Special requests support
- Booking number generation (format: `BK-YYYYMMDD-XXXXXXXX`)

### 2. **Stripe Integration**

- Stripe Checkout Session API
- Secure payment processing
- Webhook handling for payment confirmation
- Success and cancellation pages
- Automatic booking status updates

### 3. **Database Schema**

- Booking table with Stripe fields:
  - `stripePaymentIntentId`
  - `stripeSessionId`
  - Payment status tracking
  - Booking status (pending, confirmed, cancelled, completed)

## 🚀 Setup Instructions

### Step 1: Get Stripe API Keys

1. Sign up or log in to [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to **Developers** → **API keys**
3. Copy your keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

### Step 2: Update Environment Variables

Update `apps/web/.env` with your actual Stripe keys:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_your_actual_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### Step 3: Set Up Stripe Webhook (for Production)

#### For Local Development:

1. Install Stripe CLI:

   ```bash
   brew install stripe/stripe-cli/stripe
   ```

2. Login to Stripe:

   ```bash
   stripe login
   ```

3. Forward webhooks to your local server:

   ```bash
   stripe listen --forward-to localhost:3001/api/webhooks/stripe
   ```

4. Copy the webhook signing secret (starts with `whsec_`) and update your `.env`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
   ```

#### For Production:

1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Click **Add endpoint**
3. Enter your endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select these events:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `payment_intent.payment_failed`
5. Copy the webhook signing secret and add to your production environment variables

### Step 4: Test the Integration

1. Start your development server:

   ```bash
   bun run dev
   ```

2. In a separate terminal, start Stripe webhook forwarding:

   ```bash
   stripe listen --forward-to localhost:3001/api/webhooks/stripe
   ```

3. Navigate to a tour page and click "Book Now"

4. Fill in the booking form and proceed to checkout

5. Use Stripe test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **3D Secure**: `4000 0025 0000 3155`
   - Use any future expiry date, any 3-digit CVC, and any postal code

## 📋 Booking Flow

```
1. User browses tours → 2. Clicks "Book Now"
                      ↓
3. Selects date, number of people, enters contact info
                      ↓
4. Clicks "Proceed to Payment"
                      ↓
5. Server creates booking record (status: pending)
                      ↓
6. Server creates Stripe Checkout Session
                      ↓
7. User redirected to Stripe Checkout
                      ↓
8. User completes payment
                      ↓
9. Stripe sends webhook to /api/webhooks/stripe
                      ↓
10. Webhook confirms booking (status: confirmed, payment: paid)
                      ↓
11. User redirected to success page with booking details
```

## 🔧 API Endpoints

### `POST /api/checkout`

Creates a Stripe Checkout Session and booking record.

**Request Body:**

```json
{
  "tourId": "string",
  "tourTitle": "string",
  "tourImage": "string",
  "date": "ISO date string",
  "numberOfPeople": number,
  "pricePerPerson": number,
  "totalPrice": number,
  "currency": "SGD",
  "customerName": "string",
  "customerEmail": "string",
  "customerPhone": "string (optional)",
  "specialRequests": "string (optional)"
}
```

**Response:**

```json
{
  "sessionId": "string",
  "bookingId": "string",
  "bookingNumber": "string"
}
```

### `POST /api/webhooks/stripe`

Handles Stripe webhook events.

**Events Handled:**

- `checkout.session.completed` - Confirms booking and payment
- `checkout.session.expired` - Cancels expired bookings
- `payment_intent.payment_failed` - Logs payment failures

## 📄 Pages

### Booking Pages

- `/booking/[tourId]` - Main booking form page
- `/booking/success` - Payment success confirmation
- `/booking/cancel` - Payment cancellation page

## 🔒 Security Features

1. **Authentication Required** - Users must be logged in to book
2. **Webhook Signature Verification** - All webhooks are verified
3. **CSRF Protection** - Next.js built-in protection
4. **Server-Side Validation** - All booking data validated on server
5. **Secure Payment** - Payment handled entirely by Stripe

## 📊 Database Updates

When a booking is confirmed:

1. Booking status → `confirmed`
2. Payment status → `paid`
3. `confirmedAt` timestamp set
4. Tour `bookingCount` incremented

## 🧪 Testing Checklist

- [ ] Test successful payment with `4242 4242 4242 4242`
- [ ] Test declined payment with `4000 0000 0000 0002`
- [ ] Test 3D Secure with `4000 0025 0000 3155`
- [ ] Verify webhook receives events (check terminal logs)
- [ ] Check booking status updates in database
- [ ] Test success page displays correct booking details
- [ ] Test cancel/back button shows cancel page
- [ ] Verify email is correct in booking record

## 🎨 Customization

### Update Success/Cancel URLs

Edit `apps/web/src/app/api/checkout/route.ts`:

```typescript
success_url: `${env.BETTER_AUTH_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
cancel_url: `${env.BETTER_AUTH_URL}/booking/cancel`,
```

### Update Currency

Default is SGD. Change in tour schema or per booking:

```typescript
currency: (currency || "sgd").toLowerCase(),
```

### Add More Payment Methods

Edit checkout session creation:

```typescript
payment_method_types: ["card", "alipay", "grabpay"],
```

## 🐛 Troubleshooting

### Webhook not receiving events

- Check Stripe CLI is running: `stripe listen --forward-to localhost:3001/api/webhooks/stripe`
- Verify webhook secret in `.env` matches CLI output
- Check terminal logs for errors

### Payment not confirming

- Check webhook signature verification
- Verify `STRIPE_WEBHOOK_SECRET` is set correctly
- Check server logs for webhook processing errors

### Checkout session fails to create

- Verify `STRIPE_SECRET_KEY` is set correctly
- Check all required fields are provided
- Review API error logs

## 📚 Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)

## 🔄 Next Steps

1. Set up Stripe account and get API keys
2. Update environment variables
3. Set up webhook forwarding for local development
4. Test the complete booking flow
5. Configure production webhooks when deploying
6. Consider adding email notifications (see TODO below)

## 📝 TODO / Future Enhancements

- [ ] Email notifications for booking confirmations
- [ ] Email notifications for booking cancellations
- [ ] Admin dashboard for managing bookings
- [ ] Refund functionality
- [ ] Booking modification/rescheduling
- [ ] SMS notifications
- [ ] PDF booking confirmations
- [ ] Calendar integration (iCal export)
- [ ] Multi-currency support
- [ ] Discount codes/coupons
- [ ] Gift vouchers
