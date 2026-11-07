import type { Metadata } from "next";
import { Manrope, DM_Sans, Geist_Mono } from "next/font/google";
import AuthSessionProvider from "@/app/components/SessionProvider";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Goodpaws | Premium Pet Essentials",
  description:
    "Discover premium pet food, toys, accessories and everyday essentials for your furry family.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${dmSans.variable} ${geistMono.variable} min-h-full flex flex-col antialiased`}
      >
        <AuthSessionProvider>
          <Navbar/>
          {children}
          <Footer/>
          </AuthSessionProvider>
      </body>
    </html>
  );
}
