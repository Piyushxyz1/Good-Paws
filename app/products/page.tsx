import { prisma } from "@/lib/prisma";
import ProductCatalog from "./ProductCatalog";
import { Suspense } from "react";

export const metadata = {
  title: "Pet Nutrition & Diets | Goodpaws",
  description:
    "Discover wholesome pet food, grain-free kibble, wet food, healthy treats, and targeted supplements for your furry family.",
};

async function ProductsContent() {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      // Optional: Filter specifically for nutrition categories if applicable in your DB
      // category: {
      //   in: ["Dry Food", "Wet Food", "Treats", "Supplements", "Dog Food", "Cat Food"],
      // },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      price: true,
      stock: true,
      imageUrl: true,
      category: true,
    },
  });

  const catalogProducts = products.map((product) => ({
    ...product,
    price: Number(product.price),
  }));

  return <ProductCatalog products={catalogProducts} />;
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf9f6]" />}>
      <ProductsContent />
    </Suspense>
  );
}