import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <main className="min-h-[70vh]">
      <section className="bg-gradient-to-r from-indigo-600 to-sky-500 text-white py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Fast, simple mobile recharges — whenever you need</h1>
          <p className="mt-4 text-lg opacity-90">Top carriers, secure payments, instant delivery. Manage all recharges from a single dashboard.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/signup" className="px-6 py-3 bg-white text-indigo-600 rounded-md font-semibold">Get started</Link>
            <Link to="/plans" className="px-6 py-3 border border-white/40 rounded-md">View plans</Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        {[
          { title: "Multiple Operators", desc: "All major mobile operators supported." },
          { title: "Secure Payments", desc: "PCI-ready payments (connect your gateway)." },
          { title: "Instant Delivery", desc: "Recharges processed in seconds." },
        ].map((c) => (
          <div key={c.title} className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{c.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
