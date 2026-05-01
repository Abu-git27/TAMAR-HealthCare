"use client";

import { useState } from "react";

export default function MarkContactedButton({
  id,
  status,
}: {
  id: string;
  status?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);

    const newStatus = status === "contacted" ? "new" : "contacted";

    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        alert("Failed to update status");
        return;
      }

      window.location.href = `/admin/enquiries?refresh=${Date.now()}`;
    } catch {
      alert("Something went wrong while updating");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`font-semibold hover:underline disabled:opacity-50 ${
        status === "contacted" ? "text-orange-600" : "text-blue-600"
      }`}
    >
      {loading
        ? "Updating..."
        : status === "contacted"
        ? "Mark New"
        : "Mark Contacted"}
    </button>
  );
}