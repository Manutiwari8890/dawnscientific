import React, { lazy, Suspense } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

// Lazy load ONLY the real checkout page
const Checkout = lazy(() => import("./Checkout"));

export default function CheckoutWrapper() {
  return (
    <Suspense fallback={<div className="full_page_loader"></div>}>
      <Elements stripe={stripePromise}>
        <Checkout />
      </Elements>
    </Suspense>
  );
}
