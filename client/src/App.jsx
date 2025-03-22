import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ChatInterface from "./components/ChatInterface";
import { useCookie } from "./context/AuthContext.jsx";

const App = () => {
  const navigate = useNavigate();
  const { cookie, removeCookie } = useCookie();
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch user details if logged in
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5006/api/user", {
          method: "GET",
          headers: { Authorization: `Bearer ${cookie}` },
        });

        const data = await response.json();
        if (response.ok && data.success) {
          setUsername(data.user.username); // Assuming API returns `user.username`
        } else {
          throw new Error("Session expired, please log in again.");
        }
      } catch (error) {
        console.error("❌ Error fetching user:", error);
        handleLogout();
      }
    };

    if (cookie) {
      fetchUser();
    } else {
      navigate("/login");
    }
  }, [cookie]);

  const handleLogout = () => {
    removeCookie();
    navigate("/login");
  };

  return (
    <div className="relative h-screen w-full bg-slate-950 flex items-center justify-center">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] flex flex-col items-center justify-center text-center p-6">
        
        

        {/* Main Content */}
        <div className="text-8xl font-bold text-white mb-6 drop-shadow-lg">
          Diverse AI
        </div>
        <p className="text-lg font-medium text-gray-300 mb-8">
          A smart chatbot jo likhe stories, messages, aur code, plus bane aapka virtual tutor!
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {[
            {
              type: "chat",
              title: "Chat With Me",
              description: "Engage in a natural conversation with AI, perfect for brainstorming, Q&A, and discussions.",
            },
            {
              type: "code",
              title: "Generate Code",
              description: "Get AI-powered code suggestions and snippets for your development projects.",
            },
          ].map(({ type, title, description }) => (
            <div
              key={type}
              className="h-[20rem] w-[30rem] max-w-[90%] border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br hover:bg-purple-600 from-indigo-800 to-[rgba(75,30,133,0.01)] text-white font-nunito p-[1em] flex flex-col gap-[0.75em] backdrop-blur-lg cursor-pointer transition-transform transform  justify-center items-center"
              onClick={() => navigate(`/${type}`)}
            >
              <h1 className="text-[2em] font-medium">{title}</h1>
              <h1 className="text-[0.8em] font-medium">{description}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
