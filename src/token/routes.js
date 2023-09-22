const { Router } = require("express");
const tokenController = require("./controller");

const router = Router();

router.get('/:id', tokenController.getById);
router.get('/getByUsername/:username', tokenController.getbyUsername);

module.exports = router;