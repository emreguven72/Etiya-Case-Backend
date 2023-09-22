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

module.exports = {
    getById,
    getByProductName,
    getByCompanyName
};