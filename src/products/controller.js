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

const getByProductName = (req, res) => {
    const productName = req.params.productName;

    const authHeader = req.headers.authorization;
    const token = tokenController.extractTokenFromHeader(authHeader);
    pool.query(tokenQueries.getByToken, [token], (error, results) => {
        if(error) throw error;
        if(results.rows[0]) {
            if(results.rows[0].expired == false && results.rows[0].revoked == false) {
                pool.query(queries.getByProductName, [productName], (error, results) => {
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

const getByCategory = (req, res) => {
    const category = req.params.category;

    const authHeader = req.headers.authorization;
    const token = tokenController.extractTokenFromHeader(authHeader);
    pool.query(tokenQueries.getByToken, [token], (error, results) => {
        if(error) throw error;
        if(results.rows[0]) {
            if(results.rows[0].expired == false && results.rows[0].revoked == false) {
                pool.query(queries.getByCategory, [category], (error, results) => {
                    if(error) throw error;
                    res.status(200).json(results.rows);
                })
            }
        } else {
            res.send("Token is not valid");
        }
    });
}

const createProduct = (req, res) => {
    const product = req.body;

    const authHeader = req.headers.authorization;
    const token = tokenController.extractTokenFromHeader(authHeader);
    pool.query(tokenQueries.getByToken, [token], (error, results) => {
        if(error) throw error;
        if(results.rows[0]) {
            if(results.rows[0].expired == false && results.rows[0].revoked == false) {
                pool.query(queries.createProduct, [product.product_name,product.product_amount,product.amount_unit,product.company_id,product.product_category], (error, results) => {
                    if(error) throw error;
                    res.status(201).json(results.rows);
                });
            }
        } else {
            res.send("Token is not valid");
        }
    });
}

const updateProduct = (req, res) => {
    const product = req.body;

    const authHeader = req.headers.authorization;
    const token = tokenController.extractTokenFromHeader(authHeader);
    pool.query(tokenQueries.getByToken, [token], (error, results) => {
        if(error) throw error;
        if(results.rows[0]) {
            if(results.rows[0].expired == false && results.rows[0].revoked == false) {
                pool.query(queries.updateProduct, [product.product_name,product.product_amount,product.amount_unit,product.company_id,product.product_category,product.id], (error, results) => {
                    if(error) throw error;
                    res.status(200).json(results.rows);
                });   
            }
        } else {
            res.send("Token is not valid");
        }
    });
}

const deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);

    const authHeader = req.headers.authorization;
    const token = tokenController.extractTokenFromHeader(authHeader);
    pool.query(tokenQueries.getByToken, [token], (error, results) => {
        if(error) throw error;
        if(results.rows[0]) {
            if(results.rows[0].expired == false && results.rows[0].revoked == false) {
                pool.query(queries.deleteProduct, [id], (error, results) => {
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
    getByProductName,
    getByCompanyName,
    getByCategory,
    createProduct,
    updateProduct,
    deleteProduct
};