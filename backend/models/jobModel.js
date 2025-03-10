const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    requirements: [{
        type: String,
    }],
    salary: {
        type: Number,
        required: true,
    },
    experienceLevel: {
        type: Number,
        required: true,
    }
    ,
    location: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ],
},
    {
        timestamps: true,
    });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;