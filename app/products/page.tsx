import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import ProductFilterGrid from "@/components/ProductFilterGrid";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

type ProductType = {
  _id: string;
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  images: string[];
};

async function getProducts(): Promise<ProductType[]> {
  await connectDB();

  const products = await Product.find().sort({ createdAt: 1 }).lean();

  const plainProducts = JSON.parse(JSON.stringify(products));

  return plainProducts.map((product: any) => {
    const images =
      product.images && product.images.length > 0
        ? product.images
        : product.image
        ? [product.image]
        : [];

    return {
      _id: product._id,
      id: product.id,
      name: product.name,
      category: product.category,
      description: product.description,
      image: images[0] || "",
      images,
    };
  });
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-[#0B2E4F] px-6 py-16 text-center text-white md:px-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold md:text-5xl">
            Our Medical Products
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            Explore TAMAR’s range of reliable medical equipment for hospitals,
            clinics, and healthcare centers.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          {products.length === 0 ? (
            <div className="text-center text-lg text-gray-600">
              No products available right now.
            </div>
          ) : (
            <ProductFilterGrid products={products} />
          )}
        </div>
      </section>

      <section className="bg-[#0B2E4F] px-6 py-16 text-center text-white">
        <h2 className="text-3xl font-bold">
          Looking for the Right Medical Equipment?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-gray-300">
          Contact TAMAR Healthcare for product details, pricing, and expert
          support.
        </p>

        <a
          href="/enquiry"
          className="mt-6 inline-block rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-black transition hover:scale-105"
        >
          Enquire Now
        </a>
      </section>
    </main>
  );
}