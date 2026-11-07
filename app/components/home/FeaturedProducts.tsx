
import Link from "next/link";
import ProductGrid from "../products/ProductGrid";
import type { StoreProduct } from "../products/ProductCard";

export default function FeaturedProducts({
  products,
}: {
  products: StoreProduct[];
}) {
  return (
    <section className="bg-slate-50 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-teal-700">
              Picked for your pets
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
              Featured products
            </h2>
            <p className="mt-2 text-slate-500">
              Everyday essentials for your furry family.
            </p>
          </div>

          <Link
            href="/products"
            className="font-semibold text-teal-700 hover:text-teal-900"
          >
            View all products →
          </Link>
        </div>

        <ProductGrid products={products} />
      </div>
    </section>
  );
}
