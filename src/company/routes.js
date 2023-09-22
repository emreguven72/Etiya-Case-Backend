const { Router } = require("express");
const companyController = require("./controller");

const router = Router();

router.get('/:id', companyController.getById);
router.get('/getByCompanyName/:companyName', companyController.getByCompanyName);

module.exports = router;