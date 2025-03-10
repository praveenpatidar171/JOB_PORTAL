const express = require('express');
const { registerUser, loginUser, logOut, updateProfile } = require('../controllers/userControllers');
const authMiddleware = require('../middlewares/authmiddleware');
// const singleUpload = require('../middlewares/multer');
const uploadFields = require('../middlewares/multer');
const router = express.Router();

router.post('/register', uploadFields, registerUser);
router.post('/login', loginUser);
router.get('/logout', authMiddleware, logOut);
router.put('/profile/update', authMiddleware, uploadFields, updateProfile);

module.exports = router;