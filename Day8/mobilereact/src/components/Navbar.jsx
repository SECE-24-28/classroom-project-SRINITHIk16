import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-extrabold text-indigo-600">RechargeNow</Link>
            <nav className="hidden md:flex gap-3">
              <Link to="/plans" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">Plans</Link>
              <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">Dashboard</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="hidden sm:inline text-sm text-gray-600">{user.email}</span>
                <button onClick={logout} className="px-3 py-2 bg-red-50 text-red-600 rounded-md text-sm">Logout</button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="px-3 py-2 rounded-md text-sm border border-indigo-100">Login</Link>
                <Link to="/signup" className="px-3 py-2 bg-indigo-600 text-white rounded-md text-sm">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
