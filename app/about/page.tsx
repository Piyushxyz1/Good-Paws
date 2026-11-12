import type { Metadata } from "next";
import { Suspense } from "react";
import AboutUs from "./AboutUs";

export const metadata: Metadata = {
  title: "About Us | Goodpaws",
  description:
    "Get to know Goodpaws — a pet essentials store bringing together nutrition, toys, accessories and thoughtful everyday care for your furry family.",
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