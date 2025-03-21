import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./LoginPage";
import SignupPage from "./components/SignupPage";
import App from "./App"; // Main App Page
import ChatInterface from "./components/ChatInterface";
import "./index.css";

import { CookieProvider, useCookie } from "./context/AuthContext";

// Function to check authentication
const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { cookie } = useCookie();

 
  // Example usage: Get the value of a cookie named 'username'

  useEffect(() => {
    // const refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGRiNDRmZDBlYjBkY2M4MjIyOWU5ZiIsImlhdCI6MTc0MjU4Mjk2MywiZXhwIjoxNzQ1MTc0OTYzfQ.yeBTOZJGorZMuEThQ-m7_7jjrITd0PUDH--PD-HlDk0"; // Get the refresh token from cookies
    let refreshToken = cookie;
    console.log("cookie from browser (refreshToken, if set):", refreshToken);

    // Check if token exists and set authentication state
    setIsAuthenticated(!!refreshToken);
    setLoading(false);
  }, [cookie]); // Empty dependency array means this runs once on mount

  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }

  // Return the element if authenticated, otherwise redirect to login
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookieProvider>
    <Router>
      <Routes>
        {/* First page should be login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route path="/app" element={<PrivateRoute element={<App />} />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute element={<ChatInterface responseType="chat" />} />
          }
        />
        <Route
          path="/code"
          element={
            <PrivateRoute element={<ChatInterface responseType="code" />} />
          }
        />
      </Routes>
    </Router>
  </CookieProvider>
);
