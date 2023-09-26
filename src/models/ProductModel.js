const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        product_name: {
            type: String,
            required: [true, "Please enter the product name"],
            unique: true
        },
        product_amount: {
            type: Number,
            required: true,
            default: 0
        },
        amount_unit: {
            type: String,
            required: true,
            default: "Tane"
        },
        product_category: {
            type: String,
            required: true,
        },
        company: {
            type: mongoose.Types.ObjectId,
            ref: "Company",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;