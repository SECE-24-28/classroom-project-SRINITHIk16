import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";   // adjust path if needed

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    signup(email);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold">Create an account</h2>

      <form onSubmit={submit} className="mt-4 space-y-4">
        
        {/* Email */}
        <div>
          <label className="block text-sm text-gray-700">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              mt-1 w-full p-3 
              border border-gray-300 
              rounded-md 
              bg-white text-black 
              placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-gray-700">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              mt-1 w-full p-3 
              border border-gray-300 
              rounded-md 
              bg-white text-black
              placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Sign up
          </button>

          <Link to="/login" className="text-sm text-indigo-600">
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
