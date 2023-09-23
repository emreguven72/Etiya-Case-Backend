const pool = require("../../db");
const userQueries = require("./queries");
const tokenQueries = require("../token/queries");
const bcrypt = require("bcrypt");
const tokenController = require("../token/controller");

// const authHeader = req.headers.authorization;
// const token = tokenController.extractTokenFromHeader(authHeader);
// tokenController.validateToken(token);

const getUserById = async(req, res) => {
    const id = parseInt(req.params.id);

    tokenController.generateToken({
        id: 1,
        name: "Emre",
        username: "emre1411",
        password: "$2b$10$SsGkQFzUoXOMz3Muxu3RnOs/n3COF9FR/JLHn4PeXm6BSFkJilXre"
    })

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
    //gelen username ile eslesen kaydi db den bul
    //bulamazsan hata
    //bulursan gelen sifre ile db deki sifreyi karsilastir
    //sifreler eslesirse bu kullanici icin var olan eski tokenleri gecersiz kil ve yeni bir jwt token yarat
    //yeni tokeni db ye kaydet.
    //jwt tokeni frontende yolla.
}

const logout = (req, res) => {
    //headerla gelen tokeni gecersiz kil
}

module.exports = {
    getUserById,
    getUserByUsername,
    createUser
};