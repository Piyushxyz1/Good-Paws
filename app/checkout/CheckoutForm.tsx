
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface CheckoutFormProps {
  amount: number;
  subtotal: number;
  shippingFee: number;
  totalQuantity: number;
  items: {
    id: string;
    quantity: number;
    product: {
      name: string;
      price: number;
      imageUrl: string | null;
    };
  }[];
  user: {
    name: string;
    email: string;
  };
}

const loadScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CheckoutForm({
  amount,
  subtotal,
  shippingFee,
  totalQuantity,
  items,
  user,
}: CheckoutFormProps) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user.name || "",
    email: user.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Load Razorpay SDK
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert(
          "Razorpay SDK failed to load. Check your internet connection."
        );
        setLoading(false);
        return;
      }

      // 2. Create Razorpay order
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          amount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to initialize order."
        );
      }

      // 3. Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "Goodpaws",
        description: "Pet Essentials Order",
        order_id: data.razorpayOrderId,

        // 4. Payment success handler
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpayPaymentId:
                response.razorpay_payment_id,
              razorpayOrderId:
                response.razorpay_order_id,
              razorpaySignature:
                response.razorpay_signature,
              internalOrderId: data.internalOrderId,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok) {
            window.location.href =
              `/order-success?orderId=${data.internalOrderId}`;
          } else {
            alert(
              verifyData.error ||
              "Payment verification failed."
            );
          }
        },

        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },

        theme: {
          color: "#0f766e",
        },
      };

      // 5. Open Razorpay checkout
      const paymentObject = new (window as any).Razorpay(
        options
      );

      paymentObject.on(
        "payment.failed",
        (response: any) => {
          console.error(
            "Payment failed:",
            response.error
          );

          window.location.href = "/payment-failed";
        }
      );

      paymentObject.open();

    } catch (error: any) {
      console.error("Checkout error:", error);

      alert(
        error.message ||
        "An unexpected error occurred during checkout."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf9f6] px-5 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1440px]">

        {/* Header Breadcrumb & Title */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-teal-800">
            <Link href="/cart" className="hover:underline">
              Cart
            </Link>
            <span>/</span>
            <span>Checkout</span>
          </div>

          <h1 className="mt-5 text-5xl font-black tracking-[-0.06em] text-slate-900 sm:text-7xl">
            Checkout details
            <span className="text-teal-700">.</span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-7 text-slate-500">
            Provide your delivery details to reserve your items and finalize your order.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:gap-16">

          {/* Shipping Form */}
          <section>
            <form
              onSubmit={handleSubmit}
              className="space-y-8 bg-white p-7 sm:p-10 shadow-sm border border-stone-200/60"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-800">
                  Step 01
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                  Contact Information
                  <span className="text-teal-700">.</span>
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  {
                    label: "Full Name",
                    name: "fullName",
                    type: "text",
                    placeholder: "Your full name",
                  },
                  {
                    label: "Email Address",
                    name: "email",
                    type: "email",
                    placeholder: "you@example.com",
                  },
                  {
                    label: "Phone Number (For Delivery Updates)",
                    name: "phone",
                    type: "tel",
                    placeholder: "+91 98765 43210",
                  },
                ].map((field) => (
                  <div
                    key={field.name}
                    className={
                      field.name === "phone"
                        ? "sm:col-span-2"
                        : ""
                    }
                  >
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      {field.label}
                    </label>

                    <input
                      type={field.type}
                      name={field.name}
                      required
                      value={
                        formData[
                          field.name as keyof typeof formData
                        ]
                      }
                      onChange={handleChange}
                      className="mt-2 w-full border border-stone-300 bg-[#faf9f6] px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition focus:border-teal-800 focus:bg-white"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-stone-200">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-800">
                  Step 02
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                  Shipping Address
                  <span className="text-teal-700">.</span>
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  {
                    label: "Street Address",
                    name: "address",
                    placeholder: "House/Flat No., Street, Area",
                    span: true,
                  },
                  {
                    label: "City",
                    name: "city",
                    placeholder: "New Delhi",
                  },
                  {
                    label: "State",
                    name: "state",
                    placeholder: "Delhi",
                  },
                  {
                    label: "PIN Code",
                    name: "pincode",
                    placeholder: "110001",
                  },
                ].map((field) => (
                  <div
                    key={field.name}
                    className={
                      field.span ? "sm:col-span-2" : ""
                    }
                  >
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      {field.label}
                    </label>

                    <input
                      type="text"
                      name={field.name}
                      required
                      value={
                        formData[
                          field.name as keyof typeof formData
                        ]
                      }
                      onChange={handleChange}
                      className="mt-2 w-full border border-stone-300 bg-[#faf9f6] px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition focus:border-teal-800 focus:bg-white"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-stone-200">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center bg-teal-800 px-8 py-5 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-teal-700 disabled:opacity-50"
                >
                  {loading
                    ? "Initializing Secure Payment..."
                    : "Proceed to Payment →"}
                </button>
              </div>
            </form>
          </section>

          {/* Order Summary */}
          <aside className="space-y-6">
            <div className="bg-white p-7 sm:p-9 shadow-sm border border-stone-200/60">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-800">
                Summary
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
                Your order
                <span className="text-teal-700">.</span>
              </h2>

              <div className="mt-6 max-h-80 overflow-y-auto divide-y divide-stone-200 pr-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 py-4"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-[#e9e7df]">
                      {item.product.imageUrl ? (
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[10px] font-semibold uppercase tracking-widest text-teal-800/50">
                          Goodpaws
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col justify-center">
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                        {item.product.name}
                      </h4>

                      <p className="mt-1 text-xs text-slate-500">
                        Qty: {item.quantity} ×{" "}
                        {formatPrice(item.product.price)}
                      </p>
                    </div>

                    <div className="text-right flex items-center">
                      <span className="text-sm font-bold text-slate-900">
                        {formatPrice(
                          item.product.price * item.quantity
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="mt-6 space-y-4 border-t border-stone-200 pt-6">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>
                    Subtotal ({totalQuantity} items)
                  </span>
                  <span className="font-semibold text-slate-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-slate-500">
                  <span>Delivery fee</span>
                  <span className="font-semibold text-slate-900">
                    {shippingFee === 0 ? (
                      <span className="text-teal-800 uppercase text-xs font-bold">
                        Free
                      </span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-stone-200 pt-5">
                  <span className="text-base font-bold text-slate-900">
                    Total payable
                  </span>

                  <span className="text-3xl font-black text-slate-900">
                    {formatPrice(amount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Banner */}
            <div className="border border-stone-200/80 bg-[#f4f2eb] p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-800">
                🔒 Safe & Encrypted Checkout
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Payments are securely processed via Razorpay. Your details are never stored.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
