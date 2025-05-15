// socket.js
let io;

const socketConnection = (server) => {
  const { Server } = require('socket.io');

  io = new Server(server, {
    cors: {
      origin: "*", // or restrict to frontend URL
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join user-specific room
    socket.on('join', (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined room`);
    });

    // Send and forward message to receiver
    socket.on('sendMessage', ({ senderId, receiverId, message }) => {
      io.to(receiverId).emit('receiveMessage', { senderId, message });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = { socketConnection, getIO };
