import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import ChatInterface from "./components/ChatInterface";

const App = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full bg-slate-950 flex items-center justify-center">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] flex flex-col items-center justify-center text-center p-6">
        <div className="text-8xl font-bold text-white mb-6 drop-shadow-lg">
          Diverse AI
        </div>
        <p className="text-lg font-medium text-gray-300 mb-8">
          A smart chatbot jo likhe stories, messages, aur code, plus bane aapka
          virtual tutor!
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {[
            {
              type: "chat",
              title: "Chat With Me",
              description:
                "Engage in a natural conversation with AI, perfect for brainstorming, Q&A, and discussions.",
            },
            {
              type: "code",
              title: "Generate Code",
              description:
                "Get AI-powered code suggestions and snippets for your development projects.",
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
