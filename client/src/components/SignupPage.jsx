import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast"; // Import toast & Toaster

export default function SignupPage() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    toast("Welcome to Diverse 🎉", {
      icon: "🚀",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    setTimeout(() => {
      navigate("/login"); 
    }, 2000);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="relative h-screen w-full bg-slate-950 flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} /> {/* Toast Position */}

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] flex items-center justify-center p-6">
        
        {/* Signup Box */}
        <div className="max-w-lg w-full bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-6">Sign Up</h2>

          {/* Signup Form */}
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
            <div className="flex flex-col">
              <label className="text-white mb-2">Name</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white mb-2">Password</label>
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
        <div className="absolute bottom-6 text-center">
          <p className="text-gray-200">
            Already have an account?{" "}
            <span className="text-blue-400 cursor-pointer" onClick={handleLogin}>
              Login now.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
