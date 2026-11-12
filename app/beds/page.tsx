
import { prisma } from "@/lib/prisma";
import BedsAndComfort from "./BedsAndComfort";
import { Suspense } from "react";

export const metadata = {
  title: "Pet Beds & Comfort | Goodpaws",
  description:
    "Explore comfortable pet beds and everyday comfort essentials at Goodpaws.",
};

async function BedsAndComfortContent() {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      category: "Pet Bedding",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const catalogProducts = products.map((product) => ({
    ...product,
    price: Number(product.price),
  }));

  return <BedsAndComfort products={catalogProducts} />;
}

export default function BedsAndComfortPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf9f6]" />}>
      <BedsAndComfortContent />
    </Suspense>
  );
}
