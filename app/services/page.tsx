import Link from "next/link";

export default function ServicesPage() {
  const generalServices = [
    {
      title: "Medical Equipment Sales",
      description:
        "Reliable medical equipment solutions for hospitals, clinics, diagnostic centers, and healthcare institutions.",
      icon: "🏥",
    },
    {
      title: "Installation Support",
      description:
        "Professional installation and setup support for smooth product operation.",
      icon: "🛠️",
    },
    {
      title: "Product Demonstration",
      description:
        "Clear product demonstrations to explain usage, workflow, and key features.",
      icon: "📋",
    },
    {
      title: "After-Sales Support",
      description:
        "Customer support and service assistance after delivery and installation.",
      icon: "🤝",
    },
    {
      title: "Hospital & Clinic Solutions",
      description:
        "Guidance to choose suitable medical equipment based on department needs.",
      icon: "⚕️",
    },
    {
      title: "Maintenance Coordination",
      description:
        "Coordination for maintenance and service support for selected equipment.",
      icon: "🔧",
    },
  ];

  const mgpsServices = [
    {
      title: "Medical Gas Pipeline Installation",
      description:
        "Installation of copper pipelines for Oxygen, Medical Air, Vacuum, and Nitrous Oxide systems.",
      icon: "🫁",
    },
    {
      title: "Centralized MGPS System",
      description:
        "Centralized medical gas pipeline systems for hospitals and healthcare facilities.",
      icon: "🏨",
    },
    {
      title: "MGPS Turnkey Projects",
      description:
        "Complete MGPS project execution including design, installation, testing, and commissioning.",
      icon: "📐",
    },
    {
      title: "Source Equipment Setup",
      description:
        "Setup of oxygen manifolds, oxygen generators, and LLOX tank systems.",
      icon: "⚙️",
    },
    {
      title: "Terminal Units Installation",
      description:
        "Installation of medical gas outlets at patient bedside points.",
      icon: "🔌",
    },
    {
      title: "Alarm & Safety Systems",
      description:
        "Installation of AVSU and medical gas alarm systems for safety monitoring.",
      icon: "🚨",
    },
    {
      title: "Testing & Commissioning",
      description:
        "Pressure testing, cleaning, and certification as per required medical standards.",
      icon: "✅",
    },
    {
      title: "Medical Oxygen Pipeline",
      description:
        "Dedicated oxygen pipeline systems for uninterrupted hospital supply.",
      icon: "💨",
    },
    {
      title: "Medical Vacuum System",
      description:
        "Vacuum systems for suction applications in ICU, OT, and patient care areas.",
      icon: "🧪",
    },
  ];

  function ServiceCard({
    service,
  }: {
    service: { title: string; description: string; icon: string };
  }) {
    return (
      <div className="relative bg-white rounded-2xl min-h-[320px] p-8 text-center shadow-lg border border-gray-100 overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition duration-300">

        {/* ✅ GREEN TOP LINE */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#0B8F5A]" />

        {/* ✅ ICON CIRCLE */}
        <div className="w-20 h-20 mx-auto rounded-full bg-[#EAF7F1] flex items-center justify-center text-3xl">
          {service.icon}
        </div>

        {/* TITLE */}
        <h3 className="mt-8 text-xl font-bold text-gray-900 leading-snug">
          {service.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="mt-5 text-gray-600 text-sm leading-7">
          {service.description}
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* HERO */}
      <section className="bg-[#0B2E4F] text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Our Services</h1>

        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          Complete medical equipment solutions, installation support, and
          Medical Gas Pipeline System services for hospitals and healthcare centers.
        </p>
      </section>

      {/* GENERAL SERVICES */}
      <section className="py-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0B2E4F]">
            Healthcare Equipment Services
          </h2>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {generalServices.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* MGPS SERVICES */}
      <section className="py-16 px-6 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0B2E4F]">
            Medical Gas Pipeline Services
          </h2>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {mgpsServices.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0B2E4F] text-white py-20 px-6 text-center">
        <h2 className="text-3xl font-bold">
          Need Healthcare Equipment or MGPS Support?
        </h2>

        <p className="mt-4 text-gray-300 max-w-xl mx-auto">
          Contact TAMAR Healthcare for complete hospital solutions.
        </p>

        <Link
          href="/contact"
          className="inline-block mt-6 bg-[#D4AF37] text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Contact Us
        </Link>
      </section>
    </main>
  );
}