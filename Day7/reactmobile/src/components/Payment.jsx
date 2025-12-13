export default function Payment({ setPage }) {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white w-96 shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Payment</h2>

        <input className="w-full border p-2 mb-3" placeholder="Card Number" />
        <input className="w-full border p-2 mb-3" placeholder="Expiry Date" />
        <input className="w-full border p-2 mb-3" placeholder="CVV" />

        <button
          onClick={() => setPage("dashboard")}
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
