"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteEnquiryButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Failed to delete enquiry");
        return;
      }

      router.refresh();
      window.location.reload();
    } catch {
      alert("Something went wrong while deleting");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="font-semibold text-red-600 hover:underline disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}