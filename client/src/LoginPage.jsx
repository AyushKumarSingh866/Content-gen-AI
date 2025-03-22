import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useCookie } from "./context/AuthContext.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setcookie } = useCookie();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("🔵 Attempting login with:", { email, password });

      const response = await fetch("http://localhost:5006/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Allows cookies to be sent and received
        body: JSON.stringify({ email, password }),
      });

      console.log("🟠 Response Status:", response.status);
      const data = await response.json();
      console.log("🟢 API Response:", data);

      // Check if login is successful
      if (!response.ok || !data.success || !data.user?.accessToken) {
        throw new Error(data.message || "Invalid email or password");
      }

      // Set access token
      setcookie(data.user.accessToken);

      toast.success("✅ Login successful!");

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate("/app");
      }, 1500);
    } catch (error) {
      console.error("❌ Login Error:", error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="relative h-screen w-full bg-slate-950 flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg border border-white/20">
          <h1 className="text-4xl font-bold text-white text-center mb-4">
            Diverse AI
          </h1>
          <p className="text-lg text-gray-300 text-center mb-6">
            Login to access the intelligent model.
          </p>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="flex flex-col">
              <label className="text-white mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Signup Prompt */}
          <p className="text-center text-gray-300 mt-4">
            Don't have an account?{" "}
            <span
              className="text-blue-400 hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Signup now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
