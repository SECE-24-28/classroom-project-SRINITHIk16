import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./routes/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import PlansPage from "./pages/PlansPage";

export default function App() {
  return (
    <div className="h-screen w-screen flex flex-col justify-between bg-gradient-to-r from-blue-600 to-blue-400 text-black">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          {/* add 404 route if you like */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}