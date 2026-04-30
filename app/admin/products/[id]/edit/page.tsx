"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ImageUploadInput from "@/components/ImageUploadInput";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [form, setForm] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
    images: [] as string[],
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // ✅ Fetch product (with backward compatibility)
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);

        if (!res.ok) {
          alert("Failed to load product");
          return;
        }

        const data = await res.json();

        setForm({
          id: data.id || "",
          name: data.name || "",
          category: data.category || "",
          description: data.description || "",

          // ✅ IMPORTANT: supports both old & new
          images:
            data.images && data.images.length > 0
              ? data.images
              : data.image
              ? [data.image]
              : [],
        });
      } catch {
        alert("Error loading product");
      } finally {
        setPageLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // ✅ Updated submit (VERY IMPORTANT FIX)
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const cleanImages = form.images.filter(Boolean);

    if (cleanImages.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,

          // ✅ new system
          images: cleanImages,

          // ✅ old fallback
          image: cleanImages[0],
        }),
      });

      if (res.ok) {
        router.push("/admin/products");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to update product");
      }
    } catch {
      alert("Something went wrong while updating");
    } finally {
      setLoading(false);
    }
  }

  if (pageLoading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>

        <p className="text-gray-600 mt-2">Update product details.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* SLUG */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product ID / Slug
            </label>
            <input
              type="text"
              name="id"
              value={form.id}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0B2E4F]"
              required
            />
          </div>

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0B2E4F]"
              required
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0B2E4F]"
              required
            />
          </div>

          {/* IMAGES */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images
            </label>

            <ImageUploadInput
              value={form.images}
              onChange={(urls) =>
                setForm({
                  ...form,
                  images: urls,
                })
              }
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0B2E4F]"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </main>
  );
}