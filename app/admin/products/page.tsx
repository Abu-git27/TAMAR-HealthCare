import Link from "next/link";
import DeleteProductButton from "@/components/DeleteProductButton";
import AdminLogoutButton from "@/components/AdminLogoutButton";

type Product = {
  _id: string;
  id?: string;
  name: string;
  category: string;
  description: string;
  image?: string;
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Product Admin
            </h1>
            <p className="text-gray-600 mt-2">
              Add, edit, and manage TAMAR products.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/enquiries"
              className="inline-block border px-5 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Enquiries
            </Link>

            <Link
              href="/admin/products/new"
              className="inline-block bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Add Product
            </Link>

            <AdminLogoutButton />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="bg-gray-100 sticky top-0 z-10">
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
                      } hover:bg-blue-50 transition`}
                    >
                      <td className="px-5 py-4">
                        <div className="w-24 h-24 bg-white border rounded-xl overflow-hidden flex items-center justify-center">
                          {product.image && product.image.trim() !== "" ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain p-2"
                            />
                          ) : (
                            <span className="text-gray-400 text-xs text-center">
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
                        className="px-5 py-4 text-gray-700 max-w-md truncate"
                        title={product.description}
                      >
                        {product.description}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex gap-3">
                          <Link
                            href={`/admin/products/${product._id}/edit`}
                            className="text-blue-600 font-semibold hover:underline"
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