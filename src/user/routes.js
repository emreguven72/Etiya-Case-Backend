const { Router } = require("express");
const userController = require("./controller");

const router = Router();

router.get('/getById/:id', userController._getUserById);
router.get('/getByUsername/:username', userController._getUserByUsername);
router.post('/create', userController._createUser);
router.post('/login', userController._login);
router.post('/logout', userController._logout);

module.exports = router;