
"use client";

import { useState, useTransition } from "react";
import {
  updateCartQuantity,
  removeCartItem,
} from "../actions/actions";

type Props = {
  itemId: string;
  quantity: number;
  stock: number;
};

export default function CartActions({
  itemId,
  quantity,
  stock,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function changeQuantity(newQuantity: number) {
    if (newQuantity < 1 || newQuantity > stock) return;

    setError("");

    startTransition(async () => {
      const result = await updateCartQuantity(itemId, newQuantity);

      if (!result.success) {
        setError(result.message);
      }
    });
  }

  function handleRemove() {
    setError("");

    startTransition(async () => {
      const result = await removeCartItem(itemId);

      if (!result.success) {
        setError(result.message);
      }
    });
  }

  return (
    <div className="mt-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => changeQuantity(quantity - 1)}
          disabled={isPending || quantity <= 1}
          className="flex h-9 w-9 items-center justify-center border border-stone-300 text-lg text-slate-800 hover:border-teal-700 hover:text-teal-800 disabled:opacity-30"
          aria-label="Decrease quantity"
        >
          −
        </button>

        <span className="min-w-5 text-center text-sm font-bold text-slate-900">
          {quantity}
        </span>

        <button
          type="button"
          onClick={() => changeQuantity(quantity + 1)}
          disabled={isPending || quantity >= stock}
          className="flex h-9 w-9 items-center justify-center border border-stone-300 text-lg text-slate-800 hover:border-teal-700 hover:text-teal-800 disabled:opacity-30"
          aria-label="Increase quantity"
        >
          +
        </button>

        <button
          type="button"
          onClick={handleRemove}
          disabled={isPending}
          className="ml-3 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-red-600 disabled:opacity-40"
        >
          Remove
        </button>
      </div>

      {isPending && (
        <p className="mt-2 text-xs text-teal-800">
          Updating cart...
        </p>
      )}

      {error && (
        <p className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
