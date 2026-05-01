import Link from "next/link";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import DeleteProductButton from "@/components/DeleteProductButton";
import AdminLogoutButton from "@/components/AdminLogoutButton";

type ProductType = {
  _id: string;
  id?: string;
  name: string;
  category: string;
  description: string;
  image: string;
  images?: string[];
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
      ...product,
      image: product.image || images[0] || "",
      images,
    };
  });
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Product Admin
            </h1>
            <p className="mt-2 text-gray-600">
              Add, edit, and manage TAMAR products.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/enquiries"
              className="inline-block rounded-xl border px-5 py-3 font-semibold transition hover:bg-gray-100"
            >
              Enquiries
            </Link>

            <Link
              href="/admin/products/new"
              className="inline-block rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-black transition hover:opacity-90"
            >
              Add Product
            </Link>

            <AdminLogoutButton />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="sticky top-0 z-10 bg-gray-100">
                <tr className="text-left text-gray-700">
                  <th className="px-5 py-4 font-semibold">Image</th>
                  <th className="px-5 py-4 font-semibold">Name</th>
                  <th className="px-5 py-4 font-semibold">Category</th>
                  <th className="px-5 py-4 font-semibold">Description</th>
                  <th className="px-5 py-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-10 text-center text-gray-500"
                    >
                      No products available
                    </td>
                  </tr>
                ) : (
                  products.map((product, index) => (
                    <tr
                      key={product._id}
                      className={`border-t border-gray-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } transition hover:bg-blue-50`}
                    >
                      <td className="px-5 py-4">
                        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border bg-white">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-contain p-2"
                            />
                          ) : (
                            <span className="text-center text-xs text-gray-400">
                              No Image
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-4 font-medium text-gray-900">
                        {product.name}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {product.category}
                      </td>

                      <td
                        className="max-w-md truncate px-5 py-4 text-gray-700"
                        title={product.description}
                      >
                        {product.description}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex gap-3">
                          <Link
                            href={`/admin/products/${product._id}/edit`}
                            className="font-semibold text-blue-600 hover:underline"
                          >
                            Edit
                          </Link>

                          <DeleteProductButton id={product._id} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}