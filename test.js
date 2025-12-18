const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected:", socket.id);

  socket.emit("prompt", {
    prompt: "awww cutie"
  });
});

socket.on("response", (data) => {
  console.log("AI Reply:", data.reply);
  socket.disconnect();
});
