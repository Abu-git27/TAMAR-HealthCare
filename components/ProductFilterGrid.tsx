"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";

type Product = {
  _id: string;
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  images?: string[];
};

export default function ProductFilterGrid({
  products,
}: {
  products: Product[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(products.map((product) => product.category))),
  ];

  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText);

    const matchesCategory = category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="mb-10 grid gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-md md:grid-cols-2">
        <input
          type="text"
          placeholder="Search products by name, category, or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#0B2E4F]"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#0B2E4F]"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-lg text-gray-600">
          No matching products found.
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}