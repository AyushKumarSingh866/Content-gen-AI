import React from "react";
import { useNavigate } from "react-router-dom";

export default function StartingPage() {
  const navigate = useNavigate();

  // Function to handle the "Start Now" button click
  const handleStartNow = () => {
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-purple-900 p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Diverse</h1>
        <p className="text-xl text-gray-200">
          Diverse is now live & ready to response
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6">Welcome to Diverse</h2>

        {/* Start Now Button */}
        <button
          className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={handleStartNow}
        >
          Start Now
        </button>
      </div>

      {/* Footer */}
      <div className="text-center mt-12">
        <p className="text-gray-200">
          Experience the intelligent model with Diverse.
        </p>
      </div>
    </div>
  );
}