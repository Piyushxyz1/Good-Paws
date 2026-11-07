
"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";

function PawIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <ellipse cx="12" cy="15.5" rx="5.5" ry="4.5" />
      <ellipse cx="5.5" cy="9" rx="2.3" ry="3" transform="rotate(-25 5.5 9)" />
      <ellipse cx="18.5" cy="9" rx="2.3" ry="3" transform="rotate(25 18.5 9)" />
      <ellipse cx="9.5" cy="5.5" rx="2" ry="2.8" />
      <ellipse cx="14.5" cy="5.5" rx="2" ry="2.8" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
      className="h-4 w-4" aria-hidden="true">
      <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 8H6" />
      <circle cx="10" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
      className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </svg>
  );
}

function ChevronDownIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" className="h-5 w-5" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" className="h-5 w-5" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

const categories = [
  { name: "All Products", href: "/products" },
  { name: "Food & Nutrition", href: "/nutrition" },
  { name: "Toys & Play", href: "/toys"},
  { name: "Beds & Comfort", href: "/beds" },
  { name: "Grooming & Care", href: "/grooming" },
];

export default function Navbar() {
  const { data: session, status } = useSession();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = status === "authenticated";
  const userName = session?.user?.name || "Pet Parent";
  const initials = userName.charAt(0).toUpperCase();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setDropdownOpen(false);
      }

      if (accountRef.current && !accountRef.current.contains(target)) {
        setAccountOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function closeAll() {
    setMenuOpen(false);
    setDropdownOpen(false);
    setAccountOpen(false);
  }

  async function handleLogout() {
    closeAll();
    await signOut({ callbackUrl: "/" });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#faf9f6]/95 backdrop-blur-md">

      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10"
        aria-label="Main navigation"
      >

        {/* BRAND */}
        <Link
          href="/"
          onClick={closeAll}
          aria-label="Goodpaws home"
          className="group flex shrink-0 items-center gap-2.5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-800 text-teal-50 shadow-xs transition duration-300 group-hover:-rotate-6 group-hover:bg-teal-700">
            <PawIcon className="h-5 w-5" />
          </span>

          <span className="text-2xl font-black tracking-tight text-slate-900">
            goodpaws<span className="text-teal-700">.</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-8 lg:flex">

          <Link
            href="/"
            onClick={closeAll}
            className="text-xs font-bold uppercase tracking-[0.15em] text-slate-600 transition hover:text-teal-800"
          >
            Home
          </Link>

          {/* CATEGORY DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-expanded={dropdownOpen}
              className="group flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-slate-600 transition hover:text-teal-800"
            >
              Categories

              <ChevronDownIcon
                className={`transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180 text-teal-800" : "text-slate-400"
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 mt-4 w-60 rounded-2xl border border-stone-200 bg-white p-2 shadow-xl">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    onClick={closeAll}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-xs font-semibold text-slate-700 transition hover:bg-teal-50 hover:text-teal-900"
                  >
                    <span className="text-base">{cat.icon}</span>
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/products"
            onClick={closeAll}
            className="text-xs font-bold uppercase tracking-[0.15em] text-slate-600 transition hover:text-teal-800"
          >
            Collection
          </Link>

          <Link
            href="/products?sort=featured"
            onClick={closeAll}
            className="inline-flex items-center gap-1.5 rounded-full border border-teal-100 bg-teal-50 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-teal-800 transition hover:bg-teal-100"
          >
             Offers
          </Link>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* CART */}
          <Link
            href="/cart"
            onClick={closeAll}
            aria-label="Shopping cart"
            className="flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-800 transition hover:border-teal-700 hover:bg-teal-50 sm:px-4"
          >
            <CartIcon />
            <span className="hidden sm:inline">Cart</span>
          </Link>

          {/* AUTHENTICATION */}
          {status === "loading" ? (
            <div className="h-10 w-28 animate-pulse rounded-full bg-stone-200" />
          ) : isLoggedIn ? (

            /* LOGGED IN */
            <div className="relative" ref={accountRef}>

              <button
                type="button"
                onClick={() => setAccountOpen((prev) => !prev)}
                aria-expanded={accountOpen}
                className="flex items-center gap-2 rounded-full border border-teal-100 bg-white py-1.5 pl-1.5 pr-3 transition hover:border-teal-700 hover:bg-teal-50"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-800 text-sm font-bold text-white">
                  {initials}
                </span>

                <ChevronDownIcon
                  className={`transition-transform size-4 ${
                    accountOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {accountOpen && (
                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl">

                  <div className="bg-teal-50/70 px-4 py-4">
                    <p className="text-sm font-bold text-slate-900">
                      Hello, {userName}!
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {session?.user?.email}
                    </p>
                  </div>

                  <div className="p-2">
                    <Link
                      href="/cart"
                      onClick={closeAll}
                      className="block rounded-xl px-3 py-3 text-xs font-semibold text-slate-700 transition hover:bg-teal-50"
                    >
                      My Cart
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-xl px-3 py-3 text-left text-xs font-bold text-red-600 transition hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>

                </div>
              )}
            </div>

          ) : (

            /* LOGGED OUT */
            <div className="flex items-center gap-2">

              <Link
                href="/login"
                onClick={closeAll}
                className="hidden rounded-full px-3 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-teal-50 hover:text-teal-800 sm:inline-flex"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                onClick={closeAll}
                className="rounded-full bg-teal-800 px-3.5 py-2.5 text-[11px] font-bold text-white shadow-sm transition hover:bg-teal-700 sm:px-5 sm:text-xs"
              >
                <span className="hidden sm:inline">Create Account</span>
                <span className="sm:hidden">Sign Up</span>
              </Link>

            </div>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-800 text-white transition hover:bg-teal-700 lg:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>

        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-stone-200 bg-[#faf9f6] px-5 pb-6 pt-5 shadow-xl lg:hidden"
        >
          <div className="flex flex-col gap-1.5">

            <Link
              href="/"
              onClick={closeAll}
              className="rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-[0.15em] text-slate-700 transition hover:bg-teal-50 hover:text-teal-800"
            >
              Home
            </Link>

            <p className="px-4 pb-1 pt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
              Categories
            </p>

            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                onClick={closeAll}
                className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-teal-50 hover:text-teal-800"
              >
                <span>{cat.icon}</span>
                {cat.name}
              </Link>
            ))}

            <Link
              href="/products"
              onClick={closeAll}
              className="mt-3 rounded-2xl bg-teal-800 px-4 py-3.5 text-center text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-teal-700"
            >
              Shop All Products
            </Link>

            {/* MOBILE AUTHENTICATION */}
            <div className="mt-4 border-t border-stone-200 pt-4">

              {status === "loading" ? (
                <div className="h-12 animate-pulse rounded-xl bg-stone-200" />
              ) : isLoggedIn ? (

                <div className="space-y-3">

                  <div className="flex items-center gap-3 rounded-2xl bg-white p-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-800 text-base font-bold text-white">
                      {initials}
                    </span>

                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900">
                        Hello, {userName}!
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/cart"
                    onClick={closeAll}
                    className="block rounded-xl border border-stone-200 bg-white px-4 py-3 text-center text-xs font-bold text-slate-700 hover:bg-teal-50"
                  >
                    My Cart
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-bold text-red-600 transition hover:bg-red-100"
                  >
                    Sign Out
                  </button>

                </div>

              ) : (

                <div className="space-y-3">

                  <p className="px-1 text-sm font-bold text-slate-900">
                    Welcome to Goodpaws!
                  </p>

                  <p className="px-1 text-xs text-slate-500">
                    Sign in to enjoy a better shopping experience.
                  </p>

                  <div className="grid grid-cols-2 gap-3">

                    <Link
                      href="/login"
                      onClick={closeAll}
                      className="rounded-xl border border-teal-800 bg-white py-3 text-center text-xs font-bold text-teal-800 transition hover:bg-teal-50"
                    >
                      Sign In
                    </Link>

                    <Link
                      href="/register"
                      onClick={closeAll}
                      className="rounded-xl bg-teal-800 py-3 text-center text-xs font-bold text-white transition hover:bg-teal-700"
                    >
                      Create Account
                    </Link>

                  </div>

                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </header>
  );
}
