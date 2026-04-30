"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploadInput from "@/components/ImageUploadInput";

function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function NewProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
    images: [] as string[],
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    if (name === "name") {
      setForm({
        ...form,
        name: value,
        id: createSlug(value),
      });
      return;
    }

    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const cleanImages = form.images.filter(Boolean);

    if (cleanImages.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          id: createSlug(form.name),

          // New multiple image system
          images: cleanImages,

          // Old fallback support
          image: cleanImages[0],
        }),
      });

      if (res.ok) {
        router.push("/admin/products");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to add product");
      }
    } catch {
      alert("Something went wrong while saving product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-8">
        <h1 className="text-3xl font-bold text-gray-900">Add Product</h1>

        <p className="mt-2 text-gray-600">
          Create a new product for the TAMAR website.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="OT Anesthesia Workstation"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#0B2E4F]"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Auto Product Slug
            </label>
            <input
              type="text"
              name="id"
              value={form.id}
              readOnly
              className="w-full rounded-xl border bg-gray-100 px-4 py-3 text-gray-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="OT"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#0B2E4F]"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Product Images
            </label>

            <ImageUploadInput
              value={form.images}
              onChange={(urls) => setForm({ ...form, images: urls })}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="High-performance medical equipment..."
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#0B2E4F]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Product"}
          </button>
        </form>
      </div>
    </main>
  );
}