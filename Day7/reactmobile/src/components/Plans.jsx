export default function Plans({ setPage }) {
  return (
    <div
      className="min-h-screen p-10 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1603796846097-bee99e4a601f')",
      }}
    >
      <h2 className="text-4xl text-white font-bold mb-8 drop-shadow-lg">
        Recharge Plans
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Plan 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold">₹199 Plan</h3>
          <p className="text-gray-600 mt-2">1.5GB/day • 28 Days</p>
          <button
            onClick={() => alert("Proceed to payment")}
            className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            Recharge
          </button>
        </div>

        {/* Plan 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold">₹399 Plan</h3>
          <p className="text-gray-600 mt-2">2GB/day • 56 Days</p>
          <button
            onClick={() => alert("Proceed to payment")}
            className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            Recharge
          </button>
        </div>

        {/* Plan 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold">₹599 Plan</h3>
          <p className="text-gray-600 mt-2">3GB/day • 84 Days</p>
          <button
            onClick={() => alert("Proceed to payment")}
            className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            Recharge
          </button>
        </div>

      </div>

      <button
        onClick={() => setPage("home")}
        className="mt-10 bg-gray-900 text-white px-6 py-3 rounded-lg shadow hover:bg-black"
      >
        Back to Home
      </button>
    </div>
  );
}
