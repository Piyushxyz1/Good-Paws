
"use client";

import { useState } from "react";

export default function Registration() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Unable to create account."
        );
        return;
      }

      setMessage("Your account has been created successfully!");

      form.reset();

    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-5 py-12">
      <div className="w-full max-w-md bg-white p-8 shadow-sm sm:p-10">

        {/* Heading */}
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-800">
          Goodpaws / Join us
        </p>

        <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900">
          Create account<span className="text-teal-700">.</span>
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Create your account and discover essentials for your furry friend.
        </p>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="mt-8 space-y-5">

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full name
            </label>

            <input
              name="name"
              type="text"
              placeholder="Your name"
              required
              minLength={2}
              maxLength={80}
              className="w-full border border-stone-300 px-4 py-3 text-sm outline-none transition focus:border-teal-800"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email address
            </label>

            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full border border-stone-300 px-4 py-3 text-sm outline-none transition focus:border-teal-800"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <input
              name="password"
              type="password"
              placeholder="Minimum 8 characters"
              required
              minLength={8}
              maxLength={72}
              className="w-full border border-stone-300 px-4 py-3 text-sm outline-none transition focus:border-teal-800"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-800 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          {/* Success Message */}
          {message && (
            <div
              role="status"
              className="border border-green-200 bg-green-50 p-4 text-sm text-green-700"
            >
              {message}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              className="border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </div>
          )}

        </form>

        <p className="mt-8 text-center text-xs text-slate-500">
          Thoughtful essentials for your furry family.
        </p>

      </div>
    </main>
  );
}
