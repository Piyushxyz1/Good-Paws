import type { Metadata } from "next";
import { Suspense } from "react";
import AboutUs from "./AboutUs";

export const metadata: Metadata = {
  title: "About Us | Goodpaws",
  description:
    "Discover the story behind Goodpaws — thoughtful essentials, better care, and happier lives for pets and their people.",
};

function AboutContent() {
  return <AboutUs />;
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf9f6]" />}>
      <AboutContent />
    </Suspense>
  );
}