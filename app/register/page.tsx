import type { Metadata } from "next";
import { Suspense } from "react";
import AuthForm from "../components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Create Account | Goodpaws",
  description: "Create your Goodpaws pet store account.",
  robots: {
    index: false,
    follow: false,
  },
};

function RegisterContent() {
  return <AuthForm mode="register" />;
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf9f6]" />}>
      <RegisterContent />
    </Suspense>
  );
}