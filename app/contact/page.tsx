import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-[#0B2E4F] px-6 py-24 text-center text-white">
        <p className="font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
          Contact TAMAR
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-5xl">
          Get in Touch With Us
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-gray-300">
          Contact TAMAR Healthcare System and Services for medical equipment,
          installation support, after-sales support, and MGPS solutions.
        </p>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-4xl rounded-3xl border border-gray-100 bg-white p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-[#0B2E4F]">
            Contact Information
          </h2>

          <div className="mt-8 space-y-6">
            <div>
              <p className="font-semibold text-gray-900">Service Area</p>
              <p className="text-gray-600">
                Tamil Nadu hospitals, clinics, and healthcare centers
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-900">Services</p>
              <p className="text-gray-600">
                Medical equipment supply, installation support, after-sales
                support, and Medical Gas Pipeline Systems.
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-900">Phone / WhatsApp</p>
              <a
                href="https://wa.me/917010597945"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#D4AF37]"
              >
                +91 70105 97945
              </a>
            </div>

            <div>
              <p className="font-semibold text-gray-900">Email</p>
              <a
                href="mailto:tamarhealthcare@gmail.com"
                className="text-gray-600 hover:text-[#D4AF37]"
              >
                tamarhealthcare@gmail.com
              </a>
            </div>

            <div>
              <p className="font-semibold text-gray-900">Address</p>
              <p className="text-gray-600">
                No, 40/5, Jannath Bee Complex, Ashok Nagar, Kondur, Tamil Nadu
                607006
              </p>

              <a
                href="https://maps.app.goo.gl/QxwxKFWDVAL1FE8BA?g_st=awb"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block rounded-lg bg-[#0B2E4F] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#09243d]"
              >
                📍 Open Location
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://wa.me/917010597945?text=Hello%20TAMAR%20Healthcare,%20I%20need%20details%20about%20your%20medical%20equipment%20and%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              WhatsApp Now
            </a>

            <Link
              href="/products"
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold transition hover:bg-gray-100"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}