"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteEnquiryButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmDelete = confirm("Are you sure you want to delete this enquiry?");

    if (!confirmDelete) return;

    setLoading(true);

    const res = await fetch("/api/enquiries", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    setLoading(false);

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete enquiry");
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 font-semibold hover:underline disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}