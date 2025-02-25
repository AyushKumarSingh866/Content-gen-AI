import ollama from "ollama";

const generateCodeMiddleware = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      console.log(" Missing prompt in request");
      return res.status(400).json({ error: "Prompt is required" });
    }

    console.log(`Received prompt from user: "${prompt}"`);

    
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    
    const stream = await ollama.chat({
      model: "deepseek-r1", 
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });

    console.log(" Response:");

   
    for await (const chunk of stream) {
      if (chunk.message && chunk.message.content) {
        console.log(` -> ${chunk.message.content}`);
        res.write(chunk.message.content);
      }
    }

    console.log(" Response stream completed");
    res.end(); 
  } catch (error) {
    console.error(" Error communicating with Ollama:", error.message);

    
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default generateCodeMiddleware;