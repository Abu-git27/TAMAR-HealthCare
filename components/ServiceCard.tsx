export default function ServiceCard({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 
    p-6 text-center text-lg md:text-xl font-semibold text-gray-900
    hover:shadow-xl hover:-translate-y-1 transition cursor-pointer">
      {title}
    </div>
  );
}