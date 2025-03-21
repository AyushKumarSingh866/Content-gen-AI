import { useState } from "react";

export function useCode() {
  const [codeMessages, setCodeMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCodeResponse = async (message) => {
    try {
      setCodeMessages((prev) => [...prev, { text: message, sender: "user" }]);
      setIsLoading(true);

      const response = await fetch("http://localhost:5006/api/code", {
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
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        // Parse the streaming data format: "data:{\"content\":\"some text\"}\n\n"
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data:")) {
            try {
              const jsonStr = line.slice(5); // Remove "data:" prefix
              const parsedData = JSON.parse(jsonStr);
              aiResponse += parsedData.content; // Extract only the content
            } catch (e) {
              console.error("Error parsing chunk:", e);
            }
          }
        }

        setCodeMessages((prev) => [
          ...prev.slice(0, -1),
          { text: aiResponse, sender: "ai" },
        ]);
      }
    } catch (error) {
      console.error("❌ Code Error:", error);
      setCodeMessages((prev) => [
        ...prev,
        { text: "Failed to get a response. Please try again.", sender: "ai" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return { codeMessages, fetchCodeResponse, isLoading };
}
