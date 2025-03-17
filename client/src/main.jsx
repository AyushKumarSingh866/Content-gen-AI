import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import SignupPage from "./components/SignupPage";
import App from "./App";
import "./index.css";
import ChatInterface from "./components/ChatInterface";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/chat" element={<ChatInterface responseType="chat" />} />
      <Route path="/code" element={<ChatInterface responseType="code" />} />
    </Routes>
  </Router>
);
