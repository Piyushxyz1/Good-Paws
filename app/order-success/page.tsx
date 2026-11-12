
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
  title: "Order Confirmed | Goodpaws",
  description: "Your Goodpaws order has been confirmed.",
};

interface OrderSuccessPageProps {
  searchParams: Promise<{
    orderId?: string;
  }>;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

async function OrderSuccessContent({
  searchParams,
}: OrderSuccessPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { orderId } = await searchParams;

  if (!orderId) {
    notFound();
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: session.user.id,
      paymentStatus: "SUCCESS",
    },
    include: {
      items: true,
    },
  });

  // Never show success for an unverified order.
  if (!order) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="border border-stone-200 bg-white px-6 py-12 text-center shadow-sm sm:px-12">

          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-10 w-10 text-teal-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5 12 4 4L19 6"
              />
            </svg>
          </div>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-teal-800">
            Payment Confirmed
          </p>

          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Thank you for your order
            <span className="text-teal-700">.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-500">
            Your payment was successful and your order has been confirmed.
            We appreciate you choosing Goodpaws for your furry family.
          </p>

          <div className="mt-10 border-y border-stone-200 py-6 text-left">
            <div className="flex flex-col justify-between gap-2 sm:flex-row">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Order Reference
              </span>
              <span className="break-all text-sm font-bold text-slate-900">
                {order.id}
              </span>
            </div>

            <div className="mt-5 flex justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Payment Status
              </span>
              <span className="text-sm font-bold text-teal-800">
                Successful
              </span>
            </div>

            <div className="mt-5 flex justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Order Date
              </span>
              <span className="text-sm font-medium text-slate-700">
                {new Intl.DateTimeFormat("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(order.createdAt)}
              </span>
            </div>

            <div className="mt-5 flex justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Paid
              </span>
              <span className="text-lg font-black text-slate-900">
                {formatPrice(Number(order.total))}
              </span>
            </div>
          </div>

          {/* Ordered Products */}
          <div className="mt-8 text-left">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
              Order Summary
            </h2>

            <div className="mt-4 divide-y divide-stone-100">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {item.productName}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-bold text-slate-900">
                    {formatPrice(
                      Number(item.unitPrice) * item.quantity
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mt-6 border-t border-stone-200 pt-6 text-left">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Delivery Address
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {order.shippingAddress}
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="flex flex-1 items-center justify-center bg-teal-800 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-teal-700"
            >
              Continue Shopping
            </Link>

            <Link
              href="/"
              className="flex flex-1 items-center justify-center border border-stone-300 px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-800 transition hover:bg-stone-50"
            >
              Back to Home
            </Link>
          </div>

          <p className="mt-8 text-xs text-slate-400">
            Thank you for being a part of the Goodpaws family.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function OrderSuccessPage({
  searchParams,
}: OrderSuccessPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf9f6]" />
      }
    >
      <OrderSuccessContent searchParams={searchParams} />
    </Suspense>
  );
}
