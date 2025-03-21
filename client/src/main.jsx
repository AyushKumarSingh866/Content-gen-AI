import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios"; // For API calls

import LoginPage from "./LoginPage";
import SignupPage from "./components/SignupPage";
import App from "./App"; // Main App Page
import ChatInterface from "./components/ChatInterface";
import "./index.css";

// Function to check authentication
const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/validate-token", { withCredentials: true })
      .then((response) => {
        setIsAuthenticated(response.data.valid);
        setLoading(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      {/* First page should be login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Routes */}
      <Route path="/app" element={<PrivateRoute element={<App />} />} />
      <Route path="/chat" element={<PrivateRoute element={<ChatInterface responseType="chat" />} />} />
      <Route path="/code" element={<PrivateRoute element={<ChatInterface responseType="code" />} />} />
    </Routes>
  </Router>
);
