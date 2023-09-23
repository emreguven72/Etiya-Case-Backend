const pool = require("../../db");
const queries = require("./queries");

const getById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getByProductName = (req, res) => {
    const productName = req.params.productName;

    pool.query(queries.getByProductName, [productName], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getByCompanyName = (req, res) => {
    const companyName = req.params.companyName;

    pool.query(queries.getByCompanyName, [companyName], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getByCategory = (req, res) => {
    const category = req.params.category;

    pool.query(queries.getByCategory, [category], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const createProduct = (req, res) => {
    const product = req.body;
    pool.query(queries.createProduct, [product.product_name,product.product_amount,product.amount_unit,product.company_id,product.product_category], (error, results) => {
        if(error) throw error;
        res.status(201).json(results.rows);
    });
}

const updateProduct = (req, res) => {
    const product = req.body;
    pool.query(queries.updateProduct, [product.product_name,product.product_amount,product.amount_unit,product.company_id,product.product_category,product.id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });   
}

const deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.deleteProduct, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

module.exports = {
    getById,
    getByProductName,
    getByCompanyName,
    getByCategory,
    createProduct,
    updateProduct,
    deleteProduct
};