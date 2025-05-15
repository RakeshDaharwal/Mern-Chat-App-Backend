const express = require('express');
const { registerUser, loginUser, userDetails, allUsers } = require('../Controller/AuthController');
const { sendMessage, getMessages } = require('../Controller/ChatController');
const { authMiddleware } = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/sign-in', loginUser);
router.get('/user/details', authMiddleware, userDetails);
router.get('/all/users', authMiddleware, allUsers);



router.post('/send', authMiddleware, sendMessage);
router.get('/:receiverId', authMiddleware, getMessages);


module.exports = router;
