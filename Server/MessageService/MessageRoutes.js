const MessageRouter = require("express").Router();
const { sendMessage, getMessages } = require("./MessageController");
const IsUser = require("../middleware/JWT");

MessageRouter.post("/send-message/:id", IsUser, sendMessage);
MessageRouter.get("/messages/:id", IsUser, getMessages);

module.exports = MessageRouter;
