
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type AuthFormProps = {
  mode: "login" | "register";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();

  const isRegister = mode === "register";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        // Step 1: Create user in PostgreSQL through your API
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || data.error || "Registration failed.");
        }
      }

      // Step 2: Login using Auth.js Credentials Provider
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(
          isRegister
            ? "Account created, but automatic login failed. Please login."
            : "Invalid email or password."
        );
      }

      // Step 3: Redirect after successful authentication
      router.replace("/");
      router.refresh();

    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-extrabold tracking-tight text-teal-800">
            goodpaws<span className="text-teal-500">.</span>
          </Link>

          <p className="text-slate-500 mt-3 text-sm">
            {isRegister
              ? "Create your account and give your pet the best."
              : "Welcome back! Your furry friends missed you."}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 sm:p-9">

          <h1 className="text-2xl font-bold text-slate-900">
            {isRegister ? "Create an account" : "Welcome back"}
          </h1>

          <p className="text-sm text-slate-500 mt-2 mb-7">
            {isRegister
              ? "Enter your details to get started."
              : "Enter your credentials to access your account."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  autoComplete="name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete={isRegister ? "new-password" : "current-password"}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-teal-700 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : isRegister
                  ? "Create Account"
                  : "Sign In"}
            </button>

          </form>

          {/* Switch Auth */}
          <div className="mt-7 text-center text-sm text-slate-500">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-teal-700 hover:text-teal-900">
                  Login
                </Link>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <Link href="/register" className="font-semibold text-teal-700 hover:text-teal-900">
                  Sign up
                </Link>
              </>
            )}
          </div>

        </div>

        <p className="text-center text-xs text-slate-400 mt-7">
          © 2026 Goodpaws. All rights reserved.
        </p>

      </div>
    </div>
  );
}
