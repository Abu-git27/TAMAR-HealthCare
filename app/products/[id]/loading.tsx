export default function Loading() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] p-10 animate-pulse">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        <div className="bg-gray-200 h-[350px] rounded-2xl" />

        <div>
          <div className="h-6 bg-gray-200 w-32 mb-4 rounded" />
          <div className="h-10 bg-gray-200 w-3/4 mb-6 rounded" />

          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
          </div>

          <div className="mt-8 flex gap-4">
            <div className="h-10 w-32 bg-gray-200 rounded" />
            <div className="h-10 w-32 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </main>
  );
}