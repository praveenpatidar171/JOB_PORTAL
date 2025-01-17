const asyncHandler = require('express-async-handler');
const Company = require('../models/companyModel');
const getDataUri = require('../config/dataUri');
const cloudinary = require('../config/cloudinary');
const createCompany = asyncHandler(async (req, res) => {

    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Please send all the fields' });
        }


        const company = await Company.findOne({ name });
        if (company) {
            return res.status(400).json({ message: 'Company already exist with the same name', success: false });
        }
        else {
            const newCompany = await Company.create({ name, userId: req.user._id });

            return res.status(201).json({
                message: "Company registered successfully",
                newCompany,
                success: true
            })
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Down" });
    }
});

const getCompany = asyncHandler(async (req, res) => {
    try {

        const companies = await Company.find({ userId: req.user._id });
        return res.status(200).json({ success: true, companies });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Down' });
    }
});

const getCompanyById = asyncHandler(async (req, res) => {

    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) return res.status(400).json({ message: 'Company not found', success: false })
        return res.status(200).json({ company, success: true });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Down" });
    }

});

const updateCompany = asyncHandler(async (req, res) => {

    try {

        const { name, description, location, website } = req.body;

        const logo = req.files.logo ? req.files.logo[0] : null;

        const logoUri = getDataUri(logo);
        const cloudResponse = await cloudinary.uploader.upload(logoUri.content);
        // cloudinary ..

        const updatedData = { name, description, location, website, logo: cloudResponse.secure_url };

        const company = await Company.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!company) {
            return res.status(400).json({ message: "company not found", success: false });
        }

        return res.status(200).json({
            message: "Company updated successfully",
            company,
            success: true,
        })


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Down"
        })
    }

});

module.exports = { createCompany, getCompany, getCompanyById, updateCompany };