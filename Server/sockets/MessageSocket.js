const users = {};
let ioInstance = null;

const initSocket = (io) => {
  ioInstance = io;
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      users[userId] = socket.id;
      io.emit("getOnlineUsers", Object.keys(users));
    }

    socket.on("sendMessage", (message) => {
      const receiverSocketId = users[message.receiver];
      const senderSocketId = users[message.sender];

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", message);
      }
      if (senderSocketId) {
        io.to(senderSocketId).emit("newMessage", message);
      }
    });

    socket.on("disconnect", () => {
      if (userId && users[userId] === socket.id) {
        delete users[userId];
        io.emit("getOnlineUsers", Object.keys(users));
      }
    });
  });
};

const getUsers = () => users;

const getIo = () => ioInstance;

module.exports = {
  initSocket,
  getUsers,
  getIo,
};
