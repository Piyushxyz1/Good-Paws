
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard, {
  StoreProduct,
} from "../components/products/ProductCard";

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

function Accesoriesicon({ className = "h-8 w-8" }: { className?: string }) {
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
      <path d="M7 3h10" />
      <path d="M8 3v5l-3 3v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9l-3-3V3" />
      <path d="M8 8h8" />
      <path d="M9 14c1.5 2 4.5 2 6 0" />
      <path d="M12 11v.01" />
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

export default function Accesories({
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
        Gentle grooming & everyday care for happier, healthier pets
      </div>

      {/* Editorial Hero */}
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-10 sm:pb-24 sm:pt-20 lg:px-16 lg:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">

          <div className="relative z-10">
            <p className="mb-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-teal-800 sm:text-xs">
              <span className="h-px w-9 bg-teal-700" />
              Grooming, Hygiene & Care
            </p>

            <h1 className="max-w-3xl text-[clamp(3.5rem,7.5vw,7.5rem)] font-black leading-[0.91] tracking-[-0.075em] text-slate-900">
              Everyday care
              <br />
              for <span className="font-serif font-normal italic text-teal-700">happier pets.</span>
            </h1>

            <div className="mt-9 grid gap-7 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-md text-sm leading-8 text-slate-600 sm:text-base">
                Because every furry companion deserves a little extra care.
                Discover thoughtfully selected grooming essentials, gentle
                shampoos, nourishing conditioners, grooming brushes and
                everyday hygiene products to keep your pet feeling fresh,
                comfortable and looking their best.
              </p>

              <Link
                href="#catalog"
                className="group inline-flex w-fit items-center gap-4 border-b border-teal-700 pb-2 text-xs font-bold uppercase tracking-[0.13em] text-teal-800 transition hover:gap-6"
              >
                Explore Care
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-14 flex items-center gap-5 border-t border-stone-300 pt-6">
              <span className="text-4xl font-black tracking-tight text-slate-900">
                {products.length.toString().padStart(2, "0")}
              </span>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-800">
                  Everyday Care Collection
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Little rituals, healthier happy tails
                </p>
              </div>
            </div>
          </div>

          {/* Hero Visual Image */}
          <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-xl sm:h-[520px]">
            <Image
              src="https://www.mascobeauty.com/cdn/shop/articles/dog-grooming-tubs-dog-bath.jpg?v=1775038966&width=1780"
              alt="Professional groomer gently bathing a golden retriever"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-lg bg-white/90 px-5 py-4 backdrop-blur-md sm:bottom-10 sm:left-10">
              <span className="h-2 w-2 animate-pulse rounded-full bg-teal-700" />
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-800">
                Gentle Care, Happy & Healthy Pets
              </p>
            </div>

            <span className="absolute right-5 top-5 rounded-full bg-slate-900/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
              Care / 003
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
                Our Philosophy of Care
              </p>

              <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.055em] text-slate-900 sm:text-6xl">
                Love in every
                <br />
                <span className="font-serif font-normal italic text-teal-700">
                  little detail.
                </span>
              </h2>

              <div className="relative mt-8 h-64 overflow-hidden rounded-xl shadow-md lg:h-80">
                <Image
                  src="https://pethotel.hkpro.tw/upload/news/animal-5%282%29.JPG"
                  alt="A dog receiving a gentle bath and grooming care"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <p className="max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                Grooming is more than keeping your pet looking good. It is an
                important part of their everyday well-being. Regular brushing,
                gentle bathing, nail maintenance and proper hygiene help keep
                your companion comfortable, fresh and cared for. Discover
                essentials that make every grooming routine a little easier
                and every cuddle a little sweeter.
              </p>

              <div className="mt-12 grid gap-8 border-t border-stone-200 pt-8 sm:grid-cols-3">

                <div>
                  <span className="font-serif text-sm italic text-teal-700">
                    01
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    Gentle Grooming
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    Keep coats soft, clean and tangle-free with nourishing
                    shampoos, conditioners and grooming brushes.
                  </p>
                </div>

                <div>
                  <span className="font-serif text-sm italic text-teal-700">
                    02
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    Everyday Hygiene
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    Maintain healthy grooming routines with paw care, ear
                    cleaning, dental essentials and hygiene accessories.
                  </p>
                </div>

                <div>
                  <span className="font-serif text-sm italic text-teal-700">
                    03
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-900">
                    Skin & Coat Care
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    Support a healthy-looking coat with suitable conditioners,
                    detangling solutions and everyday skin-care essentials.
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
              The Care Collection
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] text-slate-900 sm:text-6xl">
              Grooming & Care<span className="text-teal-700">.</span>
            </h2>

            <p className="mt-4 text-sm text-slate-500">
              Everything your furry companion needs to look and feel their best.
            </p>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
            {filteredProducts.length} / {products.length} care essentials
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
              placeholder="Search shampoos, brushes, hygiene products..."
              aria-label="Search grooming and care products"
              className="w-full bg-transparent py-4 pl-9 pr-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-teal-700"
            />
          </div>

          <div className="flex items-center gap-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Sort by
            </span>

            <select
              value={sort}
              onChange={(event) =>
                setSort(event.target.value as SortOption)
              }
              aria-label="Sort grooming and care products"
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

            <Accesoriesicon className="mx-auto h-12 w-12 text-teal-700/50" />

            <h3 className="mt-7 text-3xl font-black tracking-tight text-slate-900">
              No care essentials found
            </h3>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500">
              We couldn't find products matching your search. Try a different
              keyword or explore another grooming category.
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
              Clear care filters →
            </button>
          </div>
        )}
      </section>

      {/* Commitment Banner with Background Image */}
      <section className="relative overflow-hidden bg-teal-900 py-24 text-white">

        <Image
          src="https://juandapetshop.com/assets/img/services/grooming.webp"
          alt="Professional pet grooming and bathing care"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />

        <div className="relative z-10 mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-10 md:grid-cols-[1fr_auto] md:items-center lg:px-16">

          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-teal-200 sm:text-xs">
              Care Beyond The Ordinary
            </p>

            <h2 className="mt-7 text-4xl font-black leading-[1.05] tracking-[-0.06em] sm:text-6xl">
              A little care for
              <br />
              <span className="font-serif font-normal italic">
                a lifetime of love.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-8 text-teal-50 sm:text-base">
              From the first gentle brush to their everyday grooming rituals,
              every little detail matters. Explore carefully selected
              essentials that help you give your furry companion the comfort,
              cleanliness and attention they deserve.
            </p>
          </div>

          <Link
            href="#catalog"
            className="group flex w-fit items-center gap-5 border-b border-white/50 pb-3 text-xs font-bold uppercase tracking-[0.15em] transition hover:border-white"
          >
            Discover Care Essentials
            <ArrowIcon className="transition-transform group-hover:translate-x-2" />
          </Link>

        </div>
      </section>

      {/* Closing Banner */}
      <section className="bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 px-5 py-16 sm:px-10 sm:py-20 md:flex-row md:items-end lg:px-16">

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-teal-700">
              Because They Deserve The Best
            </p>

            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-0.06em] text-slate-900 sm:text-6xl">
              Healthier coats,
              <br />
              happier companions<span className="text-teal-700">.</span>
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
