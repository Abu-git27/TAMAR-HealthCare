const services = [
  "Critical Care Equipment",
  "Anaesthesia Systems",
  "OT Lights & Tables",
  "Steriliser & Suction Units",
  "Disinfectants",
];

export default function Services() {
  return (
    <section className="py-16 px-8">
      <h2 className="text-3xl font-bold text-center mb-10">
        Our Services
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 border rounded-xl shadow-sm hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{service}</h3>
            <p className="mt-2 text-gray-500">
              High-quality and reliable solutions for healthcare needs.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}