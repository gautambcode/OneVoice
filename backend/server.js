const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", { text: message, time: new Date() });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
