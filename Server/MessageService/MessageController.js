const Conversation = require("../Conversation/ConversationModel");
const Message = require("../MessageService/MessasgeModel");
const mongoose = require("mongoose");
const { getUsers, getIo } = require("../sockets/MessageSocket"); // make sure to export getIo() in socket file!

const sendMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const receiverId = req.params.id;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
        messages: [],
      });
    }

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      message,
    });

    conversation.messages.push(newMessage._id);
    await Promise.all([conversation.save(), newMessage.save()]);

    return res.status(200).json({
      message: "Message sent successfully",
      messageData: newMessage,
    });
  } catch (error) {
    console.error("Send message error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const senderId = new mongoose.Types.ObjectId(req.userId);
    const receiverId = new mongoose.Types.ObjectId(req.params.id);

    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      await Conversation.create({
        members: [senderId, receiverId],
        messages: [],
      });
      return res
        .status(200)
        .json({ message: "No previous messages", messages: [] });
    }

    return res.status(200).json({
      message: "Messages retrieved successfully",
      messages: conversation.messages,
    });
  } catch (error) {
    console.error("Get messages error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { sendMessage, getMessages };
