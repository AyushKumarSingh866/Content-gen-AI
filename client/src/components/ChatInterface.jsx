import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useChat } from "../hooks/useChat.jsx";
import { useCode } from "../hooks/useCode.jsx";

function ChatInterface({ responseType }) {
  const [chatInput, setChatInput] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);
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
        chatMessages.push({ text: chatInput, sender: "user" });
        setChatInput("");
        await fetchChatResponse(chatInput);
      } else {
        codeMessages.push({ text: codeInput, sender: "user" });
        setCodeInput("");
        await fetchCodeResponse(codeInput);
      }
    } finally {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-950 via-slate-900 to-indigo-700 text-white flex flex-col overflow-hidden border-gray-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#4f4f4f2e_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)]"></div>

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

      <main className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 md:px-8 pb-24">
        <div className="flex-1 bg-gray-900/30 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-2xl border border-gray-800/50 max-w-4xl w-full mx-auto">
          <div className="space-y-4">
            {(responseType === "chat" ? chatMessages : codeMessages).map(
              (message, index) => (
                <div
                  key={index}
                  className={`flex w-full ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`relative max-w-[85%] sm:max-w-[70%] p-4 rounded-2xl shadow-md transition-all duration-200 break-words whitespace-pre-wrap ${
                      message.sender === "user"
                        ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white"
                        : "bg-gradient-to-br from-purple-800 to-indigo-900 text-white"
                    }`}
                    style={{
                      overflowX: "auto",
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    <ReactMarkdown>{message.text}</ReactMarkdown>

                    {message.sender !== "user" && (
                      <button
                        onClick={() => copyToClipboard(message.text, index)}
                        className="absolute top-2 right-2 p-1 bg-purple-700 hover:bg-purple-600 text-white text-xs rounded transition-opacity opacity-50 hover:opacity-100"
                      >
                        {copiedIndex === index ? "✅ Copied!" : "📋 Copy"}
                      </button>
                    )}
                  </div>
                </div>
              )
            )}

           {/*loading animation*/}
            {(isChatLoading || isCodeLoading) && (
              <div className="loading-bar animate-loading gradient-1 mx-auto w-1/2"></div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

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
