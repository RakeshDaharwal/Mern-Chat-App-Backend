const Chat = require('../Model/chatSchema');

const getMessages = async (req, res) => {
  const { userId, contactId } = req.params;

console.log(req.params, 'params dataa')


  try {
    const messages = await Chat.find({
      $or: [
        { sender: userId, receiver: contactId },
        { sender: contactId, receiver: userId }
      ]
    }).sort('createdAt');

    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getMessages };
