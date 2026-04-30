"use client";

import { useState } from "react";

export default function EnquiryPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    organization: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name || !form.phone || !form.message) {
      alert("Please fill required fields");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/enquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        organization: form.organization,
        productName: "Website Enquiry",
        message: form.message,
      }),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      setForm({
        name: "",
        phone: "",
        organization: "",
        message: "",
      });
    } else {
      alert("Submission failed");
    }
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* HEADER */}
      <section className="bg-[#0B2E4F] text-white py-24 text-center">
        <h1 className="text-4xl font-bold">Send an Enquiry</h1>
        <p className="mt-3 text-gray-300">
          Fill the form and our team will contact you shortly
        </p>
      </section>

      {/* FORM */}
      <section className="py-16 px-6">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md border">
          {success ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-600">
                ✔ Enquiry Submitted
              </h2>
              <p className="mt-3 text-gray-600">
                We will contact you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border p-3 rounded-lg"
                required
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border p-3 rounded-lg"
                required
              />

              <input
                name="organization"
                value={form.organization}
                onChange={handleChange}
                placeholder="Hospital / Clinic"
                className="w-full border p-3 rounded-lg"
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your requirement"
                rows={5}
                className="w-full border p-3 rounded-lg"
                required
              />

              <button
                type="submit"
                className="w-full bg-[#D4AF37] py-3 rounded-lg font-semibold"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}