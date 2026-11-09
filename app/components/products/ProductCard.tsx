"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useTransition } from "react";
import { addToCart } from "@/app/actions/actions";

export type StoreProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string | null;
  category: string;
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export default function ProductCard({
  product
}: {
  product: StoreProduct;
}) {
  const [isPending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);
  const [message, setMessage] = useState("");

  const isInStock = product.stock > 0;

  const handleAddToCart = () => {
    if (!isInStock || isPending) return;

    setMessage("");
    setAdded(false);

    startTransition(async () => {
      try {
        const result = await addToCart(product.id);

        if (result.success) {
          setAdded(true);
          setTimeout(() => setAdded(false), 2000);
        } else {
          setMessage(result.message);
        }
      } catch {
        setMessage("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-stone-200/80 bg-white p-3.5 transition-all duration-500 hover:-translate-y-1.5 hover:border-teal-800/30 hover:shadow-[0_25px_50px_-12px_rgba(15,118,110,0.16)]">
      
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3.8] w-full overflow-hidden rounded-[20px] bg-[#F5F4F0]">
        <Link
          href={`/products/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 block overflow-hidden focus-visible:outline-none"
        >
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-stone-300">
              <span className="text-5xl transition-transform duration-500 group-hover:scale-110" aria-hidden="true">
                🐾
              </span>
            </div>
          )}
        </Link>

        {/* Floating Category Badge */}
        <span className="absolute left-3 top-3 z-10 rounded-full border border-white/40 bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-stone-800 shadow-2xs backdrop-blur-md">
          {product.category}
        </span>

        {/* Stock Status Pill */}
        <span
          className={`absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide backdrop-blur-md ${
            isInStock
              ? "bg-stone-900/75 text-stone-100"
              : "bg-red-500/85 text-white"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${isInStock ? "bg-teal-400 animate-pulse" : "bg-white"}`} />
          {isInStock ? "In stock" : "Sold out"}
        </span>

        {/* Quick Add Hover Slide-Up (Desktop) */}
        <div className="absolute inset-x-3 bottom-3 z-20 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hidden sm:block">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!isInStock || isPending}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold uppercase tracking-[0.14em] backdrop-blur-xl shadow-md transition-all ${
              !isInStock
                ? "bg-stone-900/50 text-stone-300 cursor-not-allowed"
                : added
                ? "bg-emerald-600 text-white"
                : "bg-teal-900/90 text-white hover:bg-teal-900 active:scale-[0.98]"
            }`}
          >
            {!isInStock ? (
              "Sold Out"
            ) : isPending ? (
              <>
                <span className="inline-block animate-spin">⟳</span>
                <span>Adding...</span>
              </>
            ) : added ? (
              "✓ Added to Cart"
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col justify-between px-1.5 pt-4 pb-1">
        <div>
          <Link
            href={`/products/${product.slug}`}
            className="group/title focus-visible:outline-none"
          >
            <h3 className="line-clamp-1 text-base font-bold tracking-tight text-stone-900 transition-colors duration-200 group-hover/title:text-teal-800 sm:text-lg">
              {product.name}
            </h3>
          </Link>

          <p className="mt-1.5 line-clamp-2 min-h-[36px] text-xs leading-relaxed text-stone-500">
            {product.description}
          </p>
        </div>

        {/* Footer / Price & Mobile Button */}
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-stone-100 pt-3.5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Price
            </span>
            <p className="text-lg font-black tracking-tight text-stone-900 sm:text-xl">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Touch / Mobile Fallback Add Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!isInStock || isPending}
            className={`flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all sm:hidden ${
              !isInStock
                ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                : added
                ? "bg-emerald-600 text-white"
                : "bg-teal-800 text-white active:scale-95"
            }`}
          >
            {!isInStock ? "Out" : isPending ? "..." : added ? "✓" : "+ Add"}
          </button>
        </div>

        {/* Error Feedback */}
        {message && (
          <p role="alert" className="mt-2 text-center text-[11px] font-medium text-red-600">
            {message}
          </p>
        )}
      </div>
    </article>
  );
}