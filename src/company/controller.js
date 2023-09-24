const pool = require("../../db");
const queries = require("./queries");
const tokenController = require("../token/controller");
const tokenQueries = require("../token/queries");

const getById = (req, res) => {
    const id = parseInt(req.params.id);

    const authHeader = req.headers.authorization;
    const token = tokenController.extractTokenFromHeader(authHeader);
    pool.query(tokenQueries.getByToken, [token], (error, results) => {
        if(error) throw error;
        if(results.rows[0]) {
            if(results.rows[0].expired == false && results.rows[0].revoked == false) {
                pool.query(queries.getById, [id], (error, results) => {
                    if(error) throw error;
                    res.status(200).json(results.rows);
                });
            }
        } else {
            res.send("Token is not valid");
        }
    });
}

const getByCompanyName = (req, res) => {
    const companyName = req.params.companyName;

    const authHeader = req.headers.authorization;
    const token = tokenController.extractTokenFromHeader(authHeader);
    pool.query(tokenQueries.getByToken, [token], (error, results) => {
        if(error) throw error;
        if(results.rows[0]) {
            if(results.rows[0].expired == false && results.rows[0].revoked == false) {
                pool.query(queries.getByCompanyName, [companyName], (error, results) => {
                    if(error) throw error;
                    res.status(200).json(results.rows);
                });
            }
        } else {
            res.send("Token is not valid");
        }
    });
}

const getLatestCompanies = (req, res) => {
    const authHeader = req.headers.authorization;
    const token = tokenController.extractTokenFromHeader(authHeader);
    pool.query(tokenQueries.getByToken, [token], (error, results) => {
        if(error) throw error;
        if(results.rows[0]) {
            if(results.rows[0].expired == false && results.rows[0].revoked == false) {
                pool.query(queries.getLatestCompanies, (error, results) => {
                    if(error) throw error;
                    res.status(200).json(results.rows);
                });
            }
        } else {
            res.send("Token is not valid");
        }
    });
}

const getAll = (req, res) => {
    const authHeader = req.headers.authorization;
    const token = tokenController.extractTokenFromHeader(authHeader);
    pool.query(tokenQueries.getByToken, [token], (error, results) => {
        if(error) throw error;
        if(results.rows[0]) {
            if(results.rows[0].expired == false && results.rows[0].revoked == false) {
                pool.query(queries.getAll, (error, results) => {
                    if(error) throw error;
                    res.status(200).json(results.rows);
                });
            }
        } else {
            res.send("Token is not valid");
        }
    });
}

const createCompany = (req, res) => {
    var company = req.body;

    const authHeader = req.headers.authorization;
    const token = tokenController.extractTokenFromHeader(authHeader);
    pool.query(tokenQueries.getByToken, [token], (error, results) => {
        if(error) throw error;
        if(results.rows[0]) {
            if(results.rows[0].expired == false && results.rows[0].revoked == false) {
                pool.query(queries.createCompany, [company.company_name,company.company_legal_number, company.incorporation_country, company.website], (error, results) => {
                    if(error) throw error;
                    res.status(201).json(results.rows);
                })
            }
        } else {
            res.send("Token is not valid");
        }
    });
}

const updateCompany = (req, res) => {
    var company = req.body;

    const authHeader = req.headers.authorization;
    const token = tokenController.extractTokenFromHeader(authHeader);
    pool.query(tokenQueries.getByToken, [token], (error, results) => {
        if(error) throw error;
        if(results.rows[0]) {
            if(results.rows[0].expired == false && results.rows[0].revoked == false) {
                pool.query(queries.updateCompany, [company.company_name,company.company_legal_number, company.incorporation_country, company.website, company.id], (error, results) => {
                    if(error) throw error;
                    res.status(200).json(results.rows);
                })
            }
        } else {
            res.send("Token is not valid");
        }
    });
}

const deleteCompany = (req, res) => {
    const id = parseInt(req.params.id);

    const authHeader = req.headers.authorization;
    const token = tokenController.extractTokenFromHeader(authHeader);
    pool.query(tokenQueries.getByToken, [token], (error, results) => {
        if(error) throw error;
        if(results.rows[0]) {
            if(results.rows[0].expired == false && results.rows[0].revoked == false) {
                pool.query(queries.deleteCompany, [id], (error, results) => {
                    if(error) throw error;
                    res.status(200).json(results.rows);
                })
            }
        } else {
            res.send("Token is not valid");
        }
    });
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