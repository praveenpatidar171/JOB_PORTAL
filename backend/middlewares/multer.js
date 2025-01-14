const multer = require('multer');

const storage = multer.memoryStorage();
// const singleUpload = multer(storage).single('profilePhoto');
const upload = multer({ storage });

const uploadFields = upload.fields([
    { name: 'profilePhoto', maxCount: 1 }, // For profile photo
    { name: 'file', maxCount: 1 }, // For resume file
]);

module.exports = uploadFields;
