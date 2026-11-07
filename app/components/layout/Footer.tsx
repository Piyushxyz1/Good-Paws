
import Link from "next/link";

const shopLinks = [
  { label: "All products", href: "/products" },
  { label: "Pet food", href: "/products?category=Food" },
  { label: "Toys & playtime", href: "/products?category=Toys" },
  { label: "Accessories", href: "/products?category=Accessories" },
];

const helpLinks = [
  { label: "Contact us", href: "/contact" },
  { label: "Shipping information", href: "/shipping" },
  { label: "Returns policy", href: "/returns" },
];

const accountLinks = [
  { label: "Sign in", href: "/login" },
  { label: "Shopping cart", href: "/cart" },
];

function PawIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <ellipse cx="12" cy="15.5" rx="5.5" ry="4.5" />
      <ellipse
        cx="5.5"
        cy="9"
        rx="2.3"
        ry="3"
        transform="rotate(-25 5.5 9)"
      />
      <ellipse
        cx="18.5"
        cy="9"
        rx="2.3"
        ry="3"
        transform="rotate(25 18.5 9)"
      />
      <ellipse cx="9.5" cy="5.5" rx="2" ry="2.8" />
      <ellipse cx="14.5" cy="5.5" rx="2" ry="2.8" />
    </svg>
  );
}

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-sm font-bold tracking-wide text-white">
        {title}
      </h2>

      <ul className="mt-5 space-y-3.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors duration-200 hover:text-teal-300"
            >
              <span>{link.label}</span>
              <span
                aria-hidden="true"
                className="translate-x-[-4px] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#102b29] text-slate-300">
      {/* Subtle decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Brand introduction */}
        <div className="grid gap-12 border-b border-white/10 py-12 sm:py-16 lg:grid-cols-[1.2fr_2fr] lg:gap-20">
          <div>
            <Link
              href="/"
              aria-label="Goodpaws home"
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-400 text-[#102b29]">
                <PawIcon />
              </span>

              <span className="text-2xl font-extrabold tracking-tight text-white">
                goodpaws<span className="text-teal-400">.</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Thoughtful essentials for your furry family. Discover
              everyday favourites for playtime, mealtime and all the
              little moments in between.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-teal-300 transition hover:text-white"
            >
              Explore our collection
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Navigation columns */}
          <div className="grid grid-cols-2 gap-9 sm:grid-cols-3 sm:gap-8">
            <FooterLinks title="Shop" links={shopLinks} />
            <FooterLinks title="Customer care" links={helpLinks} />
            <div className="col-span-2 sm:col-span-1">
              <FooterLinks title="Your account" links={accountLinks} />
            </div>
          </div>
        </div>

        {/* Brand message */}
        <div className="flex flex-col gap-5 border-b border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-teal-300">
              <PawIcon />
            </span>

            <div>
              <p className="text-sm font-bold text-white">
                Little things. A whole lot of love.
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                Here to make discovering pet essentials feel simpler.
              </p>
            </div>
          </div>

          <Link
            href="/products"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-teal-300 hover:bg-teal-300 hover:text-[#102b29]"
          >
            Shop all products
          </Link>
        </div>

        {/* Copyright */}
        <div className="flex flex-col gap-3 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 Goodpaws. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5">
            Made with <span className="text-rose-400">♥</span> for pets
            and their people.
          </p>
        </div>
      </div>
    </footer>
  );
}
