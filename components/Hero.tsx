import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0B2E4F] text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B2E4F] via-[#123f68] to-[#0B2E4F]" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_#D4AF37,_transparent_35%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <p className="text-[#D4AF37] font-semibold tracking-wide uppercase mb-4">
            Trusted Medical Equipment Dealer
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            TAMAR Health Care System And Services
          </h1>

          <p className="mt-6 text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto md:mx-0">
            Supplying high-quality ECG, ICU, and OT equipment with reliable
            service and trusted support across Tamil Nadu.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/products"
              className="bg-[#D4AF37] text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition shadow-lg text-center"
            >
              Explore Products
            </Link>

            <Link
              href="/contact"
              className="border border-white/40 px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#0B2E4F] transition text-center"
            >
              Enquire Now
            </Link>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm text-gray-300 justify-center md:justify-start">
            <span>Trusted Dealer Support</span>
            <span>ECG • ICU • OT Solutions</span>
            <span>Service Across Tamil Nadu</span>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl w-full max-w-md">
            <h3 className="text-2xl font-semibold text-[#D4AF37] mb-4">
              Why Choose TAMAR?
            </h3>

            <ul className="space-y-4 text-gray-200">
              <li>✔ High-quality medical equipment</li>
              <li>✔ Reliable installation and service support</li>
              <li>✔ Trusted solutions for hospitals and clinics</li>
              <li>✔ Quick response for enquiries and assistance</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}