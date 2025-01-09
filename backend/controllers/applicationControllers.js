const asyncHandler = require('express-async-handler');
const Application = require('../models/applicationModel');
const Job = require('../models/jobModel');

const applyJob = asyncHandler(async (req, res) => {

    try {
        const { jobId } = req.body;
        if (!jobId) {
            return res.status(400).json({ message: "Please send all the fields", success: false });
        }

        const isJob = await Job.findOne({ _id: jobId });
        if (!isJob) {
            return res.status(400).json({ message: 'Job not exist', success: false });
        }

        const isApplication = await Application.findOne({ job: jobId, applicant: req.user._id });
        if (isApplication) {
            return res.status(400).json({ message: 'Application already submitted', success: false });
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: req.user._id,
        });

        isJob.applications.push(newApplication._id);
        await isJob.save();

        if (newApplication) {
            return res.status(201).json(
                {
                    message: 'Application submitted Successfully',
                    newApplication,
                    success: true
                }
            )
        }
        else {
            return res.status(400).json({ message: "Application not submitted", success: false })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Down" });
    }

});

const getApplications = asyncHandler(async (req, res) => {
    try {

        const applications = await Application.find({ applicant: req.user._id }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }

        }).sort({ createdAt: -1 });
        return res.status(200).json(applications);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Down" });
    }
});

const getApplicants = asyncHandler(async (req, res) => {

    try {
        const jobId = req.params.id;
        const job = await Job.findOne({ _id: jobId }).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant',
                select: '-password'
            }
        });

        if (!job) return res.status(400).json({ message: "No Job found", success: false });
        return res.status(200).json({ job, success: true });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Down" });
    }
});

const updateStatus = asyncHandler(async (req, res) => {
    try {

        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status || !applicationId) {
            return res.status(400).json({ message: "Please send all the fields", success: false });
        }

        const application = await Application.findById(applicationId);

        if (!application) return res.status(400).json({ message: "Application not found", success: false });

        // updating the status 

        application.status = status.toLowerCase();

        await application.save();

        return res.status(200).json({ message: 'status changed successfully', application, success: true })


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Down' });
    }
});

module.exports = { applyJob, getApplications, getApplicants, updateStatus };