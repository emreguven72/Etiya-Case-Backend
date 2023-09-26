const { Router } = require("express");
const tokenController = require("./controller");

const router = Router();

router.get('/getById/:id', tokenController._getById);
router.get('/getByUsername/:username', tokenController._getbyUsername);

module.exports = router;