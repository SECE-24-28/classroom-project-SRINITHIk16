import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    // TODO: call auth API
    login(email);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold">Login</h2>
      <form onSubmit={submit} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm text-gray-700">Email</label>
          <input required value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Password</label>
          <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="mt-1 w-full p-2 border rounded-md" />
        </div>
        <div className="flex justify-between items-center">
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Login</button>
          <Link to="/signup" className="text-sm text-indigo-600">Create an account</Link>
        </div>
      </form>
    </div>
  );
}
