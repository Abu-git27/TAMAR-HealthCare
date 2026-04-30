import Link from "next/link";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import DeleteEnquiryButton from "@/components/DeleteEnquiryButton";
import MarkContactedButton from "@/components/MarkContactedButton";

type Enquiry = {
  _id: string;
  name: string;
  phone: string;
  organization?: string;
  productName: string;
  message: string;
  status?: string;
  createdAt: string;
};

async function getEnquiries(): Promise<Enquiry[]> {
  const res = await fetch("http://localhost:3000/api/enquiries", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch enquiries");
  }

  return res.json();
}

export default async function EnquiriesPage() {
  const enquiries = await getEnquiries();

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Enquiries
            </h1>

            <p className="text-gray-600 mt-2">
              View and manage customer enquiries submitted through the website.
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Total enquiries: {enquiries.length}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/products"
              className="inline-block border px-5 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Products
            </Link>

            <AdminLogoutButton />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1300px]">
              <thead className="bg-gray-100 sticky top-0 z-10">
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
                      } hover:bg-blue-50 transition`}
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
                        className="px-5 py-4 text-gray-700 max-w-md truncate"
                        title={e.message}
                      >
                        {e.message}
                      </td>

                      <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                        {new Date(e.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
                            className="text-green-600 font-semibold hover:underline"
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