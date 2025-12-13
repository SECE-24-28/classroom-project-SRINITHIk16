import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 mt-12 border-t">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600">
        <div className="flex justify-between items-center">
          <div>© {new Date().getFullYear()} RechargeNow — Built with React & Tailwind</div>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
