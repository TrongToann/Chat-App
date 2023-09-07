const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const router = require("./routers/main.router");
const { Server } = require("socket.io");

require("dotenv").config();

mongoose
  .connect(process.env.ATLAS_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect DB"))
  .catch((error) => console.log(error));
app.use(cors());
app.use(express.json());
router(app);
app.use((error, req, res, next) => {
  res.status(error.status || 400).send({
    error: {
      code: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});
const server = app.listen(3939, (req, res) => {
  console.log("Server Running on port 3939");
});
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    socket.broadcast.emit("online-users", {
      onlineUsers: Array.from(onlineUsers.keys()),
    });
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", {
        from: data.from,
        recieve: data.to,
        message: data.message,
        notificationNumber: data.notificationNumber,
      });
    }
  });
  socket.on("sign-out", (id) => {
    onlineUsers.delete(id);
    socket.broadcast.emit("online-users", {
      onlineUsers: Array.from(onlineUsers.keys()),
    });
  });
});
