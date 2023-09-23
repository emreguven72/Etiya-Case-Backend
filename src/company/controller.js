const pool = require("../../db");
const queries = require("./queries");

const getById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getById, [id], (error, results) => {
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

const getLatestCompanies = (req, res) => {
    pool.query(queries.getLatestCompanies, (error, results) => {
        if(error) throw error;
        console.log(results.rows)
        res.status(200).json(results.rows);
    });
}

const getAll = (req, res) => {
    pool.query(queries.getAll, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const createCompany = (req, res) => {
    var company = req.body;
    pool.query(queries.createCompany, [company.company_name,company.company_legal_number, company.incorporation_country, company.website], (error, results) => {
        if(error) throw error;
        res.status(201).json(results.rows);
    })
}

const updateCompany = (req, res) => {
    var company = req.body;
    pool.query(queries.updateCompany, [company.company_name,company.company_legal_number, company.incorporation_country, company.website, company.id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const deleteCompany = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.deleteCompany, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

module.exports = {
    getById,
    getByCompanyName,
    getLatestCompanies,
    getAll,
    createCompany,
    updateCompany,
    deleteCompany
};