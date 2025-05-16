const express = require('express');
const { registerUser, loginUser, userDetails, allUsers } = require('../Controller/AuthController');
const { getMessages, deleteMessage } = require('../Controller/ChatController');
const { authMiddleware } = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/sign-in', loginUser);
router.get('/user/details', authMiddleware, userDetails);
router.get('/all/users', authMiddleware, allUsers);

router.get('/chat/:userId/:contactId',authMiddleware, getMessages);
router.delete('/chat/:id', authMiddleware, deleteMessage);


module.exports = router;
