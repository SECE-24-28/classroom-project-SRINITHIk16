export default function Dashboard({ setPage }) {
  return (
    <div className="h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <button
        onClick={() => setPage("plans")}
        className="bg-blue-600 text-white px-6 py-3 rounded mb-4"
      >
        View Recharge Plans
      </button>
    </div>
  );
}
