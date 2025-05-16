const Chat = require('../model/chatSchema');

const getMessages = async (req, res) => {
  const { userId, contactId } = req.params;


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



const deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Chat.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Message not found' });

    res.status(200).json({ message: 'Message deleted' });
  } catch (err) {
    console.error("Error deleting message:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getMessages, deleteMessage };
