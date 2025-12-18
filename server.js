const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = require("./src/app");
const { generateResponse } = require("./src/service/ai.service");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("prompt", async (data) => {
    try {
      console.log("Prompt received:", data.prompt);

      const reply = await generateResponse(data.prompt);

      socket.emit("response", { reply });
    } catch (error) {
      socket.emit("response", {
        reply: "AI is busy. Please try again later."
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
