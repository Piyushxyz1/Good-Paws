"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "../components/products/ProductCard";
import { StoreProduct } from "../components/products/ProductCard";



type SortOption = "featured" | "price-low" | "price-high" | "name";

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

function BedIcon({ className = "h-8 w-8" }: { className?: string }) {
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
      <path d="M3 18v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5" />
      <path d="M3 15h18" />
      <path d="M5 11V8a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3" />
      <path d="M14 11V8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3" />
      <path d="M3 18v2M21 18v2" />
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

export default function BedsAndComfort({
  products,
}: {
  products: StoreProduct[];
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
        Comfort, relaxation & cozy moments for your pet
      </div>

      {/* Editorial Hero */}
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-10 sm:pb-24 sm:pt-20 lg:px-16 lg:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="relative z-10">
            <p className="mb-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-teal-800 sm:text-xs">
              <span className="h-px w-9 bg-teal-700" />
              Beds, Rest & Everyday Comfort
            </p>

            <h1 className="max-w-3xl text-[clamp(3.5rem,7.5vw,7.5rem)] font-black leading-[0.91] tracking-[-0.075em] text-slate-900">
              A cozy space
              <br />
              for <span className="font-serif font-normal italic text-teal-700">happier days.</span>
            </h1>

            <div className="mt-9 grid gap-7 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-md text-sm leading-8 text-slate-600 sm:text-base">
                Every furry companion deserves a place to unwind. Discover
                thoughtfully selected pet beds, soft resting essentials, and
                everyday comfort accessories designed to make every nap,
                cuddle, and quiet moment special.
              </p>

              <Link
                href="#catalog"
                className="group inline-flex w-fit items-center gap-4 border-b border-teal-700 pb-2 text-xs font-bold uppercase tracking-[0.13em] text-teal-800 transition hover:gap-6"
              >
                Explore Comfort
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-14 flex items-center gap-5 border-t border-stone-300 pt-6">
              <span className="text-4xl font-black tracking-tight text-slate-900">
                {products.length.toString().padStart(2, "0")}
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-800">
                  Comfort Collection
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Cozy moments waiting to happen
                </p>
              </div>
            </div>
          </div>

          {/* Hero Visual Image */}
          <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-xl sm:h-[520px]">
            <Image
              src="https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80&w=1200&auto=format&fit=crop"
              alt="Pet relaxing in a comfortable resting space"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-lg bg-white/90 backdrop-blur-md px-5 py-4 sm:bottom-10 sm:left-10">
              <span className="h-2 w-2 rounded-full bg-teal-700 animate-pulse" />
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-800">
                Made for Rest, Comfort & Happy Paws
              </p>
            </div>

            <span className="absolute right-5 top-5 rounded-full bg-slate-900/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
              Comfort / 003
            </span>
          </div>
        </div>
      </section>

      {/* Philosophy & Editorial Images */}
      <section id="difference" className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-teal-800 sm:text-xs">
                Our Philosophy of Comfort
              </p>

              <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.055em] text-slate-900 sm:text-6xl">
                Rest easy.
                <br />
                <span className="font-serif font-normal italic text-teal-700">
                  Live happily.
                </span>
              </h2>

              <div className="relative mt-8 h-64 overflow-hidden rounded-xl shadow-md lg:h-80">
                <Image
                  src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800&auto=format&fit=crop"
                  alt="Dog enjoying a peaceful resting moment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <p className="max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                Comfort is an essential part of your pet's everyday happiness.
                A cozy resting space helps them relax, recharge, and feel at
                home. From soft beds and supportive cushions to comfortable
                everyday accessories, discover essentials that make their
                downtime just as special as their playtime.
              </p>

              <div className="mt-12 grid gap-8 border-t border-stone-200 pt-8 sm:grid-cols-3">
                <div>
                  <span className="text-sm font-serif italic text-teal-700">01</span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    Cozy Rest
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    Create a welcoming resting space with comfortable beds
                    and soft essentials for everyday naps.
                  </p>
                </div>

                <div>
                  <span className="text-sm font-serif italic text-teal-700">02</span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    Everyday Support
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    Explore thoughtfully selected resting accessories
                    designed around your companion's comfort.
                  </p>
                </div>

                <div>
                  <span className="text-sm font-serif italic text-teal-700">03</span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    Peaceful Moments
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    Give your furry friend a familiar and cozy place
                    to relax after a day full of adventures.
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
              Everyday Comfort Essentials
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] text-slate-900 sm:text-6xl">
              Beds & Comfort Catalog<span className="text-teal-700">.</span>
            </h2>

            <p className="mt-4 text-sm text-slate-500">
              Explore cozy beds, comfortable resting essentials, and more.
            </p>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
            {filteredProducts.length} / {products.length} comfort essentials
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
              placeholder="Search beds, cushions, resting essentials..."
              aria-label="Search beds and comfort products"
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
              aria-label="Sort beds and comfort products"
              className="min-w-[170px] border-b border-stone-300 bg-transparent py-3 text-xs font-semibold text-slate-800 outline-none focus:border-teal-700"
            >
              <option value="featured">Featured Products</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Products */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="border-y border-stone-300 py-24 text-center">
            <BedIcon className="mx-auto h-12 w-12 text-teal-700/50" />

            <h3 className="mt-7 text-3xl font-black tracking-tight text-slate-900">
              No comfort essentials found
            </h3>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500">
              Try modifying your search or choosing a different category
              to discover more cozy essentials for your pet.
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
              Clear comfort filters →
            </button>
          </div>
        )}
      </section>

      {/* Commitment Banner with Background Image */}
      <section className="relative overflow-hidden bg-teal-900 py-24 text-white">
        <Image
          src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1600&auto=format&fit=crop"
          alt="Pet relaxing in a cozy resting environment"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />

        <div className="relative z-10 mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-10 md:grid-cols-[1fr_auto] md:items-center lg:px-16">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-teal-200 sm:text-xs">
              Comfort Is Their Everyday Luxury
            </p>

            <h2 className="mt-7 text-4xl font-black leading-[1.05] tracking-[-0.06em] sm:text-6xl">
              More comfort for
              <br />
              <span className="font-serif font-normal italic">
                happier, healthier pets.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-8 text-teal-50 sm:text-base">
              Every pet deserves a place they can call their own. Discover
              comfortable essentials that make resting more relaxing and
              turn everyday downtime into moments of pure comfort.
            </p>
          </div>

          <Link
            href="#catalog"
            className="group flex w-fit items-center gap-5 border-b border-white/50 pb-3 text-xs font-bold uppercase tracking-[0.15em] transition hover:border-white"
          >
            Browse Collection
            <ArrowIcon className="transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </section>

      {/* Closing Banner */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 px-5 py-16 sm:px-10 sm:py-20 md:flex-row md:items-end lg:px-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-teal-700">
              Every Pet Deserves Comfort
            </p>

            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.06em] text-slate-900 sm:text-6xl">
              More cozy naps,
              <br />
              more peaceful days<span className="text-teal-700">.</span>
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