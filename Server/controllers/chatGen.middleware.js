import ollama from "ollama";

const generateChatMiddleware = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) {
      console.log(" Missing message in request");
      return res.status(400).json({ error: "Message is required" });
    }

    console.log(`Received message from user: "${message}"`);

   
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    
    const stream = await ollama.chat({
      model: "llama3.1",
      messages: [{ role: "user", content: message }],
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


export default generateChatMiddleware;
