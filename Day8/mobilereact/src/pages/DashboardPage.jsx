import React from "react";

export default function DashboardPage() {
  const recent = [
    { id: 1, number: "+91 98765 43210", amount: 199, status: "Success", date: "2025-11-01" },
    { id: 2, number: "+91 91234 56789", amount: 299, status: "Success", date: "2025-10-28" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <section className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold">Quick Recharge</h3>
          <form className="mt-4 space-y-3">
            <input className="w-full p-2 border rounded" placeholder="Mobile number" />
            <select className="w-full p-2 border rounded">
              <option>Operator: Select</option>
              <option>Operator A</option>
              <option>Operator B</option>
            </select>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded">Recharge ₹199</button>
              <button className="px-4 py-2 bg-gray-100 rounded">More plans</button>
            </div>
          </form>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold">Recent Recharges</h3>
          <ul className="mt-4 space-y-3">
            {recent.map(r => (
              <li key={r.id} className="flex justify-between items-center border p-3 rounded">
                <div>
                  <div className="font-medium">{r.number}</div>
                  <div className="text-sm text-gray-500">{r.date} • {r.status}</div>
                </div>
                <div className="font-semibold">₹{r.amount}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
