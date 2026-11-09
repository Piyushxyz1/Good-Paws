"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard, { StoreProduct } from "../components/products/ProductCard";



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

function ToyIcon({ className = "h-8 w-8" }: { className?: string }) {
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
      <path d="M8 8a4 4 0 1 0 0-8" transform="translate(0 4)" />
      <path d="M16 8a4 4 0 1 1 0-8" transform="translate(0 4)" />
      <path d="M5 12h14a2 2 0 0 1 2 2v4a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-4a2 2 0 0 1 2-2Z" />
      <path d="M8 15v3M6.5 16.5h3M16 16h.01M18 18h.01" />
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

export default function ToysandPlay({
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
        Playful essentials & endless adventures for your pet
      </div>

      {/* Editorial Hero */}
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-10 sm:pb-24 sm:pt-20 lg:px-16 lg:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="relative z-10">
            <p className="mb-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-teal-800 sm:text-xs">
              <span className="h-px w-9 bg-teal-700" />
              Toys, Play & Enrichment
            </p>

            <h1 className="max-w-3xl text-[clamp(3.5rem,7.5vw,7.5rem)] font-black leading-[0.91] tracking-[-0.075em] text-slate-900">
              Endless play
              <br />
              for <span className="font-serif font-normal italic text-teal-700">happier days.</span>
            </h1>

            <div className="mt-9 grid gap-7 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-md text-sm leading-8 text-slate-600 sm:text-base">
                Every tail wag deserves a little adventure. Discover thoughtfully
                selected toys, interactive games, playful accessories, and
                enrichment essentials designed to keep your furry companion
                active, curious, and endlessly entertained.
              </p>

              <Link
                href="#catalog"
                className="group inline-flex w-fit items-center gap-4 border-b border-teal-700 pb-2 text-xs font-bold uppercase tracking-[0.13em] text-teal-800 transition hover:gap-6"
              >
                Explore Toys
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-14 flex items-center gap-5 border-t border-stone-300 pt-6">
              <span className="text-4xl font-black tracking-tight text-slate-900">
                {products.length.toString().padStart(2, "0")}
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-800">
                  Playtime Collection
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Adventures waiting to happen
                </p>
              </div>
            </div>
          </div>

          {/* Hero Visual Image */}
          <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-xl sm:h-[520px]">
            <Image
              src="https://images.unsplash.com/photo-1535294435445-d7249524ef2e?q=80&w=1200&auto=format&fit=crop"
              alt="Happy dog enjoying an outdoor playtime adventure"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-lg bg-white/90 backdrop-blur-md px-5 py-4 sm:bottom-10 sm:left-10">
              <span className="h-2 w-2 rounded-full bg-teal-700 animate-pulse" />
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-800">
                Made for Play, Curiosity & Happy Tails
              </p>
            </div>

            <span className="absolute right-5 top-5 rounded-full bg-slate-900/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
              Play / 002
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
                Our Philosophy of Play
              </p>

              <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.055em] text-slate-900 sm:text-6xl">
                Inspiring joy.
                <br />
                <span className="font-serif font-normal italic text-teal-700">
                  One play at a time.
                </span>
              </h2>

              <div className="relative mt-8 h-64 overflow-hidden rounded-xl shadow-md lg:h-80">
                <Image
                  src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=800&auto=format&fit=crop"
                  alt="Happy dog playing with its favourite toy"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <p className="max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                Play is more than just fun. It helps pets stay physically active,
                mentally stimulated, and emotionally fulfilled. From interactive
                puzzles and durable chew toys to soft companions and fetch
                essentials, discover ways to make every moment more meaningful.
              </p>

              <div className="mt-12 grid gap-8 border-t border-stone-200 pt-8 sm:grid-cols-3">
                <div>
                  <span className="text-sm font-serif italic text-teal-700">01</span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    Active Play
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    Keep your companion moving with fetch toys, balls, and
                    engaging outdoor play essentials.
                  </p>
                </div>

                <div>
                  <span className="text-sm font-serif italic text-teal-700">02</span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    Mental Stimulation
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    Encourage curiosity and problem-solving with interactive
                    puzzles, treat dispensers, and enrichment games.
                  </p>
                </div>

                <div>
                  <span className="text-sm font-serif italic text-teal-700">03</span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    Everyday Comfort
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    Make downtime special with soft toys, comforting companions,
                    and playful everyday accessories.
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
              Playtime Essentials
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] text-slate-900 sm:text-6xl">
              Toys & Play Catalog<span className="text-teal-700">.</span>
            </h2>

            <p className="mt-4 text-sm text-slate-500">
              Explore interactive toys, engaging games, and playful accessories.
            </p>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
            {filteredProducts.length} / {products.length} toys & essentials
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
              placeholder="Search toys, chew toys, puzzles, accessories..."
              aria-label="Search toys and play products"
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
              aria-label="Sort toys and play products"
              className="min-w-[170px] border-b border-stone-300 bg-transparent py-3 text-xs font-semibold text-slate-800 outline-none focus:border-teal-700"
            >
              <option value="featured">Featured Toys</option>
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
            <ToyIcon className="mx-auto h-12 w-12 text-teal-700/50" />

            <h3 className="mt-7 text-3xl font-black tracking-tight text-slate-900">
              No playtime essentials found
            </h3>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500">
              Try modifying your search or choosing a different toy category
              to discover more playful essentials.
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
              Clear playtime filters →
            </button>
          </div>
        )}
      </section>

      {/* Commitment Banner with Background Image */}
      <section className="relative overflow-hidden bg-teal-900 py-24 text-white">
        <Image
          src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1600&auto=format&fit=crop"
          alt="Happy dog enjoying a playful moment"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />

        <div className="relative z-10 mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-10 md:grid-cols-[1fr_auto] md:items-center lg:px-16">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-teal-200 sm:text-xs">
              Happiness Through Play
            </p>

            <h2 className="mt-7 text-4xl font-black leading-[1.05] tracking-[-0.06em] sm:text-6xl">
              More play for
              <br />
              <span className="font-serif font-normal italic">
                happier, healthier pets.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-8 text-teal-50 sm:text-base">
              Every pet deserves moments of excitement and discovery. Explore
              playful essentials that encourage movement, spark curiosity,
              and turn ordinary days into unforgettable adventures.
            </p>
          </div>

          <Link
            href="#catalog"
            className="group flex w-fit items-center gap-5 border-b border-white/50 pb-3 text-xs font-bold uppercase tracking-[0.15em] transition hover:border-white"
          >
            Browse All Toys
            <ArrowIcon className="transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </section>

      {/* Closing Banner */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 px-5 py-16 sm:px-10 sm:py-20 md:flex-row md:items-end lg:px-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-teal-700">
              Let the Adventures Begin
            </p>

            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.06em] text-slate-900 sm:text-6xl">
              More wagging tails,
              <br />
              more playful days<span className="text-teal-700">.</span>
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