
import { prisma } from "@/lib/prisma";
import Nutrition from "./Nutrition";
import { Suspense } from "react";

export const metadata = {
  title: "Shop All Products | Goodpaws",
  description:
    "Explore pet food, toys, accessories and everyday essentials for your furry family.",
};

async function NutritionContent() {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      category: {
        in: ["Dog Food", "Cat Food"],
      },
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

  return <Nutrition products={catalogProducts} />;
}

export default function NutritionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf9f6]" />}>
      <NutritionContent />
    </Suspense>
  );
}
