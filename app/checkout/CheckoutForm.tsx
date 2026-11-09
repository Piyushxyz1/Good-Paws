"use client";

import { useState } from "react";

interface CheckoutFormProps {
  amount: number;
  user: {
    name: string;
    email: string;
  };
}

// Helper function to dynamically load the Razorpay script
const loadScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutForm({ amount, user }: CheckoutFormProps) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Load Razorpay SDK script
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js",
      );
      if (!res) {
        alert("Razorpay SDK failed to load. Check your internet connection.");
        setLoading(false);
        return;
      }

      // 2. Call your backend API to create the order and Razorpay transaction
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, amount }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initialize order.");
      }

      // 3. Configure Razorpay Modal Options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "Goodpaws",
        description: "Pet Essentials Order",
        order_id: data.razorpayOrderId,
        handler: async function (response: any) {
          // 4. Verify the payment signature on your backend
          const verifyRes = await fetch("/api/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              internalOrderId: data.internalOrderId,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyRes.ok) {
            window.location.href = `/order-success?orderId=${data.internalOrderId}`;
          } else {
            alert(verifyData.error || "Payment verification failed.");
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#0f766e", // Matches your teal-700 branding
        },
      };

      // 5. Open Razorpay popup and handle payment failure
      const paymentObject = new (window as any).Razorpay(options);

      // Handle payment failure
      paymentObject.on("payment.failed", (response: any) => {
        console.error("Payment failed:", response.error);

        window.location.href = "/payment-failed";
      });

      // Open Razorpay Checkout
      paymentObject.open();
    } catch (error: any) {
      console.error("Checkout error:", error);
      alert(error.message || "An unexpected error occurred during checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-7 sm:p-10 shadow-sm border border-stone-200/60"
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-800">
          Step 01
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
          Contact Information<span className="text-teal-700">.</span>
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="mt-2 w-full border border-stone-300 bg-[#faf9f6] px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition focus:border-teal-800 focus:bg-white"
            placeholder="e.g. Piyush Negi"
          />
        </div>

        <div className="sm:col-span-1">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-2 w-full border border-stone-300 bg-[#faf9f6] px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition focus:border-teal-800 focus:bg-white"
            placeholder="you@example.com"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Phone Number (For Delivery Updates)
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="mt-2 w-full border border-stone-300 bg-[#faf9f6] px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition focus:border-teal-800 focus:bg-white"
            placeholder="+91 98765 43210"
          />
        </div>
      </div>

      <div className="pt-6 border-t border-stone-200">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-800">
          Step 02
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
          Shipping Address<span className="text-teal-700">.</span>
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Street Address
          </label>
          <input
            type="text"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="mt-2 w-full border border-stone-300 bg-[#faf9f6] px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition focus:border-teal-800 focus:bg-white"
            placeholder="House/Flat No., Street, Area"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            City
          </label>
          <input
            type="text"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            className="mt-2 w-full border border-stone-300 bg-[#faf9f6] px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition focus:border-teal-800 focus:bg-white"
            placeholder="New Delhi"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            State
          </label>
          <input
            type="text"
            name="state"
            required
            value={formData.state}
            onChange={handleChange}
            className="mt-2 w-full border border-stone-300 bg-[#faf9f6] px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition focus:border-teal-800 focus:bg-white"
            placeholder="Delhi"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            PIN Code
          </label>
          <input
            type="text"
            name="pincode"
            required
            value={formData.pincode}
            onChange={handleChange}
            className="mt-2 w-full border border-stone-300 bg-[#faf9f6] px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition focus:border-teal-800 focus:bg-white"
            placeholder="110001"
          />
        </div>
      </div>

      <div className="pt-6 border-t border-stone-200">
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center bg-teal-800 px-8 py-5 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-teal-700 disabled:opacity-50"
        >
          {loading ? "Initializing Secure Payment..." : "Proceed to Payment →"}
        </button>
      </div>
    </form>
  );
}
