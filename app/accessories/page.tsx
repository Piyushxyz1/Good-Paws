
import { prisma } from "@/lib/prisma";
import Accesories from "./Accesories";
import { Suspense } from "react";

export const metadata = {
  title: "Pet Accessories | Goodpaws",
  description:
    "Explore thoughtfully selected pet accessories, collars, leashes, harnesses, travel essentials and everyday must-haves for your furry family.",
};

export default async function AccesoriesPage() {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      category: "Accessories"
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
    <Suspense fallback={<div className="min-h-screen bg-[#faf9f6]" />}>
      <Accesories products={catalogProducts} />
    </Suspense>
  );
}
