const pool = require("../../db");
const tokenQueries = require("./queries");
const jwt = require('jsonwebtoken');

const getById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(tokenQueries.getById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getbyUsername = (req, res) => {
    const username = req.params.username;

    pool.query(tokenQueries.getByUsername, [username], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

function validateToken(token) {
    pool.query(tokenQueries.getByToken, [token], (error, results) => {
        if(error) throw error;
        if(!results.rows[0]) {
            //error return false
        }
        //return true
    });
}

function extractTokenFromHeader(authHeader) {
    let token = "";
    if(authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7,authHeader.length);
    };
    return token;
}

function generateToken(user) {
    pool.query(tokenQueries.getByUsername, [user.username], (error, results) => {
        if(error) throw error;

        if(results.rows.length < 1) {
            const jwtSecretKey = process.env.JWT_SECRET_KEY;
            const token = jwt.sign({
                name: user.name,
                username: user.username
            }, jwtSecretKey);
            pool.query(tokenQueries.createToken, [token, false, false, user.id], (error, results) => {
                if(error) throw error;
            });
        } else {
            results.rows.forEach(result => {
                pool.query(tokenQueries.updateToken, [result.token, true, true, result.user_id, result.id], (error, results) => {
                    if(error) throw error;
                    const jwtSecretKey = process.env.JWT_SECRET_KEY;
                    const token = jwt.sign({
                        name: user.name,
                        username: user.username
                    }, jwtSecretKey);
                    pool.query(tokenQueries.createToken, [token, false, false, user.id], (error, results) => {
                        if(error) throw error;
                    });
                });       
            });
        }
    })
}

module.exports = {
    getById,
    getbyUsername,
    validateToken,
    generateToken,
    extractTokenFromHeader
};