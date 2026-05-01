import { notFound } from "next/navigation";
import Image from "next/image";
import EnquiryForm from "@/components/EnquiryForm";

type Product = {
  _id: string;
  id?: string;
  name: string;
  category: string;
  description: string;
  image?: string;
  images?: string[];
};

function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  return "http://localhost:3000";
}

async function getProduct(id: string): Promise<Product> {
  if (!id || id === "undefined") {
    throw new Error("Invalid product ID");
  }

  const res = await fetch(`${getBaseUrl()}/api/products/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-10">

        {/* IMAGE SECTION */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          {productImages.length > 0 ? (
            <Image
              src={productImages[0]}
              alt={product.name}
              width={500}
              height={400}
              className="object-contain w-full h-auto"
            />
          ) : (
            <div className="text-gray-400 text-center">No Image</div>
          )}
        </div>

        {/* DETAILS SECTION */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#D4AF37]">
            {product.category}
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            {product.name}
          </h1>

          <p className="mt-4 text-gray-600 leading-7">
            {product.description}
          </p>

          {/* CTA */}
          <a
            href="/enquiry"
            className="mt-6 inline-block rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-black transition hover:scale-105"
          >
            Enquire Now
          </a>
        </div>
      </div>

      {/* ENQUIRY FORM (Optional - you can remove if separate page) */}
      <div className="mt-16 max-w-4xl mx-auto">
        <EnquiryForm productName={product.name} />
      </div>
    </main>
  );
}