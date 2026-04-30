"use client";

import { useState } from "react";

type Props = {
  productName: string;
};

export default function EnquiryForm({ productName }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    organization: "",
    message: `I am interested in ${productName}. Please share more details.`,
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          productName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResponseMessage(data.message || "Submission failed");
      } else {
        setResponseMessage("Enquiry submitted successfully");
        setFormData({
          name: "",
          phone: "",
          organization: "",
          message: `I am interested in ${productName}. Please share more details.`,
        });
      }
    } catch (error) {
      setResponseMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
        Send Enquiry
      </h2>
      <p className="text-gray-600 mt-2 mb-6">
        Fill in your details and we will get back to you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="organization"
          placeholder="Hospital / Clinic Name"
          value={formData.organization}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-70"
        >
          {loading ? "Submitting..." : "Submit Enquiry"}
        </button>

        {responseMessage && (
          <p className="text-sm text-gray-700">{responseMessage}</p>
        )}
      </form>
    </div>
  );
}