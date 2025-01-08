const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            trim: true,
        },
        website: {
            type: String,
            trim: true,
        },
        location: {
            type: String,
        },
        logo: {
            type: String,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Company = mongoose.model('Company', companySchema);

module.exports = Company;