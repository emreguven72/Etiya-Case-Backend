const pool = require("../../db");
const userQueries = require("./queries");
const tokenQueries = require("../token/queries");
const bcrypt = require("bcrypt");
const tokenController = require("../token/controller");
const jwt = require('jsonwebtoken');

// const authHeader = req.headers.authorization;
// const token = tokenController.extractTokenFromHeader(authHeader);
// tokenController.validateToken(token);

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

module.exports = {
    getUserById,
    getUserByUsername,
    createUser,
    login,
    logout
};