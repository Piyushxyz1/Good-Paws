
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CheckoutForm from "./CheckoutForm";
import { Suspense } from "react";

export const metadata = {
  title: "Checkout | Goodpaws",
  description: "Complete your order securely with Goodpaws.",
};

async function CheckoutContent() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/login?callbackUrl=/checkout");
  }

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  const subtotal = cart.items.reduce(
    (total, item) =>
      total + Number(item.product.price) * item.quantity,
    0
  );

  const totalQuantity = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const shippingFee = subtotal > 1500 ? 0 : 99;
  const grandTotal = subtotal + shippingFee;

  const checkoutItems = cart.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    product: {
      name: item.product.name,
      price: Number(item.product.price),
      imageUrl: item.product.imageUrl,
    },
  }));

  return (
    <CheckoutForm
      amount={grandTotal}
      subtotal={subtotal}
      shippingFee={shippingFee}
      totalQuantity={totalQuantity}
      items={checkoutItems}
      user={{
        name: session.user?.name || "",
        email: session.user?.email || "",
      }}
    />
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf9f6]" />
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
