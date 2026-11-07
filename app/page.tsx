
import { Suspense } from "react";

import HeroSection from "./components/home/HeroSection";
import CategorySection from "./components/home/CategorySection";
import FeaturedProductsSection from "./components/home/FeaturedProductsSection";


export const metadata = {
  title: "PetStore | Everything Your Pet Needs",
  description:
    "Shop pet food, toys and everyday essentials for your furry friends.",
};

function ProductsFallback() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="mb-8 h-8 w-56 animate-pulse rounded bg-slate-200" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-72 animate-pulse rounded-2xl bg-slate-200"
          />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
 
      <HeroSection />
      <CategorySection />

      <Suspense fallback={<ProductsFallback />}>
        <FeaturedProductsSection />
      </Suspense>
   
    </>
  );
}
