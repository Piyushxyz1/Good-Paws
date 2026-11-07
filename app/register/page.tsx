import type { Metadata } from "next";
import Registration from "./Registration";
import AuthForm from "../components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Create Account | Goodpaws",
  description: "Create your Goodpaws pet store account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterPage() {
  return <AuthForm mode="register"/>
}