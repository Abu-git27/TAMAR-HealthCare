"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminLogoutButton from "@/components/AdminLogoutButton";

type EnquiryType = {
  _id: string;
  name: string;
  phone: string;
  organization?: string;
  productName: string;
  message: string;
  status?: "new" | "contacted";
  createdAt: string;
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  async function loadEnquiries() {
    try {
      setLoading(true);

      const res = await fetch(`/api/enquiries?time=${Date.now()}`, {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        alert("Failed to load enquiries");
        return;
      }

      const data = await res.json();
      setEnquiries(data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while loading enquiries");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEnquiries();
  }, []);

  async function deleteEnquiry(id: string) {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;

    try {
      setProcessingId(id);

      const res = await fetch(`/api/enquiries/${id}`, {
        method: "DELETE",
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to delete enquiry");
        return;
      }

      setEnquiries((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
      alert("Something went wrong while deleting enquiry");
    } finally {
      setProcessingId(null);
    }
  }

  async function updateStatus(id: string, currentStatus?: string) {
    const newStatus = currentStatus === "contacted" ? "new" : "contacted";

    try {
      setProcessingId(id);

      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update status");
        return;
      }

      setEnquiries((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error(error);
      alert("Something went wrong while updating status");
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Enquiries
            </h1>

            <p className="mt-2 text-gray-600">
              View and manage customer enquiries submitted through the website.
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Total enquiries: {enquiries.length}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/products"
              className="inline-block rounded-xl border px-5 py-3 font-semibold transition hover:bg-gray-100"
            >
              Products
            </Link>

            <AdminLogoutButton />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1300px]">
              <thead className="sticky top-0 z-10 bg-gray-100">
                <tr className="text-left text-gray-700">
                  <th className="px-5 py-4 font-semibold">Name</th>
                  <th className="px-5 py-4 font-semibold">Phone</th>
                  <th className="px-5 py-4 font-semibold">Organization</th>
                  <th className="px-5 py-4 font-semibold">Product</th>
                  <th className="px-5 py-4 font-semibold">Message</th>
                  <th className="px-5 py-4 font-semibold">Date</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-10 text-center">
                      Loading enquiries...
                    </td>
                  </tr>
                ) : enquiries.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-10 text-center text-gray-500">
                      No enquiries yet
                    </td>
                  </tr>
                ) : (
                  enquiries.map((e, index) => (
                    <tr
                      key={e._id}
                      className={`border-t border-gray-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } transition hover:bg-blue-50`}
                    >
                      <td className="px-5 py-4 font-medium text-gray-900">
                        {e.name}
                      </td>

                      <td className="px-5 py-4 text-gray-700">{e.phone}</td>

                      <td className="px-5 py-4 text-gray-700">
                        {e.organization || "-"}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {e.productName}
                      </td>

                      <td
                        className="max-w-md truncate px-5 py-4 text-gray-700"
                        title={e.message}
                      >
                        {e.message}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                        {new Date(e.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            e.status === "contacted"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {e.status === "contacted" ? "Contacted" : "New"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex gap-4 whitespace-nowrap">
                          <a
                            href={`https://wa.me/91${e.phone}?text=${encodeURIComponent(
                              `Hello ${e.name}, regarding your enquiry for ${e.productName}. Thank you for contacting TAMAR Healthcare.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-green-600 hover:underline"
                          >
                            WhatsApp
                          </a>

                          <button
                            type="button"
                            disabled={processingId === e._id}
                            onClick={() => updateStatus(e._id, e.status)}
                            className={`font-semibold hover:underline disabled:opacity-50 ${
                              e.status === "contacted"
                                ? "text-orange-600"
                                : "text-blue-600"
                            }`}
                          >
                            {processingId === e._id
                              ? "Updating..."
                              : e.status === "contacted"
                              ? "Mark New"
                              : "Mark Contacted"}
                          </button>

                          <button
                            type="button"
                            disabled={processingId === e._id}
                            onClick={() => deleteEnquiry(e._id)}
                            className="font-semibold text-red-600 hover:underline disabled:opacity-50"
                          >
                            {processingId === e._id ? "Deleting..." : "Delete"}
                          </button>
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