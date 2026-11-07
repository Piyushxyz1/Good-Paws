
import Image from "next/image";
import Link from "next/link";

const highlights = [
  { value: "Everyday", label: "Pet essentials" },
  { value: "More choice", label: "For furry friends" },
  { value: "Made simple", label: "Easy shopping" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#faf9f6] text-slate-900">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-teal-100/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-12 lg:py-24">
        {/* Left content */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-teal-800 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-teal-600" />
            A happier world for pets
          </div>

          <h1 className="mt-7 max-w-2xl text-5xl font-extrabold leading-[1.06] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Little things.
            <br />
            <span className="text-teal-700">A whole lot</span>
            <br />
            of love.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            From everyday nutrition to playful favourites, discover
            thoughtful essentials for every member of your furry family.
            Because they deserve care in every little detail.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/products"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-teal-700 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-teal-900/15 transition duration-300 hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
            >
              Explore all products
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>

            <a
              href="#categories"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-stone-300 bg-white/80 px-7 py-4 text-sm font-bold text-slate-800 transition hover:border-teal-600 hover:bg-white hover:text-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
            >
              Discover categories
            </a>
          </div>

          {/* Brand highlights */}
          <div className="mt-10 grid max-w-xl grid-cols-3 border-t border-stone-200 pt-6">
            {highlights.map((item, index) => (
              <div
                key={item.label}
                className={`pr-3 ${
                  index !== 0 ? "border-l border-stone-200 pl-3 sm:pl-5" : ""
                }`}
              >
                <p className="text-sm font-extrabold tracking-tight text-slate-900 sm:text-base">
                  {item.value}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right visual */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="absolute -inset-3 rotate-3 rounded-[2.5rem] bg-teal-100/80 sm:-inset-4" />

          <div className="relative aspect-[4/4.2] overflow-hidden rounded-[2rem] bg-[#e9eee6] shadow-2xl shadow-slate-900/10 sm:aspect-[5/4.5] lg:aspect-[4/4.5]">
            <Image
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85"
              alt="Happy dog enjoying a moment outdoors"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-100">
                For every wag and wonder
              </p>
              <p className="mt-2 max-w-sm text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                Because life is better with paws around.
              </p>
            </div>

            {/* Floating category card */}
            <div className="absolute left-4 top-4 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/95 p-3 shadow-lg backdrop-blur-md sm:left-6 sm:top-6 sm:p-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-800">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M12 21s-8-4.4-8-11a4.5 4.5 0 0 1 8-2.9A4.5 4.5 0 0 1 20 10c0 6.6-8 11-8 11Z" />
                </svg>
              </span>

              <div>
                <p className="text-sm font-extrabold text-slate-900">
                  Made with care
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  For your furry family
                </p>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute -bottom-5 -right-2 -z-0 h-20 w-20 rounded-full border-[12px] border-teal-200/70 sm:-right-5 sm:h-24 sm:w-24"
          />
        </div>
      </div>
    </section>
  );
}
