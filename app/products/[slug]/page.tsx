import { Suspense } from "react";
import ProductDetails from "./ProductDetails";

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-6xl animate-pulse">
            <div className="mb-8 h-5 w-36 rounded bg-slate-200" />
            <div className="grid gap-10 rounded-3xl bg-white p-6 md:grid-cols-2 md:p-10">
              <div className="min-h-80 rounded-2xl bg-slate-200" />
              <div className="space-y-5 py-8">
                <div className="h-4 w-24 rounded bg-slate-200" />
                <div className="h-10 w-3/4 rounded bg-slate-200" />
                <div className="h-8 w-36 rounded bg-slate-200" />
                <div className="h-20 rounded bg-slate-200" />
              </div>
            </div>
          </div>
        </main>
      }
    >
      <ProductDetails params={params} />
    </Suspense>
  );
}