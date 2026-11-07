import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Food",
    description: "Everyday nutrition",
    image:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=240&q=80",
  },
  {
    name: "Toys",
    description: "Playtime favourites",
    image:
      "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=240&q=80",
  },
  {
    name: "Accessories",
    description: "Daily essentials",
    image:
      "https://images.unsplash.com/photo-1601758123927-196c2b9b0a3e?auto=format&fit=crop&w=240&q=80",
  },
];

export default function CategorySection() {
  return (
    <section id="categories" className="bg-[#faf9f6] py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-9 text-center sm:mb-11">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
            Find their favourites
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Shop by <span className="text-teal-700">Category</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Everything your pet needs, from everyday nutrition to playful
            essentials.
          </p>
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-3 sm:gap-5">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/products?category=${encodeURIComponent(category.name)}`}
              className="group flex w-full max-w-[360px] items-center gap-4 rounded-full border border-stone-200/80 bg-white p-3 pr-4 transition-all duration-300 hover:border-teal-200 hover:shadow-md sm:gap-3 sm:p-2.5 sm:pr-3"
            >
              <div className="relative size-[76px] shrink-0 overflow-hidden rounded-full bg-stone-100 sm:size-[68px]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="76px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-teal-700">
                  {category.name}
                </h3>
                <p className="mt-1 text-sm leading-5 text-slate-500">
                  {category.description}
                </p>
              </div>

              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-800 transition-colors group-hover:bg-teal-700 group-hover:text-white">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="size-4"
                >
                  <path
                    d="M5 12h14m-6-6 6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}