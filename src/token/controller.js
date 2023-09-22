const pool = require("../../db");
const queries = require("./queries");

const getById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getbyUsername = (req, res) => {
    const username = req.params.username;

    pool.query(queries.getByUsername, [username], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

module.exports = {
    getById,
    getbyUsername
};