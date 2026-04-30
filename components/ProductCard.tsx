import Link from "next/link";
import Image from "next/image";

type Product = {
  _id?: string;
  id: string;
  name: string;
  category: string;
  description: string;
  image?: string;
  images?: string[];
};

export default function ProductCard({ product }: { product: Product }) {
  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  const displayImage = productImages[0];

  return (
    <div className="group overflow-hidden rounded-2xl border bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-56 w-full bg-white">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain p-3 transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#D4AF37]">
          {product.category}
        </p>

        <h3 className="mt-2 line-clamp-2 text-xl font-bold text-gray-900">
          {product.name}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
          {product.description}
        </p>

        <Link
          href={`/products/${product.id}`}
          className="mt-5 inline-block font-semibold text-[#0B2E4F] transition hover:text-[#D4AF37]"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}