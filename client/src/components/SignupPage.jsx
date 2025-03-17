import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  // Function to handle the "Sign Up" button click
  const handleSignUp = () => {
    // Simulate a successful signup
    alert("Signup successful! Redirecting to the response page...");
    navigate("/app"); // Redirect to the App.jsx page
  };

  // Function to handle the "Login" button click
  const handleLogin = () => {
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-purple-900 p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Diverse</h1>
        <p className="text-xl text-gray-200">
          Sign up to access the intelligent model.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6">Sign Up</h2>

        {/* Signup Form */}
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
          <div>
            <label className="block text-white mb-2">Name</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Login Button */}
        <div className="mt-6">
          <button
            className="w-full bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition duration-300"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-12">
        <p className="text-gray-200">
          Already have an account? Login now.
        </p>
      </div>
    </div>
  );
}