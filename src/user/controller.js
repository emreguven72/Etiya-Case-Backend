const pool = require("../../db");
const userQueries = require("./queries");
const tokenQueries = require("../token/queries");
const bcrypt = require("bcrypt");
const tokenController = require("../token/controller");
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel.js');
const Token = require('../models/TokenModel.js');

const getUserById = async(req, res) => {
    const id = parseInt(req.params.id);

    pool.query(userQueries.getUserById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getUserByUsername = (req, res) => {
    const username = req.params.username;

    pool.query(userQueries.getUserByUsername, [username], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const createUser = (req, res) => {
    var user = req.body;
    const saltRounds = 10;

    bcrypt
        .genSalt(saltRounds)
        .then(salt => {
            return bcrypt.hash(user.password, salt)
        })
        .then(hash => {
            user.password = hash
            pool.query(userQueries.createUser, [user.name, user.username, user.password], (error, results) => {
                if(error) throw error;
                pool.query(userQueries.getUserByUsername, [user.username], (error, results) => {
                    if(error) throw error;
                    tokenController.generateToken(results.rows[0]);
                    res.status(201).json(results.rows[0]);
                });
            })
        })
        .catch(err => console.log(err));
}

const login = (req, res) => {
    const user = req.body;

    pool.query(userQueries.getUserByUsername, [user.username], (error, results) => {
        if(error) throw error;
        if(results.rows[0]) {
            bcrypt.compare(user.password,results.rows[0].password)
                .then(result => {
                    if(result) {
                        tokenController.generateToken({
                            id: results.rows[0].id,
                            username: results.rows[0].username,
                            password: results.rows[0].password
                        });
                        pool.query(tokenQueries.getByUsername, [user.username], (error, results) => {
                            if(error) throw error;
                            res.send(results.rows[0]);
                        })
                    } else {
                        res.send(null);
                    }
                })
                .catch(err => console.log(err));
        } else {
            res.send(null);
        }
    });
}

const logout = (req, res) => {
    const authHeader = req.headers.authorization;

    const token = tokenController.extractTokenFromHeader(authHeader);

    pool.query(tokenQueries.getByToken, [token], (error, results) => {
        if(error) throw error;
        pool.query(tokenQueries.updateToken, [results.rows[0].token, true, true, results.rows[0].user_id, results.rows[0].id], (error, results) => {
            if(error) throw error;
            res.send(null);
        });  
    });
}

const _getUserById = async(req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json(user);
}

const _getUserByUsername = async(req, res) => {
    const username = req.params.username;
    const user = await User.findOne({ username: username });
    res.status(200).json(user);
};

const _createUser = async(req, res) => {
    try {
        var userObject = req.body;
        const saltRounds = 10;
        const jwtSecretKey = process.env.JWT_SECRET_KEY;

        bcrypt
        .genSalt(saltRounds)
        .then(salt => {
            return bcrypt.hash(userObject.password, salt)
        })
        .then(async(hash) => {
            userObject.password = hash;
            const createdUser = await User.create(userObject);
            res.status(200).json(createdUser);
        })
        .catch(err => console.log(err));
    } catch (error) {
        res.status(500).json(error);
    }
};

const _login = async(req, res) => {
    const body = req.body;

    const user = await User.findOne({ username: body.username });
    if(user) {
        bcrypt.compare(body.password,user.password)
                .then(async(result) => {
                    if(result) {
                        const createdToken = await tokenController._generateToken(user);
                        res.send(createdToken.token);
                    } else {
                        res.send(null);
                    }
                })
                .catch(err => console.log(err));
    } else {
        res.send(null);
    }
}

const _logout = async(req, res) => {
    const authHeader = req.headers.authorization;
    const token = tokenController.extractTokenFromHeader(authHeader);
    const tokenObject = await Token.findOne({ token: token });
    if(tokenObject.expired === false && tokenObject.revoked === false) {
        await Token.findByIdAndUpdate(tokenObject.id, {
            expired: true,
            revoked: true
        });
    }
    res.send(null);
}

module.exports = {
    getUserById,
    getUserByUsername,
    createUser,
    login,
    logout,
    _createUser,
    _getUserById,
    _getUserByUsername,
    _login,
    _logout
};