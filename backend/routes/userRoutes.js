const express = require('express');
const { registerUser, loginUser, logOut, updateProfile } = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authmiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', authMiddleware, logOut);
router.put('/profile/update', authMiddleware, updateProfile);

module.exports = router;