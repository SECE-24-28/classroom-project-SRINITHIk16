export default function Login({ setPage }) {
  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center">
      <div className="p-8 bg-white shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input className="w-full border p-2 mb-3" placeholder="Email" />
        <input className="w-full border p-2 mb-3" placeholder="Password" />

        <button
          onClick={() => setPage("dashboard")}
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
