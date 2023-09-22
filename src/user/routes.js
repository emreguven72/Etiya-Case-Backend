const { Router } = require("express");
const userController = require("./controller");

const router = Router();

router.get('/:id', userController.getUserById);
router.get('/getByUsername/:username', userController.getUserByUsername);

module.exports = router;