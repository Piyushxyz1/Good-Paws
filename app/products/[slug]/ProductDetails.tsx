import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function PawIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <ellipse cx="12" cy="15.5" rx="5.5" ry="4.5" />
      <ellipse cx="5.5" cy="9" rx="2.3" ry="3" transform="rotate(-25 5.5 9)" />
      <ellipse cx="18.5" cy="9" rx="2.3" ry="3" transform="rotate(25 18.5 9)" />
      <ellipse cx="9.5" cy="5.5" rx="2" ry="2.8" />
      <ellipse cx="14.5" cy="5.5" rx="2" ry="2.8" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findFirst({
    where: { slug, isActive: true },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      price: true,
      stock: true,
      imageUrl: true,
      category: true,
    },
  });

  if (!product) notFound();

  const inStock = product.stock > 0;

  // Fetch related products from backend
  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      slug: { not: slug },
      isActive: true,
    },
    take: 3,
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      imageUrl: true,
    },
  });

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-slate-800 antialiased selection:bg-teal-100 selection:text-teal-900">
      {/* Top Banner */}
      <div className="bg-slate-900 px-4 py-2 text-center text-xs font-medium tracking-wide text-stone-200">
        ✨ Free express delivery on orders over ₹999 | Use code{" "}
        <span className="font-semibold text-teal-400">PAW10</span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-[#FAF8F5]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-800 text-white transition-transform group-hover:scale-105">
              <PawIcon className="h-5 w-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              goodpaws<span className="text-teal-700">.</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/" className="text-xs font-semibold text-slate-600 hover:text-teal-800 transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-xs font-semibold text-teal-800">
              Collection
            </Link>
          </nav>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:border-teal-800 hover:text-teal-800"
          >
            Shop All <ArrowIcon />
          </Link>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-teal-800 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-teal-800 transition-colors">Products</Link>
          <span>/</span>
          <span className="truncate max-w-[200px] font-semibold text-slate-900">
            {product.name}
          </span>
        </nav>
      </div>

      {/* Main Product Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          
          {/* Image Showcase */}
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xs">
            <span className="absolute left-4 top-4 z-10 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-700 backdrop-blur-xs">
              {product.category}
            </span>

            <div className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-700 backdrop-blur-xs">
              <span className={`h-2 w-2 rounded-full ${inStock ? "bg-emerald-500" : "bg-red-500"}`} />
              {inStock ? "In Stock" : "Sold Out"}
            </div>

            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={800}
                height={800}
                priority
                className="h-full w-full object-contain p-8 transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-400">
                <PawIcon className="h-16 w-16 text-teal-800/30" />
                <p className="text-xs font-semibold uppercase tracking-wider">Product image coming soon</p>
              </div>
            )}
          </div>

          {/* Product Details & Actions */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold tracking-tight text-teal-800 sm:text-4xl">
                {formatPrice(Number(product.price))}
              </span>
              <span className="text-xs text-slate-500">Inclusive of applicable taxes</span>
            </div>

            <p className="mt-6 text-sm leading-7 text-slate-600 sm:text-base">
              {product.description || "Explore the product details and find the right choice for your pet's everyday comfort."}
            </p>

            <hr className="my-6 border-slate-200" />

            {inStock ? (
              <div className="space-y-4">
                {product.stock <= 5 && (
                  <p className="text-xs font-semibold text-amber-700">
                    Limited stock — only {product.stock} left.
                  </p>
                )}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Link
                    href="/products"
                    className="flex w-full items-center justify-center rounded-2xl bg-teal-800 py-4 text-sm font-bold tracking-wide text-white transition hover:bg-teal-900 shadow-2xs"
                  >
                    Add to Cart
                  </Link>
                  <Link
                    href="/products"
                    className="flex w-full items-center justify-center rounded-2xl bg-slate-900 py-4 text-sm font-bold tracking-wide text-white transition hover:bg-slate-800 shadow-2xs"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center">
                <p className="text-sm font-semibold text-red-800">Currently Out of Stock</p>
                <p className="mt-1 text-xs text-red-600">Explore other products while this item is unavailable.</p>
              </div>
            )}

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-slate-200 pt-6 text-center">
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg">🚚</span>
                <span className="text-[11px] font-semibold text-slate-700">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg">🛡️</span>
                <span className="text-[11px] font-semibold text-slate-700">100% Safe</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg">🔄</span>
                <span className="text-[11px] font-semibold text-slate-700">Easy Returns</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="border-t border-slate-200/80 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-teal-800">
                Specifications
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Designed for daily comfort & wellness.
              </h2>
              <p className="mt-4 text-xs leading-6 text-slate-600">
                Every detail is engineered with pet safety, comfort, and premium standards.
              </p>
            </div>

            <div className="lg:col-span-2">
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { label: "Product Name", value: product.name },
                  { label: "Category", value: product.category },
                  { label: "Price", value: formatPrice(Number(product.price)) },
                  { label: "Availability", value: inStock ? "In Stock" : "Out of Stock" },
                  { label: "Stock Quantity", value: `${product.stock} units` },
                  { label: "Return Policy", value: "30-Day Hassle-Free Returns" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-100 bg-[#FAF8F5] p-5 shadow-2xs"
                  >
                    <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-slate-900">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="bg-[#FAF8F5] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900">You might also like</h3>
              <Link href="/products" className="text-xs font-bold text-teal-800 hover:underline">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs transition hover:shadow-md"
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={400}
                        height={400}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-400">
                        <PawIcon className="h-10 w-10 text-teal-800/30" />
                      </div>
                    )}
                  </div>
                  <h4 className="mt-4 text-sm font-semibold text-slate-900 group-hover:text-teal-800">
                    {item.name}
                  </h4>
                  <p className="mt-1 text-sm font-bold text-slate-700">
                    {formatPrice(Number(item.price))}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-black text-slate-900">
            goodpaws<span className="text-teal-700">.</span>
          </Link>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Goodpaws Store. Built with love for your furry friends.
          </p>
        </div>
      </footer>
    </main>
  );
}