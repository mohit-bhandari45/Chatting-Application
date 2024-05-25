const express = require('express')
const router = require("./routes/userRoutes")
require("dotenv").config()
const connectDB = require("./controllers/conn")
const messagesrouter = require('./routes/messagesRoute')
const socket = require("socket.io")

const app = express()
app.use("/", router)
app.use("/messages", messagesrouter)


connectDB()

const server = app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})

const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  }
})

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id)
  })
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message)
    }
  })
})