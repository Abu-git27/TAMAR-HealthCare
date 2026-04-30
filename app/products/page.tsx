import ProductFilterGrid from "@/components/ProductFilterGrid";

type Product = {
  _id: string;
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
};

async function getProducts(): Promise<Product[]> {
  // ✅ FIX: use dynamic base URL
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="bg-[#F8FAFC] min-h-screen">

      {/* HERO */}
      <section className="bg-[#0B2E4F] text-white py-16 px-6 md:px-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold">
            Our Medical Products
          </h1>

          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Explore TAMAR’s range of reliable medical equipment for hospitals,
            clinics, and healthcare centers.
          </p>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          {products.length === 0 ? (
            <div className="text-center text-gray-600 text-lg">
              No products available right now.
            </div>
          ) : (
            <ProductFilterGrid products={products} />
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0B2E4F] text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold">
          Looking for the Right Medical Equipment?
        </h2>

        <p className="mt-4 text-gray-300 max-w-xl mx-auto">
          Contact TAMAR Healthcare for product details, pricing, and expert
          support.
        </p>

        <a
          href="/enquiry"
          className="inline-block mt-6 bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Enquire Now
        </a>
      </section>

    </main>
  );
}