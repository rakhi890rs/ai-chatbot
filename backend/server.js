require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const app = require("./src/app");
const { generateResponse } = require('./src/service/ai.service');
const server = http.createServer(app);
const io = new Server(server,);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.chatHistory=[]; //store on socket
  socket.on("prompt", async (data) => {
      console.log("Prompt received:", data.prompt);
      socket.chatHistory.push({
      role: "user",
      parts: [{ text: data.prompt }]
    });
      const reply = await generateResponse(socket.chatHistory);
      socket.chatHistory.push({
      role: "model",
      parts: [{ text: reply }]
    });
      socket.emit("response", { reply });
    
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});



// io=server
// socket=single user
// on=listen event
// emit=fire event