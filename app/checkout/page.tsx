import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import CheckoutForm from "./CheckoutForm"

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function CheckoutPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/login?callbackUrl=/checkout");
  }

  // Fetch cart items for checkout
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  const subtotal = cart.items.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0,
  );

  const totalQuantity = cart.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  // Flat rate or free shipping logic
  const shippingFee = subtotal > 1500 ? 0 : 99;
  const grandTotal = subtotal + shippingFee;

  return (
    <main className="min-h-screen bg-[#faf9f6] px-5 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        {/* Header Breadcrumb & Title */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-teal-800">
            <Link href="/cart" className="hover:underline">
              Cart
            </Link>
            <span>/</span>
            <span>Checkout</span>
          </div>

          <h1 className="mt-5 text-5xl font-black tracking-[-0.06em] text-slate-900 sm:text-7xl">
            Checkout details<span className="text-teal-700">.</span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-7 text-slate-500">
            Provide your delivery details to reserve your items and finalize your order.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:gap-16">
          {/* Shipping Form Component */}
          <section>
            <CheckoutForm
              amount={grandTotal}
              user={{
                name: session.user?.name || "",
                email: session.user?.email || "",
              }}
            />
          </section>

          {/* Order Summary & Item Breakdown */}
          <aside className="space-y-6">
            <div className="bg-white p-7 sm:p-9 shadow-sm border border-stone-200/60">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-800">
                Summary
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
                Your order<span className="text-teal-700">.</span>
              </h2>

              {/* Items Summary Scroll View */}
              <div className="mt-6 max-h-80 overflow-y-auto divide-y divide-stone-200 pr-2">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-[#e9e7df]">
                      {item.product.imageUrl ? (
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[10px] font-semibold uppercase tracking-widest text-teal-800/50">
                          Goodpaws
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col justify-center">
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="mt-1 text-xs text-slate-500">
                        Qty: {item.quantity} × {formatPrice(Number(item.product.price))}
                      </p>
                    </div>

                    <div className="text-right flex items-center">
                      <span className="text-sm font-bold text-slate-900">
                        {formatPrice(Number(item.product.price) * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="mt-6 space-y-4 border-t border-stone-200 pt-6">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Subtotal ({totalQuantity} items)</span>
                  <span className="font-semibold text-slate-900">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm text-slate-500">
                  <span>Delivery fee</span>
                  <span className="font-semibold text-slate-900">
                    {shippingFee === 0 ? (
                      <span className="text-teal-800 uppercase text-xs font-bold">Free</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-stone-200 pt-5">
                  <span className="text-base font-bold text-slate-900">Total payable</span>
                  <span className="text-3xl font-black text-slate-900">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Banner */}
            <div className="border border-stone-200/80 bg-[#f4f2eb] p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-800">
                🔒 Safe & Encrypted Checkout
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Payments are securely processed via Razorpay. Your details are never stored.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}