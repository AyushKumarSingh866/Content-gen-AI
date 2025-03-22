import fs from "fs";

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n${Date.now()}:${req.method}:${req.path}`,
      (err) => {
        if (err) {
          console.error("Error writing to log file:", err);
        }
        next();
      }
    );
  };
}

export { logReqRes };

// it will be we wil use morgan wingston
