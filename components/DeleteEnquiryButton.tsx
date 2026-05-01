"use client";

import { useState } from "react";

export default function DeleteEnquiryButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "DELETE",
        cache: "no-store",
      });

      if (!res.ok) {
        alert("Failed to delete enquiry");
        return;
      }

      window.location.href = `/admin/enquiries?refresh=${Date.now()}`;
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