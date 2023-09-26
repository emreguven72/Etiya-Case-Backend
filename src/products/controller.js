const pool = require("../../db");
const queries = require("./queries");
const tokenController = require("../token/controller");
const tokenQueries = require("../token/queries");
const Product = require("../models/ProductModel");
const Company = require("../models/CompanyModel");
const Token = require("../models/TokenModel");

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

const _getById = async(req, res) => {
    const id = req.params.id;

    const authHeader = req.headers.authorization;
    const token = tokenController.extractTokenFromHeader(authHeader);

    const tokenObject = await Token.findOne({ token: token });

    if(tokenObject.expired === false && tokenObject.revoked === false) {
        const product = await Product.findById(id).populate('company');
        res.status(200).json(product);
    } else {
        res.send("Token is not valid2");
    }
}

const _getAll = async(req, res) => {
    const authHeader = req.headers.authorization;
    const token = tokenController.extractTokenFromHeader(authHeader);

    const tokenObject = await Token.findOne({ token: token });

    if(tokenObject.expired === false && tokenObject.revoked === false) {
        const products = await Product.find({}).populate('company');
        res.status(200).json(products);
    } else {
        res.send("Token is not valid2");
    }
}

const _getByProductName = async(req, res) => {
    const productName = req.params.productName;
    const authHeader = req.headers.authorization;
    const token = tokenController.extractTokenFromHeader(authHeader);
    const tokenObject = await Token.findOne({ token: token });

    if(tokenObject.expired === false && tokenObject.revoked === false) {
        const products = await Product.find({ product_name: productName }).populate('company');
        res.status(200).json(products);
    } else {
        res.send("Token is not valid2");
    }
}

const _getByCompanyName = async(req, res) => {
    const companyName = req.params.companyName;
    const authHeader = req.headers.authorization;
    const token = tokenController.extractTokenFromHeader(authHeader);

    const tokenObject = await Token.findOne({ token: token });

    if(tokenObject.expired === false && tokenObject.revoked === false) {
        const company = await Company.findOne({ company_name: companyName });
        if(company) {
            const products = await Product.find({ company: company._id }).populate('company');
            res.status(200).json(products);
        } else {
            res.status(404).json("Company cannot found");
        }
    } else {
        res.send("Token is not valid2");
    }
}

const _getByCategory = async(req, res) => {
    const category = req.params.category;
    const authHeader = req.headers.authorization;
    const token = tokenController.extractTokenFromHeader(authHeader);
    const tokenObject = await Token.findOne({ token: token });

    if(tokenObject.expired === false && tokenObject.revoked === false) {
        const products = await Product.find({ product_category: category }).populate('company');
        res.status(200).json(products);
    } else {
        res.send("Token is not valid2");
    }
}

const _createProduct = async(req, res) => {
    const product = req.body;
    const authHeader = req.headers.authorization;
    const token = tokenController.extractTokenFromHeader(authHeader);
    const tokenObject = await Token.findOne({ token: token });

    if(tokenObject.expired === false && tokenObject.revoked === false) {
        const company = await Company.findOne({ company_name: product.company_name });
        product.company = company;
        const createdProduct = await Product.create(product);
        res.status(200).json(createdProduct);
    } else {
        res.send("Token is not valid2");
    }
}

const _updateProduct = async(req, res) => {
    const body = req.body;

    const authHeader = req.headers.authorization;
    const token = tokenController.extractTokenFromHeader(authHeader);
    const tokenObject = await Token.findOne({ token: token });

    if(tokenObject.expired === false && tokenObject.revoked === false) {
        const updatedProduct = await Product.findByIdAndUpdate(body.id, body);
        console.log(updatedProduct);
        if(!updatedProduct) {
            return res.send("Product cannot changed");
        }
        res.status(200).json(updatedProduct);
    } else {
        res.send("Token is not valid2");
    }
}

const _deleteProduct = async(req, res) => {
    const id = req.params.id;

    const authHeader = req.headers.authorization;
    const token = tokenController.extractTokenFromHeader(authHeader);
    const tokenObject = await Token.findOne({ token: token });

    if(tokenObject.expired === false && tokenObject.revoked === false) {
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.status(200).json(deletedProduct);
    } else {
        res.send("Token is not valid2");
    }
}

module.exports = {
    getById,
    getAll,
    getByProductName,
    getByCompanyName,
    getByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
    _getById,
    _getAll,
    _getByProductName,
    _getByCompanyName,
    _getByCategory,
    _createProduct,
    _updateProduct,
    _deleteProduct
};