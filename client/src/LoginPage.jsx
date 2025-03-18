import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full bg-slate-950 flex items-center justify-center">
      {/* Background Pattern (Same as App.jsx) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] flex items-center justify-center p-6">
        
        {/* Login Box */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white/20">
          <h1 className="text-4xl font-bold text-white text-center mb-4">Diverse AI</h1>
          <p className="text-lg text-gray-300 text-center mb-6">
            Login to access the intelligent model.
          </p>

          {/* Login Form */}
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Login successful! Redirecting...");
              navigate("/app");
            }}
          >
            <div className="flex flex-col">
              <label className="text-white mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white mb-2">Password</label>
              <input
                type="password"
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 rounded-lg hover:opacity-90 transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Sign Up Prompt */}
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Don't have an account?{" "}
              <span
                className="text-blue-400 cursor-pointer hover:underline"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
