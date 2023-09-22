const pool = require("../../db");
const queries = require("./queries");

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getUserById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getUserByUsername = (req, res) => {
    const username = req.params.username;

    pool.query(queries.getUserByUsername, [username], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

module.exports = {
    getUserById,
    getUserByUsername
};