import ollama from "ollama";

const generateChat = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Set headers for streaming response
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await ollama.chat({
      model: "gemma:2b",
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });

    console.log("Streaming response from Ollama...");

    for await (const chunk of stream) {
      if (chunk?.message?.content) {
        res.write(chunk.message.content);
      }
    }

    res.end();
  } catch (error) {
    console.error("Error:", error.message);

    if (!res.headersSent) {
      res.write(`\n\n[Error]: ${error.message}\n\n`);
    }
    res.end();
  }
};

export default generateChat;
