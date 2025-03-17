import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useChat } from "../hooks/useChat.js";
import { useCode } from "../hooks/useCode.js";

function ChatInterface({ responseType }) {
  const [chatInput, setChatInput] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const messagesEndRef = useRef(null);

  const {
    chatMessages,
    fetchChatResponse,
    isLoading: isChatLoading,
  } = useChat();
  const {
    codeMessages,
    fetchCodeResponse,
    isLoading: isCodeLoading,
  } = useCode();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, codeMessages]);

  const handleSend = async () => {
    if (responseType === "chat" && !chatInput.trim()) return;
    if (responseType === "code" && !codeInput.trim()) return;

    try {
      if (responseType === "chat") {
        await fetchChatResponse(chatInput);
        setChatInput("");
      } else {
        await fetchCodeResponse(codeInput);
        setCodeInput("");
      }
    } finally {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-950 via-slate-900 to-indigo-700 text-white flex flex-col overflow-x-hidden border-gray-100">
      {/* Enhanced Gradient Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#4f4f4f2e_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)]"></div>

      {/* Header */}
      <header className="relative z-10 p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-center">
          Diverse AI
        </h1>
        <p className="mt-1 text-gray-300 text-sm text-center">
          {responseType === "chat"
            ? "Chat with AI effortlessly"
            : "Get AI-powered code suggestions instantly"}
        </p>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 md:px-8 pb-24">
        <div className="flex-1 bg-gray-900/30 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-2xl border border-gray-800/50 max-w-4xl w-full mx-auto">
          <div className="h-[60vh] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-800">
            {(responseType === "chat" ? chatMessages : codeMessages).map(
              (message, index) => (
                <div
                  key={index}
                  className={`flex w-full ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[70%] p-4 rounded-2xl shadow-md transition-all duration-200 ${
                      message.sender === "user"
                        ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white"
                        : "bg-gradient-to-br from-purple-800 to-indigo-900 text-white"
                    }`}
                  >
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  </div>
                </div>
              )
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Input Area - Fixed to bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-20 p-4 sm:p-6 bg-gradient-to-t from-gray-900 to-transparent">
        <div className="max-w-4xl mx-auto flex items-center gap-3 sm:gap-4">
          <input
            type="text"
            value={responseType === "chat" ? chatInput : codeInput}
            onChange={(e) =>
              responseType === "chat"
                ? setChatInput(e.target.value)
                : setCodeInput(e.target.value)
            }
            placeholder={
              responseType === "chat"
                ? "Type your message..."
                : "Enter your code..."
            }
            className="flex-1 p-3 sm:p-4 rounded-full bg-gray-800/90 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base"
            disabled={isChatLoading || isCodeLoading}
          />
          <button
            disabled={isChatLoading || isCodeLoading}
            onClick={handleSend}
            className="h-10 sm:h-12 w-24 sm:w-32 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 text-sm sm:text-base font-medium"
          >
            {isChatLoading || isCodeLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
