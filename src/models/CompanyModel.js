const mongoose = require("mongoose");

const companySchema = mongoose.Schema(
    {
        company_name: {
            type: String,
            required: [true, "Please enter the company name"],
            unique: true
        },
        company_legal_number: {
            type: String,
            required: true,
            unique: true
        },
        incorporation_country: {
            type: String,
            required: true,
        },
        website: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
);

const Company = mongoose.model('Company', companySchema);

module.exports = Company;