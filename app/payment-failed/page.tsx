
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
  title: "Payment Unsuccessful | Goodpaws",
  description: "Your payment could not be completed. Please try again.",
};

function PaymentFailedContent() {
  return (
    <main className="min-h-screen bg-[#faf9f6] px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="border border-stone-200 bg-white px-6 py-14 text-center shadow-sm sm:px-12">

          {/* Failure Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-10 w-10 text-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6l12 12M18 6 6 18"
              />
            </svg>
          </div>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-red-600">
            Payment Unsuccessful
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Something went wrong
            <span className="text-teal-700">.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-slate-500">
            We couldn't complete your payment. This may happen because of a
            bank decline, an interrupted transaction, or a temporary payment
            issue.
          </p>

          {/* Instructions */}
          <div className="mt-9 border border-stone-200 bg-[#faf9f6] p-5 text-left">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              What should you do?
            </h2>

            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li className="flex gap-3">
                <span className="font-bold text-teal-800">01.</span>
                Check your bank or payment app for the transaction status.
              </li>

              <li className="flex gap-3">
                <span className="font-bold text-teal-800">02.</span>
                If no amount was deducted, return to your cart and try again.
              </li>

              <li className="flex gap-3">
                <span className="font-bold text-teal-800">03.</span>
                If money was deducted, please contact support before
                attempting another payment.
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/cart"
              className="flex flex-1 items-center justify-center bg-teal-800 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-teal-700"
            >
              Return to Cart
            </Link>

            <Link
              href="/products"
              className="flex flex-1 items-center justify-center border border-stone-300 px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-800 transition hover:bg-stone-50"
            >
              Continue Shopping
            </Link>
          </div>

          <p className="mt-8 text-xs text-slate-400">
            Need assistance? Please contact our customer support team.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf9f6]" />
      }
    >
      <PaymentFailedContent />
    </Suspense>
  );
}
