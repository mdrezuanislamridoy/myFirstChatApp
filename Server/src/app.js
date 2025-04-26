const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const MessageSocket = require("../sockets/MessageSocket");
require("dotenv").config();
const cookies = require("cookie-parser");
const database = require("../config/database");
const userRouter = require("../Authentication/AuthRoutes");
const MessageRouter = require("../MessageService/MessageRoutes");

database();
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const origin = process.env.CORS_ORIGIN || "http://localhost:5174";
app.use(
  cors({
    origin: origin,
    credentials: true,
  })
);
const io = new Server(server, {
  cors: {
    origin: origin,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

MessageSocket.initSocket(io);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/auth", userRouter);
app.use("/api/message", MessageRouter);

module.exports = server;
