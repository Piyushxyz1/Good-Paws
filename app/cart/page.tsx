


import CartItems from "./CartItems"
import { Suspense } from "react";

export const metadata = {
  title: "Shopping Cart | Pet Store",
  description: "Review your selected pet products before checkout.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CartPage() {
  

  return (
  
        <Suspense>

        <CartItems />
        </Suspense>

   
  );
}
