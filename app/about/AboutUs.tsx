
import Image from "next/image";
import Link from "next/link";

const values = [
  {
    number: "01",
    title: "Everyday care matters",
    description:
      "The little things make a big difference. From daily meals to playtime and comfort, we believe every part of your pet's routine deserves attention.",
  },
  {
    number: "02",
    title: "Thoughtful choices",
    description:
      "Finding the right products should feel simple. We bring different pet essentials together so you can explore options that suit your companion's needs.",
  },
  {
    number: "03",
    title: "Pets are family",
    description:
      "Every wag, purr, cuddle and playful moment is part of a special bond. We celebrate the love that makes life with pets so meaningful.",
  },
];

const categories = [
  {
    number: "01",
    title: "Nutrition & Diets",
    description:
      "Everyday food, treats and nutrition essentials to help you explore options for your pet's mealtime routine.",
    image:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=900&q=80",
    alt: "Dog enjoying its meal",
  },
  {
    number: "02",
    title: "Toys & Play",
    description:
      "Playtime favourites that bring a little more fun, activity and excitement into your pet's day.",
    image:
      "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=900&q=80",
    alt: "Happy dog playing outdoors",
  },
  {
    number: "03",
    title: "Accessories & Care",
    description:
      "Useful everyday accessories and essentials to make outings, routines and time at home more comfortable.",
    image:
      "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=900&q=80",
    alt: "Dog enjoying time outdoors",
  },
];

export default function AboutUs() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#faf9f6] text-slate-800">

      {/* Announcement */}
      <div className="bg-teal-800 px-4 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-white sm:text-xs">
        Thoughtful essentials for your furry family
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-[1440px] px-5 pb-16 pt-12 sm:px-10 sm:pb-24 sm:pt-20 lg:px-16 lg:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">

          <div className="relative z-10">
            <p className="mb-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-teal-800 sm:text-xs">
              <span className="h-px w-9 bg-teal-700" />
              The story of Goodpaws
            </p>

            <h1 className="max-w-3xl text-[clamp(3.5rem,7.5vw,7.5rem)] font-black leading-[0.91] tracking-[-0.075em] text-slate-900">
              Made for
              <br />
              the love
              <br />
              <span className="font-serif font-normal italic text-teal-700">
                they give.
              </span>
            </h1>

            <div className="mt-9">
              <p className="max-w-lg text-sm leading-8 text-slate-600 sm:text-base">
                Some of life's best moments come with four paws, a wagging
                tail or a gentle purr. At Goodpaws, we celebrate the bond
                between pets and their people by bringing everyday pet
                essentials together in one welcoming place.
              </p>

              <Link
                href="#our-story"
                className="group mt-8 inline-flex items-center gap-4 border-b border-teal-700 pb-2 text-xs font-bold uppercase tracking-[0.13em] text-teal-800 transition-all hover:gap-6"
              >
                Get to know us
                <span className="text-base">→</span>
              </Link>
            </div>

            <div className="mt-14 flex items-center gap-5 border-t border-stone-300 pt-6">
              <span className="text-4xl font-black tracking-tight text-slate-900">
                gp.
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-800">
                  The Goodpaws philosophy
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  More care in the everyday
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[380px] overflow-hidden rounded-2xl sm:min-h-[520px]">
            <Image
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80"
              alt="Dogs enjoying a happy moment together"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 rounded-lg bg-[#faf9f6]/90 px-5 py-4 backdrop-blur-md sm:bottom-10 sm:left-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-800">
                For every wag and purr
              </p>
              <p className="mt-1 text-xs text-slate-600">
                A little more love, every day.
              </p>
            </div>

            <span className="absolute right-5 top-5 rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700 backdrop-blur-sm">
              Goodpaws / About
            </span>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section
        id="our-story"
        className="scroll-mt-10 border-y border-stone-200 bg-white"
      >
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-teal-800 sm:text-xs">
                Where it all comes together
              </p>

              <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.055em] text-slate-900 sm:text-6xl">
                Life is better
                <br />
                with
                <br />
                <span className="font-serif font-normal italic text-teal-700">
                  paws around.
                </span>
              </h2>
            </div>

            <div className="flex flex-col justify-between">
              <div className="space-y-6 text-sm leading-8 text-slate-600 sm:text-base">
                <p>
                  Anyone who shares their life with a pet knows that the
                  connection goes far beyond words. It's in the excitement
                  of coming home, the comfort of having them beside you and
                  the countless little moments that become your favourite
                  memories.
                </p>

                <p>
                  But being a pet parent also means making everyday choices.
                  What goes into their food bowl, which toys keep them
                  entertained, and which accessories make daily routines
                  easier are all part of caring for them.
                </p>

                <p>
                  That's where Goodpaws comes in. We created a place where
                  pet parents can discover nutrition, toys, accessories and
                  everyday essentials without having to look in different
                  places for everything.
                </p>

                <p>
                  We want your experience to feel welcoming, convenient
                  and enjoyable — because finding something special for
                  the ones you love should be a happy experience too.
                </p>
              </div>

              <div className="mt-12 border-t border-stone-200 pt-7">
                <p className="font-serif text-2xl italic text-teal-700 sm:text-3xl">
                  "Because they're family, in every way that matters."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Purpose */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          <div className="relative min-h-[350px] overflow-hidden rounded-xl sm:min-h-[490px]">
            <Image
              src="https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&w=1100&q=80"
              alt="Dog enjoying a peaceful outdoor moment"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-teal-800 sm:text-xs">
              Why Goodpaws
            </p>

            <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.055em] text-slate-900 sm:text-6xl">
              More than a
              <br />
              shopping
              <br />
              <span className="font-serif font-normal italic text-teal-700">
                destination.
              </span>
            </h2>

            <div className="mt-8 space-y-5 text-sm leading-8 text-slate-600 sm:text-base">
              <p>
                We believe shopping for your pet should be about more than
                simply adding products to a cart. It should help you discover
                things that fit your companion's personality, preferences
                and everyday routine.
              </p>

              <p>
                From exploring different food options to finding a new
                playtime favourite or an everyday accessory, Goodpaws brings
                these different parts of pet care together.
              </p>

              <p>
                Our goal is to make discovering pet essentials feel
                straightforward, so you can spend less time searching
                and more time enjoying the moments that matter.
              </p>
            </div>

            <Link
              href="/products"
              className="group mt-9 inline-flex items-center gap-4 border-b border-teal-700 pb-2 text-xs font-bold uppercase tracking-[0.13em] text-teal-800 transition-all hover:gap-6"
            >
              Explore our collection
              <span className="text-base">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-10 sm:py-28 lg:px-16">

          <div className="mb-14 flex flex-col justify-between gap-6 border-b border-stone-200 pb-9 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-teal-800 sm:text-xs">
                A little something for every paw
              </p>

              <h2 className="mt-5 text-4xl font-black tracking-[-0.06em] text-slate-900 sm:text-6xl">
                What you'll find<span className="text-teal-700">.</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-slate-500">
              Different needs, different personalities, one place to
              explore. Discover the essentials that make up your pet's
              everyday world.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {categories.map((item) => (
              <article key={item.number} className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-stone-100">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[#faf9f6]/90 px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-teal-800 backdrop-blur-sm">
                    {item.number}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-black tracking-[-0.04em] text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-[#faf9f6]">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-10 sm:py-28 lg:px-16">

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-teal-800 sm:text-xs">
                The Goodpaws promise
              </p>

              <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.055em] text-slate-900 sm:text-6xl">
                What matters
                <br />
                to us.
                <br />
                <span className="font-serif font-normal italic text-teal-700">
                  Always.
                </span>
              </h2>

              <p className="mt-7 max-w-sm text-sm leading-8 text-slate-600">
                Good pet care is made up of many little things. These are
                the ideas that shape the way we think about Goodpaws and
                the experience we want to create.
              </p>
            </div>

            <div>
              {values.map((value) => (
                <div
                  key={value.number}
                  className="grid gap-4 border-t border-stone-300 py-8 sm:grid-cols-[70px_1fr]"
                >
                  <span className="font-serif text-lg italic text-teal-700">
                    {value.number}
                  </span>

                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                      {value.title}
                    </h3>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="overflow-hidden bg-teal-800 text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 text-center sm:px-10 sm:py-28 lg:px-16">

          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-teal-200 sm:text-xs">
            A little more love, every day
          </p>

          <h2 className="mx-auto mt-7 max-w-4xl text-4xl font-black leading-[1.05] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            Their world means
            <br />
            <span className="font-serif font-normal italic">
              everything to you.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-8 text-teal-50 sm:text-base">
            Make every meal, playtime and little everyday moment count.
            Explore Goodpaws and find thoughtful essentials for your
            furry family.
          </p>

          <Link
            href="/products"
            className="group mt-10 inline-flex items-center gap-5 rounded-full bg-[#faf9f6] px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-teal-900 transition-all duration-300 hover:-translate-y-1 hover:bg-white"
          >
            Discover Goodpaws
            <span className="text-base transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>

    </main>
  );
}
