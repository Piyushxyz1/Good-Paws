
import { prisma } from "@/lib/prisma";
import FeaturedProducts from "./FeaturedProducts";

export default async function FeaturedProductsSection() {
  const databaseProducts = await prisma.product.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
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

  const products = databaseProducts.map((product) => ({
    ...product,
    price: Number(product.price),
  }));

  return <FeaturedProducts products={products} />;
}
