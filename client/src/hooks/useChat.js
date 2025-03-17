import { useState } from "react";

export function useChat() {
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchChatResponse = async (message) => {
    try {
      setChatMessages((prev) => [...prev, { text: message, sender: "user" }]);
      setIsLoading(true);

      const response = await fetch("http://localhost:5006/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: message }),
      });

      if (!response.body) throw new Error("No response body received");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiResponse = "";

      while (true) {
        const { value, done } = await reader.read();
        console.log("valueeee", value);
        if (done) break;
        console.log("ai- reposne ", aiResponse);
        aiResponse += decoder.decode(value, { stream: true });
        setChatMessages((prev) => [
          ...prev.slice(0, -1),
          { text: aiResponse, sender: "ai" },
        ]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setChatMessages((prev) => [
        ...prev,
        { text: "Failed to get a response. Please try again.", sender: "ai" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return { chatMessages, fetchChatResponse, isLoading };
}
