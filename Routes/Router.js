const express = require('express');
const { registerUser, loginUser, userDetails } = require('../Controller/AuthController');
const { authMiddleware } = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/sign-in', loginUser);
router.get('/user/details', authMiddleware, userDetails);

module.exports = router;
