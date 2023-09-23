const getUserById = "SELECT * FROM users where id = $1";

const getUserByUsername = "SELECT * FROM users where username = $1";

const createUser = `
    INSERT INTO users (name, username, password) VALUES ($1, $2, $3);
`;

module.exports = {
    getUserById,
    getUserByUsername,
    createUser,
}