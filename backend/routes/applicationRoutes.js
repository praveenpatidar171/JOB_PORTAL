const express = require('express');
const authMiddleware = require('../middlewares/authmiddleware');
const { applyJob, getApplications, getApplicants, updateStatus } = require('../controllers/applicationControllers');
const router = express.Router();

router.post('/apply', authMiddleware, applyJob);
router.get('/applications', authMiddleware, getApplications);
router.get('/getapplicants/:id', authMiddleware, getApplicants);
router.put('/status/:id/update', authMiddleware, updateStatus);
module.exports = router;