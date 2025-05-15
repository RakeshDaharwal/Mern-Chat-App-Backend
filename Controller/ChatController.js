const Chat = require('../Model/chatSchema');

const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.user.userId;

    const newMessage = new Chat({
      sender: senderId,
      receiver: receiverId,
      message,
    });

    const savedMessage = await newMessage.save();

    return res.status(201).json(savedMessage);
  } catch (error) {
    return res.status(500).json({ message: 'Error sending message', error: error.message });
  }
};



const getMessages = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { receiverId } = req.params;

    const messages = await Chat.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId }
      ]
    }).sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
};


module.exports = { sendMessage, getMessages };
