/* eslint-disable no-undef */
/* INSTALLATION */
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messagesRoutes");
const socket = require("socket.io");

/* CONFIGURATIONS */

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

/* ROUTES */

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

// DATABASE

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection successfull");
  })
  .catch((err) => console.log(err));

const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log("Server is running"));

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("User is connected");
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);

    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.msg);
    }
  });

});

