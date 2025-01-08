const express = require('express');
const authMiddleware = require('../middlewares/authmiddleware');
const { createCompany, getCompany, getCompanyById, updateCompany } = require('../controllers/companyControllers');
const router = express.Router();

router.post('/create', authMiddleware, createCompany);
router.get('/', authMiddleware, getCompany);
router.get('/:id', authMiddleware, getCompanyById);
router.put('/update/:id', authMiddleware, updateCompany)

module.exports = router;