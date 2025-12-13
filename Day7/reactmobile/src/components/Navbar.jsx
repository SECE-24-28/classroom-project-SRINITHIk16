export default function Navbar() {
  return (
    <nav className="flex justify-start items-center px-20 py-4 bg-white shadow-md text-black font-semibold">
      <h1 className="text-xl mr-auto">Mobile Recharge</h1>

      <div className="flex gap-6">
        <button className="text-white">Home</button>
        <button className="text-white">Plans</button>
        <button className="text-white">Dashboard</button>
        <button className="text-white">Login</button>
        <button className="text-white">Signup</button>
        <button className="text-white">Payment</button>
      </div>
    </nav>
  );
}
