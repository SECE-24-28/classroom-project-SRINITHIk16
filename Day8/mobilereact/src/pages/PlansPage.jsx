import React from "react";

const samplePlans = [
  { id: 1, title: "₹199 — Unlimited calls + 1.5GB/day", price: 199 },
  { id: 2, title: "₹299 — Unlimited + 2GB/day", price: 299 },
  { id: 3, title: "₹499 — Unlimited + 3GB/day", price: 499 },
];

export default function PlansPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold">Plans</h2>
      <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {samplePlans.map(p => (
          <div key={p.id} className="p-6 bg-white rounded-lg shadow">
            <div className="text-lg font-semibold">{p.title}</div>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-2xl font-bold">₹{p.price}</div>
              <button className="px-3 py-2 bg-indigo-600 text-white rounded">Recharge</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
