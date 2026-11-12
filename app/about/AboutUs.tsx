
import Image from "next/image";
import Link from "next/link";

const values = [
  {
    number: "01",
    title: "Care comes first",
    description:
      "Every choice starts with the wellbeing of pets. We believe they deserve products selected with care and purpose.",
  },
  {
    number: "02",
    title: "Quality over quantity",
    description:
      "Everyday essentials should be dependable, thoughtfully chosen, and made to be part of a pet's life.",
  },
  {
    number: "03",
    title: "Better, together",
    description:
      "Pet parenthood is a journey. We're here to make everyday moments easier, happier, and more meaningful.",
  },
];

export default function AboutUs() {
  return (
    <main className="overflow-hidden bg-[#faf9f6] text-[#243b38]">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-20 sm:px-10 lg:px-16 lg:pb-28 lg:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#78938b]">
            A little about us
          </span>

          <h1 className="mt-7 text-5xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl lg:text-8xl">
            More than products.
            <span className="mt-2 block font-normal italic text-[#78938b]">
              A little more love.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#71807a] sm:text-lg">
            We believe pets deserve the very best of everyday life.
            Goodpaws brings together thoughtful essentials to make
            caring for your furry family feel a little more special.
          </p>
        </div>

        <div className="relative mt-16 h-[340px] overflow-hidden rounded-[2rem] sm:h-[480px] lg:mt-20 lg:h-[590px]">
          <Image
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b"
            alt="Two happy dogs enjoying time together outdoors"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#142c27]/35 via-transparent to-transparent" />

          <p className="absolute bottom-7 left-7 max-w-xs text-sm font-medium tracking-wide text-white sm:bottom-10 sm:left-10 sm:text-base">
            For the ones who make a house feel like home.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="border-y border-[#e9e8e0] bg-[#f2f1eb]">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:gap-24 lg:px-16 lg:py-32">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#78938b]">
              Our story
            </span>

            <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[1.12] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              It starts with a simple thought.
              <span className="block font-normal italic text-[#78938b]">
                They deserve the best.
              </span>
            </h2>
          </div>

          <div className="space-y-6 text-[15px] leading-8 text-[#71807a] sm:text-base">
            <p>
              Pets are never just pets. They're the excited greetings
              at the door, the quiet company on a difficult day, and
              the little personalities that make our lives brighter.
            </p>

            <p>
              At Goodpaws, we believe looking after them should feel
              just as special. That's why we're building a place for
              thoughtfully selected pet essentials — from everyday
              nutrition to playtime favourites and care essentials.
            </p>

            <p>
              Our aim is simple: to help pet parents make choices
              they feel good about, while making everyday life a
              little happier for the animals they love.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center sm:px-10 lg:px-16 lg:py-32">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#78938b]">
          What we believe
        </span>

        <h2 className="mx-auto mt-7 max-w-4xl text-4xl font-semibold leading-[1.13] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
          Happier pets.
          <span className="text-[#78938b]"> Happier people.</span>
          <br />
          A better everyday.
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#71807a]">
          Our mission is to make thoughtful pet care more accessible
          through products that bring comfort, joy, and quality into
          the everyday lives of pets and their families.
        </p>
      </section>

      {/* Values */}
      <section className="bg-[#203d37] text-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a6c1b5]">
              The Goodpaws promise
            </span>

            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              A few things we'll always stand for.
            </h2>
          </div>

          <div className="mt-16 grid gap-0 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.number}
                className="border-t border-white/20 py-9 md:mr-8 md:pr-8"
              >
                <span className="text-sm text-[#a6c1b5]">
                  {value.number}
                </span>

                <h3 className="mt-8 text-2xl font-medium tracking-tight">
                  {value.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#c0cec8]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center sm:px-10 lg:py-32">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#78938b]">
          Come be part of it
        </span>

        <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">
          Made for the love
          <span className="block font-normal italic text-[#78938b]">
            they give us.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-lg text-base leading-8 text-[#71807a]">
          Discover thoughtful essentials for every wag, purr,
          cuddle, and adventure.
        </p>

        <Link
          href="/products"
          className="mt-9 inline-flex items-center justify-center rounded-full bg-[#24483f] px-9 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#18372f]"
        >
          Explore Goodpaws
          <span className="ml-3 text-lg">→</span>
        </Link>
      </section>
    </main>
  );
}
