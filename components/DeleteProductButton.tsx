"use client";

import { useRouter } from "next/navigation";

export default function DeleteProductButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        alert("Deleted successfully ✅");
        router.refresh();
      } else {
        alert(data.message || "Delete failed ❌");
        console.error("Delete error:", data);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Something went wrong ❌");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 font-semibold hover:underline"
    >
      Delete
    </button>
  );
}