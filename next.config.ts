import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
 images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
    {
      protocol: "https",
      hostname: "www.mascobeauty.com",
    },
    {
      protocol: "https",
      hostname: "pethotel.hkpro.tw",
    },
    {
      protocol: "https",
      hostname: "juandapetshop.com",
    },
  ],
},
};

export default nextConfig;
