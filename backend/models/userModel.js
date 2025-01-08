const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter']
    },
    profile: {
        bio: { type: String, trim: true, },
        skills: [{ type: String }],
        resume: { type: String },
        resumeOriginalName: { type: String },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },
        profilePhoto: { type: String, default: "" }
    }
},
    {
        timestamps: true,
    });

const User = mongoose.model('User', userSchema);


module.exports = User;