const { Router } = require("express");
const userController = require("./controller");

const router = Router();

router.get('/getById/:id', userController.getUserById);
router.get('/getByUsername/:username', userController.getUserByUsername);
router.post('/create', userController.createUser);

module.exports = router;