import { notFound } from "next/navigation";
import EnquiryForm from "@/components/EnquiryForm";
import ProductCard from "@/components/ProductCard";
import ProductImageGallery from "@/components/ProductImageGallery";

type Product = {
  _id: string;
  id: string;
  name: string;
  category: string;
  description: string;
  image?: string;
  images?: string[];
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function getProduct(id: string): Promise<Product> {
  if (!id) {
    notFound();
  }

  const res = await fetch(`${BASE_URL}/api/products/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) notFound();
  if (!res.ok) throw new Error("Failed to fetch product");

  return res.json();
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  return {
    title: `${product.name} | TAMAR Healthcare`,
    description: product.description.slice(0, 150),
    openGraph: {
      title: `${product.name} | TAMAR Healthcare`,
      description: product.description,
      images: productImages,
    },
  };
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProduct(id);
  const allProducts = await getProducts();

  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const whatsappMessage = `Hello TAMAR, I am interested in ${product.name}. Please share more details.`;

  const whatsappLink = `https://wa.me/917010597945?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-[#0B2E4F] px-6 py-16 text-center text-white">
        <h1 className="text-4xl font-bold md:text-5xl">{product.name}</h1>

        <p className="mt-3 font-medium uppercase tracking-wide text-[#D4AF37]">
          {product.category}
        </p>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:grid-cols-2 md:p-10">
            <div className="flex items-center justify-center rounded-2xl border bg-white p-6">
              <div className="w-full">
                <ProductImageGallery
                  images={productImages}
                  productName={product.name}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-[#D4AF37]">
                {product.category}
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                {product.name}
              </h2>

              <p className="mt-5 whitespace-pre-line leading-7 text-gray-600">
                {product.description}
              </p>

              <ul className="mt-6 space-y-3 text-gray-700">
                <li>✔ High-quality medical equipment</li>
                <li>✔ Reliable performance and support</li>
                <li>✔ Suitable for hospitals and clinics</li>
                <li>✔ Trusted TAMAR service assistance</li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
                >
                  Enquire via WhatsApp
                </a>

                <a
                  href="/products"
                  className="rounded-xl border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100"
                >
                  Back to Products
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-8">
            <EnquiryForm productName={product.name} />
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-bold text-[#0B2E4F]">
              Related Products
            </h2>

            <p className="mt-3 text-center text-gray-600">
              Similar products from {product.category}
            </p>

            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct._id}
                  product={relatedProduct}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}