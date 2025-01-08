const express = require('express');
const { createJob, getAllJobs, getJobById, getJobsPostedByUser } = require('../controllers/jobControllers');

const authMiddleware = require('../middlewares/authmiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createJob);
router.get('/', authMiddleware, getAllJobs);
router.get('/get/:id', authMiddleware, getJobById);
router.get('/userJobs', authMiddleware, getJobsPostedByUser);


module.exports = router;