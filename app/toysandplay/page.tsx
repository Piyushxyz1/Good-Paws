import { prisma } from "@/lib/prisma";
import ToysandPlay from "./ToysandPlay"
import { Suspense } from "react";

export const metadata = {
  title: "Toys and Play | Goodpaws",
  description:
    "Explore pet food, toys, accessories and everyday essentials for your furry family.",
};

export default async function NutritionPage() {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      category: {
      in: ["Cat Toys", "Dog Toys", "Toys"]
      } ,
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
      <ToysandPlay products={catalogProducts} />
    </Suspense>
  );
}
