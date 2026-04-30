import Hero from "@/components/Hero";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#F8FAFC]">
      
      {/* HERO */}
      <Hero />

      {/* SOLUTIONS */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Our Healthcare Solutions
          </h2>

          <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">
            We provide dependable medical equipment solutions for hospitals,
            clinics, and healthcare centers across Tamil Nadu.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {[
              "Cardiology & ECG",
              "Critical Care",
              "Operation Theatre",
              "Anaesthesia Systems",
              "Monitoring Equipment",
              "Hospital Accessories",
            ].map((item) => (
              <div
                key={item}
                className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl hover:-translate-y-1 transition text-center"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TAMAR */}
      <section className="bg-white py-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Why Choose TAMAR?
          </h2>

          <div className="mt-10 grid md:grid-cols-3 gap-8">
            <div className="text-center bg-[#F8FAFC] p-6 rounded-2xl shadow-sm border hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900">
                Trusted Equipment
              </h3>
              <p className="mt-3 text-gray-600">
                Reliable and certified medical devices from leading brands.
              </p>
            </div>

            <div className="text-center bg-[#F8FAFC] p-6 rounded-2xl shadow-sm border hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900">
                Quick Service
              </h3>
              <p className="mt-3 text-gray-600">
                Fast installation and responsive service support.
              </p>
            </div>

            <div className="text-center bg-[#F8FAFC] p-6 rounded-2xl shadow-sm border hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900">
                Regional Expertise
              </h3>
              <p className="mt-3 text-gray-600">
                Serving hospitals across Tamil Nadu efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0B2E4F] text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold">
          Need the Right Medical Equipment?
        </h2>

        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          Get in touch with TAMAR Healthcare for dependable products,
          quick support, and trusted medical equipment solutions.
        </p>

        <Link
          href="/contact"
          className="inline-block mt-6 bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Contact Us
        </Link>
      </section>

    </main>
  );
}