const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
    {
        token: {
            type: String,
            required: [true, "Please enter the product name"],
            unique: true
        },
        expired: {
            type: Boolean,
            required: true,
            default: false
        },
        revoked: {
            type: Boolean,
            required: true,
            default: false
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;