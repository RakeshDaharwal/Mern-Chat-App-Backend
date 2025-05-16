const Message = require('../Model/chatSchema');

const chatSocket = (io) => {
  io.on('connection', (socket) => {
    // console.log('New client connected:', socket.id);

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      // console.log(`User joined room: ${roomId}`);
    });

    socket.on('sendMessage', async ({ sender, receiver, text }) => {

    // console.log('Received:', { sender, receiver, text });

      // Save message in DB
      const message = new Message({ sender, receiver, text });
      await message.save();

      // Emit message to receiver room
      const roomId = [sender, receiver].sort().join('_');
      io.to(roomId).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

module.exports = {chatSocket};
