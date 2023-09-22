const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "EtiyaDB",
    password: "1411",
    port: 5432
});

module.exports = pool;