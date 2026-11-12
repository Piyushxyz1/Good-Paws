
import CartItems from "./CartItems";
import { Suspense } from "react";

export const metadata = {
  title: "Shopping Cart | Pet Store",
  description: "Review your selected pet products before checkout.",
  robots: {
    index: false,
    follow: false,
  },
};

async function CartContent() {
  return <CartItems />;
}

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf9f6]" />
      }
    >
      <CartContent />
    </Suspense>
  );
}
