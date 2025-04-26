const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const MessageSocket = require("../sockets/MessageSocket");
require("dotenv").config();
const cookies = require("cookie-parser");
const database = require("../config/database");
const userRouter = require("../Authentication/AuthRoutes");
const MessageRouter = require("../MessageService/MessageRoutes");

const corsOptions = {
  origin: ["https://rrfirstchatapp.netlify.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://rrfirstchatapp.netlify.app"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

database();
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(server, {
  cors: corsOptions,
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

module.exports = server; // এবার server export করো
