"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "../components/products/ProductCard";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrl: string | null;
  category: string;
};

type SortOption = "featured" | "price-low" | "price-high" | "name";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function ArrowIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function PawIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="12" cy="15.5" rx="5.5" ry="4.5" />
      <ellipse cx="5.5" cy="9" rx="2.3" ry="3" transform="rotate(-25 5.5 9)" />
      <ellipse cx="18.5" cy="9" rx="2.3" ry="3" transform="rotate(25 18.5 9)" />
      <ellipse cx="9.5" cy="5.5" rx="2" ry="2.8" />
      <ellipse cx="14.5" cy="5.5" rx="2" ry="2.8" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

// Fresh minimal pet lifestyle placeholder image
const DEFAULT_PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80";

export default function ProductCatalog({
  products,
}: {
  products: Product[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("featured");

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(products.map((product) => product.category)))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b)),
    ],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.description ?? "").toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result.sort((a, b) => {
        if (a.stock <= 0 && b.stock > 0) return 1;
        if (a.stock > 0 && b.stock <= 0) return -1;
        return 0;
      });
    }

    return result;
  }, [products, search, category, sort]);

  const categoryCount = (value: string) =>
    value === "All"
      ? products.length
      : products.filter((product) => product.category === value).length;

  return (
    <main className="min-h-screen bg-[#faf9f6] text-slate-800">
      {/* Announcement */}
      <div className="bg-teal-800 px-4 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-white sm:text-xs">
        Thoughtful essentials for your furry family
      </div>

      {/* Editorial Hero */}
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-10 sm:pb-24 sm:pt-20 lg:px-16 lg:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="relative z-10">
            <p className="mb-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-teal-800 sm:text-xs">
              <span className="h-px w-9 bg-teal-700" />
              The Goodpaws collection
            </p>

            <h1 className="max-w-3xl text-[clamp(3.5rem,7.5vw,7.5rem)] font-black leading-[0.91] tracking-[-0.075em] text-slate-900">
              Good things
              <br />
              for{" "}
              <span className="font-serif font-normal italic text-teal-700">
                good pets.
              </span>
            </h1>

            <div className="mt-9 grid gap-7 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-md text-sm leading-8 text-slate-600 sm:text-base">
                Great care starts with the right essentials. Explore a thoughtful
                range of pet food, playful toys and everyday accessories, selected
                to help make life happier and more comfortable for your furry
                family.
              </p>

              <Link
                href="#catalog"
                className="group inline-flex w-fit items-center gap-4 border-b border-teal-700 pb-2 text-xs font-bold uppercase tracking-[0.13em] text-teal-800 transition hover:gap-6"
              >
                Discover collection
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-14 flex items-center gap-5 border-t border-stone-300 pt-6">
              <span className="text-4xl font-black tracking-tight text-slate-900">
                {products.length.toString().padStart(2, "0")}
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-800">
                  The collection
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Products to explore
                </p>
              </div>
            </div>
          </div>

          {/* New Hero Visual Image */}
          <div className="relative min-h-[380px] overflow-hidden rounded-2xl sm:min-h-[520px]">
            <Image
              src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=80"
              alt="Golden retriever looking up attentively in natural daylight"
              fill
              priority
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-[#faf9f6]/90 backdrop-blur-md px-5 py-4 rounded-lg sm:bottom-10 sm:left-10">
              <span className="h-2 w-2 rounded-full bg-teal-700" />
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-800">
                A little more love, every day
              </p>
            </div>

            <span className="absolute right-5 top-5 rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700 backdrop-blur-sm">
              Goodpaws / 001
            </span>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section id="difference" className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-teal-800 sm:text-xs">
                The Goodpaws difference
              </p>

              <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.055em] text-slate-900 sm:text-6xl">
                More than
                <br />
                products.
                <br />
                <span className="font-serif font-normal italic text-teal-700">
                  A little more love.
                </span>
              </h2>
            </div>

            <div className="flex flex-col justify-between">
              <p className="max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                Every pet has their own personality and needs. We bring together a
                variety of everyday essentials to help you find something that
                feels right for your companion.
              </p>

              <div className="mt-12 grid gap-8 border-t border-stone-200 pt-8 sm:grid-cols-3">
                <div>
                  <span className="text-sm font-serif italic text-teal-700">
                    01
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    Quality in mind
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    We focus on bringing together useful pet essentials so you can
                    shop with your companion’s everyday needs in mind.
                  </p>
                </div>

                <div>
                  <span className="text-sm font-serif italic text-teal-700">
                    02
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    Plenty to explore
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    From food and toys to accessories and comfort essentials,
                    explore different categories in one convenient place.
                  </p>
                </div>

                <div>
                  <span className="text-sm font-serif italic text-teal-700">
                    03
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    Care in every choice
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    We want discovering products for your furry family to feel
                    simple, welcoming and enjoyable, from browsing to choosing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section
        id="catalog"
        className="mx-auto max-w-[1440px] scroll-mt-10 px-5 py-20 sm:px-10 sm:py-28 lg:px-16"
      >
        {/* Catalog heading */}
        <div className="mb-12 flex flex-col justify-between gap-5 border-b border-stone-300 pb-9 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-teal-800 sm:text-xs">
              Find their favourites
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] text-slate-900 sm:text-6xl">
              The collection<span className="text-teal-700">.</span>
            </h2>

            <p className="mt-4 text-sm text-slate-500">
              Thoughtful essentials for your furry family.
            </p>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
            {filteredProducts.length} / {products.length} products
          </p>
        </div>

        {/* Category filters */}
        <div className="mb-9 flex flex-wrap gap-x-7 gap-y-4 border-b border-stone-200 pb-6">
          {categories.map((item) => {
            const selected = category === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={selected}
                className={`group relative pb-2 text-xs font-semibold transition ${
                  selected
                    ? "text-teal-800"
                    : "text-slate-500 hover:text-teal-800"
                }`}
              >
                {item}
                <span className="ml-2 text-[10px] text-slate-400">
                  {categoryCount(item)}
                </span>

                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-teal-700 transition-all ${
                    selected ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Search and sorting */}
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="relative w-full border-b border-stone-300 sm:max-w-sm">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-teal-800">
              <SearchIcon />
            </span>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search food, toys, accessories..."
              aria-label="Search products"
              className="w-full bg-transparent py-4 pl-9 pr-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-teal-700"
            />
          </div>

          <div className="flex items-center gap-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Sort by
            </span>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              aria-label="Sort products"
              className="min-w-[170px] border-b border-stone-300 bg-transparent py-3 text-xs font-semibold text-slate-800 outline-none focus:border-teal-700"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Products */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const productWithImage = {
                ...product,
                imageUrl: product.imageUrl || DEFAULT_PRODUCT_IMAGE,
              };

              return (
                <ProductCard key={product.id} product={productWithImage} />
              );
            })}
          </div>
        ) : (
          <div className="border-y border-stone-300 py-24 text-center">
            <PawIcon className="mx-auto h-12 w-12 text-teal-700/50" />

            <h3 className="mt-7 text-3xl font-black tracking-tight text-slate-900">
              No products found
            </h3>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500">
              Try another search or choose a different category to discover more
              products.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
                setSort("featured");
              }}
              className="mt-8 border-b border-teal-700 pb-2 text-xs font-bold uppercase tracking-[0.15em] text-teal-800 transition hover:text-teal-600"
            >
              Clear all filters →
            </button>
          </div>
        )}
      </section>

      {/* Commitment */}
      <section className="bg-teal-800 text-white overflow-hidden">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-20 sm:px-10 sm:py-28 lg:grid-cols-2 lg:px-16">
          <div className="max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-teal-200 sm:text-xs">
              Here for your furry family
            </p>

            <h2 className="mt-7 text-4xl font-black leading-[1.05] tracking-[-0.06em] sm:text-6xl">
              Because they deserve
              <br />
              <span className="font-serif font-normal italic">
                thoughtful care.
              </span>
            </h2>

            <p className="mt-7 text-sm leading-8 text-teal-50 sm:text-base">
              Finding the right essentials should feel easy. Explore our
              collection, compare your options and choose products that fit your
              pet’s needs and your everyday routine.
            </p>

            <div className="mt-10">
              <Link
                href="#catalog"
                className="group flex w-fit items-center gap-5 border-b border-white/50 pb-3 text-xs font-bold uppercase tracking-[0.15em] transition hover:border-white"
              >
                Explore the collection
                <ArrowIcon className="transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </div>

          {/* New Commitment Image */}
          <div className="relative h-72 w-full overflow-hidden rounded-xl sm:h-96">
            <Image
              src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1000&q=80"
              alt="Playful dog enjoying outdoors in sunlight"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Closing banner */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 px-5 py-16 sm:px-10 sm:py-20 md:flex-row md:items-end lg:px-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-teal-700">
              Every paw deserves care
            </p>

            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.06em] text-slate-900 sm:text-6xl">
              Their happiness
              <br />
              starts here<span className="text-teal-700">.</span>
            </h2>
          </div>

          <Link
            href="/"
            className="group flex w-fit items-center gap-4 border-b border-teal-700 pb-3 text-xs font-bold uppercase tracking-[0.15em] text-teal-800 transition hover:gap-6"
          >
            Back to home
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </main>
  );
}