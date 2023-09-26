const pool = require("../../db");
const tokenQueries = require("./queries");
const jwt = require('jsonwebtoken');
const Token = require('../models/TokenModel.js');
const User = require('../models/UserModel')



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

const _getById = async(req, res) => {
    const id = req.params.id;
    const token = await Token.findById(id);
    res.status(200).json(token);
}

const _getbyUsername = async(req, res) => {
    const username = req.params.username;
    const user = await User.findOne({ username: username });
    if(user) {
        const tokens = await Token.find({ user: user._id });
        res.status(200).json(tokens);
    } else {
        res.status(404).json("There is no token for this username");
    }
}

async function _generateToken(user) {
    const oldTokens = await Token.find({ user: user });
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if(oldTokens.length > 0) {
        oldTokens.forEach(async(token) => {
            await Token.findByIdAndUpdate(token.id, {
                expired: true,
                revoked: true
            });
        });
    }
    const token = jwt.sign({
        name: user.name,
        username: user.username
    }, jwtSecretKey);
    const tokenObject = {
        token: token,
        expired: false,
        revoked: false,
        user: user
    }
    const createdToken = await Token.create(tokenObject);
    return createdToken;
}

async function _isTokenValid(authHeader) {
    const token = extractTokenFromHeader(authHeader);
    const tokenObject = await Token.findOne({ token: token });
    if(tokenObject) {
        if(tokenObject.expired === true && tokenObject.revoked === true) {
            return false;
        } 
        return true;
    }
    return false;
}

module.exports = {
    extractTokenFromHeader,
    generateToken,
    _getById,
    _getbyUsername,
    _generateToken,
    _isTokenValid
};

//PostgreSQL kullanmak için gereken fonksiyonlar
//Yeni versiyonda MongoDB kullandığım için bu fonksiyonlara gerek kalmadı

// const getById = (req, res) => {
//     const id = parseInt(req.params.id);

//     pool.query(tokenQueries.getById, [id], (error, results) => {
//         if(error) throw error;
//         res.status(200).json(results.rows);
//     });
// }

// const getbyUsername = (req, res) => {
//     const username = req.params.username;

//     pool.query(tokenQueries.getByUsername, [username], (error, results) => {
//         if(error) throw error;
//         res.status(200).json(results.rows);
//     });
// }