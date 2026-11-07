import { prisma } from "@/lib/prisma";
import Nutrition from "./Nutrition";
import { Suspense } from "react";

export const metadata = {
  title: "Shop All Products | Goodpaws",
  description:
    "Explore pet food, toys, accessories and everyday essentials for your furry family.",
};

export default async function NutritionPage() {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      category: {
        in: ["Dog Food", "Cat Food"]
      }
      
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

  return (
    <Suspense>
      <Nutrition products={catalogProducts} />
    </Suspense>
  );
}
