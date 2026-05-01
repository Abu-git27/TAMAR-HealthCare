import Link from "next/link";
import { connectDB } from "@/lib/db";
import Enquiry from "@/models/Enquiry";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import DeleteEnquiryButton from "@/components/DeleteEnquiryButton";
import MarkContactedButton from "@/components/MarkContactedButton";

// 🔥 VERY IMPORTANT (Fix cache issue)
export const dynamic = "force-dynamic";
export const revalidate = 0;

type EnquiryType = {
  _id: string;
  name: string;
  phone: string;
  organization?: string;
  productName: string;
  message: string;
  status?: string;
  createdAt: string;
};

async function getEnquiries(): Promise<EnquiryType[]> {
  await connectDB();

  const enquiries = await Enquiry.find()
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(enquiries));
}

export default async function EnquiriesPage() {
  const enquiries = await getEnquiries();

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
                {enquiries.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-10 text-center text-gray-500"
                    >
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

                          <MarkContactedButton id={e._id} status={e.status} />

                          <DeleteEnquiryButton id={e._id} />
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