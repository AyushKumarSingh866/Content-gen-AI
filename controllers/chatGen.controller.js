import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../constant.js";

const genAI = new GoogleGenerativeAI(
  GEMINI_API_KEY || "AIzaSyAl2cgIxiXsE80SwKKtYYNierfMYQXNw9M"
);

export const generateChat = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Use a valid model name - "gemini-1.0-pro" is an example, verify with current API docs
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);

    const responseText = await result.response.text();
    console.log("reponse ", responseText);

    res.status(200).json({
      success: true,
      data: responseText,
    });
  } catch (error) {
    console.error("❌ Error fetching Gemini response:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};
