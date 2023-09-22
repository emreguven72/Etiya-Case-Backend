const getById = "SELECT * FROM tokens where id = $1";

const getByUsername = `
    SELECT tokens.*
    FROM tokens
    INNER JOIN users ON tokens.user = users.id
    WHERE users.username = $1
    AND tokens.expired = false
    AND tokens.revoked = false;
`

module.exports = {
    getById,
    getByUsername
}