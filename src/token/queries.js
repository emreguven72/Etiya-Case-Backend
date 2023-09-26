//PostgreSQL kullanmak için gereken SQL sorguları
//Yeni versiyonda MongoDB kullandığım için bu sorgulara gerek kalmadı


const getById = "SELECT * FROM tokens where id = $1";

const getByUsername = `
    SELECT tokens.*
    FROM tokens
    INNER JOIN users ON tokens.user_id = users.id
    WHERE users.username = $1
    AND tokens.expired = false
    AND tokens.revoked = false;
`;

const getByToken = `
    SELECT * FROM tokens where token = $1;
`;

const createToken = `
    INSERT INTO tokens (token, expired, revoked, user_id) VALUES ($1, $2, $3, $4);
`;

const updateToken = `
    UPDATE tokens SET token=$1, expired=$2, revoked=$3, user_id=$4 WHERE id = $5;
`

module.exports = {
    getById,
    getByUsername,
    getByToken,
    createToken,
    updateToken
}