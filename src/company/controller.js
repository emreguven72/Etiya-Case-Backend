const pool = require("../../db");
const queries = require("./queries");
const tokenController = require("../token/controller");
const tokenQueries = require("../token/queries");
const productQueries = require("../products/queries");
const Company = require('../models/CompanyModel');
const Product = require('../models/ProductModel');
const Token = require('../models/TokenModel');

const _getById = async(req, res) => {
    const id = req.params.id;

    const authHeader = req.headers.authorization;
    const isTokenValid = await tokenController._isTokenValid(authHeader);
    if(isTokenValid) {
        const company = await Company.findById(id);
        res.status(200).json(company);
    } else {
        res.send("Token is not valid2");
    }
}

const _getByCompanyName = async(req, res) => {
    const companyName = req.params.companyName;

    const authHeader = req.headers.authorization;
    const isTokenValid = await tokenController._isTokenValid(authHeader);
    if(isTokenValid) {
        const company = await Company.findOne({ company_name: companyName });
        res.status(200).json(company);
    } else {
        res.send("Token is not valid2");
    }
}

const _getLatestCompanies = async(req, res) => {
    const authHeader = req.headers.authorization;
    const isTokenValid = await tokenController._isTokenValid(authHeader);
    if(isTokenValid) {
        const companies = await Company.find({}).sort({ _id: -1 }).limit(3);
        res.status(200).json(companies);
    } else {
        res.send("Token is not valid2");
    }
}

const _getAll = async(req, res) => {
    const authHeader = req.headers.authorization;
    const isTokenValid = await tokenController._isTokenValid(authHeader);
    if(isTokenValid) {
        const companies = await Company.find({});
        res.status(200).json(companies);
    } else {
        res.send("Token is not valid2");
    }
}

const _createCompany = async(req, res) => {
    var company = req.body;

    const authHeader = req.headers.authorization;
    const isTokenValid = await tokenController._isTokenValid(authHeader);
    if(isTokenValid) {
        const createdCompany = await Company.create(company);
        res.status(200).json(createdCompany);
    } else {
        res.send("Token is not valid2");
    }
}

const _updateCompany = async(req, res) => {
    const company = req.body;

    const authHeader = req.headers.authorization;
    const isTokenValid = await tokenController._isTokenValid(authHeader);
    if(isTokenValid) {
        const updatedCompany = await Company.findByIdAndUpdate(company.id, company);
        if(!updatedCompany) {
            return res.send("Company cannot changed");
        }
        res.status(200).json(updatedCompany);
    } else {
        res.send("Token is not valid2");
    }
}

const _deleteCompany = async(req, res) => {
    const id = req.params.id;

    const authHeader = req.headers.authorization;
    const isTokenValid = await tokenController._isTokenValid(authHeader);
    if(isTokenValid) {
        const companyProducts = await Product.find({ company: id });
        if(companyProducts.length > 0) {
            return res.send("Company has products");
        } else {
            const deletedCompany = await Company.findByIdAndDelete(id);
            res.status(200).json(deletedCompany);
        }
    } else {
        res.send("Token is not valid2");
    }
}

module.exports = {
    _getById,
    _getByCompanyName,
    _getLatestCompanies,
    _getAll,
    _createCompany,
    _updateCompany,
    _deleteCompany
};

//PostgreSQL kullanmak için gereken fonksiyonlar
//Yeni versiyonda MongoDB kullandığım için bu fonksiyonlara gerek kalmadı

// const getById = (req, res) => {
//     const id = parseInt(req.params.id);

//     const authHeader = req.headers.authorization;
//     const token = tokenController.extractTokenFromHeader(authHeader);
//     pool.query(tokenQueries.getByToken, [token], (error, results) => {
//         if(error) throw error;
//         if(results.rows[0]) {
//             if(results.rows[0].expired == false && results.rows[0].revoked == false) {
//                 pool.query(queries.getById, [id], (error, results) => {
//                     if(error) throw error;
//                     res.status(200).json(results.rows);
//                 });
//             }
//         } else {
//             res.send("Token is not valid");
//         }
//     });
// }

// const getByCompanyName = (req, res) => {
//     const companyName = req.params.companyName;

//     const authHeader = req.headers.authorization;
//     const token = tokenController.extractTokenFromHeader(authHeader);
//     pool.query(tokenQueries.getByToken, [token], (error, results) => {
//         if(error) throw error;
//         if(results.rows[0]) {
//             if(results.rows[0].expired == false && results.rows[0].revoked == false) {
//                 pool.query(queries.getByCompanyName, [companyName], (error, results) => {
//                     if(error) throw error;
//                     res.status(200).json(results.rows);
//                 });
//             }
//         } else {
//             res.send("Token is not valid");
//         }
//     });
// }

// const getLatestCompanies = (req, res) => {
//     const authHeader = req.headers.authorization;
//     const token = tokenController.extractTokenFromHeader(authHeader);
//     pool.query(tokenQueries.getByToken, [token], (error, results) => {
//         if(error) throw error;
//         if(results.rows[0]) {
//             if(results.rows[0].expired == false && results.rows[0].revoked == false) {
//                 pool.query(queries.getLatestCompanies, (error, results) => {
//                     if(error) throw error;
//                     res.status(200).json(results.rows);
//                 });
//             }
//         } else {
//             res.send("Token is not valid");
//         }
//     });
// }

// const getAll = (req, res) => {
//     const authHeader = req.headers.authorization;
//     const token = tokenController.extractTokenFromHeader(authHeader);
//     pool.query(tokenQueries.getByToken, [token], (error, results) => {
//         if(error) throw error;
//         if(results.rows[0]) {
//             if(results.rows[0].expired == false && results.rows[0].revoked == false) {
//                 pool.query(queries.getAll, (error, results) => {
//                     if(error) throw error;
//                     res.status(200).json(results.rows);
//                 });
//             }
//         } else {
//             res.send("Token is not valid");
//         }
//     });
// }

// const createCompany = (req, res) => {
//     var company = req.body;

//     const authHeader = req.headers.authorization;
//     const token = tokenController.extractTokenFromHeader(authHeader);
//     pool.query(tokenQueries.getByToken, [token], (error, results) => {
//         if(error) throw error;
//         if(results.rows[0]) {
//             if(results.rows[0].expired == false && results.rows[0].revoked == false) {
//                 pool.query(queries.createCompany, [company.company_name,company.company_legal_number, company.incorporation_country, company.website], (error, results) => {
//                     if(error) throw error;
//                     res.status(201).json(results.rows);
//                 })
//             }
//         } else {
//             res.send("Token is not valid");
//         }
//     });
// }

// const updateCompany = (req, res) => {
//     var company = req.body;

//     const authHeader = req.headers.authorization;
//     const token = tokenController.extractTokenFromHeader(authHeader);
//     pool.query(tokenQueries.getByToken, [token], (error, results) => {
//         if(error) throw error;
//         if(results.rows[0]) {
//             if(results.rows[0].expired == false && results.rows[0].revoked == false) {
//                 pool.query(queries.updateCompany, [company.company_name,company.company_legal_number, company.incorporation_country, company.website, company.id], (error, results) => {
//                     if(error) throw error;
//                     res.status(200).json(results.rows);
//                 })
//             }
//         } else {
//             res.send("Token is not valid");
//         }
//     });
// }

// const deleteCompany = (req, res) => {
//     const id = parseInt(req.params.id);

//     const authHeader = req.headers.authorization;
//     const token = tokenController.extractTokenFromHeader(authHeader);
//     pool.query(tokenQueries.getByToken, [token], (error, results) => {
//         if(error) throw error;
//         if(results.rows[0]) {
//             if(results.rows[0].expired == false && results.rows[0].revoked == false) {
//                 pool.query(productQueries.getByCompanyId, [id], (error, results) => {
//                     if(error) throw error;
//                     if(results.rows.length === 0) {
//                         pool.query(queries.deleteCompany, [id], (error, results) => {
//                             if(error) throw error;
//                             res.status(200).json(results.rows);
//                         })
//                     } else {
//                         res.send("Company has products");
//                     }
//                 });
//             }
//         } else {
//             res.send("Token is not valid");
//         }
//     });
// }