const asyncHandler = require('express-async-handler');
const Job = require('../models/jobModel');

const createJob = asyncHandler(async (req, res) => {

    try {
        const { title, description, salary, location, jobType, position, companyId, requirements, experience } = req.body;

        if (!title || !description || !experience || !salary || !location || !jobType || !position || !companyId || !requirements) {
            return res.status(400).json({ message: "Please send all the fields", success: false });
        }

        const newJob = await Job.create({
            title,
            description,
            requirements: requirements.split(','),
            salary: Number(salary),
            experienceLevel: experience,
            location,
            jobType,
            position,
            company: companyId,
            created_by: req.user._id,
        });

        res.status(201).json({ message: "New Job created successfully", newJob, status: true })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Down" });
    }

});

const getAllJobs = asyncHandler(async (req, res) => {
    try {

        const keywords = req.query.search ? {
            $or: [
                { title: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } },
            ]

        } : {};

        const jobs = await Job.find(keywords).populate('company').populate('created_by', 'name email').sort({ createdAt: -1 });
        return res.status(200).json(jobs);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Down" });
    }
});

const getJobById = asyncHandler(async (req, res) => {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) return res.status(400).json({ message: 'Job not found', success: false });
    return res.status(200).json({ success: true, job });
});

const getJobsPostedByUser = asyncHandler(async (req, res) => {
    try {
        const jobs = await Job.find({ created_by: req.user._id });
        return res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Down" });
    }
})

module.exports = { createJob, getAllJobs, getJobById, getJobsPostedByUser };