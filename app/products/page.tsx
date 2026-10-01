export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-[#0B2E4F] px-6 py-20 text-center text-white md:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#D4AF37] text-4xl shadow-lg">
            🚧
          </div>

          <h1 className="mt-8 text-4xl font-bold md:text-5xl">
            Products Page Under Construction
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-300">
            We are currently updating our medical equipment catalogue to
            provide you with better product information and services.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-md md:p-12">
          <div className="text-5xl">🔧</div>

          <h2 className="mt-6 text-2xl font-bold text-[#0B2E4F] md:text-3xl">
            Our Product Catalogue Is Being Updated
          </h2>

          <p className="mt-5 leading-7 text-gray-600">
            TAMAR Healthcare is currently working on improving this section of
            our website. Our medical equipment catalogue will be available
            soon.
          </p>

          <p className="mt-4 leading-7 text-gray-600">
            For product details, pricing, availability, or technical
            assistance, please contact our team directly.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/enquiry"
              className="rounded-xl bg-[#D4AF37] px-7 py-3 font-semibold text-black transition hover:scale-105 hover:bg-[#c9a431]"
            >
              Make an Enquiry
            </a>

            <a
              href="/"
              className="rounded-xl border border-[#0B2E4F] px-7 py-3 font-semibold text-[#0B2E4F] transition hover:bg-[#0B2E4F] hover:text-white"
            >
              Back to Home
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-[#0B2E4F] px-6 py-14 text-center text-white">
        <h2 className="text-2xl font-bold md:text-3xl">
          Need Medical Equipment?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-gray-300">
          Our team is available to help you with medical equipment
          requirements, product information, quotations, and support.
        </p>

        <a
          href="/enquiry"
          className="mt-6 inline-block rounded-xl bg-[#D4AF37] px-7 py-3 font-semibold text-black transition hover:scale-105"
        >
          Contact TAMAR Healthcare
        </a>
      </section>
    </main>
  );
}