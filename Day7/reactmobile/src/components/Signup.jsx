export default function Signup({ setPage }) {
  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center">
      <div className="p-8 bg-white shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        <input className="w-full border p-2 mb-3" placeholder="Name" />
        <input className="w-full border p-2 mb-3" placeholder="Email" />
        <input className="w-full border p-2 mb-3" placeholder="Password" />

        <button
          onClick={() => setPage("login")}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
