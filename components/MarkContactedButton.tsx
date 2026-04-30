"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MarkContactedButton({
  id,
  status,
}: {
  id: string;
  status?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);

    const newStatus = status === "contacted" ? "new" : "contacted";

    const res = await fetch("/api/enquiries", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status: newStatus }),
    });

    setLoading(false);

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to update status");
    }
  }

  return (
    <button
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