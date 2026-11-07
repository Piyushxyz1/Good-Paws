import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import CartActions from "./CartActions";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function CartItems() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className="bg-white px-6 py-20 text-center">
        <h2 className="text-3xl font-black tracking-tight text-slate-900">
          Your cart awaits.
        </h2>
        <p className="mt-4 text-sm text-slate-500">
          Sign in to explore your saved essentials.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-block bg-teal-800 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-teal-700"
        >
          Sign in
        </Link>
      </div>
    );
  }

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
    return (
      <div className="bg-white px-6 py-24 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-800">
          A little something is missing
        </p>

        <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          Your cart is empty<span className="text-teal-700">.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-slate-500">
          Looks like you haven't added anything yet. Explore our collection and
          find something special for your furry friend.
        </p>

        <Link
          href="/products"
          className="mt-9 inline-flex items-center gap-4 border-b border-teal-700 pb-2 text-xs font-bold uppercase tracking-[0.15em] text-teal-800 transition hover:gap-6"
        >
          Explore collection →
        </Link>
      </div>
    );
  }

  const subtotal = cart.items.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0,
  );

  const totalQuantity = cart.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <main className="min-h-screen bg-[#faf9f6] px-5 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-800">
          Goodpaws / Your selection
        </p>

        <h1 className="mt-5 text-5xl font-black tracking-[-0.06em] text-slate-900 sm:text-7xl">
          Shopping cart<span className="text-teal-700">.</span>
        </h1>

        <p className="mt-5 mb-12 max-w-lg text-sm leading-7 text-slate-500">
          Review your favourites and get everything ready for your furry family.
        </p>
        <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
          {/* Cart Products */}
          <section>
            <div className="mb-8 flex items-end justify-between border-b border-stone-300 pb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-800">
                  Your selection
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
                  Cart items<span className="text-teal-700">.</span>
                </h2>
              </div>

              <span className="text-xs font-semibold text-slate-500">
                {totalQuantity} items
              </span>
            </div>

            <div className="divide-y divide-stone-200">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-5 py-7 sm:flex-row sm:items-center"
                >
                  {/* Product Image */}
                  <div className="relative h-32 w-full shrink-0 overflow-hidden bg-[#e9e7df] sm:h-32 sm:w-32">
                    {item.product.imageUrl ? (
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs font-semibold uppercase tracking-widest text-teal-800/50">
                        Goodpaws
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-800">
                        {item.product.category}
                      </p>

                      <h3 className="mt-2 text-lg font-bold text-slate-900">
                        {item.product.name}
                      </h3>

                      <p className="mt-2 text-xs text-slate-500">
                        {item.product.stock > 0
                          ? "In stock"
                          : "Currently unavailable"}
                      </p>

                      <CartActions
                        itemId={item.id}
                        quantity={item.quantity}
                        stock={item.product.stock}
                      />
                    </div>

                    <div className="sm:text-right">
                      <p className="text-lg font-bold text-slate-900">
                        {formatPrice(
                          Number(item.product.price) * item.quantity,
                        )}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {formatPrice(Number(item.product.price))} each
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Order Summary */}
          <aside>
            <div className="bg-white p-7 sm:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-800">
                Your order
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
                Summary<span className="text-teal-700">.</span>
              </h2>

              <div className="mt-9 space-y-5 border-b border-stone-200 pb-7">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm text-slate-500">
                  <span>Shipping</span>
                  <span className="font-semibold text-teal-800">
                    Calculated at checkout
                  </span>
                </div>

                <div className="flex justify-between text-sm text-slate-500">
                  <span>Total items</span>
                  <span>{totalQuantity}</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-7">
                <span className="text-sm font-bold text-slate-900">
                  Subtotal
                </span>
                <span className="text-2xl font-black text-slate-900">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="flex w-full items-center justify-center bg-teal-800 px-6 py-5 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-teal-700"
              >
                Proceed to checkout →
              </Link>

              <Link
                href="/products"
                className="mt-6 block text-center text-xs font-semibold text-slate-500 transition hover:text-teal-800"
              >
                Continue shopping
              </Link>
            </div>

            <p className="mt-5 text-center text-xs leading-6 text-slate-400">
              Thoughtful essentials for your furry family.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
