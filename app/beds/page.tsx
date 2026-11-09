import { prisma } from "@/lib/prisma";
import BedsAndComfort from "./BedsAndComfort";

export const metadata = {
  title: "Pet Beds & Comfort | Goodpaws",
  description:
    "Explore comfortable pet beds and everyday comfort essentials at Goodpaws.",
};

export default async function BedsAndComfortPage() {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      category: "Pet Bedding",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <BedsAndComfort products={products.map((product) => ({
    ...product,
    price: Number(product.price),
  }))} />;
}