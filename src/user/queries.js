const getUserById = "SELECT * FROM users where id = $1";

const getUserByUsername = "SELECT * FROM users where username = $1"

module.exports = {
    getUserById,
    getUserByUsername
}