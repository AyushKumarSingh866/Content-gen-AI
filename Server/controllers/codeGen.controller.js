import ollama from "ollama";

export const generateCode = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    // Validate prompt
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Set headers for streaming response
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await ollama.chat({
      model: "qwen2.5-coder:latest",
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });

    console.log("Streaming response from Ollama...");

    // Handle stream chunks
    for await (const chunk of stream) {
      if (chunk?.message?.content) {
        // Format data as SSE (Server-Sent Events) event
        res.write(
          `data:${JSON.stringify({ content: chunk.message.content })}\n\n`
        );
      }
    }

    // Signal stream completion
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Error:", error.message);

    // Handle error during streaming
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      // If headers already sent, send error event and close connection
      res.write(`${JSON.stringify({ error: error.message })}\n\n`);
      res.end();
    }
  }
};

// Middleware error handling (optional but recommended)
export default async (req, res, next) => {
  try {
    await generateCode(req, res, next);
  } catch (err) {
    next(err);
  }
};
