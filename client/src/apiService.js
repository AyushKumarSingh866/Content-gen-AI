import fetch from "node-fetch"; // Ensure you have `node-fetch` installed for server-side fetching
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const API_URL = process.env.VITE_SERVER_URL;
const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY;
const CLAUDE_API_KEY = process.env.VITE_CLAUDE_API_KEY;

// Fetch response from Gemini (Chat)
export const getChatResponse = async (message) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateMessage?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: message }),
      }
    );

    const data = await response.json();
    return data.candidates?.[0]?.content || "No response";
  } catch (error) {
    console.error("❌ Error fetching Gemini response:", error);
    return "Error processing request";
  }
};

// Fetch response from Claude (Code)
export const getCodeResponse = async (prompt) => {
  try {
    const response = await fetch("https://api.anthropic.com/v1/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-2",
        prompt,
        max_tokens_to_sample: 300,
      }),
    });

    const data = await response.json();
    return data.completion || "No response";
  } catch (error) {
    console.error("❌ Error fetching Claude response:", error);
    return "Error processing request";
  }
};
