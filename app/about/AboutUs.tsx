
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
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1200&q=85",
    alt: "Dog enjoying its meal",
    href: "/nutrition",
  },
  {
    number: "02",
    title: "Toys & Play",
    description:
      "Playtime favourites that bring a little more fun, activity and excitement into your pet's day.",
    image:
      "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=1200&q=85",
    alt: "Happy dog playing outdoors",
    href: "/toysandplay",
  },
  {
    number: "03",
    title: "Accessories & Care",
    description:
      "Useful everyday accessories and essentials to make outings, routines and time at home more comfortable.",
    image:
      "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1200&q=85",
    alt: "Dog enjoying time outdoors",
    href: "/accessories",
  },
];

export default function AboutUs() {
  return (
    <main className="overflow-hidden bg-[#faf9f6] text-slate-800">

      {/* Announcement */}
      <div className="bg-teal-800 px-4 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-white sm:text-xs">
        Thoughtful essentials for your furry family
      </div>

      {/* Hero */}
      <section className="relative mx-auto max-w-[1600px] px-5 pb-20 pt-12 sm:px-10 sm:pb-28 sm:pt-20 lg:px-16 lg:pb-36 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">

          <div className="relative z-10">
            <p className="mb-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-teal-800 sm:text-xs">
              <span className="h-px w-9 bg-teal-700" />
              The story of Goodpaws
            </p>

            <h1 className="max-w-3xl text-[clamp(3.7rem,7.5vw,7.8rem)] font-black leading-[0.88] tracking-[-0.075em] text-slate-900">
              Made for
              <br />
              the love
              <br />
              <span className="font-serif font-normal italic text-teal-700">
                they give.
              </span>
            </h1>

            <p className="mt-9 max-w-md text-sm leading-8 text-slate-600 sm:text-base">
              Some of life's best moments come with four paws, a wagging tail
              or a gentle purr. At Goodpaws, we celebrate the bond between pets
              and their people by bringing everyday pet essentials together in
              one welcoming place.
            </p>

            <Link
              href="#our-story"
              className="group mt-9 inline-flex items-center gap-5 border-b border-teal-700 pb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-teal-800 transition-all hover:gap-7"
            >
              Discover our story
              <span className="text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <div className="mt-14 flex items-center gap-4 border-t border-stone-300 pt-6 sm:mt-20">
              <span className="text-4xl font-black tracking-[-0.08em] text-slate-900">
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

          {/* Editorial image composition */}
          <div className="relative mx-auto w-full max-w-[700px] lg:ml-auto">
            <div className="relative aspect-[4/4.5] overflow-hidden rounded-t-[48%] rounded-b-xl bg-stone-200 sm:aspect-[5/5.2]">
              <Image
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=85"
                alt="Dogs enjoying a happy moment together"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-7 left-0 max-w-[230px] border border-stone-200 bg-[#faf9f6] p-5 shadow-sm sm:-left-10 sm:bottom-12 sm:max-w-[260px] sm:p-7">
              <p className="font-serif text-2xl italic leading-tight text-teal-800 sm:text-3xl">
                "A little more love, every day."
              </p>
              <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                The Goodpaws way
              </p>
            </div>

            <span className="absolute right-0 top-8 hidden -translate-y-1/2 translate-x-1/3 rotate-90 text-[9px] font-bold uppercase tracking-[0.3em] text-teal-800 sm:block">
              For every wag and purr
            </span>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="our-story" className="scroll-mt-10 bg-white">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
          <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-28">

            <div className="lg:sticky lg:top-24">
              <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.23em] text-teal-800 sm:text-xs">
                <span className="h-px w-8 bg-teal-700" />
                Where it all comes together
              </p>

              <h2 className="mt-7 text-4xl font-black leading-[1.02] tracking-[-0.06em] text-slate-900 sm:text-6xl lg:text-7xl">
                Life is better
                <br />
                with
                <br />
                <span className="font-serif font-normal italic text-teal-700">
                  paws around.
                </span>
              </h2>

              <div className="mt-10 hidden h-px w-24 bg-teal-700 lg:block" />
            </div>

            <div className="max-w-2xl lg:pt-2">
              <p className="text-lg font-medium leading-9 text-slate-800 sm:text-2xl sm:leading-[1.8]">
                Anyone who shares their life with a pet knows that the
                connection goes far beyond words.
              </p>

              <div className="mt-8 space-y-6 text-sm leading-8 text-slate-600 sm:text-base">
                <p>
                  It's in the excitement of coming home, the comfort of having
                  them beside you and the countless little moments that become
                  your favourite memories.
                </p>

                <p>
                  But being a pet parent also means making everyday choices.
                  What goes into their food bowl, which toys keep them
                  entertained, and which accessories make daily routines easier
                  are all part of caring for them.
                </p>

                <p>
                  That's where Goodpaws comes in. We created a place where pet
                  parents can discover nutrition, toys, accessories and
                  everyday essentials without having to look in different
                  places for everything.
                </p>

                <p>
                  We want your experience to feel welcoming, convenient and
                  enjoyable — because finding something special for the ones
                  you love should be a happy experience too.
                </p>
              </div>

              <div className="mt-12 border-t border-stone-200 pt-7 sm:mt-16">
                <p className="max-w-lg font-serif text-2xl italic leading-relaxed text-teal-700 sm:text-3xl">
                  "Because they're family, in every way that matters."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand statement */}
      <section className="relative overflow-hidden bg-teal-800 text-white">
        <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full border border-white/10 sm:h-[500px] sm:w-[500px]" />
        <div className="pointer-events-none absolute -right-8 -top-20 h-72 w-72 rounded-full border border-white/10 sm:h-[400px] sm:w-[400px]" />

        <div className="relative mx-auto max-w-[1600px] px-5 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-teal-200 sm:text-xs">
            A thought that guides us
          </p>

          <h2 className="mt-8 max-w-5xl text-4xl font-black leading-[1.05] tracking-[-0.065em] sm:text-6xl lg:text-8xl">
            It's not just about
            <br />
            what they need.
            <br />
            <span className="font-serif font-normal italic text-teal-200">
              It's about how they make us feel.
            </span>
          </h2>

          <div className="mt-12 flex items-center gap-5">
            <span className="h-px w-12 bg-teal-300" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-100">
              That's what makes them family
            </p>
          </div>
        </div>
      </section>

      {/* Why Goodpaws */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-stone-200 sm:aspect-[5/5.5]">
              <Image
                src="https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&w=1200&q=85"
                alt="Dog enjoying a peaceful outdoor moment"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>

            <div className="absolute -bottom-7 -right-2 bg-white px-6 py-5 shadow-lg sm:-right-8 sm:px-9 sm:py-7">
              <p className="font-serif text-3xl italic text-teal-800">
                Made with care.
              </p>
              <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Inspired by life with pets
              </p>
            </div>
          </div>

          <div className="lg:pl-4">
            <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.23em] text-teal-800 sm:text-xs">
              <span className="h-px w-8 bg-teal-700" />
              Why Goodpaws
            </p>

            <h2 className="mt-7 text-4xl font-black leading-[1.02] tracking-[-0.06em] text-slate-900 sm:text-6xl lg:text-7xl">
              More than a
              <br />
              shopping
              <br />
              <span className="font-serif font-normal italic text-teal-700">
                destination.
              </span>
            </h2>

            <div className="mt-9 max-w-xl space-y-6 text-sm leading-8 text-slate-600 sm:text-base">
              <p>
                We believe shopping for your pet should be about more than
                simply adding products to a cart. It should help you discover
                things that fit your companion's personality, preferences and
                everyday routine.
              </p>

              <p>
                From exploring different food options to finding a new
                playtime favourite or an everyday accessory, Goodpaws brings
                these different parts of pet care together.
              </p>

              <p>
                Our goal is to make discovering pet essentials feel
                straightforward, so you can spend less time searching and more
                time enjoying the moments that matter.
              </p>
            </div>

            <Link
              href="/products"
              className="group mt-10 inline-flex items-center gap-5 border-b border-teal-700 pb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-teal-800 transition-all hover:gap-7"
            >
              Explore our collection
              <span className="text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-36">

          <div className="mb-14 grid gap-6 border-b border-stone-200 pb-10 lg:grid-cols-[1fr_0.65fr] lg:items-end lg:gap-16">
            <div>
              <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.23em] text-teal-800 sm:text-xs">
                <span className="h-px w-8 bg-teal-700" />
                A little something for every paw
              </p>

              <h2 className="mt-7 text-4xl font-black tracking-[-0.065em] text-slate-900 sm:text-6xl lg:text-7xl">
                All their little
                <br />
                <span className="font-serif font-normal italic text-teal-700">
                  essentials.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-8 text-slate-500 lg:ml-auto">
              Different needs, different personalities, one place to explore.
              Discover the essentials that make up your pet's everyday world.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3 md:gap-7 lg:gap-10">
            {categories.map((item) => (
              <Link
                href={item.href}
                key={item.number}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                  <span className="absolute left-5 top-5 text-[10px] font-bold tracking-[0.18em] text-white">
                    {item.number} / 03
                  </span>

                  <span className="absolute bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/70 text-lg text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-teal-800">
                    ↗
                  </span>
                </div>

                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-black tracking-[-0.045em] text-slate-900 transition-colors group-hover:text-teal-800 sm:text-3xl">
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-sm text-sm leading-7 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-[#faf9f6]">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-36">

          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28">
            <div>
              <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.23em] text-teal-800 sm:text-xs">
                <span className="h-px w-8 bg-teal-700" />
                The Goodpaws promise
              </p>

              <h2 className="mt-7 text-4xl font-black leading-[1.02] tracking-[-0.06em] text-slate-900 sm:text-6xl lg:text-7xl">
                What matters
                <br />
                to us.
                <br />
                <span className="font-serif font-normal italic text-teal-700">
                  Always.
                </span>
              </h2>

              <p className="mt-8 max-w-sm text-sm leading-8 text-slate-600">
                Good pet care is made up of many little things. These are the
                ideas that shape the way we think about Goodpaws and the
                experience we want to create.
              </p>
            </div>

            <div className="lg:pt-2">
              {values.map((value) => (
                <div
                  key={value.number}
                  className="grid gap-4 border-t border-stone-300 py-9 sm:grid-cols-[75px_1fr] sm:py-11"
                >
                  <span className="font-serif text-xl italic text-teal-700">
                    {value.number}
                  </span>

                  <div>
                    <h3 className="text-2xl font-bold tracking-[-0.04em] text-slate-900 sm:text-3xl">
                      {value.title}
                    </h3>

                    <p className="mt-4 max-w-xl text-sm leading-8 text-slate-500 sm:text-base">
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
      <section className="relative overflow-hidden bg-teal-800 text-white">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-[1600px] px-5 py-24 text-center sm:px-10 sm:py-32 lg:px-16 lg:py-40">

          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-teal-200 sm:text-xs">
            A little more love, every day
          </p>

          <h2 className="mx-auto mt-8 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.065em] sm:text-6xl lg:text-8xl">
            Their world means
            <br />
            <span className="font-serif font-normal italic text-teal-200">
              everything to you.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-sm leading-8 text-teal-50 sm:text-base">
            Make every meal, playtime and little everyday moment count.
            Explore Goodpaws and find thoughtful essentials for your furry
            family.
          </p>

          <Link
            href="/products"
            className="group mt-11 inline-flex items-center gap-5 bg-[#faf9f6] px-9 py-5 text-[11px] font-bold uppercase tracking-[0.16em] text-teal-900 transition-all duration-300 hover:-translate-y-1 hover:bg-white"
          >
            Discover Goodpaws
            <span className="text-lg transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>

    </main>
  );
}
